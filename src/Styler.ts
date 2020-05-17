import {Style} from "./Styling";
import React   from "react";

import * as Utils   from "./Utils";
import {Falsy}      from "./Utils";
import {StyleClass} from "./class/StyleClass";

export interface StylableProps {
  style?: Style;
  classes?: Array<StyleClass | Falsy> | StyleClass | Falsy,
}

export interface StylerProps extends StylableProps {
  children?: React.ReactElement<{ style: Style }> | string,
}

export type StylerComponent = (props: StylerProps) => JSX.Element | null;

export const Styler: StylerComponent = Utils.isNative() ? require("./NativeStyler").default : require("./CssStyler").default;