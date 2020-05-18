import React                                                                           from "react";
// eslint-disable-next-line no-restricted-imports
import {ButtonProps as BaseButtonProps, Platform}                                      from "react-native";
import {$Button}                                                                       from "./Button.style";
import Text                                                                            from "../Text/Text";
import {classList, StyledTouchableNativeFeedback, StyledTouchableOpacity, StylerProps} from "style-composer";

const TouchableComponent: typeof StyledTouchableNativeFeedback = Platform.select<any>({
  default: StyledTouchableOpacity,
});


export interface ButtonProps extends BaseButtonProps, StylerProps {
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {title, classes, ...otherProps} = props;
  return <TouchableComponent classes={classList($Button, classes)} {...otherProps}>
    <Text>{title}</Text>
  </TouchableComponent>;
};

export default Button;
