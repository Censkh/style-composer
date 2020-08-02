import {createStyleRule} from "./StyleRule";
import {I18nManager}     from "react-native";

const rtl = createStyleRule<void>("rtl", {
  check(options, session) {
    return I18nManager.isRTL;
  },
});

export default rtl;
