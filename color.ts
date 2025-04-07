import type { Color, ColorComponent } from "./types.ts";
export function color(
  r: ColorComponent,
  g: ColorComponent,
  b: ColorComponent,
  a: ColorComponent,
): Color {
  return { r, g, b, a };
}
