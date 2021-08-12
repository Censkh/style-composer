import {EnumOf} from "../Utils";

export interface FontFaceOptions {
  fallbacks?: string[],
}

export type FontLoadListenerCallback = () => void;

export const FontFormat = {
  EOT  : "eot",
  TTF  : "ttf",
  WOFF : "woff",
  WOFF2: "woff2",
} as const;
export type FontFormat = EnumOf<typeof FontFormat>;

export type FontWeightConfig = string | Partial<Record<FontFormat, string>>;

export const FontWeight = {
  BLACK             : "black",
  BLACK_ITALIC      : "blackItalic",
  BOLD              : "bold",
  BOLD_ITALIC       : "boldItalic",
  EXTRA_BOLD        : "extraBold",
  EXTRA_BOLD_ITALIC : "extraBoldItalic",
  EXTRA_LIGHT       : "extraLight",
  EXTRA_LIGHT_ITALIC: "extraLightItalic",
  LIGHT             : "light",
  LIGHT_ITALIC      : "lightItalic",
  MEDIUM            : "medium",
  MEDIUM_ITALIC     : "mediumItalic",
  REGULAR           : "regular",
  REGULAR_ITALIC    : "regularItalic",
  SEMI_BOLD         : "semiBold",
  SEMI_BOLD_ITALIC  : "semiBoldItalic",
  THIN              : "thin",
  THIN_ITALIC       : "thinItalic",
} as const;
export type FontWeight = EnumOf<typeof FontWeight>;

export type FontFaceConfig = Partial<Record<FontWeight, FontWeightConfig>>;

export type FontFace = {
  (): string;
  name: string;
  weight: (weight: string) => string;
  options: FontFaceOptions;
  config: FontFaceConfig;
  loadAll: () => Promise<void>;
} & Record<FontWeight, () => string>;

export const FONT_FORMAT_NAMES: Record<FontFormat, string> = {
  "ttf"  : "truetype",
  "eot"  : "embedded-opentype",
  "woff" : "woff",
  "woff2": "woff2",
};

export const FONT_WEIGHT_VALUE_TO_NAME: Record<number, FontWeight> = {
  [100]: "thin",
  [200]: "extraLight",
  [300]: "light",
  [400]: "regular",
  [500]: "medium",
  [600]: "semiBold",
  [700]: "bold",
  [800]: "extraBold",
  [900]: "black",
} as const;

export const FONT_WEIGHT_NAME_TO_VALUE: Record<FontWeight, number> = {
  "thin"            : 100,
  "thinItalic"      : 100,
  "extraLight"      : 200,
  "extraLightItalic": 200,
  "light"           : 300,
  "lightItalic"     : 300,
  "regular"         : 400,
  "regularItalic"   : 400,
  "medium"          : 500,
  "mediumItalic"    : 500,
  "semiBold"        : 600,
  "semiBoldItalic"  : 600,
  "bold"            : 700,
  "boldItalic"      : 700,
  "extraBold"       : 800,
  "extraBoldItalic" : 800,
  "black"           : 900,
  "blackItalic"     : 900,
} as const;

export type FontLoadResult = Promise<void>;
