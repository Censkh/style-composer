import {DependencyList, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {registerRuleCallback, unregisterRuleCallback}                      from "./rule/StyleRule";
import {Classes, classesId, classList, StyleClass}                         from "./class/StyleClass";
import {Falsy}                                                             from "./Utils";
import {ThemeValues, useTheming}                                           from "./theme";
import {Dimensions}                                                        from "react-native";
import {computeStyling, resolveStyling, StylingBuilder, StylingResolution} from "./Styling";

export const useForceUpdate = (): [number, () => void] => {
  const [state, setState] = useState(0);
  const forceUpdate       = useCallback(() => setState(i => i + 1), [setState]);
  return [state, forceUpdate];
};

export interface StylingInternals {
  theme: ThemeValues,
  key: number,
  classId: string | null,
  classArray: StyleClass[] | undefined,
  id: string;
}

export const useStylingInternals = (classes: Classes | undefined): StylingInternals => {
  const idRef = useRef(Math.floor(Math.random() * 100000000).toString());

  const {classArray, classId, hasDynamicUnit} = useMemo(() => {
    const classArray: StyleClass[] | undefined = classes && classList(classes) || undefined;
    const classId                              = classesId(classArray);
    const hasDynamicUnit                       = classArray?.some(clazz => clazz.__meta.hasDynamicUnit);

    return {classArray, classId, hasDynamicUnit};
  }, [classes]);

  const [key, forceUpdate] = useRulesEffect(idRef.current, classArray, classId);
  const theme              = useTheming();

  useEffect(() => {
    if (hasDynamicUnit) {
      Dimensions.addEventListener("change", forceUpdate);
      return () => {
        Dimensions.removeEventListener("change", forceUpdate);
      };
    }
  }, [hasDynamicUnit]);

  return {theme, key, classId, classArray, id: idRef.current};
};

const useRulesEffect = (id: string, classes: StyleClass[] | Falsy, classesId: string | null): [number, () => void] => {
  const [key, forceUpdate] = useForceUpdate();

  const prevState        = useRef("");
  const currentClasses   = useRef<StyleClass[] | Falsy>();
  currentClasses.current = classes;

  const checkForUpdates = useCallback(() => {
    let state = "";
    if (currentClasses.current) {
      for (const clazz of currentClasses.current) {
        for (const ruleInstance of Object.values(clazz.__meta.rules)) {
          state += ruleInstance.rule.check(ruleInstance.options) ? "1" : "0";
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

  const checkForUpdates = useCallback(() => {
    let state = "";
    if (currentResolution.current) {
      for (const ruleInstance of Object.values(currentResolution.current.rules)) {
        state += ruleInstance.rule.check(ruleInstance.options) ? "1" : "0";
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