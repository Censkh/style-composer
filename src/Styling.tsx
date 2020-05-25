import React                                          from "react";
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";
// @ts-ignore
import styleResolver                                  from "react-native-web/src/exports/StyleSheet/styleResolver";

import {StyleClass}                                                                           from "./class/StyleClass";
import * as Utils                                                                             from "./Utils";
import {DeepFalsyList, Falsy}                                                                 from "./Utils";
import {DYNAMIC_UNIT_REGISTER_CHECK_VALUE, finishDynamicUnitSession, startDynamicUnitSession} from "./unit/DynamicUnit";
import {finishThemeSession, startThemedSession}                                               from "./theme/Theming";
import {finishRuleSession, startRuleSession, StyleRuleInstance}                               from "./rule/StyleRule";
import {FontWeight}                                                                           from "./font/FontFamily";
import {StyleProp}                                                                            from "./component/Styler";

export const DESCENDING_STYLES = ["fontSize", "fontFamily", "fontWeight", "color", "letterSpacing", "textAlign"];

export interface StylingResolution {
  styling: StylingBuilder;
  rules: Record<number, StyleRuleInstance>,
  bakedStyle: Style | null;
  isSimple: boolean;
  hasRules: boolean;
  hasThemed: boolean;
  hasDynamicUnit: boolean;
  dynamicProps: Record<number, string[]>;
  resolvedStyling: Styling;
}

export type Style =
  Omit<ViewStyle & TextStyle & ImageStyle, "fontWeight" | "boxShadow">
  & { boxShadow?: string; fontWeight?: FontWeight; };

export type StylingBuilder<S = Style> = () => Styling<S>;

export type Styling<S = Style> = Record<number, S> & S;

export interface ComputeResults {
  classNames: string[] | null;
  dynamicStyle: Style | null,
  style: Style | null;
}

export function computeClasses(styleClass: StyleClass[] | Falsy, options?: { includeDynamicStyle?: boolean; }): ComputeResults {
  if (!styleClass || styleClass.length === 0) {
    return {classNames: null, style: null, dynamicStyle: null};
  }
  const classNames: string[] = [];
  let style: Style | null = {};
  const dynamicStyle: Style | null = options?.includeDynamicStyle ? {} : null;

  for (const clazz of styleClass) {
    if (clazz.__meta.parent) {
      classNames.push(clazz.__meta.parent.__meta.className);
      const parentStyle = computeStyling(clazz.__meta.parent.__meta, dynamicStyle, classNames);
      if (style) {
        style = Object.assign(style, parentStyle);
      }
    }
    classNames.push(clazz.__meta.className);
    const computedStyle = computeStyling(clazz.__meta, dynamicStyle, classNames);
    if (style) {
      style = Object.assign(style, computedStyle);
    }
  }
  return {classNames, style, dynamicStyle};
}

export const computeStyling = (resolution: StylingResolution, outDynamicStyle?: Style | null, outClassNames?: string[]): Style => {
  const {bakedStyle, hasRules, isSimple, rules, styling, dynamicProps} = resolution;
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
        if (outClassNames) {
          outClassNames.push(ruleInstance.className);
        }
      }
    }
    // when rules are evalled they return 0 instead of false
    style[0] = undefined;
  }

  if (outDynamicStyle) {
    for (const dynamicProp of dynamicProps[0]) {
      (outDynamicStyle as any)[dynamicProp] = style[dynamicProp];
    }
  }

  return style;
};

export const sanitizeStyle = (node: React.ReactNode, style: Style): Style => {
  if (process.env.NODE_ENV === "development") {
    if (node && typeof node === "object" && "type" in node && (node.type as any).propTypes) {
      (node.type as any).propTypes.style = require("prop-types").any;
    }
  }
  delete style.fontWeight;
  return style;
};

/**
 * Removes any theme or query rules from the styling object, leaving only actual style rules
 */
const sanitizeStylingToStyle = (styling: Styling): Style => {
  return Object.keys(styling).reduce((style: any, key: any) => {
    const value = styling[key];
    if (typeof key === "string" && typeof value !== "object" && typeof value !== "function") {
      style[key] = value;
    }
    return style;
  }, {} as Style);
};

export const resolveStyling = (styling: StylingBuilder): StylingResolution => {
  startDynamicUnitSession();
  startThemedSession();
  startRuleSession(true);
  const resolvedStyling = styling();
  const rules = finishRuleSession();
  const hasThemed = finishThemeSession();
  const hasDynamicUnit = finishDynamicUnitSession();
  const hasRules = Object.keys(rules).length > 0;
  const isSimple = !hasRules && !hasThemed && !hasDynamicUnit;

  let dynamicProps: Record<number, string[]> | null = {};

  // if we have themed / dynamic units values in this style, work out which properties they are
  if (hasThemed || hasDynamicUnit) {
    extractDynamicProps(dynamicProps, 0, resolvedStyling);
  }

  let bakedStyle = null;

  // if no rules or theming, bake it!
  if (isSimple) {
    bakedStyle = sanitizeStylingToStyle(resolvedStyling);
  }

  return {
    rules,
    bakedStyle,
    dynamicProps,
    styling,
    hasDynamicUnit,
    hasRules,
    hasThemed,
    isSimple,
    resolvedStyling,
  };
};

/**
 * When the theme session run, theme property functions will return themselves instead of the current theme
 * value and using this method we collect which style rules are themed.
 *
 * Eg.
 * ```
 * () => ({
 *   color: theming.mainColor(),
 * })
 * ```
 * will return an object with:
 * ```
 * {
 *   color: theming.mainColor
 * }
 * ```
 * whilst startThemingSession() is active
 */
const extractDynamicProps = (dynamicProps: Record<number, string[]>, currentScope: number, styling: Styling) => {
  dynamicProps[currentScope] = [];
  for (const key of Object.keys(styling)) {
    const value = (styling as any)[key];
    if (typeof value === "object") {
      extractDynamicProps(dynamicProps, parseInt(key), value);
    } else if (typeof value === "function" || value === DYNAMIC_UNIT_REGISTER_CHECK_VALUE) {
      dynamicProps[currentScope].push(key);
    }
  }
};

export const extractDescendingStyle = (ownStyle: Style | null, computedStyle: Style | null): [Style | null, string] => {
  if (!ownStyle || !computedStyle) return [null, ""];
  let hasDescending = false;
  let descendingKey = "";
  const descendingStyle = DESCENDING_STYLES.reduce((descending, key) => {
    const ownValue = (ownStyle as any)[key];
    let value;
    if (ownValue) {
      hasDescending = true;
      value = ownValue;
    } else {
      value = (computedStyle as any)[key];
    }
    descendingKey += value + "|";
    descending[key] = value;
    return descending;
  }, {} as any);
  if (hasDescending) {
    return [descendingStyle, descendingKey];
  } else {
    return [null, ""];
  }
};

export const processStyle = (...styleProp: DeepFalsyList<Style>): Style => {
  const flatStyle = StyleSheet.flatten(styleProp);
  return Utils.isNative() ? flatStyle : styleResolver.resolve(flatStyle).style || {};
};

export const styleList = (...classes: DeepFalsyList<Style>): StyleProp => {
  if (classes.length < 2) return classes[0];
  return classes;
};