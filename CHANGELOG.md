# Changelog

## 0.2.0

Refactoring and optimizations, fun!

### Features / Changes

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