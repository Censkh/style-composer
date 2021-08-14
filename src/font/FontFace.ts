import {
  FontFace,
  FontFaceConfig,
  FontFaceOptions,
  FontFaceWeightInfo,
  FontLoadListenerCallback,
  FontLoadResult,
  FontWeight,
  FontWeightName,
  normaliseWeight,
}                       from "./Fonts";
import {isNative}       from "../Utils";
import {getFontBackend} from "./backend/FontBackend";

export const fontFamilyMap: Record<string, FontFace> = {};

export const addFontLoadListener = (name: string, callback: FontLoadListenerCallback): void => {
  return getFontBackend().addFontLoadListener(name, callback);
};

export const removeFontLoadListener = (name: string, callback: FontLoadListenerCallback): void => {
  return getFontBackend().removeFontLoadListener(name, callback);
};

export const isFontLoading = (name: string): boolean => {
  return getFontBackend().isFontLoading(name);
};

export const isFontLoaded = (name: string): boolean => {
  return getFontBackend().isFontLoaded(name);
};

export const isStyleComposerFont = (name: string): boolean => {
  return Boolean(getFontFace(name));
};

export const getFontFace = (name: string): FontFace | undefined => {
  const [fontFamily] = name.split(/__|,/g);
  return fontFamilyMap[fontFamily];
};

export const loadFont = async (fontFace: FontFace, weight?: FontWeightName): Promise<void> => {
  const resolvedWeight = normaliseWeight(weight || "regular");
  const weightInfo     = fontFace.getWeightInfo(resolvedWeight);
  weightInfo.loading   = true;
  const result         = await getFontBackend().loadFont(fontFace, resolvedWeight);
  weightInfo.loaded    = true;
  return result;
};

export const createFontFace = (
  name: string,
  config: FontFaceConfig,
  options?: FontFaceOptions,
): FontFace => {
  const weightInfo = Object.values(FontWeightName).reduce((weightInfo, weight) => {
    return Object.assign(weightInfo, {
      [weight]: {
        loading   : false,
        loaded    : false,
        weight    : weight,
        styleValue: undefined as any,
      },
    });
  }, {} as Record<FontWeightName, FontFaceWeightInfo>);

  const fontFace = Object.assign(() => {
    return fontFace.getWeightInfo(FontWeightName.REGULAR).styleValue;
  }, {

    getWeightInfo: (weight: FontWeight) => {
      const result = weightInfo[normaliseWeight(weight)];
      if (!result.styleValue) {
        result.styleValue = isNative() ? `${name}__${result.weight}` : [name, ...fontFace.options?.fallbacks || []].join(",");
      }
      return result;
    },

    loadAll: async (): Promise<void> => {
      const promises: FontLoadResult[] = [];
      for (const type of Object.values(FontWeightName)) {
        promises.push(loadFont(fontFace, type));
      }
      await Promise.all(promises);
    },

    options: options || {},

    config: config,
  });
  Object.defineProperty(fontFace, "name", {value: name});

  fontFamilyMap[name] = fontFace;
  return fontFace;
};
