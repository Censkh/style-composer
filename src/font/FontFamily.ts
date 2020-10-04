import {
  FONT_FORMAT_NAMES,
  FONT_TYPES,
  FONT_WEIGHT_NAME_TO_VALUE,
  FONT_WEIGHT_VALUE_TO_NAME,
  FontFamily,
  FontFamilyConfig,
  FontFamilyOptions,
  FontVariant,
  FontWeightConfig,
}                         from "./Fonts";
import {StyleEnvironment} from "../index";

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
        return fontFamily[FONT_WEIGHT_VALUE_TO_NAME[parseInt(weight)]]();
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
    const styleValue = [name, ...options?.fallbacks || []].join(",");

    fontFamily[type] = () => {
      if (!isFontLoading(fontName)) {
        const resource = config[type] as FontWeightConfig;
        if (resource) {
          const files: { type: string; location: string }[] = [];
          if (typeof resource === "string") {
            const fileType = resource.split(".")[1];
            files.push({type: fileType, location: resource});
          } else {
            for (const key of ["woff2", "woff", "ttf", "eot"]) {
              const value = (resource as any)[key];
              if (value) {
                files.push({type: key, location: value});
              }
            }
          }

          const css = `@font-face{font-family: '${name}';font-style: ${type.includes("Italic") ? "italic" : "normal"};font-display: swap;font-weight:${FONT_WEIGHT_NAME_TO_VALUE[type]};src: local('${name}'),${files.map(file => `url('${file.location}') format('${FONT_FORMAT_NAMES[file.type]}')`).join(",")};}`;
          StyleEnvironment.updateHeadElement(`font-family-style(${fontName})`, "style", {
            "data-font-family": name,
            "data-font-weight": type,
          }, css);
          loadingMap[fontName] = true;
        }
      }

      return styleValue;
    };
  }

  fontFamilyMap[name] = fontFamily;
  return fontFamily;
};
