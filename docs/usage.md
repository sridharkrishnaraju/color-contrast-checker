# Usage & API

## Plain HTML

```html
<script src="contrast-checker.js"></script>
<contrast-checker foreground="#333333" background="#f5f5f5"></contrast-checker>
```

## React

Because it's a standard custom element, it works in React with no wrapper:

```jsx
import "@sgbp/contrast-checker";

export default function Page() {
  return <contrast-checker foreground="#1a1a1a" background="#ffffff" />;
}
```

## Vue

```vue
<script setup>
import "@sgbp/contrast-checker";
</script>

<template>
  <contrast-checker foreground="#1a1a1a" background="#ffffff" />
</template>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `foreground` | hex string | `#1a1a1a` | Text colour |
| `background` | hex string | `#ffffff` | Background colour |

## Properties & methods

```js
const el = document.querySelector("contrast-checker");

el.ratio;                                   // current ratio, e.g. 17.4
ContrastChecker.ratio("#000000", "#ffffff"); // static helper -> 21
```

## Events

The component emits a `change` event whenever a colour changes:

```js
el.addEventListener("change", (e) => {
  const { ratio, foreground, background } = e.detail;
  console.log(`${foreground} on ${background} = ${ratio}:1`);
});
```

## Programmatic-only use

You can use the contrast math without rendering the UI:

```js
import ContrastChecker from "@sgbp/contrast-checker";
const passesAA = ContrastChecker.ratio("#717171", "#ffffff") >= 4.5;
```

---

Want to try it on your own colours instantly? Use the
[live Color Contrast Checker](https://sgbp.tech/tools/color-contrast-checker) — the same
component, hosted and ready to use.
