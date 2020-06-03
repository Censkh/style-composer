import * as Utils   from "../Utils";
import {StyleClass} from "./StyleClass";

const ClassManager = new (class {

  classes: Record<string, StyleClass> = {};

  constructor() {
    if (!Utils.isNative()) {
      Utils.setStyleSheet("global", `
    .styled {color:inherit;font-size:inherit;font-family:inherit!important}
    body {font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;font-size:14px;}
    `);
      Utils.getGlobal().__classManager = this;
    }
  }


  registerClass(styleClass: StyleClass) {
    this.classes[styleClass.__meta.className] = styleClass;
  }

});

export default ClassManager;