import React              from "react";
import * as ReactNativeWeb              from "react-native-web";
import * as styleComposer from "style-composer";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...ReactNativeWeb,
  ...styleComposer,
};

export default ReactLiveScope;
