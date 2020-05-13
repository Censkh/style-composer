import React                              from "react";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";

import {finishRuleSession, startRuleSession, StyleRuleInstance} from "./StyleRule";
import StyleClassBuilder                                        from "./StyleClassBuilder";

if (process.env.NODE_ENV === "development") {
  const actualError = console.error;
  console.error = function (...args: any[]) {
    if (args.length > 0 && typeof args[0] === "string") {
      if (args[0].startsWith("Warning: Failed prop type: Invalid props.style key") || args[0].startsWith("Warning: Using the \"className\"")) {
        return;
      }
    }
    return actualError.apply(this, args as any);
  };
}

export type Style = ViewStyle & TextStyle & ImageStyle & { boxShadow?: string };

export type StylingBuilder = () => Styling;

export type Styling = Style & Record<number, Style>;

export type StyleClass<V extends Record<string, StyleClass> = {}> = V & {
  __meta: {
    name: string;
    className: string;
    parent: StyleClass | null;
    rules: Record<number, StyleRuleInstance>,
    styling: StylingBuilder;
    variants: V | null;
  }
}

export function composeClass(name: string, styling: StylingBuilder): StyleClassBuilder {
  return new StyleClassBuilder(name, styling);
}

export function computeStyles(styledClass: StyleClass): Style {
  startRuleSession();
  let style: Style = styledClass.__meta.styling();
  finishRuleSession();

  Object.values(styledClass.__meta.rules).forEach((ruleInstance) => {
    const ruleStyle = (style as any)[ruleInstance.id] as Style;
    (style as any)[ruleInstance.id] = undefined;
    if (ruleInstance.rule.check(ruleInstance.options)) {
      style = Object.assign(style, ruleStyle);
    }
  });

  return style;
}