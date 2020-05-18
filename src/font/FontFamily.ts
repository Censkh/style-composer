import * as Font  from "expo-font";
import * as Utils from "../Utils";

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
  name: string;
  weight: (weight: number) => string;
} & Record<keyof FontFamilyConfig, () => string>;

const weights: Record<number, keyof FontFamilyConfig> = {
  [100]: "thin",
  [300]: "light",
  [400]: "regular",
  [500]: "medium",
  [600]: "semiBold",
  [700]: "bold",
  [800]: "extraBold",
};

const types: Array<keyof FontFamilyConfig> = [
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

export const fontMap: Record<string, FontVariant> = {};

const fontListeners: Record<string, Set<() => void>> = {};

const getFontCallbackList = (name: string): Set<() => void> => {
  return fontListeners[name] || (fontListeners[name] = new Set());
};

export const addFontLoadListener = (name: string, callback: () => void) => {
  if (Font.isLoaded(name)) callback();
  getFontCallbackList(name).add(callback);
};

export const removeFontLoadListener = (name: string, callback: () => void) => {
  getFontCallbackList(name).delete(callback);
};

export const isFontLoading = (name: string) => {
  return Font.isLoading(name);
};

export const isFontLoaded = (name: string) => {
  return Font.isLoaded(name);
};


export const createFontFamily = (
  name: string,
  config: FontFamilyConfig,
): FontFamily => {
  const fontFamily: any = {
    name  : name,
    weight: (weight: number) => fontFamily[weights[weight]](),
  };

  for (let type of types) {
    const fontName = `${name}__${type}`;
    fontFamily[type] = () => {
      if (!isFontLoading(fontName) && !isFontLoaded(fontName)) {
        const resource = config[type] as string;
        fontMap[fontName] = {
          weight    : parseInt(Object.keys(weights).find(weight => weights[weight as any] === type) as string),
          fontFamily: fontFamily,
          resource  : resource,
        };

        Utils.setStyleSheet(`font[${fontName}]`, `.${getFontClassName(fontName)}{font-family: ${fontName}!important;`);

        Font.loadAsync({
          [fontName]: resource,
        }).then(() => {
          getFontCallbackList(fontName).forEach(callback => callback());
        });
      }
      return fontName;
    };
  }

  return fontFamily;
};

export const getFontClassName = (fontName: string): string => {
  return `-font-${fontName}`;
};
