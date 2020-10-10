---
id: usage
title: Usage
---

## Why?

The inbuilt styling system for React Native isn't powerful enough to allow for universal styling without the need to add component level logic to adapt to platform or screen size changes.

For example, currently with RN's inbuilt StyleSheets it is not possible to have media queries or themes without component logic.

To solve this `style-composer` builds on-top of this system to provide many features it can't:

- [Cascading styles](cascading)
- [`!important` like feature](important-values)
- [Media queries](style-selectors)
- [Class variants](variants)
- [Theming](theming)
- [Dynamic Units (vw, vh)](dynamic-units)

## Usage

In a styling file you define your classes, which hold 'scopes' of style rules that can be applied to components:

```jsx title="Card.style.js"
import {composeClass} from "style-composer";

// the function passed to compose class **must** be pure
export const $Card = composeClass("card", () => ({
    fontSize: 14,
    color: "#333",
}));
```

Classes can be added to styled components easily using the `classes` prop which accepts either one class or a deep list of them. Rules in your classes also [cascade](cascading) meaning that some color and font will trickle down to child components. They lso interact with the `style` prop just as you would think:

```jsx
import {$Card} from ".../Card.style";

<StyledView classes={$Card}/>

<StyledView classes={$Card} style={{backgroundColor: "red"}}/>

<StyledView classes={[$Card, [$HeaderCard, $MainHeaderCard]]}/>

<StyledView classes={[$Card, big && $BigMargin]}/>
```

You can construct new components that can have new classes passed to them as well as having thier own default ones:

```jsx title="Card.js"
import {StyledView, StyledText} from "style-composer";
import {$Card} from "./Card.style";

export function Card(props) {
    const {classes, ...otherProps} = props;
    return <StyledView classes={[$Card, classes]} {...otherProps}>
        <StyledText>hi</StyledText>
    </StyledView>;
}
```

With typescript you can easily define new styled prop types:

```ts
import {StyledViewProps} from "style-composer";

export interface CardProps extends StyledViewProps {
}
```

## Built-in Components

- [StyledView](https://reactnative.dev/docs/view)
- [StyledSafeAreaView](https://reactnative.dev/docs/safeareaview)
- [StyledText](https://reactnative.dev/docs/text)
- [StyledTextInput](https://reactnative.dev/docs/textinput)
- [StyledButton](https://reactnative.dev/docs/button)
- [StyledTouchableNativeFeedback](https://reactnative.dev/docs/touchablenativefeedback)
- [StyledTouchableOpacity](https://reactnative.dev/docs/touchableopacity)
- [StyledTouchableWithoutFeedback](https://reactnative.dev/docs/touchablewithoutfeedback)
- [StyledTouchableHighlight](https://reactnative.dev/docs/touchablehighlight)
- [StyledScrollView](https://reactnative.dev/docs/scrollview)
- [StyledImage](https://reactnative.dev/docs/image)
- [StyledPressable](https://reactnative.dev/docs/pressable)
- [StyledAnimated](https://reactnative.dev/docs/animated)

## Creating your own

You can wrap any component that takes a style prop with a `styled()` call to created a Styled version of it that accepts classes and styles. For example:

```jsx
import {styled} from "style-composer";

export const StyledLink = styled(Link);
```

By default all styled components will flatten the styles before they are passed to the base component. If that component is designed for RN and already flattens styles you can optimize the component by skipping the extra flatten when passing `autoFlattens: true` as an option:

```jsx
export const StyledCard = styled(Card, {autoFlattens: true});
```
