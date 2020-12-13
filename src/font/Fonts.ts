export interface FontFamilyOptions {
  fallbacks: string[],
}

export type FontWeightConfig = string | {
  eot?: string;
  ttf?: string;
  woff?: string;
  woff2?: string;
};

export interface FontFamilyConfig {
  black?: FontWeightConfig;
  blackItalic?: FontWeightConfig;
  bold?: FontWeightConfig;
  boldItalic?: FontWeightConfig;
  extraBold?: FontWeightConfig;
  extraBoldItalic?: FontWeightConfig;
  extraLight?: FontWeightConfig;
  extraLightItalic?: FontWeightConfig;
  light?: FontWeightConfig;
  lightItalic?: FontWeightConfig;
  medium?: FontWeightConfig;
  mediumItalic?: FontWeightConfig;
  regular?: FontWeightConfig;
  regularItalic?: FontWeightConfig;
  semiBold?: FontWeightConfig;
  semiBoldItalic?: FontWeightConfig;
  thin?: FontWeightConfig;
  thinItalic?: FontWeightConfig;
}

export type FontFamily = {
  (): string;
  name: string;
  weight: (weight: string) => string;
  options: FontFamilyOptions;
} & Record<keyof FontFamilyConfig, () => string>;

export const FONT_FORMAT_NAMES: Record<string, string> = {
  "ttf"  : "truetype",
  "eot"  : "embedded-opentype",
  "woff" : "woff",
  "woff2": "woff2",
};

export const FONT_WEIGHT_VALUE_TO_NAME: Record<number, keyof FontFamilyConfig> = {
  [100]: "thin",
  [200]: "extraLight",
  [300]: "light",
  [400]: "regular",
  [500]: "medium",
  [600]: "semiBold",
  [700]: "bold",
  [800]: "extraBold",
  [900]: "black",
};

export const FONT_WEIGHT_NAME_TO_VALUE: Record<string, number> = {
  "thin"      : 100,
  "extraLight": 200,
  "light"     : 300,
  "regular"   : 400,
  "medium"    : 500,
  "semiBold"  : 600,
  "bold"      : 700,
  "extraBold" : 800,
  "black"     : 900,
};

export const FONT_TYPES: Array<keyof FontFamilyConfig> = [
  "black",
  "blackItalic",
  "bold",
  "boldItalic",
  "extraBold",
  "extraBoldItalic",
  "extraLight",
  "extraLightItalic",
  "light",
  "lightItalic",
  "medium",
  "mediumItalic",
  "regular",
  "regularItalic",
  "semiBold",
  "semiBoldItalic",
  "thin",
  "thinItalic",
];

export interface FontVariant {
  resource: string;
  fontFamily: FontFamily;
  weight: number;
}
