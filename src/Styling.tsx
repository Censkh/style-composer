import React                              from "react";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";

import {StyleClass} from "./class/StyleClass";
import {Falsy}      from "./Utils";

export type Style = ViewStyle & TextStyle & ImageStyle & { boxShadow?: string };

export type StylingBuilder = () => Styling;

export type Styling = Style & Record<number, Style>;

export interface ComputeResults {
  classNames: string[] | null;
  dynamicStyle: Style | null,
  style: Style | null;
}

export function computeClasses(styleClass: StyleClass[] | Falsy, options: { includeStyle?: boolean; includeThemeStyle?: boolean; }): ComputeResults {
  if (!styleClass || styleClass.length === 0) {
    return {classNames: null, style: null, dynamicStyle: null};
  }
  const classNames: string[] = [];
  let style: Style | null = options.includeStyle ? {} : null;
  const dynamicStyle: Style | null = options.includeThemeStyle ? {} : null;

  for (const clazz of styleClass) {
    if (clazz.__meta.parent) {
      classNames.push(clazz.__meta.parent.__meta.className);
      const parentStyle = computeClassStyle(clazz.__meta.parent, dynamicStyle, classNames);
      if (style) {
        style = Object.assign(style, parentStyle);
      }
    }
    classNames.push(clazz.__meta.className);
    const computedStyle = computeClassStyle(clazz, dynamicStyle, classNames);
    if (style) {
      style = Object.assign(style, computedStyle);
    }
  }
  return {classNames, style, dynamicStyle};
}

function computeClassStyle(styledClass: StyleClass, dynamicStyle: Style | null, classNames: string[]): Style {
  const {bakedStyle, hasRules, isSimple, rules, styling, dynamicProps} = styledClass.__meta;
  if (isSimple && bakedStyle) {
    return bakedStyle;
  }

  let style: any = styling();

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

  if (dynamicStyle) {
    for (const dynamicProp of dynamicProps[0]) {
      (dynamicStyle as any)[dynamicProp] = style[dynamicProp];
    }
  }

  return style;
}

export const sanitizeStyle = (node: React.ReactNode, style: Style): Style => {
  if (process.env.NODE_ENV === "development") {
    if (node && typeof node === "object" && "type" in node && (node.type as any).propTypes) {
      (node.type as any).propTypes.style = require("prop-types").any;
    }
  }
  return style;
};