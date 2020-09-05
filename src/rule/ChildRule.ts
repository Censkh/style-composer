import {createStyleRuleType} from "./StyleRule";
import type {StyleClass}     from "../class/StyleClass";

export type ChildQuery = StyleClass | StyleClass[];

const child = createStyleRuleType<ChildQuery>("child", {
  check(options: ChildQuery) {
    return false;
  },

  register() {
  },
});

export default child;
