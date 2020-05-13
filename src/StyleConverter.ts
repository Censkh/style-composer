import {Style} from "./Styling";

export const styleToCss = (style: Style, options?: { important: boolean }): string => {
  const lines = Object.keys(style).map(property => {
    let value = (style as any)[property];
    if (typeof value === "object") return "";
    if (!isNaN(value)) {
      value += "px";
    }
    return "".concat(camelToKebab(property), ": ").concat(value, (options?.important ? "!important;" : ";"));
  });
  return lines.join("\n");
};

const CAMEL_TO_KEBAB_REGEX = /[A-Z]/g;

const camelToKebabReplacer = (match: string) => "-".concat(match.toLowerCase());

const camelToKebab = (string: string) => {
  if (!string.match(CAMEL_TO_KEBAB_REGEX)) {
    return string;
  }

  return string.replace(CAMEL_TO_KEBAB_REGEX, camelToKebabReplacer);
};