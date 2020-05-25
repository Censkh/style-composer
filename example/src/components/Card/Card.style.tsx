import {composeClass, media, vw} from "style-composer";

export const $Card = composeClass("Card", () => ({
  padding        : 5,
  backgroundColor: "#2196f3",
  color          : "rgba(255,255,255,0.98)",
  width          : 0.25 * vw(),
  minWidth       : 200,
  textAlign      : "center",

  [media({maxWidth: 500}) && media({minWidth: 200})]: {
    backgroundColor: "#009688",
  },
}), {
  variants: {

    "xl": () => ({
      padding : 15,
      fontSize: 24,
    }),

  },
});
