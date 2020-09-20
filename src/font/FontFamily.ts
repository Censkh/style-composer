import {FONT_TYPES, FONT_WEIGHTS, FontFamily, FontFamilyConfig, FontVariant} from "./Fonts";

export const fontFamilyMap: Record<string, FontFamily>   = {};
export const fontVariantMap: Record<string, FontVariant> = {};

const styleMap: Record<string, HTMLStyleElement> = {};

export const addFontLoadListener = (name: string, callback: () => void): void => {
};

export const removeFontLoadListener = (name: string, callback: () => void): void => {
};

export const isFontLoading = (name: string): boolean => {
  return Boolean(styleMap[name]);
};

export const isFontLoaded = (name: string): boolean => {
  return Boolean(styleMap[name]);
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
          const styleElement     = styleMap[fontName] = (document).createElement("style");
          styleElement.innerText = `@font-face{font-family: '${fontName}';font-display: swap;src: url(${resource})}`;
          styleElement.setAttribute("data-font-family", fontName);
          document.head.appendChild(styleElement);
        }
      }
      return fontName;
    };
  }

  fontFamilyMap[name] = fontFamily;
  return fontFamily;
};
