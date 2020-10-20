import StyleEnvironment from "../StyleEnvironment";

export interface CssGlobalStylingProps {
  name: string;
  children: string;
}

const CssGlobalStyling = (props: CssGlobalStylingProps): null => {
  const {name, children} = props;
  StyleEnvironment.updateHeadElement(`css-global-styling(${name})`, "style", {"data-style-sheet": name}, children);
  return null;
};

export default CssGlobalStyling;
