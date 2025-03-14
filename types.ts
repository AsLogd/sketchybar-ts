type HexadecimalDigit =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E";
type H = HexadecimalDigit;
type ColorComponent = `${H}${H}`;
type PropertyPrefix<P extends string, T extends object> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};
type NestedBackgroundProperties = PropertyPrefix<
  "background.",
  ItemBackgroundProperties
>;

type NestedIconProperties = PropertyPrefix<
  "icon.",
  ItemTextProperties
>;

type NestedLabelProperties = PropertyPrefix<
  "label.",
  ItemTextProperties
>;

type NestedShadowProperties = PropertyPrefix<
  "shadow.",
  ItemShadowProperties
>;

type NestedImageProperties = PropertyPrefix<
  "image.",
  ItemImageProperties
>;
export type ItemPosition = "left" | "right" | "center";
export type TextPosition = "left" | "right" | "center";

export type Color = {
  r: ColorComponent;
  g: ColorComponent;
  b: ColorComponent;
  a: ColorComponent;
};

export type BarProperties = {
  // Color of the bar
  color: Color;
  // Color of the bar's border
  border_color: Color;
  // Position of the bar on the screen
  position: "top" | "bottom";
  // Height of the bar
  height: number;
  // Override of the height of the bar on notched displays
  notch_display_height: number;
  // Margin around the bar
  margin: number;
  // Vertical offset of the bar from its default position
  y_offset: number;
  // Corner radius of the bar
  corner_radius: number;
  // Border width of the bars border
  border_width: number;
  // Blur radius applied to the background of the bar
  blur_radius: number;
  // Padding between the left bar border and the leftmost item
  padding_left: number;
  // Padding between the right bar border and the rightmost item
  padding_right: number;
  // The width of the notch to be accounted for on the internal display
  notch_width: number;
  // Additional y_offset exclusively applied to notched screens
  notch_offset: number;
  // Display to show the bar on
  display: "main" | "all" | number[];
  // If all / the current bar is hidden
  hidden: number | "current";
  // If the bar should be drawn on top of everything, or on top of all windows
  topmost: number | "window";
  // Makes the bar sticky during space changes
  sticky: number;
  // If fonts should be smoothened
  font_smoothing: number;
  // If the bar should draw a shadow
  shadow: number;
};

export type ItemBackgroundProperties =
  & {
    // If the background should be rendered
    drawing: boolean;
    // Fill color of the background
    color: Color;
    // Color of the backgrounds border
    border_color: Color;
    // Width of the background border
    border_width: number;
    // Overrides the height of the background
    height: number;
    // Corner radius of the background
    corner_radius: number;
    // Padding to the left of the background
    padding_left: number;
    // Padding to the right of the background
    padding_right: number;
    // Vertical offset applied to the background
    y_offset: number;
    // By how much the background clips the bar (i.e. transparent holes in the bar)
    clip: number;
    // The image to display in the bar
    image: string;
  }
  & NestedShadowProperties
  & NestedImageProperties;

export type ItemGeometryProperties = {
  // If the item should be drawn into the bar
  drawing: boolean;
  // Position of the item in the bar
  position: ItemPosition;
  // Spaces to show this item on
  space: number[];
  // Displays to show this item on
  display: number[] | "active";
  // Ignores all space / display associations while on
  ignore_association: boolean;
  // Vertical offset applied to the item
  y_offset: number;
  // The padding applied left of the item
  padding_left: number;
  // The padding applied right of the item
  padding_right: number;
  // Makes the item use a fixed width given in points
  width: number | "dynamic";
  // Controls the automatic scroll of all items texts, which are truncated by the max_chars property
  scroll_texts: boolean;
  // The blur radius applied to the background of the item
  blur_radius: number[];
} & NestedBackgroundProperties;

export type ItemIconProperties = {
  icon: string;
} & NestedIconProperties;

export type ItemLabelProperties = {
  label: string;
} & NestedLabelProperties;

export type ItemScriptingProperties = {
  script: string;
  click_script: string;
  // Time in seconds between routine script executins (0 means never)
  update_freq: number;
  // If and when an item updates
  updates: boolean | "when_shown";
  // Registers a helper for direct event notifications
  mach_helper: string;
};

export type ItemTextProperties =
  & {
    // If the text is rendered
    drawing: boolean;
    // If the text uses the highlight_color or the regular color
    highlight: boolean;
    // Color used to render the text
    color: Color;
    // Highlight color of the text (e.g. for active space icon)
    highlight_color: Color;
    // Padding to the left of the text
    padding_left: number;
    // Padding to the right of the text
    padding_right: number;
    // Vertical offset applied to the text
    y_offset: number;
    // The font to be used for the text
    font: string;
    // The font family to be used for the text
    "font.family": string;
    // The font style to be used for the text
    "font.style": string;
    // The font size to be used for the text
    "font.size": number;
    // Sets the text to the specified string
    string: string;
    // Sets the scroll speed of text trucated by max_chars on items with scroll_texts enabled
    scroll_duration: number;
    // Sets the maximum characters to display (can be scrolled via the items scroll_texts property)
    max_chars: number;
    // Makes the text use a fixed width given in points
    width: number | "dynamic";
    // Aligns the text in its container when it has a fixed width larger than the content width
    align: TextPosition;
  }
  & NestedBackgroundProperties
  & NestedShadowProperties;

export type ItemImageProperties = {
  // If the image should draw
  drawing: boolean;
  // The scale factor that should be applied to the image
  scale: number;
  // Color of the image border
  border_color: Color;
  // Width of the image border
  border_width: number;
  // Corner radius of the image
  corner_radius: number;
  // Padding to the left of the image
  padding_left: number;
  // Padding to the right of the image
  padding_right: number;
  // Vertical offset applied to the image
  y_offset: number;
  // The image to display in the bar
  string: number;
} & NestedShadowProperties;

export type ItemShadowProperties = {
  // If the shadow should be drawn
  drawing: boolean;
  // Color of the shadow
  color: Color;
  // Angle of the shadow
  angle: number;
  // Distance of the shadow
  distance: number;
};

export type ItemProperties =
  & ItemShadowProperties
  & ItemBackgroundProperties
  & ItemGeometryProperties
  & ItemScriptingProperties
  & ItemImageProperties
  & ItemLabelProperties;

type StylePrimitive = number | string | Color | number[] | boolean;
type StyleValue = StylePrimitive | Record<string, StylePrimitive>;

export type Style = Record<string, StyleValue>;
