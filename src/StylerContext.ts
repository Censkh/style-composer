import {Style} from "./Styling";
import React   from "react";

export interface StylerContextState {
  descendingStyle: Style;
}

export const StylerContext = React.createContext<StylerContextState>({
  descendingStyle: {}
});