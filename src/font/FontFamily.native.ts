import * as Font                                                                          from "expo-font";
import {FONT_TYPES, FONT_WEIGHT_VALUE_TO_NAME, FontFamily, FontFamilyConfig, FontVariant} from "./Fonts";

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
        return fontFamily[FONT_WEIGHT_VALUE_TO_NAME[parseInt(weight)]]();
      }
      return fontFamily[weight]();
    },
  });
  Object.defineProperty(fontFamily, "name", {
    value: name,
  });

  for (const type of FONT_TYPES) {
    const fontName   = `${name}__${type}`;
    fontFamily[type] = () => {
      if (!isFontLoading(fontName) && !isFontLoaded(fontName)) {
        const resource = config[type];
        const location = typeof resource === "string" ? resource : (resource as any)[Object.keys(resource as any)[0] ];
        if (location) {
          fontVariantMap[fontName] = {
            weight    : parseInt(Object.keys(FONT_WEIGHT_VALUE_TO_NAME).find(weight => FONT_WEIGHT_VALUE_TO_NAME[weight as any] === type) as string),
            fontFamily: fontFamily,
            resource  : location,
          };

          Font.loadAsync({
            [fontName]: location,
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
