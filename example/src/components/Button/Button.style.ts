import {and, composeClass, createPseudoRule, important, not} from "style-composer";

export const active   = createPseudoRule("active");
export const disabled = createPseudoRule("disabled");
export const hover    = createPseudoRule("hover");
export const focus    = createPseudoRule("focus");

// replace with style lib when we have
export const $Button = composeClass("Button", () => ({
  backgroundColor  : "#3F51B5",
  borderRadius     : 25,
  paddingHorizontal: 12,
  minWidth         : 50,
  paddingVertical  : 10,
  alignItems       : "center",
  color            : "white",
  fontWeight       : "600",

  [active()]: {
    backgroundColor: "#606fc7",
  },

  [disabled()]: {
    backgroundColor: important("#999"),
  },

  [and(focus(), not(active()))]: {
    backgroundColor: "red",
  },
}));

export const $BigMargin = composeClass("BigMargin", () => ({
  margin: 10,
}));
