import React                              from "react";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";

import {finishRuleSession, startRuleSession} from "./rule/StyleRule";
import {StyleClass}                          from "./class/StyleClass";
import {Falsy}                               from "./Utils";

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

export interface ComputeResults {
  classNames: string[] | null;
  themeStyle: Style | null,
  style: Style | null;
}

export function computeClasses(styleClass: StyleClass[] | Falsy, options: { includeStyle?: boolean; includeThemeStyle?: boolean; }): ComputeResults {
  if (!styleClass || styleClass.length === 0) {
    return {classNames: null, style: null, themeStyle: null};
  }
  const classNames: string[] = [];
  let style: Style | null = options.includeStyle ? {} : null;
  const themeStyle: Style | null = options.includeThemeStyle ? {} : null;

  for (const clazz of styleClass) {
    if (clazz.__meta.parent) {
      const parentStyle = computeClassStyle(clazz.__meta.parent, themeStyle, classNames);
      if (style) {
        style = Object.assign(style, parentStyle);
      }
      classNames.push(clazz.__meta.parent.__meta.className);
    }
    const computedStyle = computeClassStyle(clazz, themeStyle, classNames);
    if (style) {
      style = Object.assign(style, computedStyle);
    }
    classNames.push(clazz.__meta.className);
  }
  return {classNames, style, themeStyle};
}

function computeClassStyle(styledClass: StyleClass, themeStyle: Style | null, classNames: string[]): Style {
  const {bakedStyle, hasRules, hasThemed, rules, styling} = styledClass.__meta;
  if (!hasRules && !hasThemed && bakedStyle) {
    return bakedStyle;
  }

  startRuleSession();
  let style: any = styling();
  finishRuleSession();

  if (hasRules) {
    for (const ruleInstance of Object.values(rules)) {
      const ruleStyle = (style as any)[ruleInstance.id] as Style;
      (style as any)[ruleInstance.id] = undefined;
      if (ruleStyle) {
        style = Object.assign(style, ruleStyle);
        classNames.push(ruleInstance.className);
      }
    }
    // when rules are evalled they return 0 instead of false
    style[0] = undefined;
  }

  if (hasThemed && themeStyle) {
    for (const themedProp of styledClass.__meta.themedProps[0]) {
      (themeStyle as any)[themedProp] = style[themedProp];
    }
  }

  return style;
}

