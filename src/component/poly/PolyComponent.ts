import React                   from "react";
import {View}                  from "react-native";
import * as Utils              from "../../Utils";
import {getReactComponentName} from "../../Utils";

export type PolyProps<P> = P & {
  tag?: keyof JSX.IntrinsicElements;
};

const extraSupportedProps = ["draggable"];

const renderPoly = (props: PolyProps<any>, element: React.ReactElement): React.ReactElement => {
  if (!props.tag) {
    return element;
  }
  if (element.type === View) {
    return {
      ...element,
      type: BasePolyView,
    };
  }

  return {
    ...element,
    props: Object.assign({}, Object.keys(props).reduce((extraProps, key) => {
      if (extraSupportedProps.includes(key)) {
        extraProps[key] = props[key];
      }
      return extraProps;
    }, {} as any), element.props),
    type : props.tag,
  };
};

let bailPoly = false;

const extendClassComponent = (baseComponent: any) => {
  const polyClass = class extends (baseComponent as any) {
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
  return polyClass;
};

const extendFunctionComponent = (baseComponent: any) => {
  const isMemo = Boolean(baseComponent.type);
  let target   = baseComponent.type ?? baseComponent;

  const renderFunc                         = target.render;
  let isProviderBased: boolean | undefined = undefined;

  target = {
    ...target,
    render: (props: any, ref: any) => {
      const children = renderFunc(props, ref);
      if (isProviderBased === undefined) {
        isProviderBased = Boolean(children.type.$$typeof?.toString().includes("react.provider"));
      }

      if (isProviderBased) {
        return {
          ...children,
          props: {
            ...children.props,
            children: renderPoly(props, children.props.children),
          },
        };
      }

      return renderPoly(props, children);
  }};
  return isMemo ? React.memo(target, baseComponent.compare) : target;
};


/**
 * A HOC to allow a React Native component to change the base DOM element tag on web
 */
export const poly = <P>(baseComponent: React.ComponentType<P> & { isPoly?: boolean }): React.ComponentType<PolyProps<P>> => {
  if (!baseComponent) {
    return baseComponent;
  }

  if (Utils.isNative() || baseComponent.isPoly) {
    return baseComponent;
  }

  const polyClass         = baseComponent.prototype ? extendClassComponent(baseComponent) : extendFunctionComponent(baseComponent);
  polyClass.isPoly        = true;
  const baseComponentName = getReactComponentName(baseComponent);
  Object.defineProperty(polyClass, "displayName", {value: `Poly[${baseComponentName}]`});

  return polyClass as any;
};

const BasePolyView = poly(View);
