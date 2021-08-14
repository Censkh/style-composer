import type {FontFace, FontLoadListenerCallback, FontLoadResult, FontWeightName} from "../Fonts";
import {Platform}                                                           from "react-native";
import WebFontBackend                                                       from "./WebFontBackend";
import {isNative}                                                           from "../../Utils";

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


export default interface FontBackend {

  addFontLoadListener(name: string, callback: FontLoadListenerCallback): void;

  removeFontLoadListener(name: string, callback: FontLoadListenerCallback): void;

  isFontLoading(name: string): boolean;

  isFontLoaded(name: string): boolean;

  loadFont(fontFace: FontFace, weight: FontWeightName): FontLoadResult;

}
