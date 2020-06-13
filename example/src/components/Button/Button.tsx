import React                                              from "react";
// eslint-disable-next-line no-restricted-imports
import {ButtonProps as BaseButtonProps} from "react-native";
import {$Button, $ButtonDisabled}       from "./Button.style";
import Text                             from "../Text/Text";
import {classList, StylableProps, StyledTouchableOpacity} from "style-composer";

export interface ButtonProps extends BaseButtonProps, StylableProps {
  loading?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {title, classes, disabled, ...otherProps} = props;
  return <StyledTouchableOpacity tag={"button"} classes={classList($Button, disabled && $ButtonDisabled, classes)} {...otherProps}>
    <Text>{title}</Text>
  </StyledTouchableOpacity>;
};

export default React.memo(Button);
