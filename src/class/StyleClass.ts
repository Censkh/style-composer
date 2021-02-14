import {RecursiveArray, StyleSheet} from "react-native";

import {resolveStyling, StyleObject, StyleScope, StylingBuilder, StylingResolution} from "../Styling";
import * as Utils                                                                   from "../Utils";
import {Falsy}                                                                      from "../Utils";
import ClassManager                                                                 from "./ClassManager";
import {PseudoSelectorType}                                                         from "../selector/PseudoSelector";

export type StyleClassMeta<V extends Record<string, StyleClass> = {}> = StylingResolution & {
  key: number;
  name: string;
  className: string;
  parent: StyleClass | null;
  variants: V | null;
};

export type StyleClass<V extends Record<string, StyleClass> = {}> = V & {
  __meta: StyleClassMeta<V>
}

export interface ComposeClassOptions<V extends string> {
  parent?: StyleClass;
  variants?: Record<V, StylingBuilder>;
}

const createStyleSheet = (name: string, style: StyleObject): number => {
  return StyleSheet.create({[name]: style})[name] as number;
};

let globalClassIdCounter = 0;

export const composeClass = <V extends string = never>(name: string, stylingBuilder: StylingBuilder, options?: ComposeClassOptions<V>): StyleClass<Record<V, StyleClass>> => {
  const parentName = options?.parent?.__meta.name;
  const className  = (parentName ? `${parentName}(${name})` : name);

  if (process.env.NODE_ENV === "production" && ClassManager.hasClass(className)) {
    console.error(`[style-composer] Re-declaring class '${className}', this will cause performance issues`);
  }

  // we pretend variants is already full so we can add a reference to it it's self when building the variants
  const variants: V = {} as any;

  const styledClass: StyleClass<any> = {
    __meta: {
      key           : globalClassIdCounter++,
      name          : name,
      parent        : options?.parent || null,
      className     : className,
      variants      : variants,
      stylingBuilder: stylingBuilder,
    },
  };
  const classMeta: StyleClassMeta    = styledClass.__meta;

  if (options?.variants) {
    Object.keys(options.variants).forEach((key: any) => {
      const variantStyling   = (options.variants as any)[key];
      (variants as any)[key] = composeClass(key as string, variantStyling, {parent: styledClass});
    });
  }

  Object.assign(classMeta, resolveStyling(className, classMeta.stylingBuilder));

  ClassManager.registerClass(styledClass);

  return Object.assign(styledClass, variants);
};

export const registerStyleSheets = (scope: StyleScope): void => {
  if (scope.sheetId) return;
  scope.sheetId = createStyleSheet(scope.className, scope.staticStyle);
  for (const key in scope.scopes) {
    const childScope = scope.scopes[key];
    registerStyleSheets(childScope);
  }
};

export type Classes = RecursiveArray<StyleClass | Falsy> | StyleClass | Falsy;

export type PseudoClasses = RecursiveArray<string | PseudoSelectorType | Falsy> | string | PseudoSelectorType | Falsy;

export const classesId = (classes: Classes): string | null => {
  if (!classes) return null;
  if (Array.isArray(classes)) {
    const classArray = Utils.flatAndRemoveFalsy(classes).reduce((classes, clazz) => {
      if (clazz) {
        classes.push(clazz.__meta.key.toString());
      }
      return classes;
    }, [] as string[]);
    if (classArray.length === 0) {
      return null;
    }
    return classArray.sort().join(",");
  }
  return classes.__meta.key.toString();
};

export const flattenClasses = (...classes: RecursiveArray<StyleClass | Falsy>): StyleClass[] => {
  return Utils.flatAndRemoveFalsy(classes);
};

export const getClassMeta = (clazz: StyleClass): StyleClassMeta => {
  return clazz.__meta;
};
