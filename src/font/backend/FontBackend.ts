import {FontFace, FontLoadListenerCallback, FontLoadResult, FontWeight} from "../Fonts";

export default interface FontBackend {

  addFontLoadListener(name: string, callback: FontLoadListenerCallback): void;

  removeFontLoadListener(name: string, callback: FontLoadListenerCallback): void;

  isFontLoading(name: string): boolean;

  isFontLoaded(name: string): boolean;

  loadFont(fontFace: FontFace, weight: FontWeight): FontLoadResult;

}
