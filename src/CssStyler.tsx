import {StylerComponent, StylerProps}                      from "./Styler";
import React, {useLayoutEffect, useMemo, useRef, useState} from "react";
import {useRulesEffect}                                    from "./Hooks";
import {useTheming}                                        from "./theme/Theming";
import {classesId, classList}                              from "./class/StyleClass";
import {computeClasses, sanitizeStyle}                     from "./Styling";

const CssStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;
  const classArray = classList(classes);
  const classId = classesId(classArray);
  const key = useRulesEffect(classArray, classId);
  const [id] = useState(Math.floor(Math.random() * 100000000).toString());

  const theme = useTheming();
  let {computedStyles, classNames} = useMemo(() => {
    const classResults = computeClasses(classArray, {includeThemeStyle: true});

    const computedStyles = Object.assign(classResults.themeStyle || {}, style, typeof children === "string" ? undefined : children?.props.style);

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
      baseClasses.current = elementRef.current?.className;
    }
    elementRef.current.setAttribute("class", baseClasses.current + " styled" + classesString);
  }, [classesString]);


  return children ? (typeof children === "string" ? <>children</> : React.cloneElement(children, {
    style    : sanitizeStyle(children, computedStyles),
    "data-id": id,
  } as any)) : null;
};
Object.defineProperty(CssStyler, "name", {value: "CssStyler"});

export default React.memo(CssStyler);