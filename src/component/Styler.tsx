import React, {useCallback, useRef}       from "react";
import {RecursiveArray, StyleSheet, Text} from "react-native";

import {sanitizeStyleList, Style} from "../Styling";
import {Classes, PseudoClasses}   from "../class/StyleClass";
import {useComposedStyle}         from "../Hooks";
import {PolyText}                 from "./PolyComponents";
import {CascadingValuesProvider}  from "../CascadingValuesContext";
import {StyledOptions}            from "./StyledComponents";
import {isNative}                 from "../Utils";

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
  ref?: React.Ref<any>;
  options?: StyledOptions;
}

const Styler = (props: StylerProps) => {
  const {children, _baseComponent, ref, options} = props;

  const {computedStyle, classNames, cascadingContextValue, flatPseudoClasses} = useComposedStyle(props, {disableCascade: _baseComponent !== Text && _baseComponent !== PolyText});

  const internalRef = useRef<any>();

  const handleRef = useCallback((element: any) => {
    internalRef.current = element;
    if (ref) {
      if (typeof ref === "function") {
        ref(element);
      } else {
        (ref as any).current = element;
      }
    }
  }, [ref]);

  const sanitizedStyleList = sanitizeStyleList(children, computedStyle as any);
  const flatStyle          = isNative() || options?.autoFlattens ? sanitizedStyleList : StyleSheet.flatten(sanitizedStyleList);

  const dataSet = {
    "class"       : classNames?.join(" "),
    "pseudo-class": flatPseudoClasses.join(" "),
  };

  const content = !children || typeof children === "string" ? children : React.cloneElement(children, {
    style              : flatStyle,
    "data-class"       : dataSet["class"],
    "data-pseudo-class": dataSet["pseudo-class"],
    dataSet            : dataSet,
    ref                : handleRef,
  } as any);

  return cascadingContextValue ?
    <CascadingValuesProvider value={cascadingContextValue}>
      {content}
    </CascadingValuesProvider> : content as any;
};

export default Object.assign(Styler, {displayName: "Styler"});
