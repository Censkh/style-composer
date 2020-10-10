---
id: variants
title: Variants
---

A lot of the time you will need slight variations of the same class that can be easily applied for different scenarios. These can be useful for utility classes such as Row:

```jsx
export const $Row = composeClass("row", () => ({
    display: "flex",
    flexDirection: "row",
}), {
    variants: {
        "center": {
            alignItems: "center"
        }
    }
});
```

You can then use those classes with:

```typescript jsx
<StyledView classes={$Row.center}>I am a centered row!</StyledView>
```

## Demo

```jsx live
function Heading({varaint: propsVaraint}) {
    const varaint = propsVaraint || "h2";

    // NOTE: DO NOT define classes inside a component, this is merely for demonstration
    const $Heading = composeClass("Heading", () => ({
        color: "white",
        marginBottom: 7,
    }), {
      variants: {

        "h1": () => ({
          fontSize: 35,
        }),

        "h2": () => ({
          fontSize  : 28,
        }),

        "h3": () => ({
          fontSize: 26,
        }),

        "h4": () => ({
          fontSize: 23,
        }),

        "h5": () => ({
          fontSize: 18,
        }),

      },
    });

    return <StyledText classes={$Heading[varaint]}>Heading {varaint}</StyledText>;
}
```
