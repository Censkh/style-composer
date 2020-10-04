import React                                                                           from "react";
import {ImageStyle, RecursiveArray, RegisteredStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";

import {registerStyleSheets, StyleClass}                                                      from "./class/StyleClass";
import * as Utils                                                                             from "./Utils";
import {Falsy}                                                                                from "./Utils";
import {DYNAMIC_UNIT_REGISTER_CHECK_VALUE, finishDynamicUnitSession, startDynamicUnitSession} from "./unit/DynamicUnit";
import {finishThemeSession, startThemedSession}                                               from "./theme/Theming";
import {finishRuleSession, startRuleSession, StyleRule, StyleRules}                           from "./rule/StyleRule";
import {finishImportantSession, isImportantValue, startImportantSession}                      from "./Important";
import {StyleProp}                                                                            from "./component/Styler";
import {ChildQuery}                                                                           from "./rule/ChildRule";

export const CASCADING_STYLES = ["fontSize", "fontFamily", "fontWeight", "color", "letterSpacing", "textAlign"];

export interface StyleScope {
  id: number;
  className: string;
  sheetId: number | null;
  staticStyle: StyleObject;
  staticImportantStyle: StyleObject | null;
  isSimple: boolean;
  hasRules: boolean;
  hasThemed: boolean;
  hasDynamicUnit: boolean;
  hasDynamicProps: boolean;
  dynamicProps: string[];
  hasImportant: boolean;
  importantProps: string[];
  resolvedStyling: Styling;
  rules: StyleRules,
  scopes: Record<number, StyleScope>;
}

export interface StylingResolution {
  stylingBuilder: StylingBuilder;
  rootScope: StyleScope;
  hasAnyRules: boolean;
  hasAnyThemed: boolean;
  hasAnyDynamicProps: boolean;
  hasAnyImportant: boolean;
}

export type StyleObject = ViewStyle & TextStyle & ImageStyle;

export type Style = StyleObject | RegisteredStyle<any>;

export type StylingBuilder<S = StyleObject> = () => Styling<S>;

export type Styling<S = StyleObject> = Record<number, S> & S;

export interface StylingSession {
  pseudoClasses?: string[];
  applicableChildRules?: Array<StyleRule<ChildQuery>>;
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

  if (computedSession.applicableChildRules?.length) {
    for (const childRule of computedSession.applicableChildRules) {
      computeScopeStyle(childRule.scope!, style, importantStyle, classNames);
    }
  }

  for (const clazz of styleClass) {
    if (clazz.__meta.parent) {
      internalComputedStyling(clazz.__meta.parent.__meta, computedSession, style, importantStyle, classNames);
    }
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

const extractDynamicPropsToStyle = (styling: Styling<any>, dynamicProps: string[]): StyleObject => {
  const dynamicStyle: Style = {};
  for (const dynamicProp of dynamicProps) {
    (dynamicStyle as any)[dynamicProp] = styling[dynamicProp];
  }
  return dynamicStyle;
};

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
    registerStyleSheets((resolution as any).rootScope);
  }

  const {
          rootScope,
          stylingBuilder,
        } = resolution;

  if (rootScope.isSimple) {
    const {sheetId, staticStyle, className, staticImportantStyle} = rootScope;
    if (outClassNames) {
      outClassNames.push(className);
    }
    outStyle.push((sheetId || staticStyle) as any);
    if (staticImportantStyle) {
      outImportantStyle.push(staticImportantStyle);
    }
    return;
  }

  startRuleSession(false, resolution, session);
  const styling = stylingBuilder();
  finishRuleSession();
  rootScope.resolvedStyling = styling;

  computeScopeStyle(rootScope, outStyle, outImportantStyle, outClassNames);

  // when rules are evalled they return 0 instead of false
  (styling as any)[0] = undefined;
};

const computeScopeStyle = (scope: StyleScope, outStyle: ComputedStyleList, outImportantStyle: ComputedStyleList, outClassNames?: string[]): void => {
  const {sheetId, resolvedStyling, isSimple, className, staticStyle, staticImportantStyle, rules, hasDynamicProps, hasImportant, hasRules, importantProps, dynamicProps} = scope;
  if (outClassNames) {
    outClassNames.push(className);
  }

  if (isSimple) {
    outStyle.push((sheetId || staticStyle) as any);
    if (staticImportantStyle) {
      outImportantStyle.push(staticImportantStyle);
    }
    return;
  }

  outStyle.push((sheetId || resolvedStyling) as any);

  if (hasDynamicProps) {
    outStyle.push(extractDynamicPropsToStyle(resolvedStyling, dynamicProps));
  }

  if (hasImportant) {
    const importantStyle: Style = {};
    for (const importantProp of importantProps) {
      (importantStyle as any)[importantProp] = sanitizeStyleValue((resolvedStyling as any)[importantProp]);
    }
    outImportantStyle.push(importantStyle);
  }

  if (hasRules) {
    for (const ruleInstance of Object.values(rules)) {
      const ruleStyling = resolvedStyling[ruleInstance.id];
      if (ruleStyling) {
        const ruleScope = scope.scopes[ruleInstance.id];
        computeScopeStyle(ruleScope, outStyle, outImportantStyle, outClassNames);
        delete (resolvedStyling as any)[ruleInstance.id];
      }
    }
  }
  delete (resolvedStyling as any)[0];
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
  return (typeof value === "number" || value instanceof Number ? Number(value) : String(value)) as any;
}

/**
 * Removes any theme or query rules from the styling object, leaving only actual style rules
 */
export const sanitizeStylingToStaticStyle = (styling: Styling | StyleObject): { style: StyleObject, importantStyle: StyleObject | null } => {
  let importantStyle: StyleObject | null = null;

  const style = Object.keys(styling).reduce((style: any, key: any) => {
    const value = (styling as any)[key];
    if (isNaN(key) && (!isDynamicValue(value) || isImportantValue(value))) {
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
  }, {} as StyleObject);

  return {
    style         : style,
    importantStyle: importantStyle,
  };
};

export const resolveStyling = (className: string, stylingBuilder: StylingBuilder): StylingResolution => {
  startDynamicUnitSession();
  startThemedSession();
  startRuleSession(true);
  startImportantSession();

  const resolvedStyling = stylingBuilder();

  const rules             = finishRuleSession();
  const hasAnyThemed      = finishThemeSession();
  const hasAnyDynamicUnit = finishDynamicUnitSession();
  const hasAnyImportant   = finishImportantSession();

  const hasAnyRules = Object.keys(rules).length > 0;
  const hasAnyDynamicProps = Boolean(hasAnyThemed || hasAnyDynamicUnit);

  const rootScope = resolveScope(0, className, resolvedStyling, rules, hasAnyThemed, hasAnyDynamicProps, hasAnyImportant);

  return {
    rootScope,
    stylingBuilder,
    hasAnyRules,
    hasAnyDynamicProps,
    hasAnyImportant,
    hasAnyThemed,
  };
};

const resolveScope = (id: number, className: string, styling: Styling, rules: StyleRules, hasAnyThemed: boolean, hasAnyDynamicProps: boolean, hasAnyImportant: boolean): StyleScope => {
  const dynamicProps                       = [];
  const importantProps                     = [];
  const scopes: Record<number, StyleScope> = {};
  const scopeRules: StyleRules             = {};

  for (const key of Object.keys(styling)) {
    const value = (styling as any)[key];

    if (hasAnyDynamicProps && isDynamicValue(value)) {
      dynamicProps.push(key);
    } else if (hasAnyImportant && isImportantValue(value)) {
      importantProps.push(key);
    } else if (typeof value === "object" && !isNaN(key as any)) {
      const ruleId       = Number(key);
      const rule         = rules[ruleId];
      scopeRules[ruleId] = rule;
      for (const compoundRuleId of rule.compoundRules) {
        scopeRules[compoundRuleId] = rules[compoundRuleId];
      }
      const scope = scopes[ruleId] = resolveScope(ruleId, rule.className, value, rules, hasAnyThemed, hasAnyDynamicProps, hasAnyImportant);
      rule.scope = scope;
    }
  }

  const {style, importantStyle} = sanitizeStylingToStaticStyle(styling);

  const hasThemed = hasAnyThemed;
  const hasRules  = Object.keys(scopeRules).length > 0;

  const hasDynamicUnit = dynamicProps.length > 0;

  const hasDynamicProps = hasThemed || hasDynamicUnit;

  const isSimple = !hasRules && !hasDynamicUnit && !hasThemed;

  return {
    id                  : id,
    className           : className,
    sheetId             : null,
    staticStyle         : style,
    staticImportantStyle: importantStyle,
    dynamicProps        : dynamicProps,
    hasDynamicProps     : hasDynamicProps,
    importantProps      : importantProps,
    hasImportant        : importantProps.length > 0,
    rules               : scopeRules,
    hasDynamicUnit      : hasDynamicUnit,
    hasRules            : hasRules,
    hasThemed           : hasThemed,
    scopes              : scopes,
    isSimple            : isSimple,
    resolvedStyling     : styling,
  };
};

export const isDynamicValue = (value: any): boolean => {
  return typeof value === "function" || value === DYNAMIC_UNIT_REGISTER_CHECK_VALUE ||
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
