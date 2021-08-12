import {
  FONT_WEIGHT_VALUE_TO_NAME,
  FontFace,
  FontFaceConfig,
  FontFaceOptions,
  FontLoadListenerCallback,
  FontLoadResult,
  FontWeight,
}                              from "./Fonts";
import WebFontBackend          from "./backend/WebFontBackend";
import FontBackend             from "./backend/FontBackend";
import {Platform}              from "react-native";
import {setupFontPreProcessor} from "./FontPreProcessor";
import {isNative}              from "../Utils";

export const fontFamilyMap: Record<string, FontFace> = {};

let fontBackend: FontBackend | undefined = Platform.OS === "web" ? new WebFontBackend() : undefined;

export const setFontBackend = (backend: FontBackend): void => {
  fontBackend = backend;
};

export const setFontBackendForNative = (getter: () => FontBackend): void => {
  if (isNative()) {
    setFontBackend(getter());
  }
};

export const getFontBackend = (): FontBackend => {
  if (fontBackend === undefined) {
    throw new Error("[style-composer] No font backend provided. If you are using 'expo' you can use the ExpoFontBackend which is constructed with the 'expo-fonts' library (eg. setFontBackendForNative(() => new ExpoFontBackend(Fonts)))");
  }
  return fontBackend;
};

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const normaliseWeight = (weight: any): FontWeight => {
  return FONT_WEIGHT_VALUE_TO_NAME[weight] ?? weight;
};

export const loadFont = (fontFace: FontFace, weight?: FontWeight): FontLoadResult => {
  setupFontPreProcessor();
  return getFontBackend().loadFont(fontFace, normaliseWeight(weight || "regular"));
};

export const createFontFace = (
  name: string,
  config: FontFaceConfig,
  options?: FontFaceOptions,
): FontFace => {
  const fontFace: any = Object.assign(() => fontFace.regular(), {
    weight: (weight: string) => {
      if (weight.endsWith("00")) {
        return fontFace[FONT_WEIGHT_VALUE_TO_NAME[parseInt(weight)]]();
      }
      return fontFace[weight]();
    },

    loadAll: async () => {
      const promises: FontLoadResult[] = [];
      for (const type of Object.values(FontWeight)) {
        promises.push(loadFont(fontFace, type));
      }
      return Promise.all(promises);
    },

    options: options || {},

    config: config,
  });
  Object.defineProperty(fontFace, "name", {
    value: name,
  });

  for (const weight of Object.values(FontWeight)) {
    const styleValue = isNative() ? `${name}__${weight}` : [name, ...fontFace.options?.fallbacks || []].join(",");
    fontFace[weight] = () => {
      return styleValue;
    };
  }

  fontFamilyMap[name] = fontFace;
  return fontFace;
};
