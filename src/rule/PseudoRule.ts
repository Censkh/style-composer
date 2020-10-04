import {createStyleRuleType, StyleRuleType} from "./StyleRule";

export const createPseudoRule = (type: string): PseudoRuleType => createStyleRuleType("pseudo", {
  check(instance, session) {
    return Boolean(session?.pseudoClasses?.includes(type));
  },
}, {type});

export type PseudoRuleType = StyleRuleType & { type: string };

export const active   = createPseudoRule("active");
export const disabled = createPseudoRule("disabled");
export const focus    = createPseudoRule("focus");
export const hover    = createPseudoRule("hover");

export const isPseudoRuleType = (ruleType: StyleRuleType<any>): ruleType is PseudoRuleType => {
  return ruleType.id === "pseudo";
};
