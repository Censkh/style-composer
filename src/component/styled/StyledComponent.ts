import React                            from "react";
import Styler, {StyledProps, StyleProp} from "../Styler";
import {shallowEqual}                   from "../../Utils";
import {classesId}           from "../..";
import {Animated}            from "react-native";
import WithAnimatedValue = Animated.WithAnimatedValue;

export type StyledComponent<P> = React.ComponentType<(keyof P extends "style" ? Omit<P, "style"> : P) & StyledProps>;
export type AnimatedStyledComponent<P> = React.ComponentType<(keyof P extends "style" ? Omit<P, "style"> : P) & StyledProps<WithAnimatedValue<StyleProp>>>;

export interface StyledOptions {
  autoFlattens?: boolean;
}

export const styled = <P>(baseComponent: React.ComponentType<P>, options?: StyledOptions): StyledComponent<P> => {
  if (!baseComponent) {
    return baseComponent;
  }

  return React.memo(Object.assign(React.forwardRef((props: any, ref) => {
    const {children, style, pseudoClasses, classes, dataSet, ...otherProps} = props;

    return Styler({
      classes,
      style,
      pseudoClasses,
      ref,
      _baseComponent: baseComponent,
      children      : children,
      options,
      dataSet,
      otherProps,
    } as any);
  }), {displayName: `Styler${baseComponent.displayName ? `[${baseComponent.displayName}]` : ""}`}), styledArePropsEqual);
};

export function styledArePropsEqual<T>(prevProps: T, nextProps: T): boolean {
  return shallowEqual(prevProps, nextProps, {
    "classes": (a, b) => classesId(a) === classesId(b),
  });
}
