import {Dimensions}          from "react-native";
import {createStyleRuleType} from "./StyleRule";

export interface MediaQuery {
  maxWidth?: number,
  minWidth?: number,

  maxHeight?: number,
  minHeight?: number,
}

const media = createStyleRuleType<MediaQuery>("media", {
  check(options: MediaQuery) {
    const screenWidth  = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);

    if (typeof options.maxWidth === "number" && screenWidth > options.maxWidth) {
      return false;
    }

    if (typeof options.minWidth === "number" && screenWidth < options.minWidth) {
      return false;
    }

    if (typeof options.maxHeight === "number" && screenHeight > options.maxHeight) {
      return false;
    }

    if (typeof options.minHeight === "number" && screenHeight < options.minHeight) {
      return false;
    }

    return true;
  },

  register(update) {
    Dimensions.addEventListener("change", update);
  },
});

export default media;
