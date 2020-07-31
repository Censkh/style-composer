import {DependencyList, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {
  registerRuleCallback,
  unregisterRuleCallback,
}                                                                                      from "./rule/StyleRule";
import {
  Classes,
  classesId,
  flattenClasses,
  StyleClass,
}                                                                                      from "./class/StyleClass";
import * as Utils                                                                      from "./Utils";
import {Falsy}                                                                         from "./Utils";
import {ThemeValues, useTheming}                                                       from "./theme";
import {
  Dimensions,
  StyleSheet,
}                                                                                      from "react-native";
import {
  computeClasses,
  ComputedStyleList,
  computeStyling,
  createSession,
  extractCascadingStyle,
  resolveStyling,
  StyleObject,
  StylingBuilder,
  StylingResolution,
  StylingSession,
}                                                                                      from "./Styling";
import {StylableProps}                                                                 from "./component/Styler";
import CascadingStyleContext, {CascadingStyleContextState}                             from "./CascadingStyleContext";
import {
  addFontLoadListener,
  getFontFamily,
  isFontLoaded,
  isStyleComposerFont,
  removeFontLoadListener,
}                                                                                      from "./font/FontFamily";

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
  cascadingStyle: CascadingStyleContextState | null;
  computedStyle: ComputedStyleList;
  flatPseudoClasses: string[],
  classNames: string[];
}

export const useComposedStyle = (props: StylableProps, options?: { disableCascade?: boolean }): ComposedStyleResult => {
  const {classes, style, pseudoClasses}                             = props;
  const fontListeners                                               = useRef<string[]>([]);
  const {style: parentCascadingStyle, key: parentCascadingStyleKey} = useContext(CascadingStyleContext);
  const [fontKey, forceUpdate]                                      = useForceUpdate();

  const flatPseudoClasses = Array.isArray(pseudoClasses) ? Utils.flatAndRemoveFalsy(pseudoClasses) : (pseudoClasses && [pseudoClasses]) || [];
  const session           = createSession({
    pseudoClasses: flatPseudoClasses || [],
  });

  const {theme, key, classArray} = useStylingInternals(classes, session);

  const needsCascade = !options?.disableCascade;

  const {
          computedStyle,
          cascadingStyle,
          cascadingStyleKey,
          classNames,
        } = useMemo(() => {
    const classResults = computeClasses(classArray, style, session);

    const ownStyle     = classResults.style;
    const ownStyleFlat = StyleSheet.flatten(ownStyle) as StyleObject;

    if (ownStyleFlat?.fontWeight) {
      const currentFontFamily = ownStyleFlat.fontFamily || parentCascadingStyle.fontFamily;
      if (currentFontFamily) {
        const styleComposerFontFamily = getFontFamily(currentFontFamily.split("__")[0]);
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


    return {
      classNames       : classResults.classNames,
      computedStyle    : computedStyle,
      computedStyleFlat: computedStyleFlat,
      cascadingStyle   : cascadingStyle,
      cascadingStyleKey: cascadingStyleKey,
    };
  }, [style, parentCascadingStyleKey, key, fontKey, theme]);

  const memoCascadingStyle = useMemo<CascadingStyleContextState | null>(() => cascadingStyle && {
    style: cascadingStyle,
    key  : cascadingStyleKey,
  }, [cascadingStyleKey]);

  return {
    computedStyle    : computedStyle as ComputedStyleList,
    cascadingStyle   : memoCascadingStyle,
    classNames       : classNames,
    flatPseudoClasses: flatPseudoClasses,
  };
};

export const useStylingInternals = (classes: Classes | undefined, session: StylingSession): StylingInternals => {
  const uidRef = useRef(Math.floor(Math.random() * 100000000).toString());

  const {classArray, classId, hasDynamicUnit} = useMemo(() => {
    const classArray: StyleClass[] | undefined = classes && flattenClasses(classes) || undefined;
    const classId                              = classesId(classArray);
    const hasDynamicUnit                       = classArray?.some(clazz => clazz.__meta.hasDynamicUnit);

    return {classArray, classId, hasDynamicUnit};
  }, [classes]);


  const [forceUpdateKey, forceUpdate] = useRulesEffect(uidRef.current, classArray, session, classId);
  const theme                         = useTheming();

  useEffect(() => {
    if (hasDynamicUnit) {
      Dimensions.addEventListener("change", forceUpdate);
      return () => {
        Dimensions.removeEventListener("change", forceUpdate);
      };
    }
  }, [hasDynamicUnit]);

  const key = forceUpdateKey + "_" + classId + "_" + (session.context.pseudoClasses ? session.context.pseudoClasses.sort().join(",") : "");

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
        for (const ruleInstance of Object.values(clazz.__meta.rules)) {
          state += ruleInstance.rule.check(ruleInstance.options, session) ? "1" : "0";
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
      const hasRules = classes.some(clazz => clazz.__meta.hasRules);
      if (hasRules) {
        for (const clazz of classes) {
          if (clazz.__meta.hasRules) {
            for (const id of Object.keys(clazz.__meta.rules)) {
              const ruleInstance = clazz.__meta.rules[id as any];
              registerRuleCallback(ruleInstance.rule, checkForUpdates);
            }
          }
        }
        return () => {
          for (const clazz of classes) {
            if (clazz.__meta.hasRules) {
              for (const id of Object.keys(clazz.__meta.rules)) {
                const ruleInstance = clazz.__meta.rules[id as any];
                unregisterRuleCallback(ruleInstance.rule, checkForUpdates);
              }
            }
          }
        };
      }
    }
  }, [classesId, forceUpdate]);
  return [key, forceUpdate];
};

export const useComposedValues = <S>(styling: StylingBuilder<S>, depList: DependencyList): S => {
  const [key, forceUpdate] = useForceUpdate();

  const prevState           = useRef("");
  const currentResolution   = useRef<StylingResolution>();
  const resolution          = useMemo(() => resolveStyling(styling), depList);
  currentResolution.current = resolution;
  const {hasDynamicUnit}    = resolution;

  const session = createSession();

  const checkForUpdates = useCallback(() => {
    let state = "";
    if (currentResolution.current) {
      for (const ruleInstance of Object.values(currentResolution.current.rules)) {
        state += ruleInstance.rule.check(ruleInstance.options, session) ? "1" : "0";
      }
    }
    if (prevState.current !== state) {
      prevState.current = state;
      forceUpdate();
    }
  }, []);

  useEffect(() => {
    if (hasDynamicUnit) {
      Dimensions.addEventListener("change", forceUpdate);
      return () => {
        Dimensions.removeEventListener("change", forceUpdate);
      };
    }
  }, [hasDynamicUnit]);

  useEffect(() => {
    if (resolution.hasRules) {
      for (const id of Object.keys(resolution.rules)) {
        const ruleInstance = resolution.rules[id as any];
        registerRuleCallback(ruleInstance.rule, checkForUpdates);
      }
      return () => {
        for (const id of Object.keys(resolution.rules)) {
          const ruleInstance = resolution.rules[id as any];
          unregisterRuleCallback(ruleInstance.rule, checkForUpdates);
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
