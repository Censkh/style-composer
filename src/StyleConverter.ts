import {Style} from "./Styling";
// @ts-ignore
import styleResolver from "react-native-web/src/exports/StyleSheet/styleResolver";

export const styleToCss = (style: Style, options?: { important: boolean }): string => {
  const resolveStyled = styleResolver.resolve(style).style;

  const lines = Object.keys(resolveStyled).map(property => {
    let value = (resolveStyled as any)[property];
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