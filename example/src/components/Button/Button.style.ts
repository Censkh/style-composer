import {composeClass} from "style-composer";

// replace with style lib when we have
export const $Button = composeClass("Button", () => ({
  backgroundColor: "#3F51B5",
  borderRadius: 25,
  paddingHorizontal: 12,
  minWidth: 50,
  paddingVertical: 10,
  alignItems: "center",
  color: "white",
}))
  .build();

export const $BigMargin = composeClass("BigMargin", () => ({
  margin: 10
}))
  .build();
