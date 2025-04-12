import { styleToString } from "./styleToString.ts";
import type {
  BarProperties,
  ItemProperties,
  ItemPosition,
  RunCommandType,
  ItemConfig,
} from "./types.ts";

export class SketchyBar {
  _currentArgs: string[] = [];
  _runCommand: RunCommandType;

  constructor(run: RunCommandType) {
    this._runCommand = run;
  }
  /**
   * This allows to define events which are triggered by
   * arbitrary applications or manually (see Trigger custom events).
   * Items can also subscribe to these events for their script execution.
   * https://felixkratz.github.io/SketchyBar/config/events#creating-custom-events
   */
  addEvent(eventName: string): SketchyBar {
    this._currentArgs.push("--add", "event", eventName);
    return this;
  }

  /**
   * Subscribe item to event.
   * https://felixkratz.github.io/SketchyBar/config/events#events-and-scripting
   */
  subscribeToEvent(item: string, eventName: string): SketchyBar {
    if (!item) throw new Error("Item not provided and not in context.");
    this._currentArgs.push("--subscribe", item, eventName);
    return this;
  }

  /**
   * Sets the style for the bar
   * https://felixkratz.github.io/SketchyBar/config/bar#configuration-of-the-bar
   */
  setBarStyle(style: BarProperties): SketchyBar {
    this._currentArgs.push("--bar", ...styleToString(style));
    return this;
  }

  /**
   * Sets the default style for the items added moving forward
   * https://felixkratz.github.io/SketchyBar/config/items#changing-the-default-values-for-all-further-items
   */
  setItemDefaultStyle(style: ItemProperties): SketchyBar {
    this._currentArgs.push("--default", ...styleToString(style));
    return this;
  }

  /**
   * Adds an item
   * https://felixkratz.github.io/SketchyBar/config/items#items-and-their-properties
   */
  addItem(
    name: string,
    { position, properties, events }: ItemConfig,
  ): SketchyBar {
    this._currentArgs.push("--add", "item", name, position);
    if (properties) this.setItem(name, properties);
    if (events) {
      for (const event of events) {
        this.subscribeToEvent(name, event);
      }
    }
    return this;
  }

  /**
   * Sets item properties.
   */
  setItem(item: string, properties: ItemProperties) {
    if (!item) throw new Error("Item not provided");
    this._currentArgs.push("--set", item, ...styleToString(properties));
  }

  /**
   * Runs the command and resets state
   */
  run(): Deno.Command {
    const cmd = this._runCommand(...this._currentArgs);
    this._currentArgs = [];
    return cmd;
  }

  /**
   * Returns a string with the command that would be run at this point. (Cannot be chained)
   */
  debug(): string {
    return this._currentArgs.join(" ");
  }
}
