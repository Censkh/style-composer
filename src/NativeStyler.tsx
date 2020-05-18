import React, {useContext, useMemo} from "react";

import {computeClasses, sanitizeStyle}                             from "./Styling";
import {addFontLoadListener, isFontLoaded, removeFontLoadListener} from "./font/FontFamily";
import type {StylerComponent, StylerProps}                         from "./Styler";
import {useForceUpdate, useRulesEffect}                            from "./Hooks";
import DescendingStyleContext                                      from "./DescendingStyleContext";
import {useTheming}                                                from "./theme/Theming";
import {classesId, classList}                                      from "./class/StyleClass";

const DESCENDING_STYLES = ["fontSize", "fontFamily", "color"];

const NativeStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;

  const parentDescendingStyle = useContext(DescendingStyleContext);
  const [fontKey, forceUpdate] = useForceUpdate();
  const classArray = classes && classList(classes);
  const classId = classesId(classArray);
  const key = useRulesEffect(classArray, classId);

  const theme = useTheming();

  const {computedStyles, descendingStyle, classNames} = useMemo(() => {
    const classResults = computeClasses(classArray, {includeStyle: true});

    const ownStyles: any = Object.assign(classResults.style || {}, style, typeof children === "string" ? undefined : children?.props.style);

    const computedStyles = Object.assign({}, parentDescendingStyle, ownStyles);

    const descendingStyle = DESCENDING_STYLES.some(key => ownStyles[key] !== undefined) ? {
      fontSize  : computedStyles.fontSize,
      fontFamily: computedStyles.fontFamily,
      color     : computedStyles.color,
    } : null;

    return {
      classNames     : classResults.classNames,
      computedStyles : computedStyles,
      descendingStyle: descendingStyle,
    };
  }, [style, classId, parentDescendingStyle, key, fontKey, theme]);

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
    style    : sanitizeStyle(children, computedStyles),
    className: classNames?.join(" "),
  } as any)) : null;

  return descendingStyle ?
    <DescendingStyleContext.Provider value={descendingStyle}>
      {content}
    </DescendingStyleContext.Provider> : content as any;
};
Object.defineProperty(NativeStyler, "name", {value: "NativeStyler"});

export default React.memo(NativeStyler);