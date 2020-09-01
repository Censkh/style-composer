import {createStyleRule}          from "./StyleRule";
import {Platform, PlatformOSType} from "react-native";

export type PlatformQuery = PlatformOSType[] | PlatformOSType;

const platform = createStyleRule<PlatformQuery>("platform", {
  check(query: PlatformQuery) {
    return Array.isArray(query) ? query.includes(Platform.OS) : query === Platform.OS;
  },

  register() {
  },
});

export default platform;
