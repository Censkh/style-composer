import {Dimensions, ScaledSize} from "react-native";
import {isNative, isSsr}        from "./Utils";
import React                    from "react";

export type DeviceType = "mobile" | "desktop";

const SSR_DIMENSIONS: Record<DeviceType, ScaledSize> = {
  "mobile" : {
    width    : 600,
    height   : 1200,
    scale    : 1,
    fontScale: 1,
  },
  "desktop": {
    width    : 1920,
    height   : 1080,
    scale    : 1,
    fontScale: 1,
  },
};

const CSS_MINIFY_REGEX_FIRST    = /\s*([,>+;:}{]{1})\s*/gm;
const CSS_MINIFY_REGEX_BRACKETS = /;}/gm;

const minifyCss = (css: string): string => {
  return css.replace(CSS_MINIFY_REGEX_FIRST, "$1").replace(CSS_MINIFY_REGEX_BRACKETS, "}").trim();
};

const HEAD_ELEMENT_DATA_ATTRIBUTE_NAME = "data-sc-element-key";

export type ScreenSizeChangeListener = () => void;

class StyleEnvironment {

  private serverSideHeadElements: Record<string, React.ReactElement | null> = {};
  private deviceType: DeviceType                                            = "desktop";

  constructor() {
  }

  setDeviceType(deviceType: DeviceType): void {
    this.deviceType = deviceType;
    if (isSsr()) {
      Dimensions.set({
        "window": SSR_DIMENSIONS[deviceType],
        "screen": SSR_DIMENSIONS[deviceType],
      });
    }
  }

  getDeviceType(): DeviceType {
    return this.deviceType;
  }

  getScreenSize(): ScaledSize {
    return Dimensions.get("window");
  }

  getScreenWidth(): number {
    return this.getScreenSize().width;
  }

  getScreenHeight(): number {
    return this.getScreenSize().height;
  }

  addScreenSizeChangeListener(listener: ScreenSizeChangeListener): void {
    Dimensions.addEventListener("change", listener);
  }

  removeScreenSizeChangeListener(listener: ScreenSizeChangeListener): void {
    Dimensions.removeEventListener("change", listener);
  }

  updateHeadElement<T extends keyof JSX.IntrinsicElements>(key: string, type: T, props: any, content?: string): void {
    if (isNative()) return undefined;

    const computedProps = Object.assign({}, props, {
      [HEAD_ELEMENT_DATA_ATTRIBUTE_NAME]: key, key,
    });

    const parsedContent = content ? minifyCss(content) : "";

    if (isSsr()) {
      const element = this.serverSideHeadElements[key];
      if (!element) {
        this.serverSideHeadElements[key] = React.createElement(type, computedProps, parsedContent);
      } else {
        this.serverSideHeadElements[key] = React.cloneElement(element, computedProps, parsedContent);
      }
    } else {
      let element = document.head.querySelector(`[${HEAD_ELEMENT_DATA_ATTRIBUTE_NAME}*="${key}"]`);
      if (!element) {
        element = document.createElement(type);
        element.setAttribute(HEAD_ELEMENT_DATA_ATTRIBUTE_NAME, key);
        document.head.appendChild(element);
      }

      (element as any).textContent = parsedContent;
      for (const propName in props) {
        element.setAttribute(propName, (props as any)[propName]);
      }
    }
  }

  getServerSideHeadElements(): React.ReactElement {
    return React.createElement(React.Fragment, {}, Object.values(this.serverSideHeadElements));
  }

}

export default new StyleEnvironment();
