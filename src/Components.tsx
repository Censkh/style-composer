import React                   from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
}                              from "react-native";
import {StylableProps, Styler} from "./Styler";
import * as Utils              from "./Utils";

export function styled<P>(baseComponent: React.ComponentType<P>, options?: { canBeCssOptimized?: boolean }): React.ComponentType<P & StylableProps> {
  let stylerComponent = Styler;
  if (options?.canBeCssOptimized && !Utils.isNative()) {
    stylerComponent = require("./CssOptimizedStyler").default;
  }

  return React.memo(Object.assign((props: any) => {
    const {children, style, classes, ...otherProps} = props;

    return React.createElement(stylerComponent, {
      classes,
      style,
    }, React.createElement(baseComponent, otherProps as any, children));
  }, {displayName: `Styled${baseComponent.displayName ? `[${baseComponent.displayName}]` : ""}`}));
}

export const StyledView = styled(View, {canBeCssOptimized: true});
export const StyledText = styled(Text, {canBeCssOptimized: true});
export const StyledTextInput = styled(TextInput, {canBeCssOptimized: true});
export const StyledButton = styled(Button, {canBeCssOptimized: true});
export const StyledTouchableNativeFeedback = styled(TouchableNativeFeedback, {canBeCssOptimized: true});
export const StyledTouchableOpacity = styled(TouchableOpacity, {canBeCssOptimized: true});
export const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback, {canBeCssOptimized: true});
export const StyledTouchableHighlight = styled(TouchableHighlight, {canBeCssOptimized: true});