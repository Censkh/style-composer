import React, {useCallback, useRef, useState}  from "react";
// eslint-disable-next-line no-restricted-imports
import {ButtonProps as BaseButtonProps}        from "react-native";
import {StyledProps, StyledTouchableOpacity, CssGlobalStyling} from "style-composer";


import {
  $Button,
  active as activeSelector,
  disabled as disabledSelector,
  focus as focusSelector,
  hover as hoverSelector,
}                           from "./Button.style";
import Text                 from "../Text/Text";
import {useFocus, useHover} from "react-native-web-hooks";

export interface ButtonProps extends BaseButtonProps, StyledProps {
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

  const ownPseudoClasses = [disabled && disabledSelector.type, active && activeSelector.type, focus && focusSelector.type, hover && hoverSelector.type];

  return <StyledTouchableOpacity tag={"button"}
    // @ts-ignore
                                 ref={ref}
                                 activeOpacity={1}
                                 onPressOut={setActiveFalse}
                                 onPressIn={setActiveTrue}
                                 classes={ownClasses}
                                 pseudoClasses={ownPseudoClasses}
                                 style={style}
                                 disabled={disabled}
                                 {...otherProps}>
    <CssGlobalStyling name={"button"}>
      {`button:focus {
        color: red;
      }`}
    </CssGlobalStyling>
    <Text>{title}</Text>
  </StyledTouchableOpacity>;
};

export default React.memo(Button);
