# Accessibility guide: fixing low-contrast colours

A failing contrast ratio is one of the easiest accessibility issues to fix. Here's how to
approach it.

## 1. Check before you ship

Run every text/background pair through the checker — body text, buttons, links, placeholder
text, and text over images. Placeholder and "muted" greys are the usual offenders.

## 2. How to fix a failing pair

If a colour pair fails AA (below 4.5:1 for normal text):

- **Darken the text** (or lighten it on dark backgrounds) a few steps until it passes.
- **Don't rely on colour alone** — pair colour with an icon, underline, or weight change.
- **Large text gets a break** — headings ≥ 24px (or 18.66px bold) only need 3:1.

## 3. Common Singapore SME website failures

- Light-grey body text (`#999` on white) — fails AA at 2.85:1.
- Pastel call-to-action buttons with white text.
- Cookie/PDPA consent banners with low-contrast "Decline" links.
- Text over hero photos without an overlay.

## 4. Aim for AAA where you can

AAA (7:1) is the gold standard for body text and is worth targeting on content-heavy pages.

## Beyond contrast

Contrast is one of ~50 WCAG 2.2 success criteria. A full audit also covers keyboard
navigation, focus order, form labels, and screen-reader semantics.

For a complete accessibility and Core Web Vitals review of a live website,
[SGBP — Singapore Build Partners](https://sgbp.tech) offers audits and remediation for
Singapore SMEs.
