import {StyleSheet} from "react-native";

/**
 * This overrides expo-font/build/Font in order to disable the warnings when we are loading the font and know what
 * we are doing
 */
/*const processFontFamily = (fontFamily: string): string => {
  if (!fontFamily || !fontFamilyNeedsScoping(fontFamily)) {
    return fontFamily;
  }

  if (!isLoaded(fontFamily)) {
    if (__DEV__) {
      if (isLoading(fontFamily)) {
        // this is our patch, if we are style-composer's font.. we know what we are doing.. no error please
        if (!isStyleComposerFont(fontFamily)) {
          console.error(`You started loading the font "${fontFamily}", but used it before it finished loading.\n
- You need to wait for Font.loadAsync to complete before using the font.\n
- We recommend loading all fonts before rendering the app, and rendering only Expo.AppLoading while waiting for loading to complete.`);
        }
      } else {
        console.error(`fontFamily "${fontFamily}" is not a system font and has not been loaded through Font.loadAsync.\n
- If you intended to use a system font, make sure you typed the name correctly and that it is supported by your device operating system.\n
- If this is a custom font, be sure to load it with Font.loadAsync.`);
      }
    }
    return "System";
  }
  return `ExpoFont-${getNativeFontName(fontFamily)}`;
};*/

let initialised = false;

export const setupFontPreProcessor = (): void => {
  if (initialised) {
    return;
  }
  initialised = true;

  // @ts-ignore
  if (StyleSheet.setStyleAttributePreprocessor) {
    const warn: any = console.warn;
    // if we are native, kill the warning for overriding the font pre-processor
    console.warn    = (...args: any[]) => {
      if (typeof args[0] === "string" && args[0].startsWith("Overwriting fontFamily")) {
        return;
      }
      return warn.apply(null, args);
    };

    console.log(StyleSheet);
    //StyleSheet.setStyleAttributePreprocessor("fontFamily", processFontFamily);

    console.warn = warn;
  }
};
