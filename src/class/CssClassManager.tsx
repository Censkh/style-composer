import BaseClassManager         from "./BaseClassManager";
import {StyleClass}             from "./StyleClass";
import {Styling}                from "../Styling";
import {extractStyleClassToCss} from "../CssStyleConverter";
import * as Utils               from "../Utils";

export default class CssClassManager extends BaseClassManager {

  constructor() {
    super();
    Utils.setStyleSheet("global", `
    .styled {color:inherit;font-size:inherit;font-family:inherit!important}
    body {font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;font-size:14px;}
    `);
  }

  registerClass(styleClass: StyleClass, resolvedStyling: Styling) {
    super.registerClass(styleClass, resolvedStyling);
    extractStyleClassToCss(styleClass, resolvedStyling);
  }

}