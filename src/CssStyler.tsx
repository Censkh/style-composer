import {StylerComponent, StylerProps}        from "./Styler";
import React, {useMemo}                      from "react";
import {useRulesEffect}                      from "./Hooks";
import * as Utils                            from "./Utils";
import {finishRuleSession, startRuleSession} from "./StyleRule";
import {useTheming}                          from "./Theming";

Utils.setStyleSheet("_global", `
.Styled {color:inherit;font-size:inherit !important;font-family:inherit!important}
body {font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;font-size:14px;}
`);

const CssStyler: StylerComponent = (props: StylerProps) => {
  const {children, style, classes} = props;
  const key = useRulesEffect(classes);

  const theme = useTheming();
  let {computedStyles, classNames} = useMemo(() => {
    const computedStyles = Object.assign({}, style, typeof children === "string" ? {} : children?.props.style || {});

    let classNames = classes?.flatMap(clazz => {
      const classNames = [clazz.__meta.className, clazz.__meta.parent?.__meta.className].filter(Boolean);

      if (clazz.__meta.hasRules || clazz.__meta.hasThemed) {
        const rules = clazz.__meta.rules;
        startRuleSession();
        const styling = clazz.__meta.styling();
        finishRuleSession();

        // if we have themed values, we need to promote them to be in the style prop as
        if (clazz.__meta.hasThemed) {
          for (const themedProp of clazz.__meta.themedProps[0]) {
            (computedStyles as any)[themedProp] = (styling as any)[themedProp];
          }
        }

        // check rules and add appropriate classes
        if (clazz.__meta.hasRules) {
          for (const ruleInstance of Object.values(rules)) {
            if (styling[ruleInstance.id]) {
              classNames.push(ruleInstance.className);
            }
          }
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
  }, [key, style, classes, theme]);

  return children ? (typeof children === "string" ? <>children</> : React.cloneElement(children, {
    style:     computedStyles,
    className: "Styled " + classNames?.join(" "),
  } as any)) : null;
};
Object.defineProperty(CssStyler, "name", {value: "CssStyler"});

export default CssStyler;