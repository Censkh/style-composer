import React                                                                           from "react";
import {ImageStyle, RecursiveArray, RegisteredStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";

import {registerStyleSheets, StyleClass}                                                      from "./class/StyleClass";
import * as Utils                                                                             from "./Utils";
import {Falsy}                                                                                from "./Utils";
import {DYNAMIC_UNIT_REGISTER_CHECK_VALUE, finishDynamicUnitSession, startDynamicUnitSession} from "./unit/DynamicUnit";
import {finishThemeSession, startThemedSession}                                               from "./theme/Theming";
import {finishRuleSession, startRuleSession, StyleRuleInstance}                               from "./rule/StyleRule";
import {finishImportantSession, isImportantValue, startImportantSession}                      from "./Important";
import {StyleProp}                                                                            from "./component/Styler";
import {ChildQuery}                                                                           from "./rule/ChildRule";

export const CASCADING_STYLES = ["fontSize", "fontFamily", "fontWeight", "color", "letterSpacing", "textAlign"];

export interface StylingResolution {
  sheetId: number | null;
  styling: StylingBuilder;
  rules: Record<number, StyleRuleInstance>,
  staticStyle: StyleObject;
  staticImportantStyle: StyleObject | null;
  isSimple: boolean;
  hasRules: boolean;
  hasThemed: boolean;
  hasDynamicUnit: boolean;
  hasDynamicProps: boolean;
  dynamicProps: Record<number, string[]>;
  hasImportant: boolean;
  importantProps: Record<number, string[]>;
  resolvedStyling: Styling;
}

export type StyleObject = ViewStyle & TextStyle & ImageStyle;

export type Style = StyleObject | RegisteredStyle<any>;

export type StylingBuilder<S = StyleObject> = () => Styling<S>;

export type Styling<S = StyleObject> = Record<number, S> & S;

export interface StylingSession {
  pseudoClasses?: string[];
  childRules?: Array<StyleRuleInstance<ChildQuery>>;
}

export interface ComputeResults {
  classNames: string[];
  style: ComputedStyleList;
}

const DEFAULT_SESSION: StylingSession = {};

export function computeClasses(styleClass: StyleClass[] | Falsy, styleProp?: StyleProp, session?: StylingSession): ComputeResults {
  if (!styleClass || styleClass.length === 0) {
    return {classNames: [], style: styleProp ? [styleProp] as any : []};
  }

  const computedSession                   = session || DEFAULT_SESSION;
  const classNames: string[]              = [];
  const style: ComputedStyleList          = [];
  const importantStyle: ComputedStyleList = [];

  for (const clazz of styleClass) {
    if (clazz.__meta.parent) {
      classNames.push(clazz.__meta.parent.__meta.className);
      internalComputedStyling(clazz.__meta.parent.__meta, computedSession, style, importantStyle, classNames);
    }
    classNames.push(clazz.__meta.className);
    internalComputedStyling(clazz.__meta, computedSession, style, importantStyle, classNames);
  }

  if (styleProp) {
    style.push(styleProp as any);
  }

  if (importantStyle.length > 0) {
    style.push(...importantStyle);
  }

  return {classNames: classNames, style: style};
}

export type ComputedStyleList = Array<Style>;

export const computeStyling = (resolution: StylingResolution): StyleObject => {
  const session                           = {};
  const style: ComputedStyleList          = [];
  const importantStyle: ComputedStyleList = [];
  internalComputedStyling(resolution, session, importantStyle, style);
  return StyleSheet.flatten([style, importantStyle]);
};

const internalComputedStyling = (resolution: StylingResolution, session: StylingSession, outStyle: ComputedStyleList, outImportantStyle: ComputedStyleList, outClassNames?: string[]): void => {
  if ("className" in resolution) {
    registerStyleSheets(resolution);
  }

  const {
          staticStyle,
          staticImportantStyle,
          hasRules,
          sheetId,
          isSimple,
          rules,
          styling,
          hasDynamicProps,
          dynamicProps,
          hasImportant,
          importantProps,
        } = resolution;

  if (isSimple) {
    outStyle.push((sheetId || staticStyle) as any);
    if (staticImportantStyle) {
      outImportantStyle.push(staticImportantStyle);
    }
    return;
  }

  startRuleSession(false, session);
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

  if (hasImportant) {
    const importantStyle: Style = {};
    for (const importantProp of importantProps[0]) {
      (importantStyle as any)[importantProp] = sanitizeStyleValue(style[importantProp]);
    }
    outImportantStyle.push(importantStyle);
  }

  if (hasRules) {
    for (const ruleInstance of Object.values(rules)) {
      const ruleStyle                 = (style as any)[ruleInstance.id] as Style;
      (style as any)[ruleInstance.id] = undefined;
      if (ruleStyle) {
        outStyle.push((ruleInstance.sheetId || ruleStyle) as any);

        // add dynamic props for rule
        const ruleDynamicProps = dynamicProps[ruleInstance.id];
        if (hasDynamicProps && ruleDynamicProps) {
          const ruleDynamicStyle: Style = {};
          for (const dynamicProp of ruleDynamicProps) {
            (ruleDynamicStyle as any)[dynamicProp] = (ruleStyle as any)[dynamicProp];
          }
          outStyle.push(ruleDynamicStyle);
        }

        // add important props for rule
        const ruleImportantProps = importantProps[ruleInstance.id];
        if (hasImportant && ruleImportantProps) {
          const ruleImportantStyle: Style = {};
          for (const importantProp of ruleImportantProps) {
            (ruleImportantStyle as any)[importantProp] = (ruleStyle as any)[importantProp];
          }
          outImportantStyle.push(ruleImportantStyle);
        }

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
  if (process.env.NODE_ENV === "development") {
    if (node && typeof node === "object" && "type" in node && (node.type as any).propTypes) {
      delete (node.type as any).propTypes.style;
    }
  }

  if (style) {
    return Utils.flatAndRemoveFalsy(style);
  }
  return style;
};

export function sanitizeStyleValue<T extends string | number>(value: T): T {
  return (typeof value === "number" ? Number(value) : String(value)) as any;
}

/**
 * Removes any theme or query rules from the styling object, leaving only actual style rules
 */
export const sanitizeStylingToStaticStyle = (styling: Styling | StyleObject): { style: StyleObject, importantStyle: StyleObject | null } => {
  let importantStyle: StyleObject | null = null;
  return {
    style         : Object.keys(styling).reduce((style: any, key: any) => {
      const value = (styling as any)[key];
      if (typeof key === "string" && (!isDynamicValue(value) || isImportantValue(value))) {
        const sanitizedValue = sanitizeStyleValue(value);
        if (isImportantValue(value)) {
          if (!importantStyle) {
            importantStyle = {};
          }
          (importantStyle as any)[key] = sanitizedValue;
        }
        style[key] = sanitizedValue;
      }
      return style;
    }, {} as StyleObject),
    importantStyle: importantStyle,
  };
};

export const resolveStyling = (styling: StylingBuilder): StylingResolution => {
  startDynamicUnitSession();
  startThemedSession();
  startRuleSession(true);
  startImportantSession();

  const resolvedStyling = styling();

  const rules          = finishRuleSession();
  const hasThemed      = finishThemeSession();
  const hasDynamicUnit = finishDynamicUnitSession();
  const hasImportant   = finishImportantSession();

  const hasRules = Object.keys(rules).length > 0;
  const isSimple = !hasRules && !hasThemed && !hasDynamicUnit;

  const dynamicProps: Record<number, string[]> | null = {0: []};
  const hasDynamicProps                               = hasThemed || hasDynamicUnit;

  // if we have themed / dynamic units values in this style, work out which properties they are
  if (hasDynamicProps) {
    extractDynamicProps(dynamicProps, 0, resolvedStyling);
  }

  const importantProps: Record<number, string[]> | null = {0: []};
  // if we have important values, extract which ones they are
  if (hasImportant) {
    extractImportantProps(importantProps, 0, resolvedStyling);
  }

  const {style, importantStyle} = sanitizeStylingToStaticStyle(resolvedStyling);

  return {
    sheetId             : null,
    rules               : rules,
    staticStyle         : style,
    staticImportantStyle: importantStyle,
    hasImportant        : hasImportant,
    importantProps      : importantProps,
    dynamicProps        : dynamicProps,
    styling             : styling,
    hasDynamicProps     : hasDynamicProps,
    hasDynamicUnit      : hasDynamicUnit,
    hasRules            : hasRules,
    hasThemed           : hasThemed,
    isSimple            : isSimple,
    resolvedStyling     : resolvedStyling,
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
    } else if (isDynamicValue(value)) {
      (dynamicProps[currentScope] || (dynamicProps[currentScope] = [])).push(key);
    }
  }
};

const extractImportantProps = (importantProps: Record<number, string[]>, currentScope: number, styling: Styling) => {
  for (const key of Object.keys(styling)) {
    const value = (styling as any)[key];
    if (isImportantValue(value)) {
      (styling as any)[key] = sanitizeStyleValue(value);
      (importantProps[currentScope] || (importantProps[currentScope] = [])).push(key);
    } else if (typeof value === "object") {
      extractImportantProps(importantProps, parseInt(key), value);
    }
  }
};

export const isDynamicValue = (value: any): boolean => {
  return typeof value === "object" ||
    typeof value === "function" ||
    value === DYNAMIC_UNIT_REGISTER_CHECK_VALUE ||
    (typeof value === "string" && value.includes(DYNAMIC_UNIT_REGISTER_CHECK_VALUE.toString()));
};

export const extractCascadingStyle = (ownStyle: StyleObject | null, computedStyle: StyleObject | null): [StyleObject | null, string] => {
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
