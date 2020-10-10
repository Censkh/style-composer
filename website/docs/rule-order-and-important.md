---
id: rule-order-and-important
title: Rule Order & Important
---

## Rule Order

Styles are applied in the following order, with #1 being styles that will have the highest priority:

1. class selector (eg. media queries) values with `important()`
2. class values with `important()`
3. `style` prop
4. class selector (eg. media queries) values
5. class values
6. cascading styles (eg. `color`)

## Important

Just as in CSS if you need a value to override other rules that have higher precedence you can wrap those values in an `important()`:

```jsx {4}
import {important} from "style-composer";

export const $Card = composeClass("card", () => ({
    backgroundColor: important("red"),

    [media({maxWidth: 700})]: {
        // even though usually a selector will override the parent rules,
        // because the parent rule is marked as important it will not be overriden
        backgroundColor: "blue"
    }
}));
```

### Demo

```jsx live
function Button({classes, children}) {
    // NOTE: DO NOT define classes inside a component, this is merely for demonstration
    const $Button = composeClass("button", () => ({
        padding: 10,
        borderRadius: 30,
        textAlign: "center",
        width: 150,
        margin: 5,

        [disabled()]: {
            // try taking away the important() call
            backgroundColor: important("#aaa"),
        }
    }));

     const [isDisabled, setDisabled] = useState(true);

    return <StyledView style={{color: "white"}}>
        <StyledView style={{display: "flex", flexDirection: "row"}}>
            <StyledText>Button disabled</StyledText>
            <CheckBox
                    value={isDisabled}
                    onValueChange={setDisabled}/>
        </StyledView>
        <StyledTouchableOpacity
                classes={[$Button, classes]}
                style={{backgroundColor: "#673ab7"}}
                pseudoClasses={[isDisabled && disabled]}
                activeOpacity={isDisabled ? 1 : 0.5}
                >
            <StyledText>Button</StyledText>
        </StyledTouchableOpacity>
    </StyledView>;
}
```
