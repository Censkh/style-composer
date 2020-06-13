import {StyleObject} from "./Styling";
import React         from "react";

export interface CascadingStyleContextState {
  style: StyleObject;
  key: string;
}

const CascadingStyleContext = React.createContext<CascadingStyleContextState>({style: {}, key: ""});
Object.assign(CascadingStyleContext, {displayName: "CascadingStyle"});

export const CascadingStyleProvider = CascadingStyleContext.Provider;

export default CascadingStyleContext;
