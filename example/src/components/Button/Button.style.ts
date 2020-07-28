import {composeClass, createPseudoRule, important} from "style-composer";

export const active = createPseudoRule("active");
export const disabled = createPseudoRule("disabled");

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
}));

export const $BigMargin = composeClass("BigMargin", () => ({
  margin: 10,
}));
