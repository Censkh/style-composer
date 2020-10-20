import {createStyleSelectorType}  from "./StyleSelector";
import {Platform, PlatformOSType} from "react-native";

export type PlatformQuery = PlatformOSType[] | PlatformOSType;

const platform = createStyleSelectorType<PlatformQuery>("platform", {
  check(instance) {
    const {options} = instance;
    return Array.isArray(options) ? options.includes(Platform.OS) : options === Platform.OS;
  },

  register() {
  },
});

export default platform;
