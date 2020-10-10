---
id: style-selectors
title: Style Selectors & Media Queries
---

Style selectors are selectors which **allow you to add dynamic styling to your components.**.

All **selectors will update automatically** and require no further component logic.

They are used in your class style and are defined in this pattern:

```jsx {3,4,5}
const $Style = composeClass("style", () => ({

    [selector(options)]: {
        ...optionalStyling
    }

}));
```

For example, if you wanted to change a component's `fontSize` depending on the screen dimensions you could use the `media()` selector:

```jsx live
function Card() {
    const $Card = composeClass("card", () => ({
        fontSize: 24,
        color: "white",

        [media({maxWidth: 1280})]: {
            fontSize: 14
        }
    }));

    return <StyledView classes={$Card}>
        <StyledText>I am text!</StyledText>
    </StyledView>
}
```

This will make sure when the screen was smaller than 1280px the text inside the view would become smaller.

## Built-in Selectors

| Name                      | Usage
| ---                       | ---
| media                     | `media({maxWidth: 200})`
| rtl                       | `rtl()`
| platform                  | `platform("web")` or `platform(["web", "android"])`

## Selector Boolean Logic

Style composer supplies methods to use boolean logic.

### and()

```

```

## Writing your own
