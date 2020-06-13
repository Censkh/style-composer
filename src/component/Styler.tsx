import React from "react";

import {sanitizeStyleList, Style} from "../Styling";
import {Classes}                  from "../class/StyleClass";
import {RecursiveArray, Text}     from "react-native";
import {CascadingStyleProvider}   from "../CascadingStyleContext";
import {useComposedStyle}         from "../Hooks";
import {PolyText}                 from "./PolyComponents";
import {setupFontPreProcessor}    from "../font/FontPreProcessor";

export type StyleProp = RecursiveArray<Style | undefined | null | false> | Style | undefined | null | false;

export interface StylableProps {
  style?: StyleProp;
  classes?: Classes,
}

export type StylerChildren =
  React.ReactElement<{ style: StyleProp }>
  | string;

export interface StylerProps extends StylableProps {
  children?: StylerChildren,
  _baseComponent: React.ElementType;
}

setupFontPreProcessor();

const Styler = (props: StylerProps) => {
  const {children, style, classes, _baseComponent} = props;

  const {computedStyle, classNames, cascadingStyle} = useComposedStyle(classes, [style, typeof children !== "object" ? undefined : children?.props.style], _baseComponent !== Text && _baseComponent !== PolyText);

  const content = !children || typeof children === "string" ? children : React.cloneElement(children, {
    style       : sanitizeStyleList(children, computedStyle as any),
    "data-class": classNames?.join(" "),
  } as any);

  return cascadingStyle ?
    <CascadingStyleProvider value={cascadingStyle}>
      {content}
    </CascadingStyleProvider> : content as any;
};

export default Object.assign(Styler, {displayName: "Styler"});
