import React, {useContext} from "react";

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

const ThemeContext = React.createContext<Theme>(currentTheme);

export interface ThemeProviderProps<T extends Theme> {
  children: React.ReactNode;
  value: Partial<T>;
  schema: ThemeSchema<T>
}

export function ThemeProvider<T extends Theme>(props: ThemeProviderProps<T>): JSX.Element {
  return React.createElement(ThemeContext.Provider, props as any);
}

export interface ThemeProperty<T = any> {
  (): T;

  key: string;
  defaultValue: T;
  toString: () => string;
}

export const useTheming = (): Theme => {
  const theme  = useContext(ThemeContext);
  currentTheme = theme;
  return theme;
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
