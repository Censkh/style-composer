import BaseClassManager         from "./BaseClassManager";
import {StyleClass}             from "./StyleClass";
import {Styling}                from "../Styling";
import {extractStyleClassToCss} from "../CssStyleConverter";

export default class CssClassManager extends BaseClassManager {

  registerClass(styleClass: StyleClass, resolvedStyling: Styling) {
    super.registerClass(styleClass, resolvedStyling);
    extractStyleClassToCss(styleClass, resolvedStyling);
  }

}