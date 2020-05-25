import React                                            from "react";
// eslint-disable-next-line no-restricted-imports
import {ButtonProps as BaseButtonProps}                 from "react-native";
import {$Button}                                        from "./Button.style";
import Text                                             from "../Text/Text";
import {classList, PolyTouchableOpacity, StylerProps} from "style-composer";

export interface ButtonProps extends BaseButtonProps, StylerProps {
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {title, classes, ...otherProps} = props;
  return <PolyTouchableOpacity tag={"button"} classes={classList($Button, classes)} {...otherProps}>
    <Text>{title}</Text>
  </PolyTouchableOpacity>;
};

export default Button;
