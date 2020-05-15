import {Style, StyleClass}    from "./Styling";
import React, {CSSProperties} from "react";

import * as Utils from "./Utils";


export interface StylerProps {
  children?: React.ReactElement<{ style: CSSProperties }> | string,
  style?: Style;
  classes?: StyleClass[],
}

export type StylerComponent = (props: StylerProps) => JSX.Element | null;

export const Styler: StylerComponent = Utils.isNative() || true ? require("./NativeStyler").default : require("./CssStyler").default;