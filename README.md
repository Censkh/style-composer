# [style-composer](https://github.com/Censkh/style-composer/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Censkh/style-composer/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/style-composer.svg?style=flat)](https://www.npmjs.com/package/style-composer)

Straightforward cross platform styling for React Native and the web

``` npm i style-composer ```

**Note:** this package is in early development, use with caution

## Features

- Descending styles
- Theming
- Native & web support
- Media queries

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

We can now use this style with the following snippet which automatically descend the color and font size down to the styled text:

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

### Media Queries

```typescript jsx
import {media} from "style-composer";

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
