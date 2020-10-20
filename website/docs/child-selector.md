---
id: child-selector
title: Child Selector
---

Just like in CSS sometimes it's best to change some parts of a common element, for example a header, from within the styling of a container.

To allow this you can use child selectors to **add styling to classes that appear further down the tree.**

```js {4,5,6,7}
export const $Panel = composeClass("panel", () => ({
    padding: 5,

    // equivalent to .heading in css
    [child($Heading)]: {
        marginBottom: 10
    }
}));
```
