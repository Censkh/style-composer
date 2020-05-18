import {composeClass, media} from "style-composer";

export const $Card = composeClass("Card", () => ({
  padding        : 5,
  backgroundColor: "#2196f3",
  color          : "rgba(255,255,255,0.98)",

  [media({maxWidth: 500}) && media({minWidth: 200})]: {
    backgroundColor: "#009688",
  },
}))
  .variant("xl", () => ({
    padding : 15,
    fontSize: 24,
  }))
  .build();