import StyleEnvironment         from "../StyleEnvironment";
import {useCallback, useEffect} from "react";
import {isSsr}                  from "../Utils";

export interface CssGlobalStylingProps {
  name: string;
  children: string;
}

const CssGlobalStyling = (props: CssGlobalStylingProps): null => {
  const {name, children} = props;

  const updateHead = useCallback(() => {
    if (typeof children !== "string") {
      throw new Error("[style-composer] child prop of CssGlobalStyling must be a string");
    }
    StyleEnvironment.updateHeadElement(`css-global-styling(${name})`, "style", {"data-style-sheet": name}, children);
  }, [name, children]);

  useEffect(() => {
    updateHead();
  }, [updateHead]);

  // run during ssr
  if (isSsr()) {
    updateHead();
  }

  return null;
};

export default CssGlobalStyling;
