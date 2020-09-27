import {Dimensions, ScaledSize}   from "react-native";
import {isNative, isSsr, PropsOf} from "./Utils";
import React                      from "react";

export type DeviceType = "mobile" | "desktop";

const SSR_DIMENSIONS: Record<DeviceType, ScaledSize> = {
  "mobile" : {
    width    : 750,
    height   : 1334,
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

const HEAD_ELEMENT_DATA_ATTRIBUTE_NAME = "data-sc-element-key";

export type ScreenSizeChangeListener = () => void;

class StyleEnvironment {

  private serverSideHeadElements: Record<string, React.ReactElement | null> = {};
  private deviceType: DeviceType                                  = "desktop";

  setDeviceType(deviceType: DeviceType): void {
    this.deviceType = deviceType;
  }

  getDeviceType(): DeviceType {
    return this.deviceType;
  }

  getScreenSize(): ScaledSize {
    if (isSsr()) {
      return SSR_DIMENSIONS[this.getDeviceType()];
    }
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

    const computedProps = Object.assign({}, props, {[HEAD_ELEMENT_DATA_ATTRIBUTE_NAME]: key});

    if (isSsr()) {
      const element = this.serverSideHeadElements[key];
      if (!element) {
        this.serverSideHeadElements[key] = React.createElement(type, computedProps, content);
      } else {
        this.serverSideHeadElements[key] = React.cloneElement(element, computedProps, content);
      }
    } else {
      let element = document.head.querySelector(`[${HEAD_ELEMENT_DATA_ATTRIBUTE_NAME}*="${key}"]`);
      if (!element) {
        element = document.createElement(type);
        document.head.appendChild(element);
      }

      if (content) {
        (element as any).innerText = content;
      }
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
