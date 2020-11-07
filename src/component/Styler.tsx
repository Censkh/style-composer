import React, {useCallback, useRef}       from "react";
import {RecursiveArray, StyleSheet, Text} from "react-native";

import {removePropTypes, sanitizeStyleList, Style} from "../Styling";
import {Classes, PseudoClasses}                    from "../class/StyleClass";
import {useComposedStyle}         from "../Hooks";
import {CascadingValuesProvider}  from "../CascadingValuesContext";
import {isNative}                 from "../Utils";
import {StyledOptions}            from "./styled/StyledComponent";
import PolyText                   from "./poly/native/PolyText";

export type StyleProp = RecursiveArray<Style | undefined | null | false> | Style | undefined | null | false;

export interface StyledProps {
  style?: StyleProp;
  classes?: Classes,
  pseudoClasses?: PseudoClasses;
}

export type StylerChildren =
  React.ReactElement<{ style: StyleProp }>
  | string;

export interface StylerProps extends StyledProps {
  children?: StylerChildren,
  _baseComponent: React.ElementType;
  ref?: React.Ref<any>;
  options?: StyledOptions;
}

const Styler = (props: StylerProps) => {
  const {children, _baseComponent, ref, options} = props;

  const {cascadingContextValue, computedProps} = useComposedStyle(props, {
    disableCascade: _baseComponent !== Text && _baseComponent !== PolyText,
    ...options,
  });

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

  removePropTypes(children);

  const content = !children || typeof children === "string" ? children : React.cloneElement(children, {
    ...computedProps,
    ref                : handleRef,
  } as any);

  return cascadingContextValue ?
    <CascadingValuesProvider value={cascadingContextValue}>
      {content}
    </CascadingValuesProvider> : content as any;
};

export default Object.assign(Styler, {displayName: "Styler"});
