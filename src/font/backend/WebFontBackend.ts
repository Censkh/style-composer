import FontBackend      from "./FontBackend";
import {
  FONT_FORMAT_NAMES,
  FONT_WEIGHT_NAME_TO_VALUE,
  FONT_WEIGHT_VALUE_TO_NAME,
  FontFace,
  FontFormat,
  FontLoadListenerCallback,
  FontLoadResult,
  FontWeight,
  FontWeightConfig,
}                       from "../Fonts";
import StyleEnvironment from "../../StyleEnvironment";
import {isSsr}          from "../../Utils";

interface FontAsset {
  format: FontFormat;
  location: string;
}

const getAsset = (obj: any): string | null => {
  if (typeof obj === "string") {
    return obj;
  }
  if (obj && typeof obj === "object" && typeof obj.default === "string") {
    return obj.default;
  }
  return null;
};

const resourceToAssets = (resource: FontWeightConfig): FontAsset[] => {
  const assets: FontAsset[] = [];
  const baseAsset           = getAsset(resource);
  if (baseAsset) {
    const fileParts = baseAsset.split(".");
    const fileType  = fileParts[fileParts.length - 1] as FontFormat;
    assets.push({format: fileType, location: baseAsset});
  } else {
    for (const key of Object.values(FontFormat)) {
      const value = getAsset((resource as any)[key]);
      if (value) {
        assets.push({format: key, location: value});
      }
    }
  }
  return assets;
};

export default class WebFontBackend implements FontBackend {

  fontPromises: Record<string, Promise<void>>                   = {};
  fontLoadListeners: Record<string, FontLoadListenerCallback[]> = {};
  loadingMap: Record<string, "loading" | "loaded">              = {};
  initedFontListener                                            = false;

  addFontLoadListener(name: string, callback: FontLoadListenerCallback): void {
    const listeners = this.fontLoadListeners[name] || (this.fontLoadListeners[name] = []);
    if (!this.initedFontListener) {
      this.initedFontListener               = true;
      (document as any).fonts.onloadingdone = (fontFaceSetEvent: any) => {
        for (const font of fontFaceSetEvent.fontfaces) {
          const fontName  = `${font.family}__${FONT_WEIGHT_VALUE_TO_NAME[font.weight]}`;
          const listeners = this.fontLoadListeners[fontName];
          if (listeners) {
            for (const listener of listeners) {
              listener();
            }
          }
        }
      };
    }
    listeners.push(callback);
  }

  removeFontLoadListener(name: string, callback: FontLoadListenerCallback): void {
    const listeners = this.fontLoadListeners[name];
    const indexOf   = listeners?.indexOf(callback);
    if (typeof indexOf === "number" && indexOf !== -1) {
      listeners?.splice(indexOf, 1);
    }
  }

  isFontLoaded(name: string): boolean {
    return this.loadingMap[name] === "loaded";
  }

  isFontLoading(name: string): boolean {
    return Boolean(this.loadingMap[name]);
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
      const resource = config[weight] as FontWeightConfig;
      if (resource) {
        const assets = resourceToAssets(resource);

        const css = `@font-face{font-family: '${name}';font-style: ${weight.includes("Italic") ? "italic" : "normal"};font-display: swap;font-weight:${FONT_WEIGHT_NAME_TO_VALUE[weight]};src: local('${name}'),${assets.map(asset => `url('${asset.location}') format('${FONT_FORMAT_NAMES[asset.format]}')`).join(",")};}`;
        StyleEnvironment.updateHeadElement(`font-family-style(${fontName})`, "style", {
          "data-font-family": name,
          "data-font-weight": weight,
        }, css);
        let callback: FontLoadListenerCallback;
        this.fontPromises[fontName] = promise = isSsr() ? Promise.resolve() : new Promise<void>((resolve, reject) => {
          const timeoutId = setTimeout(() => reject(new Error(`[style-composer] Font load for '${fontName}' timed out`)), 10 * 1000);
          this.addFontLoadListener(fontName, callback = () => {
            this.removeFontLoadListener(fontName, callback);
            clearTimeout(timeoutId);
            resolve();
            this.loadingMap[fontName] = "loaded";
          });
        }).then((data) => data, (error) => console.error(error.message));
        this.loadingMap[fontName]   = "loading";
      } else {
        // TODO: handle this case properly
        promise = Promise.resolve();
      }
      return promise;
    }
  }


}
