import {createStyleRule, StyleRuleFunction} from "./StyleRule";

const pseudo = createStyleRule<string>("pseudo", {
  check(options, session) {
    return Boolean(session?.pseudoClasses?.includes(options));
  },
});

export type PseudoRule = StyleRuleFunction & { type: string };

export const createPseudoRule = (type: string): PseudoRule => Object.assign(() => {
  return pseudo(type);
}, {type});

export const active   = createPseudoRule("active");
export const disabled = createPseudoRule("disabled");
export const focus    = createPseudoRule("focus");

export default pseudo;
