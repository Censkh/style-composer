import React                   from "react";
import {
  Button,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
}                              from "react-native";
import Styler, {StylableProps} from "./Styler";
import {
  PolyText,
  PolyTouchableOpacity,
  PolyView,
}                              from "./PolyComponents";
import {classesId}             from "..";
import {shallowEqual}          from "../Utils";

// we use (P & {style?: never}) to prevent ts from merging the two style properties together
export type StyledComponent<P> = React.ComponentType<(P & { style?: unknown }) & StylableProps>;

export function styled<P>(baseComponent: React.ComponentType<P>): StyledComponent<P> {
  return React.memo(Object.assign((props: any) => {
    const {children, style, classes, ...otherProps} = props;

    return Styler({
      classes,
      style,
      _baseComponent: baseComponent,
      children      : React.createElement(baseComponent, otherProps as any, children),
    } as any);
  }, {displayName: `Styler${baseComponent.displayName ? `[${baseComponent.displayName}]` : ""}`}), styledArePropsEqual);
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
export const StyledTouchableNativeFeedback  = styled(TouchableNativeFeedback);
export const StyledTouchableOpacity         = styled(PolyTouchableOpacity);
export const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback);
export const StyledTouchableHighlight       = styled(TouchableHighlight);

