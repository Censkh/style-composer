import {StyleObject} from "./Styling";
import React         from "react";
import {StyleRule}   from "./rule/StyleRule";
import {ChildQuery}  from "./rule/ChildRule";

export interface CascadingValuesContextState {
  style: StyleObject;
  key: string;
  childRules: Array<StyleRule<ChildQuery>>;
}

const CascadingValuesContext = React.createContext<CascadingValuesContextState>({
  style     : {},
  key       : "",
  childRules: [],
});
Object.assign(CascadingValuesContext, {displayName: "CascadingValues"});

export const CascadingValuesProvider = CascadingValuesContext.Provider;

export default CascadingValuesContext;
