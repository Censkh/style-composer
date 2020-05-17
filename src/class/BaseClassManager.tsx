import {ClassManager} from "./ClassManager";
import {StyleClass}   from "./StyleClass";
import {Styling}      from "../Styling";

export default class BaseClassManager implements ClassManager {

  classes: Record<string, StyleClass> = {};

  registerClass(styleClass: StyleClass, resolEvedStyling: Styling) {
    this.classes[styleClass.__meta.className] = styleClass;
  }

}