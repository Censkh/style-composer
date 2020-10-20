---
id: web-support
title: Web Support
---

## Change DOM tags

:::caution
This feature may break with future versions of React Native Web
:::

Some of the styled components support an extra `tag` prop which **allows you to change which DOM element they are rendered as on the web**:

```jsx live
function Button({classes, children}) {
    // NOTE: DO NOT define classes inside a component, this is merely for demonstration
    const $Button = composeClass("button", () => ({
        backgroundColor: "#673ab7",
        color: "white",
        padding: 10,
        borderRadius: 30,
        textAlign: "center",
        width: 250,
        cursor: "pointer",

        [active()]:  {
            backgroundColor: "#e91e63",
        }
    }));

    const [isActive, setActive] = useState(false);

    return <StyledPressable
                tag={"button"}
                classes={[$Button, classes]}
                pseudoClasses={[isActive && active]}
                onPressIn={() => setActive(true)}
                onPressOut={() => setActive(false)}>
        <StyledText>I am an actual button!</StyledText>
    </StyledPressable>;
}
```

### Supported components

- StyledView
- StyledTouchableNativeFeedback
- StyledTouchableOpacity
- StyledTouchableWithoutFeedback
- StyledTouchableHighlight
- StyledText
- StyledPressable
