import {Style} from "./Styling";
import React   from "react";

export interface CascadingStyleContextState {
  style: Style;
  key: string;
}

const CascadingStyleContext = React.createContext<CascadingStyleContextState>({style: {}, key: ""});
Object.assign(CascadingStyleContext, {displayName: "CascadingStyle"});

export default CascadingStyleContext;