---
id: fonts
title: 🚧 Fonts
---

:::danger
This API is experimental and subject to change
:::

You can dynamically load fonts in your app. First create your font family object:

```jsx title="assets/fonts/raleway/index.js"
import {createFontFamily} from "style-composer";

const raleway = createFontFamily("Raleway", {
  bold            : require("./Raleway-Bold.ttf"),
  boldItalic      : require("./Raleway-BoldItalic.ttf"),
  regular         : require("./Raleway-Regular.ttf"),
  regularItalic   : require("./Raleway-Italic.ttf"),
});

export default raleway;
```

[Example font](https://github.com/Censkh/style-composer/blob/master/example/assets/fonts/raleway/index.ts)

Then use it in your styles (fonts are cascaded as you expect):

```jsx title="app-container.js"
export const $AppContainer = composeClass("app-container", () => ({
    fontFamily: raleway(),
}));
```

This also supports cascading that font family child elements further in the tree.

Fonts created using this method can now interact with the `fontWeight` style as well to dynamically load different weights of your font:

```jsx
const $Bold = composeClass("bold", () => ({
    fontWeight: "700",
    // fontWeight: "bold"
}));

<StyledView classes={$Bold}>
    <StyledText>I am going to be brave and bold!</StyledText>
</StyledView>
```

## File Formats

You can provide multiple formats so when rendering on web it can pick the best format for the browser:

```jsx
export const openSans = createFontFace("Open Sans", {
  bold   : require("./Raleway-Bold.ttf"),
  regular: {
    ttf  : require("./Raleway-Regular.ttf"),
    eof  : require("./Raleway-Regular.eof"),
    woff2: require("./Raleway-Regular.woff2"),
  }
});
```

## Web Fallbacks

```jsx
export const openSans = createFontFace("Open Sans", {
  //...
}, {
  fallbacks: ["sans-serif"]
});
```
