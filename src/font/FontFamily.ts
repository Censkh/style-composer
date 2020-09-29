import {FONT_TYPES, FONT_WEIGHTS, FontFamily, FontFamilyConfig, FontFamilyOptions, FontVariant} from "./Fonts";
import {StyleEnvironment}                                                                       from "../index";
import {isWeb}                                                                                  from "../Utils";

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
  options?: FontFamilyOptions,
): FontFamily => {
  const fontFamily: any = Object.assign(() => fontFamily.regular(), {
    weight: (weight: string) => {
      if (weight.endsWith("00")) {
        return fontFamily[FONT_WEIGHTS[parseInt(weight)]]();
      }
      return fontFamily[weight]();
    },

    options: options || {},
  });
  Object.defineProperty(fontFamily, "name", {
    value: name,
  });

  for (const type of FONT_TYPES) {
    const fontName   = `${name}__${type}`;
    const styleValue = isWeb() ? [fontName, ...options?.fallbacks || []].join(",") : fontName;

    fontFamily[type] = () => {
      if (!isFontLoading(fontName)) {
        const resource = config[type] as string;
        if (resource) {
          const fileType = resource.split(".")[1];
          const css      = `@font-face{font-family: '${fontName}';font-display: swap;src: url(${resource})}`;
          StyleEnvironment.updateHeadElement(`font-family-style(${fontName})`, "style", {"data-font-family": fontName}, css);
          StyleEnvironment.updateHeadElement(`font-family-preload(${fontName})`, "link", {
            "rel"        : "preload",
            "href"       : resource,
            "as"         : "font",
            "type"       : `font/${fileType}`,
            "crossorigin": "anonymous",
          });
          loadingMap[fontName] = true;
        }
      }

      return styleValue;
    };
  }

  fontFamilyMap[name] = fontFamily;
  return fontFamily;
};
