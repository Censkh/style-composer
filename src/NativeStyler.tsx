import React, {useContext, useMemo} from "react";

import {computeStyles}                                             from "./Styling";
import {addFontLoadListener, isFontLoaded, removeFontLoadListener} from "./FontFamily";
import type {StylerComponent, StylerProps}                         from "./Styler";
import {useForceUpdate, useRulesEffect}                            from "./Hooks";
import {StylerContext}                                             from "./StylerContext";

const NativeStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;

  const stylerContext = useContext(StylerContext);
  const [_, forceUpdate] = useForceUpdate();
  const key = useRulesEffect(classes);

  const {computedStyles, descendingStyle, classNames} = useMemo(() => {
    const computedStyles = Object.assign({}, stylerContext.descendingStyle, ...classes?.flatMap(clazz => {
      return [clazz.__meta.parent && computeStyles(clazz.__meta.parent), computeStyles(clazz)];
    }) || [], style, typeof children === "string" ? {} : children?.props.style || {});

    const classNames = classes?.map(clazz => clazz.__meta.className);

    const descendingStyle = {
      fontSize:   computedStyles.fontSize,
      fontFamily: computedStyles.fontFamily,
      color:      computedStyles.color,
    };

    return {
      classNames,
      computedStyles,
      descendingStyle,
    };
  }, [style, classes, stylerContext, key]);

  const childContextState = useMemo(() => ({
    descendingStyle
  }), [descendingStyle]);

  if ("fontFamily" in computedStyles) {
    const {fontFamily} = computedStyles;
    if (!isFontLoaded(fontFamily)) {
      let callback: () => void;
      addFontLoadListener(fontFamily, callback = () => {
        forceUpdate();
        removeFontLoadListener(fontFamily, callback);
      });
      delete computedStyles.fontFamily;
    }
  }

  return <StylerContext.Provider
    value={childContextState}>{children ? (typeof children === "string" ? children : React.cloneElement(children, {
    style:     computedStyles,
    className: classNames?.join(" "),
  } as any)) : null}</StylerContext.Provider>;
};
Object.defineProperty(NativeStyler, "name", {value: "NativeStyler"});

export default NativeStyler;