import {and, important, child, composeClass, media, platform} from "style-composer";
import {$Text}                                     from "../Text/Text.style";

export const pixel3 = () => and(
  platform("android"),
  media({maxWidth: 412}),
  media({minWidth: 410}),
);

export const $Card = composeClass("card", () => ({
  padding        : 5,
  backgroundColor: "#2196f3",
  color          : "rgba(255,255,255,0.98)",
  minWidth       : 200,
  textAlign      : "center",

  [and(media({maxWidth: 500}), media({minWidth: 200}))]: {
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

export const $ChildRuleTest = composeClass("child-rule-test", () => ({
  backgroundColor: "grey",

  [child($Text)]: {
    fontSize: important(24),
  },

}));
