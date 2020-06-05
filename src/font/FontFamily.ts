import * as Font from "expo-font";

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
} & Record<keyof FontFamilyConfig, () => string>;

const weights: Record<number, keyof FontFamilyConfig> = {
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

export const fontFamilyMap: Record<string, FontFamily>   = {};
export const fontVariantMap: Record<string, FontVariant> = {};

const fontListeners: Record<string, Set<() => void>> = {};

const getFontCallbackList = (name: string): Set<() => void> => {
  return fontListeners[name] || (fontListeners[name] = new Set());
};

export const addFontLoadListener = (name: string, callback: () => void): void => {
  if (Font.isLoaded(name)) callback();
  getFontCallbackList(name).add(callback);
};

export const removeFontLoadListener = (name: string, callback: () => void): void => {
  getFontCallbackList(name).delete(callback);
};

export const isFontLoading = (name: string): boolean => {
  return Font.isLoading(name);
};

export const isFontLoaded = (name: string): boolean => {
  return Font.isLoaded(name);
};

export const isStyleComposerFont = (name: string): boolean => {
  return Boolean(fontVariantMap[name]);
};

export const getFontFamily = (name: string): FontFamily | undefined => {
  return fontFamilyMap[name];
};

export const createFontFamily = (
  name: string,
  config: FontFamilyConfig,
): FontFamily => {
  const fontFamily: any = Object.assign(() => fontFamily.regular(), {
    weight: (weight: string) => {
      if (weight.endsWith("00")) {
        return fontFamily[weights[parseInt(weight)]]();
      }
      return fontFamily[weight]();
    },
  });
  Object.defineProperty(fontFamily, "name", {
    value: name,
  });

  for (const type of types) {
    const fontName   = `${name}__${type}`;
    fontFamily[type] = () => {
      if (!isFontLoading(fontName) && !isFontLoaded(fontName)) {
        const resource = config[type] as string;
        if (resource) {
          fontVariantMap[fontName] = {
            weight    : parseInt(Object.keys(weights).find(weight => weights[weight as any] === type) as string),
            fontFamily: fontFamily,
            resource  : resource,
          };

          Font.loadAsync({
            [fontName]: resource,
          }).then(() => {
            getFontCallbackList(fontName).forEach(callback => callback());
          });
        }
      }
      return fontName;
    };
  }

  fontFamilyMap[name] = fontFamily;
  return fontFamily;
};
