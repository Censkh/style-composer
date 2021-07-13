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

export type Theme = Record<string, string | number>;

export interface ThemingContextState<T extends Theme> {
  theme: T;
  key: string | null;
}

let currentTheme: any = {};

export const ThemingContext = React.createContext<ThemingContextState<any>>({
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
  const currentValue      = useMemo<ThemingContextState<T>>(() => ({
    theme: value as any,
    key  : Date.now().toString(),
  }), [value]);
  currentTheme = currentValue.theme;
  return React.createElement(ThemingContext.Provider, {value: currentValue}, children);
}

export interface ThemeProperty<T = any> {
  (): T;

  key: string;
  defaultValue: T;
  toString: () => string;
}

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
