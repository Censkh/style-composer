import {createDynamicUnit} from "./DynamicUnit";
import StyleEnvironment    from "../StyleEnvironment";

export const vw = createDynamicUnit("vw", (value?: number) => {
  const parseValue = typeof value === "undefined" ? 100 : value;
  return (parseValue / 100) * StyleEnvironment.getScreenWidth();
});

export const vh = createDynamicUnit("vh", (value?: number) => {
  const parseValue = typeof value === "undefined" ? 100 : value;
  return (parseValue / 100) * StyleEnvironment.getScreenHeight();
});
