import * as Utils        from "./Utils";
import {useLayoutEffect} from "react";

export interface CssGlobalStyling {
  name: string;
  children: string;
}

const CssGlobalStyling = (props: CssGlobalStyling) => {
  if (Utils.isNative()) return null;
  const {name, children} = props;
  useLayoutEffect(() => {
    Utils.setStyleSheet(`cssGlobal[${name}]`, children);
  }, [children]);
  return null;
};

export default CssGlobalStyling;