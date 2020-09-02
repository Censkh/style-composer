import React              from "react";
import * as styleComposer from "style-composer";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...styleComposer,
};

export default ReactLiveScope;
