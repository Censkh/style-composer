import * as Utils   from "../Utils";
import {StyleClass} from "./StyleClass";

const ClassManager = new (class {

  classes: Record<string, StyleClass> = {};

  constructor() {
    if (!Utils.isNative()) {
      Utils.getGlobal().__classManager = this;
    }
  }


  registerClass(styleClass: StyleClass) {
    this.classes[styleClass.__meta.className] = styleClass;
  }

});

export default ClassManager;