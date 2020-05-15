import {useCallback, useEffect, useRef, useState}     from "react";
import {registerRuleCallback, unregisterRuleCallback} from "./StyleRule";
import {StyleClass}                                   from "./Styling";

export const useForceUpdate = (): [number, () => void] => {
  const [state, setState] = useState(0);
  const forceUpdate = useCallback(() => setState(i => i + 1), [setState]);
  return [state, forceUpdate];
};

export const useRulesEffect = (classes: StyleClass[] | undefined) => {
  const [key, forceUpdate] = useForceUpdate();

  const prevState = useRef("");
  const currentClasses = useRef<StyleClass[] | undefined>();
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
  }, [classes, forceUpdate]);
  return key;
};

