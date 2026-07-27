# Improved timeline text wrapping

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The standalone and integrated historical-primer pages now use the standard CSS
Text wrapping modes designed for editorial typography. Chapter and hero
headings use `text-wrap: balance`; prose, list items, captions, quotations,
notes, and footer copy use `text-wrap: pretty`.

## Reason

Ordinary greedy line breaking sometimes left a single short word on the final
line of otherwise comfortable paragraphs and produced noticeably uneven
headings. The new rules ask supporting browsers to consider a better-looking
set of line breaks while preserving the authored words and responsive layout.

## Dynamic SPD comparison

- **Reference paths:** `out/html/game.css`
- **What Dynamic SPD does:** Dynamic SPD establishes a narrow reading measure
  and line height but uses the browser's default greedy line wrapping. It does
  not add widow removal, balanced headings, a JavaScript typography pass, or
  non-breaking spaces to narrative text.
- **Decision here:** Retain SPD's CSS-owned presentation boundary and adapt it
  for the much longer primer with `text-wrap` declarations in
  `web/timeline.css`. Avoid a content-rewriting tool or script: the standards-
  based rules are responsive, do not alter copied text, and degrade to ordinary
  wrapping when unsupported.
- **Divergence level:** Local.

## System fit

The change affects presentation only. The canonical Markdown, timeline
renderer, political-term markup, application state, game text, and runtime
model are unchanged. The normal build continues to copy the tracked stylesheet
into both generated timeline bundles.

## Research and assets

None. This change makes no historical claim and introduces no asset.

## Validation

- Rebuilt the integrated and standalone timeline pages.
- Added regression checks for pretty prose wrapping and balanced headings.
- Ran the project test suite and checked the resulting diff for whitespace
  errors.
