import {createStyleSelectorType, StyleSelectorType} from "./StyleSelector";

export const createPseudoSelector = (type: string): PseudoSelectorType => createStyleSelectorType("pseudo", {
  check(instance, session) {
    return Boolean(session?.pseudoClasses?.includes(type));
  },
}, {type});

export type PseudoSelectorType = StyleSelectorType & { type: string };

export const active   = createPseudoSelector("active");
export const disabled = createPseudoSelector("disabled");
export const focus    = createPseudoSelector("focus");
export const hover    = createPseudoSelector("hover");

export const isPseudoSelectorType = (selectorType: StyleSelectorType<any>): selectorType is PseudoSelectorType => {
  return selectorType.id === "pseudo";
};
