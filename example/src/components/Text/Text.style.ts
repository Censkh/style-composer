import {composeClass} from "style-composer";

const REM = 14;

export const $Heading = composeClass("Heading", () => ({
  marginBottom: 0.5 * REM,
}), {
  variants: {

    "h1": () => ({
      fontSize: 2.5 * REM,
    }),

    "h2": () => ({
      fontSize  : 2 * REM,
      fontWeight: "bold",
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

  },
});
