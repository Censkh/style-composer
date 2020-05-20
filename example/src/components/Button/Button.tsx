import React                                            from "react";
// eslint-disable-next-line no-restricted-imports
import {ButtonProps as BaseButtonProps}                 from "react-native";
import {$Button}                                        from "./Button.style";
import Text                                             from "../Text/Text";
import {classList, StyledTouchableOpacity, StylerProps} from "style-composer";

export interface ButtonProps extends BaseButtonProps, StylerProps {
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {title, classes, ...otherProps} = props;
  return <StyledTouchableOpacity classes={classList($Button, classes)} {...otherProps}>
    <Text>{title}</Text>
  </StyledTouchableOpacity>;
};

export default Button;
