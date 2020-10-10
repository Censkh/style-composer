---
id: pseudo-classes
title: Pseudo Classes
---

Pseudo classes are styling flags that allow you to **add optional styling** to your classes. **Each pseudo class is also a selector** to select any element that has been given that pseudo class. For example, when a button is pressed.

There are two parts to using pseudo classes:

First, you must apply pseudo classes when conditions you want to style based upon are met. **No pseduo classes are applied automatically.**

```jsx {6}
import {disabled} from "style-composer";

export default function Form({isDisabled, children}) {
    return <StyledView
                classes={[$Form, $FieldGroup]}
                pseudoClasses={[isDisabled && disabled]}
            >
        {children}
    </StyledView>;
}
```

Now, we can add styling that is only applied when `isDisabled` is truthy in a **generic way that can be re-used by multiple components**:

```js {6,7,8}
import {disabled} from "style-composer";

export const $FieldGroup = composeClass("field-group", () => ({
    padding: 10,

    [disabled()]: {
        opacity: 0.5,
    }
}));
```

## In-built Selectors

- active
- disabled
- focus
- hover

## Demo

```jsx live
function Button({classes, children}) {
    // NOTE: DO NOT define classes inside a component, this is merely for demonstration
    const $Button = composeClass("button", () => ({
        backgroundColor: "#673ab7",
        color: "white",
        padding: 10,
        borderRadius: 30,
        textAlign: "center",
        width: 150,

        [active()]:  {
            backgroundColor: "#e91e63",
        }
    }));

    const [isActive, setActive] = useState(false);

    return <StyledTouchableOpacity
                classes={[$Button, classes]}
                pseudoClasses={[isActive && active]} // <-- adds active when isActive is true
                activeOpacity={1}
                onPressIn={() => setActive(true)}
                onPressOut={() => setActive(false)}>
        <StyledText>Press me!</StyledText>
    </StyledTouchableOpacity>;
}
```

## Creating your own

If you wished to add your own pseudo class selectors for your app you can do so like this:

```js
import {createPseudoSelector} from "style-composer";

export const selected = createPseudoSelector("selected");
```

This will now work just the same as the in-built pseudo classes
