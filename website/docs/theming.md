---
id: theming
title: Theming
---

Create a theme schema:

```jsx
import {createThemeSchema} from "style-composer";

export const THEMING = createThemeSchema({
    textColor: "#333",
    backgroundColor: "#fff",
});
```

Use them in your classes:

```jsx
import {composeClass} from "style-composer";

export const $AppContainer = composeClass("app-container", () => ({
    backgroundColor: THEMING.backgroundColor(),
    color: THEMING.textColor(),
}));
```

Use a ThemeProvider to change these values in your app:

```jsx
import {ThemeProvider, StyledView, StyledText} from "style-composer";

const DARK_THEME = {
    textColor: "rgba(255,255,255,0.97)",
    backgroundColor: "#333"
};

const App = () => {
    return <ThemeProvider schema={THEMING} value={DARK_THEME}>
        <StyledView classes={$AppContainer}>
            <StyledText>hi!</StyledText>
        </StyledView>
    </ThemeProvider>;
};
```
