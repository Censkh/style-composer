import StyleEnvironment from "../StyleEnvironment";

export interface CssGlobalStylingProps {
  name: string;
  children: string;
}

const CssGlobalStyling = (props: CssGlobalStylingProps): null => {
  const {name, children} = props;
  StyleEnvironment.updateHeadElement(`css-global-styling(${name})`, "style", children, {"data-style-sheet": name});
  return null;
};

export default CssGlobalStyling;
