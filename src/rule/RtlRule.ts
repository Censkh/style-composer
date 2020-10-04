import {createStyleRuleType} from "./StyleRule";
import {I18nManager}         from "react-native";

const rtl = createStyleRuleType<void>("rtl", {
  check() {
    return I18nManager.isRTL;
  },
});

export default rtl;
