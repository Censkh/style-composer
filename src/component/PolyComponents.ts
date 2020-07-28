import React                                                                        from "react";
import * as Utils                                                                   from "../Utils";
import {Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

export type PolyProps<P> = P & {
  tag?: keyof JSX.IntrinsicElements;
};

const renderPoly = (props: PolyProps<any>, element: React.ReactElement): React.ReactElement => {
  if (!props.tag) {
    return element;
  }
  if (element.type === View) {
    return React.createElement(BasePolyView as any, element.props);
  }
  return {
    ...element,
    type: props.tag,
  };
};

let bailPoly = false;

/**
 * A HOC to allow a React Native component to change the base DOM element tag on web
 */
export const poly  = <P>(baseComponent: React.ComponentType<P>): React.ComponentType<PolyProps<P>> => {
  if (Utils.isNative()) {
    return baseComponent;
  }

  const polyClass       = class extends (baseComponent as any) {
    render() {
      if (bailPoly) {
        return super.render();
      }

      try {
        let renderFunc = super.render;
        if (super.renderView) {
          renderFunc = super.renderView;
        } else if (super.renderText) {
          renderFunc = super.renderText;
        }
        return renderPoly(this.props, renderFunc.call(this));
      } catch (error) {
        console.error("[style-composer] Poly component failed to render, bailing and returning all poly components to normal");
        console.error(error);
        bailPoly = true;
        return super.render();
      }
    }
  };
  polyClass.displayName = `Poly[${baseComponent.displayName}]`;
  return polyClass as any;
};
const BasePolyView = poly(View);

export const PolyView                     = poly(View);
export const PolyTouchableNativeFeedback  = poly(TouchableWithoutFeedback);
export const PolyTouchableOpacity         = poly(TouchableOpacity);
export const PolyTouchableWithoutFeedback = poly(TouchableWithoutFeedback);
export const PolyTouchableHighlight       = poly(TouchableHighlight);
export const PolyText                     = poly(Text);