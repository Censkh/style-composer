import React                                                          from "react";
import {Animated, Button, Image, SafeAreaView, ScrollView, TextInput} from "react-native";

import {
  PolyText,
  PolyTouchableHighlight,
  PolyTouchableNativeFeedback,
  PolyTouchableOpacity,
  PolyTouchableWithoutFeedback,
  PolyView,
}                              from "./PolyComponents";
import {classesId}             from "..";
import {PropsOf, shallowEqual} from "../Utils";
import Styler, {StylableProps} from "./Styler";

// we use (P & {style?: never}) to prevent ts from merging the two style properties together
export type StyledComponent<P> = React.ComponentType<Omit<P, "style"> & StylableProps>;

export function styled<P>(baseComponent: React.ComponentType<P>): StyledComponent<P> {
  return React.memo(Object.assign(React.forwardRef((props: any, ref) => {
    const {children, style, pseudoClasses, classes, ...otherProps} = props;

    return Styler({
      classes,
      style,
      pseudoClasses,
      ref,
      _baseComponent: baseComponent,
      children      : React.createElement(baseComponent, otherProps as any, children),
    } as any);
  }), {displayName: `Styler${baseComponent.displayName ? `[${baseComponent.displayName}]` : ""}`}), styledArePropsEqual);
}

export function styledArePropsEqual<T>(prevProps: T, nextProps: T): boolean {
  return shallowEqual(prevProps, nextProps, {
    "classes": (a, b) => classesId(a) === classesId(b),
  });
}

export const StyledSafeAreaView             = styled(SafeAreaView);
export const StyledView                     = styled(PolyView);
export const StyledText                     = styled(PolyText);
export const StyledTextInput                = styled(TextInput);
export const StyledButton                   = styled(Button);
export const StyledTouchableNativeFeedback  = styled(PolyTouchableNativeFeedback);
export const StyledTouchableOpacity         = styled(PolyTouchableOpacity);
export const StyledTouchableWithoutFeedback = styled(PolyTouchableWithoutFeedback);
export const StyledTouchableHighlight       = styled(PolyTouchableHighlight);
export const StyledScrollView               = styled(ScrollView);
export const StyledImage                    = styled(Image);

export type StyledSafeAreaViewProps = PropsOf<typeof StyledSafeAreaView>;
export type StyledViewProps = PropsOf<typeof StyledView>;
export type StyledTextProps = PropsOf<typeof StyledText>;
export type StyledTextInputProps = PropsOf<typeof StyledTextInput>;
export type StyledButtonProps = PropsOf<typeof StyledButton>;
export type StyledTouchableNativeFeedbackProps = PropsOf<typeof StyledTouchableNativeFeedback>;
export type StyledTouchableOpacityProps = PropsOf<typeof StyledTouchableOpacity>;
export type StyledTouchableWithoutFeedbackProps = PropsOf<typeof StyledTouchableWithoutFeedback>;
export type StyledTouchableHighlightProps = PropsOf<typeof StyledTouchableHighlight>;
export type StyledScrollViewProps = PropsOf<typeof StyledScrollView>;
export type StyledImageProps = PropsOf<typeof StyledImage>;

export const StyledAnimated = {
  View      : styled(Animated.View),
  Text      : styled(Animated.Text),
  ScrollView: styled(Animated.ScrollView),
  Image     : styled(Animated.Image),
};
