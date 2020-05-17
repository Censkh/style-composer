import {StylerComponent, StylerProps}        from "./Styler";
import React, {useMemo}                      from "react";
import {useRulesEffect}                      from "./Hooks";
import {finishRuleSession, startRuleSession} from "./rule/StyleRule";
import {useTheming}                          from "./theme/Theming";
import {classesId, classList}                from "./class/StyleClass";
import {computeClasses}                      from "./Styling";

const CssStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;
  const classArray = classList(classes);
  const classId = classesId(classArray);
  const key = useRulesEffect(classArray, classId);

  const theme = useTheming();
  let {computedStyles, classNames} = useMemo(() => {
    const classResults = computeClasses(classArray, {includeThemeStyle: true});

    const computedStyles = Object.assign(classResults.themeStyle || {}, style, typeof children === "string" ? undefined : children?.props.style);

    return {
      computedStyles: computedStyles,
      classNames    : classResults.classNames,
    };
  }, [key, style, classId, theme]);

  return children ? (typeof children === "string" ? <>children</> : React.cloneElement(children, {
    style    : computedStyles,
    className: "Styled " + classNames?.join(" "),
  } as any)) : null;
};
Object.defineProperty(CssStyler, "name", {value: "CssStyler"});

export default React.memo(CssStyler);