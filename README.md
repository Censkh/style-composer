# [style-composer](https://github.com/Censkh/style-composer/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Censkh/style-composer/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/style-composer.svg?style=flat)](https://www.npmjs.com/package/style-composer)

Straightforward and powerful cross platform styling for React Native supporting Android, iOS and web

``` npm i style-composer ```

**Note:** this package is in early development, use with caution

## Features

- Cascading styles
- Native & web support
- [`!important` like feature](#important-values)
- [Media queries](#media-queries)
- [Class variants](#variants)
- [Theming](#theming)
- [Dynamic Units (vw, vh)](#dynamic-units)

### Variants

A lot of the time you will need slight variations of the same class. Here is an example:

```typescript jsx
import {composeClass} from "style-composer";

const REM = 14;

export const $Heading = composeClass("Heading", () => ({
  marginBottom: 0.5 * REM,
}), {
  variants: {

    "h1": () => ({
      fontSize: 2.5 * REM,
    }),

    "h2": () => ({
      fontSize  : 2 * REM,
      fontWeight: "bold",
    }),

    "h3": () => ({
      fontSize: 1.75 * REM,
    }),

    "h4": () => ({
      fontSize: 1.5 * REM,
    }),

    "h5": () => ({
      fontSize: 1.25 * REM,
    }),

  },
});
```

You can then use those classes with:

```typescript jsx
<StyledText classes={$Heading.h3}>I am a h3!</StyledText>
```

### Media Queries

```typescript jsx
import {media, composeClass} from "style-composer";

export const $Card = composeClass("card", () => ({
    padding: 10,
    fontSize: 20,

    // when screen is smaller than 500px, apply these selectors
    [media({maxWidth: 500})]: {
        padding: 5,
        fontSize: 14
    }
}));
```

You can also use other queries in combination with operator selectors to create compound queries:

```typescript jsx
import {media, platform, and, composeClass} from "style-composer";

export const pixel3 = () => and(
  platform("android"),
  media({maxWidth: 412}),
  media({minWidth: 410})
);

export const $Card = composeClass("card", () => ({
    padding: 10,
    fontSize: 20,

    // only apply this styling on the pixel 3
    [pixel3()]: {
        padding: 5,
        fontSize: 14
    }
}));
```

<!--
### Fonts

[Example font](./example/assets/fonts/raleway/index.ts)

You can dynamically load fonts in your app. First create your font family object:

```typescript jsx
import {createFontFamily} from "style-composer";

const raleway = createFontFamily("raleway", {
  bold            : require("./Raleway-Bold.ttf"),
  boldItalic      : require("./Raleway-BoldItalic.ttf"),
  regular         : require("./Raleway-Regular.ttf"),
  regularItalic   : require("./Raleway-Italic.ttf"),
});

export default raleway;
```

Then use it in your styles:

```typescript jsx
export const $AppContainer = composeClass("app-container", () => ({
    fontFamily: raleway(),
}));
```

This also supports cascading that font family child elements further in the tree.

Fonts created using this method can now interact with the `fontWeight` style as well to dynamically load different weights of your font:

```typescript jsx
const $Bold = composeClass("bold", () => ({
    fontWeight: "700",
    // fontWeight: "bold"
}));

<StyledView classes={[$Bold]}>
    <StyledText>I am going to be brave and bold!</StyledText>
</StyledView>
```

-->

