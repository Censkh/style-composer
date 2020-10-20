import {createStyleSelectorType} from "./StyleSelector";
import type {StyleClass}         from "../class/StyleClass";

export type ChildQuery = StyleClass | StyleClass[];

const child = createStyleSelectorType<ChildQuery>("child", {
  check(instance, session) {
    return false;
  },

  register() {
  },
});

export default child;
