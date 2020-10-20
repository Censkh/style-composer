import React                   from "react";
import Styler, {StylableProps} from "../Styler";
import {shallowEqual}          from "../../Utils";
import {classesId}             from "../..";

export type StyledComponent<P> = React.ComponentType<(keyof P extends "style" ? Omit<P, "style"> : P) & StylableProps>;

export interface StyledOptions {
  autoFlattens?: boolean;
}

export const styled = <P>(baseComponent: React.ComponentType<P>, options?: StyledOptions): StyledComponent<P> => {
  if (!baseComponent) {
    return baseComponent;
  }

  return React.memo(Object.assign(React.forwardRef((props: any, ref) => {
    const {children, style, pseudoClasses, classes, ...otherProps} = props;

    return Styler({
      classes,
      style,
      pseudoClasses,
      ref,
      _baseComponent: baseComponent,
      children      : React.createElement(baseComponent, otherProps as any, children),
      options,
    } as any);
  }), {displayName: `Styler${baseComponent.displayName ? `[${baseComponent.displayName}]` : ""}`}), styledArePropsEqual);
};

export function styledArePropsEqual<T>(prevProps: T, nextProps: T): boolean {
  return shallowEqual(prevProps, nextProps, {
    "classes": (a, b) => classesId(a) === classesId(b),
  });
}
