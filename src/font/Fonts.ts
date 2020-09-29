export interface FontFamilyOptions {
  fallbacks: string[],
}

export interface FontFamilyConfig {
  black?: string;
  blackItalic?: string;
  bold?: string;
  boldItalic?: string;
  extraBold?: string;
  extraBoldItalic?: string;
  extraLight?: string;
  extraLightItalic?: string;
  light?: string;
  lightItalic?: string;
  medium?: string;
  mediumItalic?: string;
  regular?: string;
  regularItalic?: string;
  semiBold?: string;
  semiBoldItalic?: string;
  thin?: string;
  thinItalic?: string;
}

export type FontFamily = {
  (): string;
  name: string;
  weight: (weight: string) => string;
  options: FontFamilyOptions;
} & Record<keyof FontFamilyConfig, () => string>;

export const FONT_WEIGHTS: Record<number, keyof FontFamilyConfig> = {
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
