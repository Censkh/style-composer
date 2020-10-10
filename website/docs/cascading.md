---
id: cascading
title: Cascading
---

One of the features that React Native's built-in style system is missing is a good way to cascade down styles the same way you can in CSS. Style Composer **allows you to cascade any selector that cascades in CSS.**

Here are the current selectors that will cascade downards:
- fontSize
- fontFamily
- fontWeight
- color
- letterSpacing
- textAlign

## Getting cascading values

You can access the current cascading styles using the `CascadingValuesContext`. Here is an example where the default color of an icon is pulled from the cascading styles:

```jsx
import {CascadingValuesContext} from "style-composer";

export const Icon = (props: IconProps) => {
    const cascadingValues = useContext(CascadingValuesContext);
    const cascadingStyle = cascadingValues.style;

    const color = props.color || cascadingStyle.color;
    return <Svg style={[{color}, props.style]}>
        ...
    </Svg>
};
```
