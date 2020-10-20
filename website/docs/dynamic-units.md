---
id: dynamic-units
title: Dynamic Units
---

Dynamic units **allows you to use styles that will be updated automatically**.

## vh and vw

The equivalent of CSS's vw and vh that will keep in sync with the window's size.

For example:

```jsx {4,5}
import {vw, vh} from "style-composer";

export const $Card = composeClass(() => ({
    width: vw(25),
    height: vh(25),

    maxWidth: 300,
    maxHeight: 300
}));
```
