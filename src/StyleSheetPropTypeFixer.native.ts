// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import StyleSheetValidation from "react-native/Libraries/StyleSheet/StyleSheetValidation";

import propTypes from "prop-types";

StyleSheetValidation.addValidStylePropTypes({
  "cursor": propTypes.string,
  "userSelect": propTypes.string,
  "transformOrigin": propTypes.string,
});
