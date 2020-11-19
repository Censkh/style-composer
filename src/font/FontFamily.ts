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

export interface FontAsset {
 type: string; location: string
}

const getAsset = (obj: any) :string | null => {
  if (typeof obj === "string") {
    return obj;
  }
  if (obj && typeof obj === "object" && typeof obj.default === "string") {
    return obj.default;
  }
  return obj;
}

const resourceToAssets = (resource: any): FontAsset[] => {
  const assets: FontAsset[] = [];
  const baseAsset = getAsset(resource);
  if (baseAsset) {
    const fileType = baseAsset.split(".")[1];
    assets.push({type: fileType, location: baseAsset});
  } else {
    for (const key of ["woff2", "woff", "ttf", "eot"]) {
      const value = getAsset((resource as any)[key]);
      if (value) {
        assets.push({type: key, location: value});
      }
    }
  }
  return assets;
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
          const assets = resourceToAssets(resource);


          const css = `@font-face{font-family: '${name}';font-style: ${type.includes("Italic") ? "italic" : "normal"};font-display: swap;font-weight:${FONT_WEIGHT_NAME_TO_VALUE[type]};src: local('${name}'),${assets.map(asset => `url('${asset.location}') format('${FONT_FORMAT_NAMES[asset.type]}')`).join(",")};}`;
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
