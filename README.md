# [style-composer](https://github.com/Censkh/style-composer/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Censkh/style-composer/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/style-composer.svg?style=flat)](https://www.npmjs.com/package/style-composer)

Universal cross platform styling for React Native and the web

``` npm i style-composer ```

## Features

- Descending styles
- Theming
- Native & web support

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

### Theming

1. Create themable values:

    ```typescript jsx
    import {themed} from "style-composer";

    export const THEME = {
        textColor: themed("#333"),
        backgroundColor: themed("#fff"),
    };
    ```

2. Use them in your classes:

    ```typescript jsx
    import {composeClass} from "style-composer";

    export const $AppContainer = composeClass("app-container", () => ({
        backgroundColor: THEME.backgroundColor(),
        color: THEME.textColor(),
    }));
    ```
3. Use a ThemeProvider to change these values in your app:

    ```typescript jsx
   import {ThemeProvider, StyledView, StyledText} from "style-composer";

     // dark theme
    const App = () => {
        return <ThemeProvider value={{
            [THEME.textColor.key]: "rgba(255,255,255,0.97)",
            [THEME.backgroundColor.key]: "#333"
        }}>
            <StyledView classes={[$AppContainer]}>
                <StyledText>hi!</StyledText>
            </StyledView>
        </ThemeProvider>;
    };
    ```
