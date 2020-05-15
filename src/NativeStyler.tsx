import React, {useContext, useMemo} from "react";

import {computeStyles}                                             from "./Styling";
import {addFontLoadListener, isFontLoaded, removeFontLoadListener} from "./FontFamily";
import type {StylerComponent, StylerProps}                         from "./Styler";
import {useForceUpdate, useRulesEffect}                            from "./Hooks";
import DescendingStyleContext                                      from "./DescendingStyleContext";
import {useTheming}                                                from "./Theming";

const DESCENDING_STYLES = ["fontSize", "fontFamily", "color"];

const NativeStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;

  const parentDescendingStyle = useContext(DescendingStyleContext);
  const [fontKey, forceUpdate] = useForceUpdate();
  const key = useRulesEffect(classes);

  const theme = useTheming();

  const {computedStyles, descendingStyle, classNames} = useMemo(() => {
    const ownStyles = Object.assign({}, ...classes?.flatMap(clazz => {
      return [clazz.__meta.parent && computeStyles(clazz.__meta.parent), computeStyles(clazz)];
    }) || [], style, typeof children === "string" ? {} : children?.props.style || {});

    const computedStyles = Object.assign({}, parentDescendingStyle, ownStyles);

    const classNames = classes?.map(clazz => clazz.__meta.className);

    const descendingStyle = DESCENDING_STYLES.some(key => ownStyles[key] !== undefined) ? {
      fontSize:   computedStyles.fontSize,
      fontFamily: computedStyles.fontFamily,
      color:      computedStyles.color,
    } : null;

    return {
      classNames,
      computedStyles,
      descendingStyle,
    };
  }, [style, classes, parentDescendingStyle, key, fontKey, theme]);

  if (computedStyles.fontFamily) {
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

  const content = children ? (typeof children === "string" ? children : React.cloneElement(children, {
    style:     computedStyles,
    className: classNames?.join(" "),
  } as any)) : null;

  return descendingStyle ?
    <DescendingStyleContext.Provider value={descendingStyle}>
      {content}
    </DescendingStyleContext.Provider> : content as any;
};
Object.defineProperty(NativeStyler, "name", {value: "NativeStyler"});

export default NativeStyler;