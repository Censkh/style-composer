import {composeClass} from "style-composer";
import raleway        from "../../../assets/fonts/raleway";
import {THEMING}      from "../../ThemeConsts";

export const $Container = composeClass("Container", () => ({
  flex           : 1,
  backgroundColor: THEMING.backgroundColor(),
  color          : THEMING.textColor(),
  alignItems     : "center",
  justifyContent : "center",
  fontFamily     : raleway(),
  fontWeight     : 400,
}));