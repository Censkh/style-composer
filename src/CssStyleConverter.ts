import {processStyle, Style, Styling} from "./Styling";
import {StyleClass}                   from "./class/StyleClass";
import * as Utils                     from "./Utils";

export const extractStyleClassToCss = (styleClass: StyleClass, resolvedStyling: Styling) => {
  const parent = styleClass.__meta.parent;

  const selector = `.styled${parent ? "." + parent.__meta.className : ""}.${styleClass.__meta.className}`;
  const body = styleToCss(resolvedStyling, {important: true});

  let css = `${selector}{${body}}`;

  const rules = styleClass.__meta.rules;
  if (rules) {
    for (const rule of Object.values(rules)) {
      const ruleStyling = resolvedStyling[rule.id];
      if (ruleStyling) {
        css += `\n${selector}.${rule.className}{${styleToCss(resolvedStyling[rule.id], {important: true})}}`;
      }
    }
  }

  Utils.setStyleSheet(`class[${styleClass.__meta.className}]`, css);
};

export const styleToCss = (style: Style, options?: { important: boolean }): string => {
  const resolveStyled = processStyle(style);

  const lines = Object.keys(resolveStyled).map(property => {
    let value = (resolveStyled as any)[property];
    if (typeof value === "object") return "";
    return "".concat(camelToKebab(property), ": ").concat(value, (options?.important ? "!important;" : ";"));
  });
  return lines.join("");
};

const CAMEL_TO_KEBAB_REGEX = /[A-Z]/g;

const camelToKebabReplacer = (match: string) => "-".concat(match.toLowerCase());

const camelToKebab = (string: string) => {
  if (!string.match(CAMEL_TO_KEBAB_REGEX)) {
    return string;
  }

  return string.replace(CAMEL_TO_KEBAB_REGEX, camelToKebabReplacer);
};