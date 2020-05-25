import {Style} from "./Styling";
import React   from "react";

const DescendingStyleContext = React.createContext<[Style, string]>([{}, ""]);
Object.assign(DescendingStyleContext, {displayName: "DescendingStyle"});

export default DescendingStyleContext;