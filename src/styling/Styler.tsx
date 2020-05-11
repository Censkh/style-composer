import React, {CSSProperties, useContext, useEffect, useMemo, useState} from "react";
import {computeStyles, Style, StyledClass}                              from "./Styling";
import {registerRuleCallback, unregisterRuleCallback}                   from "./StyleRule";

export interface StylerContextState {
  descendingStyle: Style;
}

export const StylerContext = React.createContext<StylerContextState>({
  descendingStyle: {}
});

export interface StylerProps {
  children?: React.ReactElement<{ style: CSSProperties }> | string,
  style?: Style;
  classes?: StyledClass[],
}

const useForceUpdate = (): [number, () => void] => {
  const [state, setState] = useState(0);
  return [state, useMemo(() => () => setState(i => i + 1), [setState])];
};

const Styler = (props: StylerProps) => {
  const {children, style, classes} = props;

  const stylerContext = useContext(StylerContext);
  const [key, forceUpdate] = useForceUpdate();

  useEffect(() => {
    if (classes) {
      for (const clazz of classes) {
        Object.values(clazz.__meta.rules).forEach((ruleInstance) => {
          registerRuleCallback(ruleInstance.rule, forceUpdate);
        });
      }
      return () => {
        for (const clazz of classes) {
          Object.values(clazz.__meta.rules).forEach((ruleInstance) => {
            unregisterRuleCallback(ruleInstance.rule, forceUpdate);
          });
        }

      };
    }
  }, [classes, forceUpdate]);

  const {computedStyles, descendingStyle} = useMemo(() => {
    const computedStyles = Object.assign({}, stylerContext.descendingStyle, ...classes?.flatMap(clazz => {
      return [clazz.__meta.parent && computeStyles(clazz.__meta.parent), computeStyles(clazz)];
    }) || [], style, typeof children === "string" ? {} : children?.props.style || {});

    const descendingStyle = {
      fontSize: computedStyles.fontSize,
      color:    computedStyles.color,
    };

    return {
      computedStyles,
      descendingStyle,
    }
  }, [style, classes, stylerContext, key]);

  const childContextState = useMemo(() => ({
    descendingStyle
  }), [descendingStyle]);

  return <StylerContext.Provider
    value={childContextState}>{children ? (typeof children === "string" ? children : React.cloneElement(children, {
    style: computedStyles
  })) : null}</StylerContext.Provider>;
};

export default Styler;