import {FONT_TYPES, FONT_WEIGHTS, FontFamily, FontFamilyConfig, FontVariant} from "./Fonts";
import {StyleEnvironment}                                                    from "../index";

export const fontFamilyMap: Record<string, FontFamily>   = {};
export const fontVariantMap: Record<string, FontVariant> = {};

const loadingMap: Record<string, boolean> = {};

export const addFontLoadListener = (name: string, callback: () => void): void => {
};

export const removeFontLoadListener = (name: string, callback: () => void): void => {
};

export const isFontLoading = (name: string): boolean => {
  return Boolean(loadingMap[name]);
};

export const isFontLoaded = (name: string): boolean => {
  return Boolean(loadingMap[name]);
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
        return fontFamily[FONT_WEIGHTS[parseInt(weight)]]();
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
      if (!isFontLoading(fontName)) {
        const resource = config[type] as string;
        if (resource) {
          const css = `@font-face{font-family: '${fontName}';font-display: swap;src: url(${resource})}`;
          StyleEnvironment.updateHeadElement(`font-family(${fontName})`, "style", css, {"data-font-family": fontName});
          loadingMap[fontName] = true;
        }
      }
      return fontName;
    };
  }

  fontFamilyMap[name] = fontFamily;
  return fontFamily;
};
