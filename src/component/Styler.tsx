import React                  from "react";
import {RecursiveArray, Text} from "react-native";

import {sanitizeStyleList, Style} from "../Styling";
import {Classes, PseudoClasses}   from "../class/StyleClass";
import {CascadingStyleProvider}   from "../CascadingStyleContext";
import {useComposedStyle}         from "../Hooks";
import {PolyText}                 from "./PolyComponents";
import {setupFontPreProcessor}    from "../font/FontPreProcessor";

export type StyleProp = RecursiveArray<Style | undefined | null | false> | Style | undefined | null | false;

export interface StylableProps {
  style?: StyleProp;
  classes?: Classes,
  pseudoClasses?: PseudoClasses;
}

export type StylerChildren =
  React.ReactElement<{ style: StyleProp }>
  | string;

export interface StylerProps extends StylableProps {
  children?: StylerChildren,
  _baseComponent: React.ElementType;
}

const Styler = (props: StylerProps) => {
  const {children, _baseComponent} = props;

  const {computedStyle, classNames, cascadingStyle, flatPseudoClasses} = useComposedStyle(props, {disableCascade: _baseComponent !== Text && _baseComponent !== PolyText});

  const content = !children || typeof children === "string" ? children : React.cloneElement(children, {
    style              : sanitizeStyleList(children, computedStyle as any),
    "data-class"       : classNames?.join(" "),
    "data-pseudo-class": flatPseudoClasses.join(" "),
  } as any);

  return cascadingStyle ?
    <CascadingStyleProvider value={cascadingStyle}>
      {content}
    </CascadingStyleProvider> : content as any;
};

export default Object.assign(Styler, {displayName: "Styler"});
