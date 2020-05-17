import {Style, StyleClass} from "./Styling";
import React               from "react";

import * as Utils from "./Utils";

export interface StylableProps {
  style?: Style;
  classes?: StyleClass[],
}

export interface StylerProps extends StylableProps {
  children?: React.ReactElement<{ style: Style }> | string,
}

export type StylerComponent = (props: StylerProps) => JSX.Element | null;

export const Styler: StylerComponent = Utils.isNative() ? require("./NativeStyler").default : require("./CssStyler").default;