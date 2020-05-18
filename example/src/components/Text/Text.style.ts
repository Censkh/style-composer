import {composeClass} from "style-composer";

const REM = 14;

export const $Heading = composeClass("Heading", () => ({
  marginBottom: 0.5 * REM,
}))
  .variant("h1", () => ({
    fontSize: 2.5 * REM,
  }))
  .variant("h2", () => ({
    fontSize: 2 * REM,
  }))
  .variant("h3", () => ({
    fontSize: 1.75 * REM,
  }))
  .variant("h4", () => ({
    fontSize: 1.5 * REM,
  }))
  .variant("h5", () => ({
    fontSize: 1.25 * REM,
  }))
  .build();
