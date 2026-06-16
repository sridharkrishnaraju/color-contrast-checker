# Color Contrast Checker

A free, framework-agnostic **WCAG 2.2 color contrast checker** — available as a zero-dependency
Web Component you can drop into any website to check whether a colour pair passes accessibility
contrast requirements.

```html
<script src="contrast-checker.js"></script>
<contrast-checker foreground="#1a1a1a" background="#ffffff"></contrast-checker>
```

## What is a color contrast checker?

A color contrast checker measures the **contrast ratio** between text (foreground) and its
background, then tells you whether that ratio meets the Web Content Accessibility Guidelines
(WCAG). It's the fastest way to catch the most common accessibility problem on the web:
text that's too light to read.

## What ratio do I need?

| Standard | Normal text | Large text (≥ 18.66px bold or 24px) |
|----------|-------------|--------------------------------------|
| **AA** (minimum) | 4.5 : 1 | 3 : 1 |
| **AAA** (enhanced) | 7 : 1 | 4.5 : 1 |

## Quick start

1. Add the script to your page.
2. Use the `<contrast-checker>` element, optionally with `foreground` and `background` colours.
3. Read the live ratio and the AA/AAA pass-fail table.

See the [Usage & API guide](usage.md) for framework examples, or the
[accessibility guide](accessibility.md) for how to fix failing colours.

## About

This tool is maintained by [SGBP — Singapore Build Partners](https://sgbp.tech), a Singapore
studio building fast, accessible websites for SMEs. It's part of a set of free, open tools for
web developers.
