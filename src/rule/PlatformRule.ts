import {createStyleRuleType}      from "./StyleRule";
import {Platform, PlatformOSType} from "react-native";

export type PlatformQuery = PlatformOSType[] | PlatformOSType;

const platform = createStyleRuleType<PlatformQuery>("platform", {
  check(instance) {
    const {options} = instance;
    return Array.isArray(options) ? options.includes(Platform.OS) : options === Platform.OS;
  },

  register() {
  },
});

export default platform;
