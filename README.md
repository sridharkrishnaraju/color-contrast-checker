# Color Contrast Checker (Web Component)

A framework-agnostic **WCAG 2.2 color contrast checker** as a zero-dependency Web Component.
Drop it into plain HTML, React, Vue, Svelte or Astro and check whether any
foreground/background colour pair passes **AA** and **AAA** for normal and large text.

**▶ [Live demo](https://sgbp.tech/tools/color-contrast-checker)**

```html
<script src="contrast-checker.js"></script>
<contrast-checker foreground="#1a1a1a" background="#ffffff"></contrast-checker>
```

## Features

- ✅ Accurate WCAG 2.x relative-luminance contrast ratio
- ✅ AA / AAA pass-fail for normal **and** large text
- ✅ Live, interactive colour pickers (Shadow DOM — no style leakage)
- ✅ Zero dependencies, ~3 KB, works anywhere custom elements run
- ✅ `change` event + `.ratio` getter for programmatic use

## Install

```bash
npm install @sgbp/contrast-checker
```

or just copy `contrast-checker.js` into your project.

## API

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `foreground` | hex | `#1a1a1a` | Text colour |
| `background` | hex | `#ffffff` | Background colour |

```js
const el = document.querySelector("contrast-checker");
el.ratio;                                   // -> 17.4
el.addEventListener("change", (e) => console.log(e.detail.ratio));
ContrastChecker.ratio("#000", "#fff");      // -> 21 (static helper)
```

## Why contrast matters

Low-contrast text is the single most common accessibility failure on small-business
websites. WCAG 2.2 AA requires **4.5:1** for normal text and **3:1** for large text.

## Further reading

Maintained by [SGBP — Singapore Build Partners](https://sgbp.tech), a studio focused on
fast, accessible websites for Singapore SMEs. See our other free developer tools and
accessibility guidance there.

## License

MIT © SGBP. Contributions welcome — open an issue or PR.
