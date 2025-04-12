import { SketchyBar as SketchyClass } from "./SketchyBar.ts";
import { run } from "./run.ts";
export const SketchyBar: SketchyClass = new SketchyClass(run);
export * from "./types.ts";
export * from "./color.ts";
