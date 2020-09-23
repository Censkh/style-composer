import React            from "react";
import {RecursiveArray} from "react-native";

export type OmitEx<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export type PropsOf<C extends React.ComponentType<any>> = C extends React.ComponentType<infer P> ? P : never;

export type Falsy = false | null | undefined | "" | 0;

export const getGlobal = (): any => {
  return typeof global !== "undefined" ? global : window;
};

export const getDocument = (): any => {
  return getGlobal().document;
};

export const isNative = (): boolean => {
  return typeof document === "undefined";
};

export const setStyleSheet = (name: string, content: string): void => {
  if (!isNative()) {
    const document = getDocument();
    const id       = `stylesheet-${name}`;
    let style: any = document.getElementById(id);
    if (!style) {
      style    = document.createElement("style");
      style.id = `stylesheet-${name}`;
      style.setAttribute("data-name", name);
      document.head.appendChild(style);
    }
    style.innerHTML = content;
  }
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
