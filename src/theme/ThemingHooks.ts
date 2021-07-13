import {useContext, useMemo}                                     from "react";
import {Theme, ThemeSchema, ThemingContext, ThemingContextState} from "./Theming";

export const useTheming = <T extends Theme>(schema: ThemeSchema<T>): ThemingContextState<T> => {
  const themingContext = useContext(ThemingContext);

  const defaultValues = useMemo(() => Object.keys(schema).reduce((defaultValues, key) => Object.assign(defaultValues, {[key]: schema[key].defaultValue}), {}), []);

  const theme = useMemo(() => Object.assign({}, defaultValues, themingContext.theme), []);

  return {theme, key: themingContext.key};
};
