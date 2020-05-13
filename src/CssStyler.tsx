import {StylerComponent, StylerProps} from "./StylerComponent";
import React, {DOMElement, useMemo}   from "react";
import {useRulesEffect}               from "./Hooks";
import * as Utils                     from "./Utils";

Utils.createStyleSheet("_global", `
div {color:inherit !important;font-size:inherit !important;font-family:inherit!important}
body {font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;}
`);

const CssStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;

  const key = useRulesEffect(classes);

  let {computedStyles, classNames} = useMemo(() => {
    const computedStyles = Object.assign({}, style, typeof children === "string" ? {} : children?.props.style || {});

    let classNames = classes?.flatMap(clazz => {
      const rules = clazz.__meta.rules;
      const classNames = [clazz.__meta.className];
      for (const ruleInstance of Object.values(rules)) {
        if (ruleInstance.rule.check(ruleInstance.options)) {
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
    className: classNames?.join(" "),
  } as any)) : null;
};
Object.defineProperty(CssStyler, "name", {value: "CssStyler"});

export default CssStyler;