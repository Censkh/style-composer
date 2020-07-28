import React, {useCallback, useState}                     from "react";
// eslint-disable-next-line no-restricted-imports
import {ButtonProps as BaseButtonProps}                   from "react-native";
import {classList, StylableProps, StyledTouchableOpacity} from "style-composer";


import {$Button, active as activeRule, disabled as disabledRule} from "./Button.style";
import Text                                                      from "../Text/Text";

export interface ButtonProps extends BaseButtonProps, StylableProps {
  loading?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {title, classes, disabled, style, ...otherProps} = props;

  const [active, setActive] = useState(false);

  const ownClasses = classList($Button, classes);

  const setActiveFalse = useCallback(() => setActive(false), []);
  const setActiveTrue  = useCallback(() => setActive(true), []);

  return <StyledTouchableOpacity tag={"button"}
                                 activeOpacity={1}
                                 onPressOut={setActiveFalse}
                                 onPressIn={setActiveTrue}
                                 classes={ownClasses}
                                 pseudoClasses={[disabled && disabledRule.type, active && activeRule.type]}
                                 style={style}
                                 {...otherProps}>
    <Text>{title}</Text>
  </StyledTouchableOpacity>;
};

export default React.memo(Button);
