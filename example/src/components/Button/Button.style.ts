import {and, composeClass, createPseudoSelector, important, not} from "style-composer";

export const active   = createPseudoSelector("active");
export const disabled = createPseudoSelector("disabled");
export const hover    = createPseudoSelector("hover");
export const focus    = createPseudoSelector("focus");

// replace with style lib when we have
export const $Button = composeClass("Button", () => ({
  backgroundColor  : "#3F51B5",
  borderRadius     : 25,
  paddingHorizontal: 12,
  minWidth         : 50,
  paddingVertical  : 10,
  alignItems       : "center",
  color            : "white",
  fontWeight       : "700",

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
