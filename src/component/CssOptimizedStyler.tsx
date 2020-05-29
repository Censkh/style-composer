import React, {useContext, useLayoutEffect, useMemo, useRef} from "react";

import {renderChildren, StylerComponent, StylerProps}        from "./Styler";
import {useStylingInternals}                                 from "../Hooks";
import {computeClasses, extractCascadingStyle, processStyle} from "../Styling";
import CascadingStyleContext, {CascadingStyleContextState}   from "../CascadingStyleContext";
import {getFontClassName, getFontFamily}                     from "../font/FontFamily";

const CssOptimizedStyler = (props: StylerProps) => {
  const {children, style, classes} = props;

  const {id, theme, key, classId, classArray}                       = useStylingInternals(classes);
  const {style: parentCascadingStyle, key: parentCascadingStyleKey} = useContext(CascadingStyleContext);

  let {inlineStyle, cascadingStyle, classNames, cascadingStyleKey} = useMemo(() => {
    const classResults = computeClasses(classArray, {includeDynamicStyle: true});

    const inlineStyle = processStyle(classResults.dynamicStyle, style, typeof children !== "object" ? undefined : children?.props.style);

    const ownStyle = classResults.style;

    const computedStyle = Object.assign({}, parentCascadingStyle, ownStyle);

    let classNames = classResults.classNames;

    if (ownStyle?.fontWeight && !ownStyle.fontFamily && computedStyle.fontFamily) {
      const variant = getFontFamily(computedStyle.fontFamily.split("__")[0])?.weight(ownStyle?.fontWeight);
      if (variant) {
        ownStyle.fontFamily = variant;
        const fontClassName = getFontClassName(variant);
        if (classNames) {
          classNames.push(fontClassName);
        } else {
          classNames = [fontClassName];
        }
      }
    }

    const [cascadingStyle, cascadingStyleKey] = extractCascadingStyle(ownStyle, computedStyle);

    return {
      inlineStyle      : inlineStyle,
      cascadingStyle   : cascadingStyle,
      cascadingStyleKey: cascadingStyleKey,
      classNames       : classNames,
    };
  }, [key, style, classId, theme, parentCascadingStyleKey]);

  const classesString = (classNames ? " " + classNames.join(" ") : "");

  const elementRef  = useRef<any>();
  const baseClasses = useRef<string>();
  useLayoutEffect(() => {
    if (!elementRef.current) {
      // @ts-ignore
      elementRef.current = (window as any).document.querySelector(`[data-id="${id}"]`);
      if (!elementRef.current) {
        console.error("[style-composer] Prop 'data-id' was not passed down to rendered element. This may mean this element cannot be optimized for css");
        return;
      }
      baseClasses.current = elementRef.current?.className;
    }
    elementRef.current.setAttribute("class", baseClasses.current + " styled" + classesString);
  }, [classesString]);

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

export default Object.assign(CssOptimizedStyler, {displayName: "CssOptimizedStyler"}) as StylerComponent;