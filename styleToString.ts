import type { Color, Style, StyleValue } from "./types.ts";

function isColor(v: unknown): v is Color {
  return (
    !!v && typeof v === "object" && "r" in v && "g" in v && "b" in v && "a" in v
  );
}

function isObject(v: unknown): v is object {
  return typeof v === "object";
}

function groupBy<T, TGroup extends string>(
  elems: T[],
  fn: (elem: T) => TGroup,
): Partial<Record<TGroup, T[]>> {
  const withGroups = elems.map((el) => [fn(el), el] as const);
  const result: Partial<Record<TGroup, T[]>> = {};
  for (const [key, value] of withGroups) {
    if (key in result) {
      result[key]!.push(value);
      continue;
    }
    result[key] = [value];
  }
  return result;
}

function entriesToStyleString(
  r: [string, StyleValue][] = [],
  t: (prop: string, value: unknown) => string | string[],
): string[] {
  return r.flatMap(([prop, value]) => t(prop, value));
}

function getPrimitiveValue(v: unknown) {
  if (typeof v === "string") {
    const shouldBeQuoted = [" ", "/"].some((c) => v.includes(c));
    return shouldBeQuoted ? `"${v}"` : v;
  }
  return v;
}

function getProp(prefix: string = "", p: string) {
  const prop = p === "value" ? "" : p;
  const shouldUseDot = prefix.length > 1 && !!prop;
  const dot = shouldUseDot ? "." : "";
  return `${prefix}${dot}${prop}`;
}

export function styleToString(style: Style, prefix?: string): string[] {
  const { nested, ...plain } = groupBy(Object.entries(style), ([_, v]) => {
    if (Array.isArray(v)) {
      return "numList";
    } else if (isColor(v)) {
      return "color";
    } else if (isObject(v)) {
      return "nested";
    }
    return "primitive";
  });
  const primitiveValues = entriesToStyleString(
    plain.primitive,
    (prop, value) => `${getProp(prefix, prop)}=${getPrimitiveValue(value)}`,
  );
  const colorValues = entriesToStyleString(plain.color, (prop, value) => {
    const { a, r, g, b } = value as Color;
    return `${getProp(prefix, prop)}=0x${r}${g}${b}${a}`;
  });
  const numListValues = entriesToStyleString(plain.numList, (prop, value) => {
    const list = (value as number[]).join(",");
    return `${getProp(prefix, prop)}=${list}`;
  });
  const nestedValues = entriesToStyleString(nested, (prop, value) =>
    styleToString(value as Style, getProp(prefix, prop)),
  );

  return [
    ...primitiveValues,
    ...colorValues,
    ...numListValues,
    ...nestedValues,
  ];
}
