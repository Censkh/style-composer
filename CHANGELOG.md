# Changelog

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
