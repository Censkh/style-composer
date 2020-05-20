import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {registerRuleCallback, unregisterRuleCallback}      from "./rule/StyleRule";
import {Classes, classesId, classList, StyleClass}         from "./class/StyleClass";
import {Falsy}                                             from "./Utils";
import {useTheming}                                        from "./theme";
import {Dimensions}                                        from "react-native";
import debounce                                            from "lodash.debounce";

export const useForceUpdate = (debounceTimeout?: number): [number, () => void] => {
  const [state, setState] = useState(0);
  const forceUpdate = useMemo(() => {
    const update = () => setState(i => i + 1);
    return debounceTimeout ? debounce(update, debounceTimeout) : update;
  }, [setState, debounceTimeout]);
  return [state, forceUpdate];
};

export const useStylingInternals = (classes: Classes | undefined) => {
  const {classArray, classId, hasDynamicUnit} = useMemo(() => {
    const classArray: StyleClass[] | undefined = classes && classList(classes) || undefined;
    const classId = classesId(classArray);
    const hasDynamicUnit = classArray?.some(clazz => clazz.__meta.hasDynamicUnit);

    return {classArray, classId, hasDynamicUnit};
  }, [classes]);

  const [key, forceUpdate] = useRulesEffect(classArray, classId);
  const theme = useTheming();

  useEffect(() => {
    if (hasDynamicUnit) {
      Dimensions.addEventListener("change", forceUpdate);
      return () => {
        Dimensions.removeEventListener("change", forceUpdate);
      };
    }
  }, [hasDynamicUnit]);

  return {theme, key, classId, classArray};
};

const useRulesEffect = (classes: StyleClass[] | Falsy, classesId: string | null): [number, () => void] => {
  const [key, forceUpdate] = useForceUpdate(20);

  const prevState = useRef("");
  const currentClasses = useRef<StyleClass[] | Falsy>();
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
      for (const clazz of classes) {
        Object.values(clazz.__meta.rules).forEach((ruleInstance) => {
          registerRuleCallback(ruleInstance.rule, checkForUpdates);
        });
      }
      return () => {
        for (const clazz of classes) {
          Object.values(clazz.__meta.rules).forEach((ruleInstance) => {
            unregisterRuleCallback(ruleInstance.rule, checkForUpdates);
          });
        }

      };
    }
  }, [classesId, forceUpdate]);
  return [key, forceUpdate];
};

