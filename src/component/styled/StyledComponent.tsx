import React, {useCallback, useRef}                         from "react";
import {ComponentType, getReactComponentName, shallowEqual} from "../../Utils";
import {Animated, Text}                                     from "react-native";
import {useComposedStyle}                                   from "../../StyleHooks";
import {PolyText}                                           from "../poly/native";
import {removePropTypes, StyledProps, StyleProp}            from "../../Styling";
import {CascadingValuesProvider}                            from "../../CascadingValuesContext";
import {classesId}                                          from "../../class/StyleClass";

type WithAnimatedValue<T> = Animated.WithAnimatedValue<T>;

export type StyledComponent<P> = ComponentType<(keyof P extends "style" ? Omit<P, "style"> : P) & StyledProps>;
export type AnimatedStyledComponent<P> = ComponentType<(keyof P extends "style" ? Omit<P, "style"> : P) & StyledProps<WithAnimatedValue<StyleProp>>>;

export interface StyledOptions {
  autoFlattens?: boolean;
}

export function styled<P>(baseComponent: ComponentType<P>, options?: StyledOptions): StyledComponent<P> {
  if (!baseComponent) {
    return baseComponent;
  }

  const baseComponentName = getReactComponentName(baseComponent);

  return React.memo(Object.assign(React.forwardRef((props: any, ref) => {
    const {children, ...otherProps} = props;

    const {cascadingContextValue, computedProps} = useComposedStyle(props, {
      // @ts-ignore
      disableCascade: baseComponent !== Text && baseComponent !== PolyText,
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

    const content = React.createElement(baseComponent, {
      ...otherProps,
      ...computedProps,
      ref: handleRef,
    }, children);

    return cascadingContextValue ?
      <CascadingValuesProvider value={cascadingContextValue}>
        {content}
      </CascadingValuesProvider> : content;

  }), {displayName: `Styler[${baseComponentName}]`}), styledArePropsEqual);
}

export function styledArePropsEqual<T>(prevProps: T, nextProps: T): boolean {
  return shallowEqual(prevProps, nextProps, {
    "classes": (a, b) => classesId(a) === classesId(b),
    "style"  : shallowEqual,
  });
}
