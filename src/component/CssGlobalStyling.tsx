import * as Utils        from "../Utils";
import {useLayoutEffect} from "react";

export interface CssGlobalStyling {
  name: string;
  children: string;
}

const CssGlobalStyling = (props: CssGlobalStyling): null => {
  if (Utils.isNative()) return null;
  const {name, children} = props;
  useLayoutEffect(() => {
    Utils.setStyleSheet(`css-component[${name}]`, children);
  }, [children]);
  return null;
};

export default CssGlobalStyling;