import {RecursiveArray, StyleSheet} from "react-native";

import {resolveStyling, Style, StylingBuilder, StylingResolution} from "../Styling";
import * as Utils                                                 from "../Utils";
import {Falsy}                                                    from "../Utils";
import ClassManager                                               from "./ClassManager";
import {StyleProp}                                                from "../component/Styler";

export type StyleClassMeta<V extends Record<string, StyleClass> = {}> = StylingResolution & {
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

const createStyleSheet = (name: string, style: Style): number => {
  return StyleSheet.create({[name]: style})[name] as number;
};


export function composeClass<V extends string = never>(name: string, styling: StylingBuilder, options?: ComposeClassOptions<V>): StyleClass<Record<V, StyleClass>> {
  // we pretend variants is already full so we can add a reference to it it's self when building the variants
  const variants: V = {} as any;

  const className = (options?.parent ? options?.parent.__meta.name + "__" : "") + name;

  const styledClass: StyleClass<any> = {
    __meta: {
      name          : name,
      parent        : options?.parent || null,
      className     : className,
      variants      : variants,
      rules         : null as any,
      hasRules      : false,
      hasThemed     : false,
      hasDynamicUnit: false,
      isSimple      : false,
      bakedStyle    : null,
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
  classMeta.sheetId = createStyleSheet(className, classMeta.bakedStyle);
  if (classMeta.hasRules) {
    for (const rule of Object.values(classMeta.rules)) {
      const ruleStyling = classMeta.resolvedStyling[rule.id];
      if (ruleStyling) {
        rule.sheetId = createStyleSheet(rule.className, ruleStyling);
      }
    }
  }

  ClassManager.registerClass(styledClass);

  return Object.assign(styledClass, variants);
}

export type Classes = Array<StyleClass | Falsy> | StyleClass | Falsy;

export const classesId = (classes: Classes): string | null => {
  if (!classes) return null;
  if (Array.isArray(classes)) {
    const classArray = classes.reduce((classes, clazz) => {
      if (clazz) {
        classes.push(clazz.__meta.className);
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
  if (!classes) return classes;
  return Array.isArray(classes) ? Utils.flatAndRemoveFalsy(classes) : [classes];
};

export const styleList = (...style: RecursiveArray<Style | Falsy>): StyleProp => {
  if (!style) return style;
  return Array.isArray(style) ? Utils.flatAndRemoveFalsy(style) : [style];
};