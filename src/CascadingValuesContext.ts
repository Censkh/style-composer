import {StyleObject}   from "./Styling";
import React           from "react";
import {StyleSelector} from "./selector/StyleSelector";
import {ChildQuery}    from "./selector/ChildSelector";

export interface CascadingValuesContextState {
  style: StyleObject;
  key: string;
  childSelectors: Array<StyleSelector<ChildQuery>>;
}

const CascadingValuesContext = React.createContext<CascadingValuesContextState>({
  style         : {},
  key           : "",
  childSelectors: [],
});
Object.assign(CascadingValuesContext, {displayName: "CascadingValues"});

export const CascadingValuesProvider = CascadingValuesContext.Provider;

export default CascadingValuesContext;
