import React from "react";

import {sanitizeStyle, Style} from "../Styling";
import {Falsy}                from "../Utils";
import {StyleClass}           from "../class/StyleClass";
import InlineStyler           from "./InlineStyler";
import {RecursiveArray}       from "react-native";

export type StyleProp = RecursiveArray<Style | undefined | null | false> | Style | undefined | null | false;

export interface StylableProps {
  style?: StyleProp;
  classes?: Array<StyleClass | Falsy> | StyleClass | Falsy,
}

export type StylerChildren =
  React.ReactElement<{ style: Style }>
  | string
  | ((style: Style, classNames: string[]) => JSX.Element);

export interface StylerProps extends StylableProps {
  children?: StylerChildren,
}

export const renderChildren = (children: StylerChildren | undefined, computedStyles: Style, classNames: string[] | null, id: string): JSX.Element | null => {
  if (!children) {
    return null;
  } else if (typeof children === "string") {
    return children as any;
  } else if (typeof children === "function") {
    return children(computedStyles, classNames || []);
  }

  return React.cloneElement(children, {
    style       : sanitizeStyle(children, computedStyles),
    "data-class": classNames?.join(" "),
    "data-id"   : id,
  } as any);
};

export interface StylerComponent {
  (props: StylerProps): JSX.Element | null;

  displayName: string;
}

export const Styler: StylerComponent = InlineStyler;