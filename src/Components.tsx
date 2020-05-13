import React        from "react";
import {Text, View} from "react-native";

import NativeStyler        from "./NativeStyler";
import {Style, StyleClass} from "./Styling";
import {Styler}            from "./StylerComponent";

export function styled<P>(baseComponent: React.ComponentType<P>): React.ComponentType<P & {
  style?: Style;
  classes?: StyleClass[],
}> {
  return (props) => {
    const {children, style, classes, ...otherProps} = props;
    return <Styler
      classes={classes} style={style}>
      {React.createElement(baseComponent, otherProps as any, children) as any}
    </Styler>;
  };
}

export const StyledView = styled(View);
export const StyledText = styled(Text);