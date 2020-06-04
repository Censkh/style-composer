import * as Utils        from "../Utils";
import {useLayoutEffect} from "react";

export interface CssGlobalStylingProps {
  name: string;
  children: string;
}

const CssGlobalStyling = (props: CssGlobalStylingProps): null => {
  if (Utils.isNative()) return null;
  const {name, children} = props;
  useLayoutEffect(() => {
    Utils.setStyleSheet(`css-global-styling[${name}]`, children);
  }, [children]);
  return null;
};

export default CssGlobalStyling;