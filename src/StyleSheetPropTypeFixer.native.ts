// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import StyleSheetValidation from "react-native/Libraries/StyleSheet/StyleSheetValidation";

import propTypes from "prop-types";

export const fixStylePropTypes = (): void => {
  StyleSheetValidation.addValidStylePropTypes({
    "cursor"         : propTypes.string,
    "pointerEvents"  : propTypes.string,
    "userSelect"     : propTypes.string,
    "transformOrigin": propTypes.string,
  });
};
