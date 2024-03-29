# Changelog

## 0.6.0

### Breaking

- lots of breaking changes with fonts
- `FontFamily` is now `FontFace`
- `createFontFamily` is now `createFontFace`

### Changes

- change `useTheming` hook, now gives theme values based on a supplied schema
- use `String.replace` instead of `String.replaceAll` for node 14 support
- fonts now require you to explicitly set a backend on native environments
  - `ExpoFontBackend` for `expo`
  - `WebFontBackend` for web

## 0.5.11

- properly cascade colors to TextInput and clean-up options to allow custom components to do the same

## 0.5.10

- fix for themes changing not updating styles

## 0.5.9

- fix variants for child selectors

## 0.5.8

- add `StyledImageBackground`

## 0.5.7

- make text decorations cascade
- fix issues with styles not updating

## 0.5.6

- add `pointerEvents` to support web styles
- better component name
- fix issue with name acquisition of styled components

## 0.5.5

- add `lineHeight` as a cascading property
- add `propType` fixer to allow for web styles in native style objects

## 0.5.4

- update styled components type

## 0.5.3

- pass through `dataSet` prop

## 0.5.1

### Fixes

- make sure head elements are created only once
- optimize CSS in \<CssGlobalStyling> component

## 0.5.0

### Breaking

- make the `useComposedStyles` hook more usable to make custom styled components

### Features / Changes

- add proper typings to Animated components
- add optimized web values
- allow modules that export `default` to be used as font assets

### Fixes

- fix app support for fonts

## 0.4.0

### Breaking

- `themePlan()` -> `createThemeSchema()`
- style rules become style selectors to prevent confusion between rules and rules
- dynamic units have a new calling convention

### Features / Changes

- massive internal re-write to prep for selectors within selectors
- SSR support
- add `FontFamily` fallbacks for web
- add `child()` selector
- add `hover()` pseudo selector
- add prop types for in-built components
- add `StyledAnimated`
- add `autoFlattens` selector and now flatten style list by default

### Fix

- fix text rendering on rnw 13
- fix data props on rnw 13

## 0.3.0

### Breaking

- `useComposedStyle` has it's signature changed to make it easier to use
- remove `classList` as you can simply use a deep array of `classes`

### Features / Changes

- added pseudo classes :D
- inbuilt pseudo classes `hover`, `disabled` and `active`
- allow `important()` inside selectors
- refs are now forwarded to base component
- add `not()` selector
- add `StyledScrollView` and `StyledImage`
- add `rtl()` selector

### Fix

- make sure complex string values are not passed to RN as it doesn't like it

## 0.2.0

### Features / Changes

- `important()` function to emulate CSS's `!important`
- new exported hook `useComposedStyle` which is used internally
- provide `CascadingStyleProvider` export
- memoize classes prop based upon class ID
- hot reload support
- add support for all font weights

### Fix

- if a poly component fails to render bail and on all poly components
- fix a bug where certain font families would not display correctly with the actual font weight they are

### Internal

- remove old global stylesheet that is no longer needed
- use React Native's `StyleSheet` internally instead of flattening styles ourselves
- merge CSSOptimizedStyler and InlineStyler into Styler and let `react-native-web` handle CSS optimizations
- optimize dynamic font loading
- update CSSGlobalStyling props interface to CSSGlobalStylingProps
- change name given to CSSGlobalStyling stylesheets from `css-component[{$name}]` to `css-global-styling[{$name}]`
