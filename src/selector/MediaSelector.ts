import {createStyleSelectorType} from "./StyleSelector";
import StyleEnvironment          from "../StyleEnvironment";

export interface MediaQuery {
  maxWidth?: number,
  minWidth?: number,

  maxHeight?: number,
  minHeight?: number,
}

const media = createStyleSelectorType<MediaQuery>("media", {
  check(instance) {
    const {options}    = instance;
    const screenWidth  = Math.round(StyleEnvironment.getScreenWidth());
    const screenHeight = Math.round(StyleEnvironment.getScreenHeight());

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
    StyleEnvironment.addScreenSizeChangeListener(update);
  },
});

export default media;
