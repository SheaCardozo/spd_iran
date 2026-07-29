# Primer reading measure

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

The primer's desktop reading card is narrowed from 800 to 760 pixels, with a
68-pixel gap between it and the contents rail. The primer itself now owns that
maximum width and remains centered when the responsive layout collapses to one
column.

The contents rail remains independently scrollable when it exceeds the
viewport, but its scrollbar is transparent at rest. Hovering the rail or
moving keyboard focus into it reveals a thin gold thumb matching the page
palette.

The existing `text-wrap: pretty` and balanced-heading rules remain in place.
No manual line breaks, nonbreaking-space substitutions, or text-rewriting
scripts were added.

## Reason

The previous standards-based wrapping pass reduced obvious widows where the
browser supported it, but the approximately 688-pixel inner prose measure
still produced long lines and occasional awkward short endings. The narrower
card leaves an inner measure of roughly 648 pixels—close to the conventional
60–75-character range for sustained reading—and gives the browser more useful
break choices while preserving the authored text.

## Dynamic SPD comparison

- **Reference path:** `out/html/game.css` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** `#content`, the header, and the footer use a
  540-pixel maximum width. Its narrative surface is deliberately narrow and
  lets CSS own line length and wrapping.
- **Decision here:** retain SPD's constrained reading measure and CSS-owned
  presentation. Adapt the width upward because this primer is long-form,
  includes citations and lists, and places a persistent contents rail beside
  the text. The resulting prose measure remains much closer to SPD than the
previous 800-pixel card without feeling as constrained as the initial
720-pixel draft.
- **Divergence level:** local presentation only.

## System fit

Only `web/timeline.css` changes. The canonical Markdown, generated HTML,
political-term markup, citations, maps, photographs, tables, game state, and
runtime behavior are unchanged. Wide media continue to use the full card
width, while the card remains responsive below the desktop breakpoint. The
contents rail still scrolls for accessibility; only the scrollbar's idle and
interactive appearance changes.

## Research and assets

None. This change introduces no historical claim or asset.

## Validation

- Rebuilt the integrated and standalone primer.
- Added regressions for the desktop grid width, centered primer maximum, and
  hover/focus scrollbar treatment.
- Ran the complete automated test suite and `git diff --check`.
