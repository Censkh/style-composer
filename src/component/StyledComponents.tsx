import React      from "react";
import {
  Button,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
}                 from "react-native";
import {
  StylableProps,
  Styler,
  StylerComponent,
}                 from "./Styler";
import * as Utils from "../Utils";
import {
  PolyText,
  PolyTouchableOpacity,
  PolyView,
}                 from "./PolyComponents";

// we use (P & {style?: never}) to prevent ts from merging the two style properties together
export type StyledComponent<P> = React.ComponentType<(P & {style?: unknown}) & StylableProps>;

export function styled<P>(baseComponent: React.ComponentType<P>, options?: { canBeCssOptimized?: boolean }): StyledComponent<P> {
  let stylerComponent: StylerComponent = Styler;
  if (options?.canBeCssOptimized && !Utils.isNative()) {
    stylerComponent = require("./CssOptimizedStyler").default;
  }

  // we
  return React.memo(Object.assign((props: any) => {
    const {children, style, classes, ...otherProps} = props;

    return stylerComponent({
      classes,
      style,
      children: React.createElement(baseComponent, otherProps as any, children),
    } as any);
  }, {displayName: `${stylerComponent.displayName}${baseComponent.displayName ? `[${baseComponent.displayName}]` : ""}`}));
}

export const StyledSafeAreaView = styled(SafeAreaView, {canBeCssOptimized: true});
export const StyledView = styled(PolyView, {canBeCssOptimized: true});
export const StyledText = styled(PolyText, {canBeCssOptimized: true});
export const StyledTextInput = styled(TextInput, {canBeCssOptimized: true});
export const StyledButton = styled(Button, {canBeCssOptimized: true});
export const StyledTouchableNativeFeedback = styled(TouchableNativeFeedback, {canBeCssOptimized: true});
export const StyledTouchableOpacity = styled(PolyTouchableOpacity, {canBeCssOptimized: true});
export const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback, {canBeCssOptimized: true});
export const StyledTouchableHighlight = styled(TouchableHighlight, {canBeCssOptimized: true});