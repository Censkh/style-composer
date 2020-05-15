import React, {useContext} from "react";

export type Theme = Record<string, string | number>;

let themedSession: ThemedSession = {
  running: false,
  called:  false,

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

const ThemeContext = React.createContext<Theme>(currentTheme);

export const ThemeProvider = ThemeContext.Provider;

export interface Themed<T = any> {
  (): T;

  key: string;
  defaultValue: T;
  toString: () => string;
}

export const useTheming = () => {
  const theme = useContext(ThemeContext);
  currentTheme = theme;
  return theme;
}

export function themed<T extends string | number>(key: string, defaultValue: T): Themed<T> {
  let rule = Object.assign(function(this: Themed<T>) {
    themedSession.called = true;
    if (themedSession.running) return rule;
    return currentTheme[key] || defaultValue;
  }, {
    key,
    defaultValue,
    toString: () => key,
  });
  return rule;
}