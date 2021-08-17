import React, {useCallback, useRef}                         from "react";
import {ComponentType, getReactComponentName, shallowEqual} from "../../Utils";
import {Animated}                                           from "react-native";
import {ComposedStyleOptions, useComposedStyle}             from "../../StyleHooks";
import {removePropTypes, StyledProps, StyleProp}            from "../../Styling";
import {CascadingValuesProvider}                            from "../../CascadingValuesContext";
import {classesId}                                          from "../../class/StyleClass";

type WithAnimatedValue<T> = Animated.WithAnimatedValue<T>;

export type StyledComponent<P> = ComponentType<(keyof P extends "style" ? Omit<P, "style"> : P) & StyledProps>;
export type AnimatedStyledComponent<P> = ComponentType<(keyof P extends "style" ? Omit<P, "style"> : P) & StyledProps<WithAnimatedValue<StyleProp>>>;

export type StyledOptions = ComposedStyleOptions;

export function styled<P>(baseComponent: ComponentType<P>, options?: StyledOptions): StyledComponent<P> {
  if (!baseComponent) {
    return baseComponent;
  }

  const baseComponentName = getReactComponentName(baseComponent);

  const styledComponent = React.forwardRef((props: any, ref) => {
    const {children, ...otherProps} = props;

    const {cascadingContextValue, computedProps} = useComposedStyle(props, options);

    removePropTypes(children);

    const content = React.createElement(baseComponent, {
      ...otherProps,
      ...computedProps,
      ref: ref,
    }, children);

    return cascadingContextValue ?
      <CascadingValuesProvider value={cascadingContextValue}>
        {content}
      </CascadingValuesProvider> : content;

  });
  return React.memo(Object.assign(styledComponent, {displayName: `Styler[${baseComponentName}]`}), styledArePropsEqual);
}

export function styledArePropsEqual<T>(prevProps: T, nextProps: T): boolean {
  return shallowEqual(prevProps, nextProps, {
    "classes": (a, b) => classesId(a) === classesId(b),
    "style"  : shallowEqual,
  });
}
