import {renderChildren, StylerComponent, StylerProps}        from "./Styler";
import React, {useContext, useLayoutEffect, useMemo, useRef} from "react";
import {useStylingInternals}                                 from "./Hooks";
import {computeClasses, extractDescendingStyle} from "./Styling";
import DescendingStyleContext                   from "./DescendingStyleContext";

const CssOptimizedStyler = (props: StylerProps) => {
  const {children, style, classes} = props;

  const {id, theme, key, classId, classArray} = useStylingInternals(classes);
  const [parentDescendingStyle, parentDescendingStyleKey] = useContext(DescendingStyleContext);

  let {inlineStyle, descendingStyle, classNames, descendingStyleKey} = useMemo(() => {
    const classResults = computeClasses(classArray, {includeDynamicStyle: true});

    const inlineStyle = Object.assign(classResults.dynamicStyle || {}, style, typeof children !== "object" ? undefined : children?.props.style);
    const [descendingStyle, descendingStyleKey] = extractDescendingStyle(classResults.style, Object.assign({}, parentDescendingStyle, classResults.style));

    return {
      inlineStyle    : inlineStyle,
      descendingStyle: descendingStyle,
      descendingStyleKey: descendingStyleKey,
      classNames     : classResults.classNames,
    };
  }, [key, style, classId, theme, parentDescendingStyleKey]);

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

  const memoDescendingStyle = useMemo(() => [descendingStyle, descendingStyleKey], [descendingStyleKey]);

  const content = renderChildren(children, inlineStyle, classNames, id);

  return descendingStyle ?
    <DescendingStyleContext.Provider value={memoDescendingStyle as any}>
      {content}
    </DescendingStyleContext.Provider> : content as any;
};

export default Object.assign(CssOptimizedStyler, {displayName: "CssOptimizedStyler"}) as StylerComponent;