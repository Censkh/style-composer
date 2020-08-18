import {composeClass} from "style-composer";

export const REM = 14;

export const $Text = composeClass("text", () => ({

}));

export const $Heading = composeClass("heading", () => ({
  marginBottom: 0.5 * REM,
}), {
  variants: {

    "h1": () => ({
      fontSize  : 2.5 * REM,
      fontWeight: "700",
    }),

    "h2": () => ({
      fontSize  : 2 * REM,
      fontWeight: "700",
    }),

    "h3": () => ({
      fontSize: 1.75 * REM,
    }),

    "h4": () => ({
      fontSize: 1.5 * REM,
    }),

    "h5": () => ({
      fontSize: 1.25 * REM,
    }),

    "h6": () => ({
      fontSize: 1.1 * REM,
    }),

  },
});
