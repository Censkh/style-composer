import {resolveStyling, StylingBuilder, StylingResolution} from "../Styling";
import * as Utils                                          from "../Utils";
import {Falsy}                                             from "../Utils";
import {ClassManager}                                      from "./ClassManager";

export type StyleClass<V extends Record<string, StyleClass> = {}> = V & {
  __meta: StylingResolution & {
    name: string;
    className: string;
    parent: StyleClass | null;
    variants: V | null;
  }
}

export interface ComposeClassOptions<V extends object> {
  parent?: StyleClass;
  variants?: Record<keyof V, StylingBuilder>;
}

export function composeClass<V extends Record<string, StyleClass> = {}>(name: string, styling: StylingBuilder, options?: ComposeClassOptions<V>): StyleClass<V> {
  // we pretend variants is already full so we can add a reference to it it's self when building the variants
  const variants: V = {} as any;

  const styledClass: StyleClass<any> = {
    __meta: {
      name          : name,
      parent        : options?.parent || null,
      className     : (options?.parent ? options?.parent.__meta.name + "__" : "") + name,
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
  const classMeta = styledClass.__meta;

  if (options?.variants) {
    Object.keys(options.variants).forEach((key: keyof V) => {
      const variantStyling = options.variants![key as any];
      (variants as any)[key] = composeClass(key as string, variantStyling, {parent: styledClass});
    });
  }

  const {resolvedStyling} = Object.assign(classMeta, resolveStyling(classMeta.styling));

  ClassManager.registerClass(styledClass, resolvedStyling);

  return Object.assign(styledClass, variants);
}

export type DeepClassList = Array<Falsy | StyleClass | DeepClassList>;

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

export const classList = (...classes: DeepClassList): StyleClass[] => {
  if (!classes) return classes;
  return Array.isArray(classes) ? Utils.flatAndRemoveFalsy(classes) : [classes];
};