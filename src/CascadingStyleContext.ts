import {StyleObject}       from "./Styling";
import React        from "react";
import {StyleRule}  from "./rule/StyleRule";
import {ChildQuery} from "./rule/ChildRule";

export interface CascadingStyleContextState {
  style: StyleObject;
  key: string;
  childRules: Array<StyleRule<ChildQuery>>;
}

const CascadingStyleContext = React.createContext<CascadingStyleContextState>({
  style     : {},
  key       : "",
  childRules: [],
});
Object.assign(CascadingStyleContext, {displayName: "CascadingStyle"});

export const CascadingStyleProvider = CascadingStyleContext.Provider;

export default CascadingStyleContext;
