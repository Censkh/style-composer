import {DependencyList, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {
  registerRuleCallback,
  StyleRule,
  unregisterRuleCallback,
}                                                                                      from "./rule/StyleRule";
import {
  Classes,
  classesId,
  flattenClasses,
  StyleClass,
}                                                                                      from "./class/StyleClass";
import * as Utils                                                                      from "./Utils";
import {Falsy, isWeb}                                                                  from "./Utils";
import {ThemeValues, useTheming}                                                       from "./theme";
import {StyleSheet}                                                                    from "react-native";
import {
  computeClasses,
  ComputedStyleList,
  computeStyling,
  extractCascadingStyle,
  resolveStyling,
  StyleObject,
  StylingBuilder,
  StylingResolution,
  StylingSession,
} from "./Styling";
import {StylableProps}                                                                 from "./component/Styler";
import CascadingValuesContext, {CascadingValuesContextState}                           from "./CascadingValuesContext";
import {
  addFontLoadListener,
  getFontFamily,
  isFontLoaded,
  isStyleComposerFont,
  removeFontLoadListener,
}                                                                                      from "./font/FontFamily";
import child, {ChildQuery}                                                             from "./rule/ChildRule";
import {setupFontPreProcessor}                                                         from "./font/FontPreProcessor";
import StyleEnvironment                                                                from "./StyleEnvironment";

export const useForceUpdate = (): [number, () => void] => {
  const [state, setState] = useState(0);
  const forceUpdate       = useCallback(() => setState(i => i + 1), [setState]);
  return [state, forceUpdate];
};

export interface StylingInternals {
  theme: ThemeValues,
  key: string,
  classId: string | null,
  classArray: StyleClass[] | undefined,
  uid: string;
}

export interface ComposedStyleResult {
  cascadingContextValue: CascadingValuesContextState | null;
  computedStyle: ComputedStyleList;
  flatPseudoClasses: string[],
  classNames: string[];
  appliedClasses: StyleClass[];
}

export const useComposedStyle = (props: StylableProps, options?: { disableCascade?: boolean }): ComposedStyleResult => {
  const {classes, style, pseudoClasses} = props;
  const fontListeners                   = useRef<string[]>([]);
  const {
          style     : parentCascadingStyle,
          key       : parentCascadingValuesKey,
          childRules: parentChildRules,
        }                               = useContext(CascadingValuesContext);
  const [fontKey, forceUpdate]          = useForceUpdate();

  const flatPseudoClasses       = (Array.isArray(pseudoClasses) ? Utils.flatAndRemoveFalsy(pseudoClasses) : (pseudoClasses && [pseudoClasses]) || [])
    .map(rule => typeof rule === "string" ? rule : rule.type);
  const session: StylingSession = {
    pseudoClasses       : flatPseudoClasses || [],
    applicableChildRules: [],
  };

  const {theme, key, classArray} = useStylingInternals(classes, session);

  session.applicableChildRules = classArray && parentChildRules && parentChildRules.filter((rule) => {
    const options = Utils.arrayify(rule.options);
    return classArray?.some(clazz => options.includes(clazz) || options.find(other => other.__meta.className === clazz.__meta.parent?.__meta.className));
  });

  const needsCascade = !options?.disableCascade;

  const {
          computedStyle,
          cascadingStyle,
          cascadingValuesKey,
          classNames,
          ownChildRules,
        } = useMemo(() => {
    const classResults = computeClasses(classArray, style, session);

    const ownStyle     = classResults.style;
    const ownStyleFlat = StyleSheet.flatten(ownStyle) as StyleObject;

    if (ownStyleFlat?.fontWeight) {
      const currentFontFamily = ownStyleFlat.fontFamily || parentCascadingStyle.fontFamily;
      if (currentFontFamily) {
        const styleComposerFontFamily = getFontFamily(currentFontFamily.split(/(__|,)/g)[0]);
        if (styleComposerFontFamily) {
          const variant = styleComposerFontFamily.weight(ownStyleFlat?.fontWeight);
          if (variant && currentFontFamily !== variant) {
            ownStyleFlat.fontFamily = variant;
            ownStyle.push({fontFamily: variant});
          }
        }
      }
    }

    const computedStyle     = needsCascade ? [parentCascadingStyle, ownStyle] : [ownStyle];
    const computedStyleFlat = StyleSheet.flatten(computedStyle) as StyleObject;

    const [cascadingStyle, cascadingStyleKey] = extractCascadingStyle(ownStyleFlat, parentCascadingStyle);

    if (Utils.isNative() && computedStyleFlat.fontFamily) {
      const fontFamily = computedStyleFlat.fontFamily;
      if (isStyleComposerFont(fontFamily)) {
        setupFontPreProcessor();

        if (!isFontLoaded(fontFamily)) {
          let callback: () => void;
          if (!fontListeners.current.includes(fontFamily)) {
            fontListeners.current.push(fontFamily);
            addFontLoadListener(fontFamily, callback = () => {
              forceUpdate();
              removeFontLoadListener(fontFamily, callback);
            });
          }
          computedStyle.push({fontFamily: "System"});
        } else {
          computedStyle.push({fontWeight: "normal"});
        }
      }
    }

    const ownChildRules      = classArray?.flatMap<StyleRule<ChildQuery> | Falsy>((clazz) => {
      return clazz.__meta.hasAnyRules && Object.values(clazz.__meta.rootScope.rules).filter(rule => rule.type.id === child.id);
    }).filter(Boolean) as Array<StyleRule<ChildQuery>> | undefined;
    const childRulesKey      = ownChildRules?.map(rule => rule.key).join(",");
    const cascadingValuesKey = [cascadingStyleKey || "null", childRulesKey || "null"].join("===");

    return {
      classNames        : classResults.classNames,
      computedStyle     : computedStyle,
      computedStyleFlat : computedStyleFlat,
      cascadingStyle    : cascadingStyle,
      cascadingValuesKey: cascadingValuesKey,
      ownChildRules     : ownChildRules,
    };
  }, [style, parentCascadingValuesKey, key, fontKey, theme]);

  const hasCascade            = Boolean(cascadingStyle || (ownChildRules && ownChildRules.length > 0));
  const cascadingContextValue = useMemo<CascadingValuesContextState | null>(() => (hasCascade && {
    style     : cascadingStyle || parentCascadingStyle,
    key       : cascadingValuesKey,
    childRules: ownChildRules && ownChildRules.length > 0 ? [...ownChildRules, ...parentChildRules] : parentChildRules,
  }) || null, [cascadingValuesKey]);

  return {
    computedStyle        : computedStyle as ComputedStyleList,
    cascadingContextValue: cascadingContextValue,
    classNames           : classNames,
    flatPseudoClasses    : flatPseudoClasses,
    appliedClasses       : classArray || [],
  };
};

export const useStylingInternals = (classes: Classes | undefined, session: StylingSession): StylingInternals => {
  const uidRef = useRef(Math.floor(Math.random() * 100000000).toString());

  const {classArray, classId, hasDynamicUnit} = useMemo(() => {
    const classArray: StyleClass[] | undefined = classes && flattenClasses(classes) || undefined;
    const classId                              = classesId(classArray);
    const hasDynamicUnit                       = classArray?.some(clazz => clazz.__meta.hasAnyDynamicProps);

    return {classArray, classId, hasDynamicUnit};
  }, [classes]);

  const [forceUpdateKey, forceUpdate] = useRulesEffect(uidRef.current, classArray, session, classId);
  const theme                         = useTheming();

  useEffect(() => {
    if (hasDynamicUnit && !isWeb()) {
      StyleEnvironment.addScreenSizeChangeListener(forceUpdate);
      return () => {
        StyleEnvironment.removeScreenSizeChangeListener(forceUpdate);
      };
    }
  }, [hasDynamicUnit]);

  const key = forceUpdateKey + "_" + classId + "_" + (session.pseudoClasses ? session.pseudoClasses.sort().join(",") : "");

  return {theme, key, classId, classArray, uid: uidRef.current};
};

const useRulesEffect = (id: string, classes: StyleClass[] | Falsy, session: StylingSession, classesId: string | null): [number, () => void] => {
  const [key, forceUpdate] = useForceUpdate();

  const prevState        = useRef("");
  const currentClasses   = useRef<StyleClass[] | Falsy>();
  currentClasses.current = classes;

  const checkForUpdates = useCallback(() => {
    let state = "";
    if (currentClasses.current) {
      for (const clazz of currentClasses.current) {
        for (const rule of Object.values(clazz.__meta.rootScope.rules)) {
          state += rule.type.check(rule, session) ? "1" : "0";
        }
        state += "-";
      }
    }
    if (prevState.current !== state) {
      prevState.current = state;
      forceUpdate();
    }
  }, []);

  useEffect(() => {
    if (classes) {
      const hasRules = classes.some(clazz => clazz.__meta.hasAnyRules);
      if (hasRules) {
        for (const clazz of classes) {
          if (clazz.__meta.hasAnyRules) {
            for (const id of Object.keys(clazz.__meta.rootScope.rules)) {
              const rule = clazz.__meta.rootScope.rules[id as any];
              registerRuleCallback(rule.type, checkForUpdates);
            }
          }
        }
        return () => {
          for (const clazz of classes) {
            if (clazz.__meta.hasAnyRules) {
              for (const id of Object.keys(clazz.__meta.rootScope.rules)) {
                const rule = clazz.__meta.rootScope.rules[id as any];
                unregisterRuleCallback(rule.type, checkForUpdates);
              }
            }
          }
        };
      }
    }
  }, [classesId, forceUpdate]);
  return [key, forceUpdate];
};

let composedId = 0;

export const useComposedValues = <S>(styling: StylingBuilder<S>, depList: DependencyList): S => {
  const [key, forceUpdate] = useForceUpdate();

  const prevState           = useRef("");
  const currentResolution   = useRef<StylingResolution>();
  const id                  = useRef((composedId++).toString());
  const resolution          = useMemo(() => resolveStyling(`__composed_${id}`, styling), depList);
  currentResolution.current = resolution;
  const {hasAnyDynamicProps} = resolution;

  const checkForUpdates = useCallback(() => {
    let state = "";
    if (currentResolution.current) {
      for (const ruleInstance of Object.values(currentResolution.current.rootScope.rules)) {
        state += ruleInstance.type.check(ruleInstance, {}) ? "1" : "0";
      }
    }
    if (prevState.current !== state) {
      prevState.current = state;
      forceUpdate();
    }
  }, []);

  useEffect(() => {
    if (hasAnyDynamicProps && !isWeb()) {
      StyleEnvironment.addScreenSizeChangeListener(forceUpdate);
      return () => {
        StyleEnvironment.removeScreenSizeChangeListener(forceUpdate);
      };
    }
  }, [hasAnyDynamicProps]);

  useEffect(() => {
    if (resolution.hasAnyRules) {
      for (const id of Object.keys(resolution.rootScope.rules)) {
        const rule = resolution.rootScope.rules[id as any];
        registerRuleCallback(rule.type, checkForUpdates);
      }
      return () => {
        for (const id of Object.keys(resolution.rootScope.rules)) {
          const rule = resolution.rootScope.rules[id as any];
          unregisterRuleCallback(rule.type, checkForUpdates);
        }
      };
    }
  }, [resolution]);

  return useMemo(() => computeStyling(resolution), [resolution, key]) as S;
};

export const useCallableEffect = <F extends (...args: any[]) => any>(effect: F, depList: DependencyList): F => {
  const func = useCallback(effect, depList);
  useEffect(func, [func]);
  return func;
};
