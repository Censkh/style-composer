import {createStyleSelectorType} from "./StyleSelector";
import {I18nManager}             from "react-native";

const rtl = createStyleSelectorType<void>("rtl", {
  check() {
    return I18nManager.isRTL;
  },
});

export default rtl;
