import React            from "react";
import {RecursiveArray} from "react-native";

export type PropsOf<C extends React.ComponentType> = C extends React.ComponentType<infer P> ? P : never;

export type Falsy = false | null | undefined | "" | 0;

export const getGlobal = (): any => {
  // eslint-disable-next-line
  // @ts-ignore
  return typeof global !== "undefined" ? global : window;
};

export const getDocument = (): any => {
  return getGlobal().document;
};

export const isNative = (): boolean => {
  // eslint-disable-next-line
  // @ts-ignore
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

export const flatAndRemoveFalsy = <T>(array: RecursiveArray<T | Falsy>, mapFunc?: (value: T) => T): Array<T> => {
  return array.reduce((flatArray, item: any) => {
    if (!item) {
      return flatArray;
    }
    if (Array.isArray(item)) {
      if (item.length === 0) {
        return flatArray;
      }
      flatArray.push(...flatAndRemoveFalsy(item, mapFunc));
    } else {
      flatArray.push(mapFunc ? mapFunc(item) : item);
    }
    return flatArray;
  }, [] as any[]);
};