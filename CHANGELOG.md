# Changelog

## 0.3.0

### Breaking

- `useComposedStyle` has it's signature changed to make it easier to use

### Features / Changes

- added pseudo classes :D
- inbuilt pseudo classes `hover`, `disabled` and `active`
- allow `important()` inside rules
- refs are now forwarded to base component
- add `not()` rule

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
