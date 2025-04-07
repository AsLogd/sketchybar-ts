import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { styleToString } from "./styleToString.ts";

const PRIMITIVES = {
  bool: true,
  num: 1,
  color: { r: "00", g: "AA", b: "11", a: "FF" },
  numList: [1, 2, 3],
  str: "value",
};

describe("styleToString", () => {
  it("should return empty string if style is an empty object", () => {
    const result = styleToString({});
    expect(result).toBe("");
  });

  it("should return correct string styles when the object contains only primitives", () => {
    const result = styleToString(PRIMITIVES);
    expect(result).toBe(
      "bool=true num=1 str=value color=0x00AA11FF numList=1,2,3",
    );
  });

  it("should return correct string styles when the object contains primitives and nested objects", () => {
    const result = styleToString({
      ...PRIMITIVES,
      nested: PRIMITIVES,
    });
    expect(result).toBe(
      "bool=true num=1 str=value color=0x00AA11FF numList=1,2,3 nested.bool=true nested.num=1 nested.str=value nested.color=0x00AA11FF nested.numList=1,2,3",
    );
  });
});
