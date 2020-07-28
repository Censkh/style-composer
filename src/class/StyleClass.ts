import {RecursiveArray, StyleSheet} from "react-native";

import {
  resolveStyling,
  sanitizeStylingToStaticStyle,
  Style,
  StyleObject,
  StylingBuilder,
  StylingResolution,
}                   from "../Styling";
import * as Utils   from "../Utils";
import {Falsy}      from "../Utils";
import ClassManager from "./ClassManager";
import {StyleProp}  from "../component/Styler";

export type StyleClassMeta<V extends Record<string, StyleClass> = {}> = StylingResolution & {
  id: number;
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

export function composeClass<V extends string = never>(name: string, styling: StylingBuilder, options?: ComposeClassOptions<V>): StyleClass<Record<V, StyleClass>> {
  // we pretend variants is already full so we can add a reference to it it's self when building the variants
  const variants: V = {} as any;

  const className = (options?.parent ? options?.parent.__meta.name + "__" : "") + name;

  const styledClass: StyleClass<any> = {
    __meta: {
      id            : globalClassIdCounter++,
      name          : name,
      parent        : options?.parent || null,
      className     : className,
      variants      : variants,
      rules         : null as any,
      hasRules      : false,
      hasThemed     : false,
      hasDynamicUnit: false,
      isSimple      : false,
      staticStyle   : null,
      styling       : styling,
      dynamicProps  : {},
    },
  };
  const classMeta: StyleClassMeta    = styledClass.__meta;

  if (options?.variants) {
    Object.keys(options.variants).forEach((key: any) => {
      const variantStyling   = (options.variants as any)[key];
      (variants as any)[key] = composeClass(key as string, variantStyling, {parent: styledClass});
    });
  }

  Object.assign(classMeta, resolveStyling(classMeta.styling));

  ClassManager.registerClass(styledClass);

  return Object.assign(styledClass, variants);
}

export const registerStyleSheets = (classMeta: StyleClassMeta): void => {
  if (classMeta.sheetId) {
    return;
  }
  classMeta.sheetId = createStyleSheet(classMeta.className, classMeta.staticStyle);
  if (classMeta.hasRules) {
    for (const rule of Object.values(classMeta.rules)) {
      const ruleStyling = classMeta.resolvedStyling[rule.id];
      if (ruleStyling) {
        rule.sheetId = createStyleSheet(rule.className, sanitizeStylingToStaticStyle(ruleStyling).style);
      }
    }
  }
};

export type Classes = RecursiveArray<StyleClass | Falsy> | StyleClass | Falsy;

export type PseudoClasses = RecursiveArray<string | Falsy> | string | Falsy;

export const classesId = (classes: Classes): string | null => {
  if (!classes) return null;
  if (Array.isArray(classes)) {
    const classArray = Utils.flatAndRemoveFalsy(classes).reduce((classes, clazz) => {
      if (clazz) {
        classes.push(clazz.__meta.id.toString());
      }
      return classes;
    }, [] as string[]);
    if (classArray.length === 0) {
      return null;
    }
    return classArray.sort().join(",");
  }
  return classes.__meta.className;
};

export const classList = (...classes: RecursiveArray<StyleClass | Falsy>): StyleClass[] => {
  return Utils.flatAndRemoveFalsy(classes);
};
