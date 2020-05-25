import React                                                    from "react";
import * as Utils                                               from "../Utils";
import {styled, StyledText, StyledTouchableOpacity, StyledView} from "./StyledComponents";
import {Text, TouchableOpacity, View}                           from "react-native";

export type PolyProps<P> = P & {
  tag: keyof JSX.IntrinsicElements;
};


export const poly = <P>(baseComponent: React.ComponentType<P>, disableStyled?: boolean): React.ComponentType<PolyProps<P>> => {
  const polyClass = class extends (baseComponent as any) {
    render() {
      const element: any = super.render();
      return element.type === View ? React.createElement(BasePolyView as any, element.props) : {...element, type:  this.props.tag};
    }
  };
  polyClass.displayName = `Poly[${baseComponent.displayName}]`
  return (disableStyled ? polyClass : styled(polyClass as any, {canBeCssOptimized: true})) as any;
};
const BasePolyView = Utils.isNative() ? View : poly(View, true);

export const PolyView = Utils.isNative() ? StyledView : poly(View);
export const PolyTouchableOpacity = Utils.isNative() ? StyledTouchableOpacity : poly(TouchableOpacity);
export const PolyText = Utils.isNative() ? StyledText : poly(Text);