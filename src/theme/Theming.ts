import React, {useContext} from "react";

let themedSession: ThemedSession = {
  running: false,
  called : false,

};

export interface ThemedSession {
  running: boolean;
  called: boolean;
}

export const startThemedSession = () => {
  themedSession.called = false;
  themedSession.running = true;
};

export const finishThemeSession = (): boolean => {
  themedSession.running = false;
  return themedSession.called;
};

let currentTheme: any = {};

export type ThemeValues = Record<string, string | number>;

const ThemeContext = React.createContext<ThemeValues>(currentTheme);

export interface ThemeProviderProps<T extends ThemeValues> {
  children: React.ReactNode;
  value: Partial<T>;
  plan: ThemePlan<T>
}

export function ThemeProvider<T extends ThemeValues>(props: ThemeProviderProps<T>) {
  return React.createElement(ThemeContext.Provider, props as any);
}

export interface ThemeProperty<T = any> {
  (): T;

  key: string;
  defaultValue: T;
  toString: () => string;
}

export const useTheming = () => {
  const theme = useContext(ThemeContext);
  currentTheme = theme;
  return theme;
};

export type ThemeFor<T extends ThemePlan<any>> = T extends ThemePlan<infer P> ? Partial<P> : never;

export type ThemePlan<T extends ThemeValues> = {
  [K in keyof T]: ThemeProperty<T[K]>
};

export function themePlan<T extends ThemeValues>(themePlanInfo: T): ThemePlan<T> {
  const plan: ThemePlan<any> = {};
  for (const key of Object.keys(themePlanInfo)) {
    const defaultValue = themePlanInfo[key];
    let property: ThemeProperty = plan[key] = Object.assign(function(this: ThemeProperty<T>) {
      themedSession.called = true;
      if (themedSession.running) return property;
      return currentTheme[key] || defaultValue;
    }, {
      key,
      defaultValue,
      toString: () => key,
    });
  }
  return plan;
}