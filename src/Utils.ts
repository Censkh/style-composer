import React from "react";

export type PropsOf<C extends React.ComponentType> = C extends React.ComponentType<infer P> ? P : never;

export type Falsy = false | null | undefined | "" | 0;

export const getGlobal = () => {
  // @ts-ignore
  return typeof global !== "undefined" ? global : window;
}

export const getDocument = () => {
  return getGlobal().document;
}

export const isNative = () => {
  // @ts-ignore
  return typeof document === "undefined";
};

export const setStyleSheet = (name: string, content: string) => {
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

export const isElement = <E extends React.ElementType>(children: React.ReactNode, element: E): children is { type: E } => {
  if (children && typeof children === "object" && "type" in children) {
    return children.type === element;
  }
  return false;
};

export const flatAndRemoveFalsy = (array: Array<any>): Array<any> => {
  return array.reduce((flatArray, item) => {
    if (!item) return flatArray;
    if (Array.isArray(item)) {
      flatArray.push(...flatAndRemoveFalsy(item));
    } else {
      flatArray.push(item);
    }
    return flatArray;
  }, []);
};