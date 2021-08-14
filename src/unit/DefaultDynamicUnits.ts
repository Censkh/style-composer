import {createDynamicUnit}    from "./DynamicUnit";
import StyleEnvironment       from "../StyleEnvironment";
import {createWebOptimisable} from "../Optimisable";

export const vw = createDynamicUnit("vw", (value?: number) => {
  const parseValue = typeof value === "undefined" ? 100 : value;
  return createWebOptimisable((parseValue / 100) * StyleEnvironment.getScreenWidth(), () => `${parseValue}vw`);
});

export const vh = createDynamicUnit("vh", (value?: number) => {
  const parseValue = typeof value === "undefined" ? 100 : value;
  return createWebOptimisable((parseValue / 100) * StyleEnvironment.getScreenHeight(), () => `${parseValue}vh`);
});
