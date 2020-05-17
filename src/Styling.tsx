import React                              from "react";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";

import {finishRuleSession, startRuleSession, StyleRuleInstance} from "./StyleRule";
import StyleClassBuilder                                        from "./StyleClassBuilder";

if (process.env.NODE_ENV === "development") {
  const actualError = console.error;
  console.error = function(...args: any[]) {
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
    hasRules: boolean;
    hasThemed: boolean;
    parent: StyleClass | null;
    rules: Record<number, StyleRuleInstance>,
    styling: StylingBuilder;
    bakedStyle: Style | null;
    variants: V | null;
    themedProps: Record<number, string[]>
  }
}

export function composeClass(name: string, styling: StylingBuilder): StyleClassBuilder {
  return new StyleClassBuilder(name, styling);
}

export function computeStyles(styledClass: StyleClass): Style {
  const {bakedStyle, hasRules, hasThemed, rules, styling} = styledClass.__meta;
  if (!hasRules  && !hasThemed && bakedStyle) return bakedStyle;

  startRuleSession();
  let style: any = styling();
  finishRuleSession();

  if (hasRules) {
    Object.values(rules).forEach((ruleInstance) => {
      const ruleStyle = (style as any)[ruleInstance.id] as Style;
      (style as any)[ruleInstance.id] = undefined;
      if (ruleInstance.rule.check(ruleInstance.options)) {
        style = Object.assign(style, ruleStyle);
      }
    });
    // when rules are evalled they return 0 instead of false
    style[0] = undefined;
  }

  return style;
}

type DeepClassList = Array<StyleClass | undefined | false | null | DeepClassList>;

const flatAndRemoveFalsy = (array: Array<any>): Array<any> => {
  return array.reduce((flatArray, item) => {
    if (!item) return flatArray;
    if (Array.isArray(item)) {
      flatArray.push(...flatAndRemoveFalsy(item));
    } else {
      flatArray.push(item);
    }
    return flatArray;
  }, []);
};

export const classList = (...classes: DeepClassList) => {
  if (!classes) return classes;
  return Array.isArray(classes) ? flatAndRemoveFalsy(classes) : [classes];
};