import type {
  BarProperties,
  ItemPosition,
  ItemProperties,
  Style,
} from "./types.ts";

function _styleToString(style: Style): string {
  return Object.entries(style)
    .map(([prop, value]) => `${prop}=${value}`)
    .join(" ");
}
function _runSketchy(...args: string[]): Deno.Command {
  return new Deno.Command("sketchybar", { args });
}

export class SketchyBar {
  _currentArgs: string[] = [];
  _lastItem: string | null = null;
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
   * Subscribe item to event. If no item specified, it applies eto the last added item.
   * https://felixkratz.github.io/SketchyBar/config/events#events-and-scripting
   */
  subscribeToEvent(eventName: string, itemOverride?: string): SketchyBar {
    const item = itemOverride ?? this._lastItem;
    if (!item) throw new Error("Item not provided and not in context.");
    this._currentArgs.push("--subscribe", item, eventName);
    return this;
  }

  /**
   * Sets the style for the bar
   * https://felixkratz.github.io/SketchyBar/config/bar#configuration-of-the-bar
   */
  setBarStyle(style: BarProperties): SketchyBar {
    this._currentArgs.push("--bar", _styleToString(style));
    return this;
  }

  /**
   * Sets the default style for the items added moving forward
   * https://felixkratz.github.io/SketchyBar/config/items#changing-the-default-values-for-all-further-items
   */
  setItemDefaultStyle(style: ItemProperties): SketchyBar {
    this._currentArgs.push("--default", _styleToString(style));
    return this;
  }

  /**
   * Adds an item
   * https://felixkratz.github.io/SketchyBar/config/items#items-and-their-properties
   */
  addItem(name: string, position: ItemPosition): SketchyBar {
    this._currentArgs.push("--add", "item", name, position);
    this._lastItem = name;
    return this;
  }

  /**
   * Sets item properties. If no item is specified, it changes last added item.
   */
  setItem(properties: ItemProperties, itemOverride?: string) {
    const item = itemOverride ?? this._lastItem;
    if (!item) throw new Error("Item not provided and not in context.");
    this._currentArgs.push("--set", item, _styleToString(properties));
  }

  /**
   * Runs the command and resets state
   */
  run(): Deno.Command {
    const cmd = _runSketchy(...this._currentArgs);
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

export * from "./types.ts";
