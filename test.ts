import { describe, it } from "@std/testing/bdd";
import { expect, fn } from "@std/expect";
import { SketchyBar } from "./SketchyBar.ts";
import { color } from "./color.ts";
import type { RunCommandType } from "./types.ts";

describe("Sketchybar", () => {
  const mockRun = fn() as RunCommandType;
  it("Creates a new instance", () => {
    const c = new SketchyBar(mockRun);
    expect(c).toBeInstanceOf(SketchyBar);
  });

  it("Should add new event arguments", () => {
    const c = new SketchyBar(mockRun);
    c.addEvent("some-event");
    expect(c._currentArgs).toHaveLength(3);
    expect(c._currentArgs[0]).toBe("--add");
    expect(c._currentArgs[1]).toBe("event");
    expect(c._currentArgs[2]).toBe("some-event");
  });

  it("should set bar styles", () => {
    const c = new SketchyBar(mockRun);
    const green = color("00", "FF", "00", "FF");
    const red = color("FF", "00", "00", "FF");
    c.setBarStyle({
      color: green,
      border_color: red,
      position: "top",
      height: 30,
      margin: 5,
      display: "main",
    });
    c.run();
    expect(mockRun).toHaveBeenCalledWith(
      "--bar",
      "position=top",
      "height=30",
      "margin=5",
      "display=main",
      "color=0x00FF00FF",
      "border_color=0xFF0000FF",
    );
  });
});
