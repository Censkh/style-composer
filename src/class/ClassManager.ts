import * as Utils   from "../Utils";
import {StyleClass} from "./StyleClass";
import {Styling}    from "../Styling";

export interface ClassManager {
  registerClass(styleClass: StyleClass, resolvedStyling: Styling): void;

}

export const ClassManager: ClassManager = Utils.isNative() ? new (require("./BaseClassManager").default) : new (require("./CssClassManager").default);