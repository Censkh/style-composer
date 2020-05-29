import React, {useContext, useMemo} from "react";

import {computeClasses, extractCascadingStyle, processStyle} from "../Styling";
import type {StylerComponent, StylerProps}                   from "./Styler";
import {renderChildren}                                      from "./Styler";
import {useForceUpdate, useStylingInternals}                 from "../Hooks";
import CascadingStyleContext, {CascadingStyleContextState}   from "../CascadingStyleContext";

import {addFontLoadListener, getFontFamily, isFontLoaded, removeFontLoadListener} from "../font/FontFamily";

const InlineStyler = (props: StylerProps) => {
  const {children, style, classes} = props;

  const {style: parentCascadingStyle, key: parentCascadingStyleKey} = useContext(CascadingStyleContext);
  const [fontKey, forceUpdate]                                      = useForceUpdate();
  const {id, theme, key, classId, classArray}                       = useStylingInternals(classes);

  const {inlineStyle, cascadingStyle, cascadingStyleKey, classNames} = useMemo(() => {
    const classResults = computeClasses(classArray);

    let ownStyle = processStyle(classResults.style, style, typeof children !== "object" ? undefined : children?.props.style);

    const inlineStyle = Object.assign({}, parentCascadingStyle, ownStyle);

    if (ownStyle?.fontWeight && !ownStyle.fontFamily && inlineStyle.fontFamily) {
      const variant = getFontFamily(inlineStyle.fontFamily.split("__")[0])?.weight(ownStyle?.fontWeight);
      if (variant) {
        inlineStyle.fontFamily = variant;
      }
    }

    const [cascadingStyle, cascadingStyleKey] = extractCascadingStyle(ownStyle, inlineStyle);

    return {
      classNames       : classResults.classNames,
      inlineStyle      : inlineStyle,
      cascadingStyle   : cascadingStyle,
      cascadingStyleKey: cascadingStyleKey,
    };
  }, [style, classId, parentCascadingStyleKey, key, fontKey, theme]);

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

  const memoCascadingStyle = useMemo<CascadingStyleContextState | null>(() => cascadingStyle && {
    style: cascadingStyle,
    key  : cascadingStyleKey,
  }, [cascadingStyleKey]);

  const content = renderChildren(children, inlineStyle, classNames, id);

  return memoCascadingStyle ?
    <CascadingStyleContext.Provider value={memoCascadingStyle}>
      {content}
    </CascadingStyleContext.Provider> : content as any;
};

export default Object.assign(InlineStyler, {displayName: "InlineStyler"}) as StylerComponent;