import React, {useContext, useMemo} from "react";

import {computeClasses}                                            from "./Styling";
import {addFontLoadListener, isFontLoaded, removeFontLoadListener} from "./font/FontFamily";
import type {StylerComponent, StylerProps}                         from "./Styler";
import {renderChildren}                                            from "./Styler";
import {useForceUpdate, useStylingInternals}                       from "./Hooks";
import DescendingStyleContext                                      from "./DescendingStyleContext";

const DESCENDING_STYLES = ["fontSize", "fontFamily", "color"];

const InlineStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;

  const parentDescendingStyle = useContext(DescendingStyleContext);
  const [fontKey, forceUpdate] = useForceUpdate();
  const {id, theme, key, classId, classArray} = useStylingInternals(classes);

  const {computedStyles, descendingStyle, classNames} = useMemo(() => {
    const classResults = computeClasses(classArray, {includeStyle: true});

    const ownStyles: any = Object.assign(classResults.style || {}, style, typeof children !== "object" ? undefined : children?.props.style);

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

  const content = renderChildren(children, computedStyles, classNames, id);

  return descendingStyle ?
    <DescendingStyleContext.Provider value={descendingStyle}>
      {content}
    </DescendingStyleContext.Provider> : content as any;
};

export default React.memo(Object.assign(InlineStyler, {displayName: "InlineStyler"}));