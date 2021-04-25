import React, {useContext, useMemo} from "react";

const themedSession: ThemedSession = {
  running: false,
  called : false,

};

export interface ThemedSession {
  running: boolean;
  called: boolean;
}

export const startThemedSession = (): void => {
  themedSession.called  = false;
  themedSession.running = true;
};

export const finishThemeSession = (): boolean => {
  themedSession.running = false;
  return themedSession.called;
};

let currentTheme: any = {};

export type Theme = Record<string, string | number>;

interface ThemeContextState {
  theme: Theme;
  key: string | null;
}

const ThemeContext = React.createContext<ThemeContextState>({
  theme: currentTheme,
  key  : null,
});

export interface ThemeProviderProps<T extends Theme> {
  children: React.ReactNode;
  value: Partial<T>;
  schema: ThemeSchema<T>
}

export function ThemeProvider<T extends Theme>(props: ThemeProviderProps<T>): JSX.Element {
  const {children, value} = props;
  const currentValue      = useMemo<ThemeContextState>(() => ({
    theme: value as any,
    key  : Date.now().toString(),
  }), [value]);
  return React.createElement(ThemeContext.Provider, {value: currentValue}, children);
}

export interface ThemeProperty<T = any> {
  (): T;

  key: string;
  defaultValue: T;
  toString: () => string;
}

export const useTheming = (): ThemeContextState => {
  const state  = useContext(ThemeContext);
  currentTheme = state.theme;
  return state;
};

export type ThemeFor<T extends ThemeSchema<any>> = T extends ThemeSchema<infer P> ? Partial<P> : never;

export type ThemeSchema<T extends Theme> = {
  [K in keyof T]: ThemeProperty<T[K]>
};

export function createThemeSchema<T extends Theme>(defaultTheme: T): ThemeSchema<T> {
  const schema: ThemeSchema<any> = {};
  for (const key of Object.keys(defaultTheme)) {
    const defaultValue            = defaultTheme[key];
    const property: ThemeProperty = schema[key] = Object.assign(function(this: ThemeProperty<T>) {
      themedSession.called = true;
      if (themedSession.running) return property;
      return currentTheme[key] || defaultValue;
    }, {
      key,
      defaultValue,
      toString: () => key,
    });
  }
  return schema;
}
