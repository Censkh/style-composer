import {renderChildren, StylerComponent, StylerProps} from "./Styler";
import React, {useLayoutEffect, useMemo, useRef}      from "react";
import {useStylingInternals}                          from "./Hooks";
import {computeClasses}                               from "./Styling";

const CssOptimizedStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;

  const {id, theme, key, classId, classArray} = useStylingInternals(classes);

  let {computedStyles, classNames} = useMemo(() => {
    const classResults = computeClasses(classArray, {includeThemeStyle: true});

    const computedStyles = Object.assign(classResults.dynamicStyle || {}, style, typeof children !== "object" ? undefined : children?.props.style);

    return {
      computedStyles: computedStyles,
      classNames    : classResults.classNames,
    };
  }, [key, style, classId, theme]);

  const classesString = (classNames ? " " + classNames.join(" ") : "");

  const elementRef = useRef<any>();
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

  return renderChildren(children, computedStyles, classNames, id);
};

export default React.memo(Object.assign(CssOptimizedStyler, {displayName: "CssOptimizedStyler"}));