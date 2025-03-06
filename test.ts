import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { SketchyBar } from "./mod.ts";

describe("Sketchybar", () => {
  it("Creates a new instance", () => {
    const c = new SketchyBar();
    expect(c).toBeInstanceOf(SketchyBar);
  });

  it("Should add new event arguments", () => {
    const c = new SketchyBar();
    c.addEvent("some-event");
    expect(c._currentArgs).toHaveLength(3);
    expect(c._currentArgs[0]).toBe("--add");
    expect(c._currentArgs[1]).toBe("event");
    expect(c._currentArgs[2]).toBe("some-event");
  });
});
