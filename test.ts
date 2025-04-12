import { beforeEach, describe, it } from "@std/testing/bdd";
import { expect, fn } from "@std/expect";
import { SketchyBar } from "./SketchyBar.ts";
import { color } from "./color.ts";
import type { RunCommandType } from "./types.ts";

describe("Sketchybar", () => {
  let mockRun = fn() as RunCommandType;
  beforeEach(() => {
    mockRun = fn() as RunCommandType;
  });

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

  it("should set default styles", () => {
    const c = new SketchyBar(mockRun);
    const green = color("00", "FF", "00", "FF");
    c.setItemDefaultStyle({
      padding_left: 5,
      padding_right: 5,
      icon: {
        value: "i",
        font: "HackGen35 Console NF:Bold:17.0",
        align: "center",
        shadow: {
          angle: 45,
        },
      },
      color: green,
    });
    c.run();
    expect(mockRun).toHaveBeenCalledWith(
      "--default",
      "padding_left=5",
      "padding_right=5",
      "color=0x00FF00FF",
      "icon=i",
      'icon.font="HackGen35 Console NF:Bold:17.0"',
      "icon.align=center",
      "icon.shadow.angle=45",
    );
  });

  it("should add an item", () => {
    const c = new SketchyBar(mockRun);
    c.addItem("test", { position: "center" });
    c.run();
    expect(mockRun).toHaveBeenCalledWith("--add", "item", "test", "center");
  });

  it("should add an item", () => {
    const c = new SketchyBar(mockRun);
    c.addItem("test", { position: "center" });
    c.run();
    expect(mockRun).toHaveBeenCalledWith("--add", "item", "test", "center");
  });

  it("should subscribe item to event", () => {
    const c = new SketchyBar(mockRun);
    c.subscribeToEvent("test", "some_event");
    c.run();
    expect(mockRun).toHaveBeenCalledWith("--subscribe", "test", "some_event");
  });

  it("should add an item with properties and events", () => {
    const c = new SketchyBar(mockRun);
    c.addItem("test", {
      position: "left",
      properties: {
        icon: { drawing: false },
        script: "./some_script.ts",
      },
      events: ["event-a", "event-b"],
    });
    c.run();
    expect(mockRun).toHaveBeenCalledWith(
      "--add",
      "item",
      "test",
      "left",
      "--set",
      "test",
      'script="./some_script.ts"',
      "icon.drawing=false",
      "--subscribe",
      "test",
      "event-a",
      "--subscribe",
      "test",
      "event-b",
    );
  });

  it("should set item properties", () => {
    const c = new SketchyBar(mockRun);
    c.setItem("test", {
      icon: { value: "" },
      label: { drawing: false },
    });
    c.run();
    expect(mockRun).toHaveBeenCalledWith(
      "--set",
      "test",
      "icon=",
      "label.drawing=false",
    );
  });
});
