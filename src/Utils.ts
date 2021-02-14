import React                      from "react";
import {Platform, RecursiveArray} from "react-native";

export type ComponentType<P> = React.ComponentType<P> | ((props: P) => JSX.Element);

export type OmitEx<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export type PropsOf<C extends React.ComponentType<any> | keyof JSX.IntrinsicElements> = C extends React.ComponentType<infer P> ? P : (
  C extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[C] : {}
  );

export type Falsy = false | null | undefined | "" | 0;

export const getGlobal = (): any => {
  return typeof global !== "undefined" ? global : window;
};

export const getDocument = (): Document => {
  return getGlobal().document;
};

export const isSsr = (): boolean => {
  return isWeb() && !isBrowser();
};

export const isWeb = (): boolean => {
  return Platform.OS === "web" || isBrowser();
};

export const isBrowser = (): boolean => {
  return typeof document !== "undefined";
};

export const isNative = (): boolean => {
  return !isWeb();
};

export const flatAndRemoveFalsy = <T>(array: RecursiveArray<T | Falsy>): Array<T> => {
  return array.reduce((flatArray, item: any) => {
    if (!item) {
      return flatArray;
    }
    if (Array.isArray(item)) {
      if (item.length === 0) {
        return flatArray;
      }
      flatArray.push(...flatAndRemoveFalsy(item));
    } else {
      flatArray.push(item);
    }
    return flatArray;
  }, [] as any[]);
};

const hasOwnProperty = Function.prototype.bind.call(
  Function.prototype.call,
  Object.prototype.hasOwnProperty,
);

export type EqualityFunction<T = any> = (a: T, b: T) => boolean;

export const shallowEqual = (a: Record<string, any>, b: Record<string, any>, customEquals?: Record<string, EqualityFunction>): boolean => {
  if (!a || !b) {
    return a === b;
  }

  const aKeys = Object.keys(a);

  const {length} = aKeys;

  if (Object.keys(b).length !== length) {
    return false;
  }

  let key: string;
  for (let i = 0; i < length; i++) {
    key = aKeys[i];

    if (!hasOwnProperty(b, key)) {
      return false;
    }

    const equalityFunction = customEquals && customEquals[key];

    if (equalityFunction ? !equalityFunction(a[key], b[key]) : a[key] !== b[key]) {
      return false;
    }
  }

  return true;
};

export const isEmptyOrFalsy = (array: Array<any> | Falsy): boolean => {
  return !array || array.length === 0;
};

export const arrayify = <T>(arrayOrItem: T | Array<T>): Array<T> => {
  return Array.isArray(arrayOrItem) ? arrayOrItem : [arrayOrItem];
};

export const getReactComponentName = (component: ComponentType<any>): string => {
  if ((component as any).displayName) {
  return (component as any).displayName;
  }
  if (typeof component === "string" && (component as string).length > 0) {
    return component;
  }

  if (typeof (component as any).$$typeof === "symbol") {
    const type: Symbol = ((component ) as any).$$typeof;
    if (type.description === "react.forward_ref") {
      return getReactComponentName((component as any).render);
    }
  }

  return (component as any).displayName || component.name || "Component";
};
