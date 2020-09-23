import React from "react";
import {
  Animated,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
}            from "react-native";

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

export type StyledComponent<P> = React.ComponentType<Omit<P, "style"> & StylableProps>;

export const styled = <P>(baseComponent: React.ComponentType<P>): StyledComponent<P> => {
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
};

export function styledArePropsEqual<T>(prevProps: T, nextProps: T): boolean {
  return shallowEqual(prevProps, nextProps, {
    "classes": (a, b) => classesId(a) === classesId(b),
  });
}

// we have to be explict about the type of the decl here because typescript expands the keyof otherwise https://github.com/microsoft/TypeScript/issues/27171
export const StyledSafeAreaView             :StyledComponent<PropsOf<typeof SafeAreaView>> = styled(SafeAreaView);
export const StyledView                     :StyledComponent<PropsOf<typeof PolyView>> = styled(PolyView);
export const StyledText                     :StyledComponent<PropsOf<typeof PolyText>> = styled(PolyText);
export const StyledTextInput                :StyledComponent<PropsOf<typeof TextInput>> = styled(TextInput);
export const StyledButton                   :StyledComponent<PropsOf<typeof Button>> = styled(Button);
export const StyledTouchableNativeFeedback  :StyledComponent<PropsOf<typeof PolyTouchableNativeFeedback>> = styled(PolyTouchableNativeFeedback);
export const StyledTouchableOpacity         :StyledComponent<PropsOf<typeof PolyTouchableOpacity>> = styled(PolyTouchableOpacity);
export const StyledTouchableWithoutFeedback :StyledComponent<PropsOf<typeof PolyTouchableWithoutFeedback>> = styled(PolyTouchableWithoutFeedback);
export const StyledTouchableHighlight       :StyledComponent<PropsOf<typeof PolyTouchableHighlight>> = styled(PolyTouchableHighlight);
export const StyledScrollView               :StyledComponent<PropsOf<typeof ScrollView>> = styled(ScrollView);
export const StyledImage                    :StyledComponent<PropsOf<typeof Image>> = styled(Image);

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
