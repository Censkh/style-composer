import FontBackend                                                      from "./FontBackend";
import {FontFace, FontLoadListenerCallback, FontLoadResult, FontWeight} from "../Fonts";

export default class ExpoFontBackend implements FontBackend {

  fontPromises: Record<string, Promise<void>>    = {};
  fontListeners: Record<string, Set<() => void>> = {};

  getFontCallbackList(name: string): Set<() => void> {
    return this.fontListeners[name] || (this.fontListeners[name] = new Set());
  }

  constructor(private expoFonts: any) {
  }

  addFontLoadListener(name: string, callback: FontLoadListenerCallback): void {
    this.getFontCallbackList(name).add(callback);
  }

  isFontLoaded(name: string): boolean {
    return this.expoFonts.isLoaded(name);
  }

  isFontLoading(name: string): boolean {
    return this.expoFonts.isLoading(name);
  }

  removeFontLoadListener(name: string, callback: FontLoadListenerCallback): void {
    this.getFontCallbackList(name).delete(callback);
  }

  loadFont(fontFace: FontFace, weight: FontWeight): FontLoadResult {
    const {name, config} = fontFace;

    const fontName = `${name}__${weight}`;

    if (this.isFontLoaded(fontName)) {
      return Promise.resolve();
    } else if (this.isFontLoading(fontName)) {
      return this.fontPromises[fontName];
    } else {
      let promise: Promise<void>;
      const resource = config[weight];
      const location = typeof resource === "object" ? (resource as any)[Object.keys(resource as any)[0]] : resource;

      if (location) {
        this.fontPromises[fontName] = promise = this.expoFonts.loadAsync({
          [fontName]: location,
        }).then(() => {
          this.getFontCallbackList(fontName).forEach(callback => callback());
        });
      } else {
        // TODO: handle this case properly
        promise = Promise.resolve();
      }
      return promise;
    }
  }

}
