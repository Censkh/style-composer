import {Dimensions, ScaledSize} from "react-native";
import {isSsr}                  from "./Utils";

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

export type ScreenSizeChangeListener = () => void;

class StyleEnvironment {

  private deviceType: DeviceType = "desktop";

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

}

export default new StyleEnvironment();
