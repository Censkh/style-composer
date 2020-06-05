import React                                                          from "react";
import {ImageStyle, RecursiveArray, StyleSheet, TextStyle, ViewStyle} from "react-native";

import {StyleClass}                                                                           from "./class/StyleClass";
import * as Utils                                                                             from "./Utils";
import {Falsy}                                                                                from "./Utils";
import {DYNAMIC_UNIT_REGISTER_CHECK_VALUE, finishDynamicUnitSession, startDynamicUnitSession} from "./unit/DynamicUnit";
import {finishThemeSession, startThemedSession}                                               from "./theme/Theming";
import {finishRuleSession, startRuleSession, StyleRuleInstance}                               from "./rule/StyleRule";

export const CASCADING_STYLES = ["fontSize", "fontFamily", "fontWeight", "color", "letterSpacing", "textAlign"];

export interface StylingResolution {
  sheetId: number | null;
  styling: StylingBuilder;
  rules: Record<number, StyleRuleInstance>,
  bakedStyle: Style;
  isSimple: boolean;
  hasRules: boolean;
  hasThemed: boolean;
  hasDynamicUnit: boolean;
  hasDynamicProps: boolean;
  dynamicProps: Record<number, string[]>;
  resolvedStyling: Styling;
}

export type Style =
  Omit<ViewStyle & TextStyle & ImageStyle, "boxShadow">
  & { boxShadow?: string; };

export type StylingBuilder<S = Style> = () => Styling<S>;

export type Styling<S = Style> = Record<number, S> & S;

export interface ComputeResults {
  classNames: string[] | null;
  style: ComputedStyleList;
}

export function computeClasses(styleClass: StyleClass[] | Falsy): ComputeResults {
  if (!styleClass || styleClass.length === 0) {
    return {classNames: null, style: []};
  }
  const classNames: string[]     = [];
  const style: ComputedStyleList = [];

  for (const clazz of styleClass) {
    if (clazz.__meta.parent) {
      classNames.push(clazz.__meta.parent.__meta.className);
      internalComputedStyling(clazz.__meta.parent.__meta, style, classNames);
    }
    classNames.push(clazz.__meta.className);
    internalComputedStyling(clazz.__meta, style, classNames);
  }

  return {classNames, style};
}

export type ComputedStyleList = Array<Style | number>;

export const computeStyling = (resolution: StylingResolution): Style => {
  const style: ComputedStyleList = [];
  internalComputedStyling(resolution, style);
  return StyleSheet.flatten(style as any);
};

const internalComputedStyling = (resolution: StylingResolution, outStyle: ComputedStyleList, outClassNames?: string[]): void => {
  const {bakedStyle, hasRules, sheetId, isSimple, rules, styling, hasDynamicProps, dynamicProps} = resolution;
  if (isSimple) {
    outStyle.push((sheetId || bakedStyle) as any);
    return;
  }

  startRuleSession();
  const style: any = styling();
  finishRuleSession();

  outStyle.push((sheetId || style) as any);

  if (hasDynamicProps) {
    const dynamicStyle: Style = {};
    for (const dynamicProp of dynamicProps[0]) {
      (dynamicStyle as any)[dynamicProp] = style[dynamicProp];
    }
    outStyle.push(dynamicStyle);
  }

  if (hasRules) {
    for (const ruleInstance of Object.values(rules)) {
      const ruleStyle                 = (style as any)[ruleInstance.id] as Style;
      (style as any)[ruleInstance.id] = undefined;
      if (ruleStyle) {

        // add dyanmic props for rule
        const ruleDynamicProps = dynamicProps[ruleInstance.id];
        if (hasDynamicProps && ruleDynamicProps) {
          const ruleDynamicStyle: Style = {};
          for (const dynamicProp of ruleDynamicProps) {
            (ruleDynamicStyle as any)[dynamicProp] = (ruleStyle as any)[dynamicProp];
          }
          outStyle.push(ruleDynamicStyle);
        }

        outStyle.push((ruleInstance.sheetId || ruleStyle));
        if (outClassNames) {
          outClassNames.push(ruleInstance.className);
        }
      }
    }
    // when rules are evalled they return 0 instead of false
    style[0] = undefined;
  }
};

export const sanitizeStyleList = (node: React.ReactNode, style: RecursiveArray<Style | Falsy>): Style[] => {
  if (style) {
    return Utils.flatAndRemoveFalsy(style);
  }
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

  const rules          = finishRuleSession();
  const hasThemed      = finishThemeSession();
  const hasDynamicUnit = finishDynamicUnitSession();
  const hasRules       = Object.keys(rules).length > 0;
  const isSimple       = !hasRules && !hasThemed && !hasDynamicUnit;

  const dynamicProps: Record<number, string[]> | null = {};
  const hasDynamicProps                               = hasThemed || hasDynamicUnit;

  // if we have themed / dynamic units values in this style, work out which properties they are
  if (hasDynamicProps) {
    extractDynamicProps(dynamicProps, 0, resolvedStyling);
  }


  const bakedStyle = sanitizeStylingToStyle(resolvedStyling);

  return {
    sheetId        : null,
    rules          : rules,
    bakedStyle     : bakedStyle,
    dynamicProps   : dynamicProps,
    styling        : styling,
    hasDynamicProps: hasDynamicProps,
    hasDynamicUnit : hasDynamicUnit,
    hasRules       : hasRules,
    hasThemed      : hasThemed,
    isSimple       : isSimple,
    resolvedStyling: resolvedStyling,
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
  for (const key of Object.keys(styling)) {
    const value = (styling as any)[key];
    if (typeof value === "object") {
      extractDynamicProps(dynamicProps, parseInt(key), value);
    } else if (typeof value === "function" || value === DYNAMIC_UNIT_REGISTER_CHECK_VALUE || (typeof value === "string" && value.includes(DYNAMIC_UNIT_REGISTER_CHECK_VALUE.toString()))) {
      (dynamicProps[currentScope] || (dynamicProps[currentScope] = [])).push(key);
    }
  }
};

export const extractCascadingStyle = (ownStyle: Style | null, computedStyle: Style | null): [Style | null, string] => {
  if (!ownStyle || !computedStyle) return [null, ""];
  let hasCascading     = false;
  let cascadingKey     = "";
  const cascadingStyle = CASCADING_STYLES.reduce((cascading, key) => {
    const ownValue = (ownStyle as any)[key];
    let value;
    if (ownValue) {
      hasCascading = true;
      value        = ownValue;
    } else {
      value = (computedStyle as any)[key];
    }
    cascadingKey += value + "|";
    cascading[key] = value;
    return cascading;
  }, {} as any);
  if (hasCascading) {
    return [cascadingStyle, cascadingKey];
  } else {
    return [null, ""];
  }
};