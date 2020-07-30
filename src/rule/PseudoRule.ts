import {createStyleRule, StyleRule} from "./StyleRule";

const pseudo = createStyleRule<string>("pseudo", {
  check(options, session) {
    return Boolean(session.context.pseudoClasses?.includes(options));
  },
});

export type PseudoRule = StyleRule & { type: string };

export const createPseudoRule = (type: string): PseudoRule => Object.assign(() => {
  return pseudo(type);
}, {type});

export const active = createPseudoRule("active");
export const disable = createPseudoRule("active");
export const focus  = createPseudoRule("focus");

export default pseudo;
