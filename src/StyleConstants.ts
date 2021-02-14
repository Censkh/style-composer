import {StyleObject} from "./Styling";

export const CASCADING_STYLES: Array<keyof StyleObject> = [
  "fontSize",
  "fontFamily",
  "fontWeight",
  "color",
  "letterSpacing",
  "textAlign",
  "lineHeight",
  "textDecorationColor",
  "textDecorationLine",
  "textDecorationStyle",
  "textTransform",
];

export const DYNAMIC_UNIT_REGISTER_CHECK_VALUE = -Infinity;

export const SUPPORTED_WEB_STYLES = ["cursor", "pointerEvents", "userSelect", "transformOrigin"];
