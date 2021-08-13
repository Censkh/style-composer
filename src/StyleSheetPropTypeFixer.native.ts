// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import StyleSheetValidation from "react-native/Libraries/StyleSheet/StyleSheetValidation";

import propTypes              from "prop-types";
import {SUPPORTED_WEB_STYLES} from "./StyleConstants";

export const fixStylePropTypes = (): void => {
  StyleSheetValidation.addValidStylePropTypes(SUPPORTED_WEB_STYLES.reduce((props, key) => {
    props[key] = propTypes.string;
    return props;
  }, {} as any));
};
