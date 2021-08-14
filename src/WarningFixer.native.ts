// @ts-ignore
import StyleSheetValidation       from "react-native/Libraries/StyleSheet/StyleSheetValidation";
// @ts-ignore
import ReactNativeStyleAttributes from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

import propTypes              from "prop-types";
import {SUPPORTED_WEB_STYLES} from "./StyleConstants";
import {isStyleComposerFont}  from "./font/FontFace";

export const fixWarnings = (): void => {
  StyleSheetValidation.addValidStylePropTypes(SUPPORTED_WEB_STYLES.reduce((props, key) => {
    props[key] = propTypes.string;
    return props;
  }, {} as any));

  if (ReactNativeStyleAttributes.fontFamily?.process) {
    const original                                = ReactNativeStyleAttributes.fontFamily.process;
    ReactNativeStyleAttributes.fontFamily.process = (fontFamily: string | undefined) => {
      if (fontFamily && isStyleComposerFont(fontFamily)) {
        const originalError = console.error;
        console.error       = (...args: any[]) => {
          if (args[0]?.indexOf("Font.loadAsync") > -1) {
            return;
          }
          originalError(...args);
        };
        const result        = original(fontFamily);
        console.error       = originalError;
        return result;
      }
      return original(fontFamily);
    };
  }
};
