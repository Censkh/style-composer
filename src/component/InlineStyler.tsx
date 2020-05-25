import React, {useContext, useMemo} from "react";

import {computeClasses, extractDescendingStyle} from "../Styling";
import type {StylerComponent, StylerProps}      from "./Styler";
import {renderChildren}                         from "./Styler";
import {useForceUpdate, useStylingInternals}    from "../Hooks";
import DescendingStyleContext                   from "../DescendingStyleContext";

import {addFontLoadListener, getFontFamily, isFontLoaded, removeFontLoadListener} from "../font/FontFamily";

const InlineStyler = (props: StylerProps) => {
  const {children, style, classes} = props;

  const [parentDescendingStyle, parentDescendingStyleKey] = useContext(DescendingStyleContext);
  const [fontKey, forceUpdate] = useForceUpdate();
  const {id, theme, key, classId, classArray} = useStylingInternals(classes);

  const {inlineStyle, descendingStyle, descendingStyleKey, classNames} = useMemo(() => {
    const classResults = computeClasses(classArray);

    const ownStyle: any = Object.assign(classResults.style || {}, style, typeof children !== "object" ? undefined : children?.props.style);

    const inlineStyle = Object.assign({}, parentDescendingStyle, ownStyle);

    if (ownStyle?.fontWeight && !ownStyle.fontFamily && inlineStyle.fontFamily) {
      const variant = getFontFamily(inlineStyle.fontFamily.split("__")[0])?.weight(ownStyle?.fontWeight);
      if (variant) {
        inlineStyle.fontFamily = variant;
      }
    }

    const [descendingStyle, descendingStyleKey] = extractDescendingStyle(ownStyle, inlineStyle);

    return {
      classNames        : classResults.classNames,
      inlineStyle       : inlineStyle,
      descendingStyle   : descendingStyle,
      descendingStyleKey: descendingStyleKey,
    };
  }, [style, classId, parentDescendingStyleKey, key, fontKey, theme]);

  if (inlineStyle.fontFamily) {
    const {fontFamily} = inlineStyle;
    if (!isFontLoaded(fontFamily)) {
      let callback: () => void;
      addFontLoadListener(fontFamily, callback = () => {
        forceUpdate();
        removeFontLoadListener(fontFamily, callback);
      });
      delete inlineStyle.fontFamily;
    }
  }

  const memoDescendingStyle = useMemo(() => [descendingStyle, descendingStyleKey], [descendingStyleKey]);

  const content = renderChildren(children, inlineStyle, classNames, id);

  return descendingStyle ?
    <DescendingStyleContext.Provider value={memoDescendingStyle as any}>
      {content}
    </DescendingStyleContext.Provider> : content as any;
};

export default Object.assign(InlineStyler, {displayName: "InlineStyler"}) as StylerComponent;