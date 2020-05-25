import StyleClassBuilder                   from "./StyleClassBuilder";
import {StylingBuilder, StylingResolution} from "../Styling";
import * as Utils                          from "../Utils";
import {Falsy}                             from "../Utils";

export type StyleClass<V extends Record<string, StyleClass> = {}> = V & {
  __meta: StylingResolution & {
    name: string;
    className: string;
    parent: StyleClass | null;
    variants: V | null;
  }
}

export function composeClass(name: string, styling: StylingBuilder): StyleClassBuilder {
  return new StyleClassBuilder(name, styling);
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