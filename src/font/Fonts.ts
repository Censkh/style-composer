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

export const FontWeightName = {
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
export type FontWeightName = EnumOf<typeof FontWeightName>;

export const FontWeightValue = {
  100: "100",
  200: "200",
  300: "300",
  400: "400",
  500: "500",
  600: "600",
  700: "700",
  800: "800",
  900: "900",
} as const;
export type FontWeightValue = EnumOf<typeof FontWeightValue>;

export const FONT_WEIGHT_VALUE_TO_NAME: Record<FontWeightValue, FontWeightName> = {
  100: "thin",
  200: "extraLight",
  300: "light",
  400: "regular",
  500: "medium",
  600: "semiBold",
  700: "bold",
  800: "extraBold",
  900: "black",
} as const;

export const FONT_WEIGHT_NAME_TO_VALUE: Record<FontWeightName, FontWeightValue> = {
  "thin"            : "100",
  "thinItalic"      : "100",
  "extraLight"      : "200",
  "extraLightItalic": "200",
  "light"           : "300",
  "lightItalic"     : "300",
  "regular"         : "400",
  "regularItalic"   : "400",
  "medium"          : "500",
  "mediumItalic"    : "500",
  "semiBold"        : "600",
  "semiBoldItalic"  : "600",
  "bold"            : "700",
  "boldItalic"      : "700",
  "extraBold"       : "800",
  "extraBoldItalic" : "800",
  "black"           : "900",
  "blackItalic"     : "900",
} as const;

export type FontWeight = FontWeightName | FontWeightValue | "normal";

export type FontFaceConfig = Partial<Record<FontWeightName, FontWeightConfig>>;

export interface FontFaceWeightInfo {
  weight: FontWeightName;
  loaded: boolean;
  loading: boolean;
  styleValue: string;
}

export type FontFace = {
  (): string;
  name: string;
  options: FontFaceOptions;
  config: FontFaceConfig;
  loadAll: () => Promise<void>;
  getWeightInfo: (weight: FontWeight) => FontFaceWeightInfo;
};

export const FONT_FORMAT_NAMES: Record<FontFormat, string> = {
  "ttf"  : "truetype",
  "eot"  : "embedded-opentype",
  "woff" : "woff",
  "woff2": "woff2",
};

export type FontLoadResult = Promise<void>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const normaliseWeight = (weight: any): FontWeightName => {
  if (weight === "normal") {
    return FontWeightName.REGULAR;
  }
  return (FONT_WEIGHT_VALUE_TO_NAME as any)[weight] ?? weight;
};
