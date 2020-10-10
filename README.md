# [style-composer](https://github.com/Censkh/style-composer/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Censkh/style-composer/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/style-composer.svg?style=flat)](https://www.npmjs.com/package/style-composer)

Straightforward and powerful cross platform styling for React Native supporting Android, iOS and web

``` npm i style-composer ```

**Note:** this package is in early development, use with caution

- [Documentation](https://censkh.github.io/style-composer/docs)

## Features

- [Cascading styles](https://censkh.github.io/style-composer/docs/cascading)
- Native & web support
- [`!important` like feature](https://censkh.github.io/style-composer/docs/rule-order-and-important)
- [Media queries](https://censkh.github.io/style-composer/docs/style-selectors)
- [Class variants](https://censkh.github.io/style-composer/docs/variants)
- [Theming](https://censkh.github.io/style-composer/docs/theming)
- [Dynamic Units (vw, vh)](https://censkh.github.io/style-composer/docs/dynamic-units)

## Why?

The inbuilt styling system for React Native isn't powerful enough to allow for universal styling without the need to add component level logic to adapt to platform or screen size changes.

For example, currently with RN's inbuilt StyleSheets it is not possible to have media queries or themes without component logic.

To solve this `style-composer` builds on-top of this system to provide many features it can't.
