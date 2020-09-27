import {createDynamicUnit} from "./DynamicUnit";
import StyleEnvironment    from "../StyleEnvironment";
import {isWeb}             from "../Utils";

export const vw = createDynamicUnit("vw", (value?: number) => {
  const parseValue = typeof value === "undefined" ? 100 : value;
  if (isWeb()) return `${parseValue}vw`;
  return (parseValue / 100) * StyleEnvironment.getScreenWidth();
});

export const vh = createDynamicUnit("vh", (value?: number) => {
  const parseValue = typeof value === "undefined" ? 100 : value;
  if (isWeb()) return `${parseValue}vh`;
  return (parseValue / 100) * StyleEnvironment.getScreenHeight();
});
