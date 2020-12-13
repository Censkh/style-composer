import React                                                                           from "react";
import {ImageStyle, RecursiveArray, RegisteredStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";

import {registerStyleSheets, StyleClass}                                                      from "./class/StyleClass";
import * as Utils                                                                             from "./Utils";
import {Falsy}                                                                                from "./Utils";
import {DYNAMIC_UNIT_REGISTER_CHECK_VALUE, finishDynamicUnitSession, startDynamicUnitSession} from "./unit/DynamicUnit";
import {finishThemeSession, startThemedSession}                                               from "./theme/Theming";
import {
  finishSelectorSession,
  startSelectorSession,
  StyleSelector,
  StyleSelectors,
}                                                                                             from "./selector/StyleSelector";
import {finishImportantSession, isImportantValue, startImportantSession}                      from "./Important";
import {StyleProp}                                                                            from "./component/Styler";
import {ChildQuery}                                                                           from "./selector/ChildSelector";
import {isOptimisable}                                                                        from "./Optimisable";

export const CASCADING_STYLES = ["fontSize", "fontFamily", "fontWeight", "color", "letterSpacing", "textAlign"];

export interface StyleScope {
  id: number;
  className: string;
  sheetId: number | null;
  staticStyle: StyleObject;
  staticImportantStyle: StyleObject | null;
  isSimple: boolean;
  hasSelectors: boolean;
  hasThemed: boolean;
  hasDynamicUnit: boolean;
  hasDynamicProps: boolean;
  dynamicProps: string[];
  hasImportant: boolean;
  importantProps: string[];
  resolvedStyling: Styling;
  selectors: StyleSelectors,
  scopes: Record<number, StyleScope>;
}

export interface StylingResolution {
  stylingBuilder: StylingBuilder;
  rootScope: StyleScope;
  hasAnySelectors: boolean;
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
  applicableChildSelectors?: Array<StyleSelector<ChildQuery>>;
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

  if (computedSession.applicableChildSelectors?.length) {
    for (const childSelector of computedSession.applicableChildSelectors) {
      computeScopeStyle(childSelector.scope!, style, importantStyle, classNames);
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
  return sanitizeStyleObject(StyleSheet.flatten([style, importantStyle]));
};

const internalComputedStyling = (resolution: StylingResolution, session: StylingSession, outStyle: ComputedStyleList, outImportantStyle: ComputedStyleList, outClassNames?: string[]): void => {
  registerStyleSheets((resolution as any).rootScope);

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

  startSelectorSession(false, resolution, session);
  const styling = stylingBuilder();
  finishSelectorSession();
  rootScope.resolvedStyling = styling;
  for (const scopeId in rootScope.scopes) {
    const resolvedScopeStyling = styling[scopeId];
    if (resolvedScopeStyling) {
      (rootScope.scopes as any)[scopeId].resolvedStyling = resolvedScopeStyling;
    }
  }

  computeScopeStyle(rootScope, outStyle, outImportantStyle, outClassNames);

  // when selectors are evalled they return 0 instead of false
  (styling as any)[0] = undefined;
};

const computeScopeStyle = (scope: StyleScope, outStyle: ComputedStyleList, outImportantStyle: ComputedStyleList, outClassNames?: string[]): void => {
  const {
          sheetId,
          resolvedStyling,
          isSimple,
          className,
          staticStyle,
          staticImportantStyle,
          selectors,
          hasDynamicProps,
          hasImportant,
          hasSelectors,
          importantProps,
          dynamicProps,
        } = scope;
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
      (importantStyle as any)[importantProp] = (resolvedStyling as any)[importantProp];
    }
    outImportantStyle.push(importantStyle);
  }

  if (hasSelectors) {
    for (const selectorInstance of Object.values(selectors)) {
      const selectorStyling = resolvedStyling[selectorInstance.id];
      if (selectorStyling) {
        const selectorScope = scope.scopes[selectorInstance.id];
        computeScopeStyle(selectorScope, outStyle, outImportantStyle, outClassNames);
        delete (resolvedStyling as any)[selectorInstance.id];
      }
    }
  }
  delete (resolvedStyling as any)[0];
};

export const removePropTypes = (node: React.ReactNode) => {
  if (process.env.NODE_ENV === "development") {
    if (node && typeof node === "object" && "type" in node && (node.type as any).propTypes) {
      delete (node.type as any).propTypes.style;
    }
  }
};

export const sanitizeStyleObject = (style: StyleObject, optimise?: boolean) => {
  const keys = Object.keys(style);
  const sanitizedStyle: any = {};

  for (const key of keys) {
    const value         = (style as any)[key];
    sanitizedStyle[key] = sanitizeStyleValue(value, optimise);
    console.log(key, value, sanitizedStyle[key]);
  }
  return sanitizedStyle;
};

export const sanitizeStyleList = (style: RecursiveArray<Style | Falsy>, optimise?: boolean): Style[] => {
  if (style) {
    return Utils.flatAndRemoveFalsy(style).map((style) => {
      if (typeof style === "object") {
        return sanitizeStyleObject(style as any, optimise);
      }
      return style;
    });
  }
  return style;
};

export const sanitizeStyleValue = <T extends string | number>(value: T, optimise?: boolean): string | number => {
  if (value === undefined || value === null) {
    return value;
  }

  let sanitizedValue: any = value;

  if (optimise && isOptimisable(value)) {
    sanitizedValue = value.optimise(value);
  }

  if (typeof value === "number" || value instanceof Number) {
    sanitizedValue = Number(value) as T;
  }
  if (typeof value === "string" || value instanceof String) {
    sanitizedValue = String(value) as T;
  }
  return sanitizedValue;
};

/**
 * Removes any theme or query selectors from the styling object, leaving only actual style selectors
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
  startSelectorSession(true);
  startImportantSession();

  const resolvedStyling = stylingBuilder();

  const selectors         = finishSelectorSession();
  const hasAnyThemed      = finishThemeSession();
  const hasAnyDynamicUnit = finishDynamicUnitSession();
  const hasAnyImportant   = finishImportantSession();

  const hasAnySelectors    = Object.keys(selectors).length > 0;
  const hasAnyDynamicProps = Boolean(hasAnyThemed || hasAnyDynamicUnit);

  const rootScope = resolveScope(0, className, resolvedStyling, selectors, hasAnyThemed, hasAnyDynamicProps, hasAnyImportant);

  return {
    rootScope,
    stylingBuilder,
    hasAnySelectors: hasAnySelectors,
    hasAnyDynamicProps,
    hasAnyImportant,
    hasAnyThemed,
  };
};

const resolveScope = (id: number, className: string, styling: Styling, selectors: StyleSelectors, hasAnyThemed: boolean, hasAnyDynamicProps: boolean, hasAnyImportant: boolean): StyleScope => {
  const dynamicProps                       = [];
  const importantProps                     = [];
  const scopes: Record<number, StyleScope> = {};
  const scopeSelectors: StyleSelectors     = {};

  for (const key of Object.keys(styling)) {
    const value = (styling as any)[key];

    if (hasAnyDynamicProps && isDynamicValue(value)) {
      dynamicProps.push(key);
    } else if (hasAnyImportant && isImportantValue(value)) {
      importantProps.push(key);
    } else if (typeof value === "object" && !isNaN(key as any)) {
      const selectorId           = Number(key);
      const selector             = selectors[selectorId];
      scopeSelectors[selectorId] = selector;
      for (const compoundSelectorId of selector.compoundSelectors) {
        scopeSelectors[compoundSelectorId] = selectors[compoundSelectorId];
      }
      const scope    = scopes[selectorId] = resolveScope(selectorId, selector.className, value, selectors, hasAnyThemed, hasAnyDynamicProps, hasAnyImportant);
      selector.scope = scope;
    }
  }

  const {style, importantStyle} = sanitizeStylingToStaticStyle(styling);

  const hasThemed    = hasAnyThemed;
  const hasSelectors = Object.keys(scopeSelectors).length > 0;

  const hasDynamicUnit = dynamicProps.length > 0;

  const hasDynamicProps = hasThemed || hasDynamicUnit;

  const isSimple = !hasSelectors && !hasDynamicUnit && !hasThemed;

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
    selectors           : scopeSelectors,
    hasDynamicUnit      : hasDynamicUnit,
    hasSelectors        : hasSelectors,
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
