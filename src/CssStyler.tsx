import {StylerComponent, StylerProps}        from "./Styler";
import React, {useMemo}                      from "react";
import {useRulesEffect}                      from "./Hooks";
import * as Utils                            from "./Utils";
import {finishRuleSession, startRuleSession} from "./StyleRule";

Utils.createStyleSheet("_global", `
.Styled {color:inherit !important;font-size:inherit !important;font-family:inherit!important}
body {font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;font-size:14px;}
`);

const CssStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;

  const key = useRulesEffect(classes);

  let {computedStyles, classNames} = useMemo(() => {
    const computedStyles = Object.assign({}, style, typeof children === "string" ? {} : children?.props.style || {});

    let classNames = classes?.flatMap(clazz => {
      const rules = clazz.__meta.rules;
      startRuleSession();
      const styling = clazz.__meta.styling();
      finishRuleSession();

      const classNames = [clazz.__meta.className];
      for (const ruleInstance of Object.values(rules)) {
        if (styling[ruleInstance.id]) {
          classNames.push(ruleInstance.className);
        }
      }
      return classNames;
    }) || [];

    if (computedStyles.fontFamily) {
      classNames.push("_font_" + computedStyles.fontFamily);
    }

    return {
      computedStyles: computedStyles,
      classNames:     classNames,
    };
  }, [key, style, classes]);


  return children ? (typeof children === "string" ? <>children</> : React.cloneElement(children, {
    style:     computedStyles,
    className: "Styled " + classNames?.join(" "),
  } as any)) : null;
};
Object.defineProperty(CssStyler, "name", {value: "CssStyler"});

export default CssStyler;