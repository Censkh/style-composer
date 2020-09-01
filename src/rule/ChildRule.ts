import {createStyleRule} from "./StyleRule";
import type {StyleClass} from "../class/StyleClass";

export type ChildQuery = StyleClass | StyleClass[];

const child = createStyleRule<ChildQuery>("child", {
  check(options: ChildQuery) {
    return false;
  },

  register() {
  },
});

export default child;
