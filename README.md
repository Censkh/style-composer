# [style-composer](https://github.com/Censkh/style-composer/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Censkh/style-composer/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/style-composer.svg?style=flat)](https://www.npmjs.com/package/style-composer)

Straightforward and powerful cross platform styling for React Native supporting Android, iOS and web

``` npm i style-composer ```

**Note:** this package is in early development, use with caution

## Features

- Cascading styles
- Native & web support
- [Media queries](#media-queries)
- [Class variants](#variants)
- [Dynamic fonts](#fonts)
- [Theming](#theming)

## Why?

The inbuilt styling system for React Native isn't powerful enough to allow for universal styling without the need to add component level logic to adapt to platform or screen size changes.

For example, currently with RN's inbuilt StyleSheets it is not possible to have media queries or themes without component logic.

To solve this `style-composer` builds on-top of this system to provide many features it can't.

## Usage

### Composing Classes

```typescript jsx
// Card.style.ts
import {composeClass} from "style-composer";

export const $Card = composeClass("card", () => ({
    fontSize: 14,
    color: "#333",
}));
```

We can now use this style with the following snippet which automatically cascade the color and font size down to the styled text:

```typescript jsx
import {StyledView, StyledText} from "style-composer";
import {$Card} from "./Card.style";

<StyledView classes={[$Card]}>
    <StyledText>hi</StyledText>
</StyledView>
```

**Note:** when composing classes the function passed to generate your styles should be pure

### Using Classes

Classes can be added to styled components easily, also interacting with the `style` prop just as you would think:

```typescript jsx
<StyledView classes={$Card} style={{backgroundColor: "red"}}/>

<StyledView classes={[$Card, $BigMargin]}/>

// you can use classList to easily compose a deep list of classes
<StyledView classes={classList([$Card, $BigMargin], disabled && $CardDisabled)}/>
```

### Style Ordering and important()

Styles are applied in the following order, with #1 being styles that will have the highest priority:

1. class rule (eg. media queries) values with `important()`
2. class values with `important()`
3. `style` prop
4. class rule (eg. media queries) values
5. class values
6. cascading styles (eg. `color`)

#### Important values

When defining classes you can wrap any value in `important()` which will make it take priority over other values that would

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

    // when screen is smaller than 500px, apply these rules
    [media({maxWidth: 500})]: {
        padding: 5,
        fontSize: 14
    }
}));
```

You can also use other queries in combination with operator rules to create compound queries:

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

### Theming

1. Create themable values:

    ```typescript jsx
    import {themePlan} from "style-composer";

    export const THEMING = themePlan({
        textColor: "#333",
        backgroundColor: "#fff",
    });
    ```

2. Use them in your classes:

    ```typescript jsx
    import {composeClass} from "style-composer";

    export const $AppContainer = composeClass("app-container", () => ({
        backgroundColor: THEMING.backgroundColor(),
        color: THEMING.textColor(),
    }));
    ```
3. Use a ThemeProvider to change these values in your app:

    ```typescript jsx
   import {ThemeProvider, StyledView, StyledText} from "style-composer";

     // dark theme
    const App = () => {
        return <ThemeProvider plan={THEMING} value={{
            textColor: "rgba(255,255,255,0.97)",
            backgroundColor: "#333"
        }}>
            <StyledView classes={[$AppContainer]}>
                <StyledText>hi!</StyledText>
            </StyledView>
        </ThemeProvider>;
    };
    ```

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
