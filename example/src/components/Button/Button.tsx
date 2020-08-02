import React, {useCallback, useRef, useState}  from "react";
// eslint-disable-next-line no-restricted-imports
import {ButtonProps as BaseButtonProps}        from "react-native";
import {StylableProps, StyledTouchableOpacity} from "style-composer";


import {
  $Button,
  active as activeRule,
  disabled as disabledRule,
  focus as focusRule,
  hover as hoverRule,
}                           from "./Button.style";
import Text                 from "../Text/Text";
import {useFocus, useHover} from "react-native-web-hooks";

export interface ButtonProps extends BaseButtonProps, StylableProps {
  loading?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {title, classes, disabled, style, ...otherProps} = props;

  const [active, setActive] = useState(false);

  const ownClasses = [$Button, classes];

  const setActiveFalse = useCallback(() => setActive(false), []);
  const setActiveTrue  = useCallback(() => setActive(true), []);

  const ref = useRef();

  const focus = useFocus(ref);
  const hover = useHover(ref);

  const ownPseudoClasses = [disabled && disabledRule.type, active && activeRule.type, focus && focusRule.type, hover && hoverRule.type];

  return <StyledTouchableOpacity tag={"button"}
    // @ts-ignore
                                 ref={ref}
                                 activeOpacity={1}
                                 onPressOut={setActiveFalse}
                                 onPressIn={setActiveTrue}
                                 classes={ownClasses}
                                 pseudoClasses={ownPseudoClasses}
                                 style={style}
                                 {...otherProps}>
    <Text>{title}</Text>
  </StyledTouchableOpacity>;
};

export default React.memo(Button);
