# Mostafa Elm source intake

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Classified the user-supplied EPUB of Mostafa Elm's *Oil, Power, and Principle*
as major source `MAJ-S12`, resolving the `S18` acquisition lead. Added exact
edition, format, checksum, trust, and locator guidance throughout the research
registry.

## Reason

Elm's Syracuse University Press monograph was already a high-priority lead for
oil proposals, negotiations, economic pressure, and the aftermath of
nationalization. The newly supplied file contains the complete book, notes,
and index.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/credits.scene.dry`,
  `HISTORICAL_ANALYSIS.md`, and `IRAN_1949_1953_GAME_DESIGN.md`.
- **What Dynamic SPD does:** Dynamic SPD keeps a broad bibliography in its
  credits, while its historical analysis identifies insufficient scene-level
  citation. The Iran design proposes structured bibliography and claims data,
  but the reference checkout does not implement a local edition archive or
  integrity checks.
- **Decision here:** retain the reference design's book-first bibliography and
  adapt it into the existing edition-level local archive and claim gate.
- **Divergence level:** local.

## System fit

The source is cross-referenced by the available catalog, bibliography, source
audit, and resolved-acquisition table. It remains in the ignored archive and
has an integrity test. No runtime, UI, event, or mechanical behavior changed.

## Research and assets

Elm was an Iranian economist and former diplomat. His book supplies a valuable
Iranian perspective but is not treated as neutral: political judgments and
causal interpretations require comparison with Movahed, Abrahamian, and
primary records. The EPUB supports chapter/section locators, not print-page
citations. No assets changed.

## Validation

- Verified the EPUB archive has 37 members and no corrupt entries.
- Checked embedded title, copyright, author, publisher, ISBN, reading order,
  notes, and index.
- Recorded file size and SHA-256.
- Added the EPUB to local archive-integrity and catalog-cross-reference tests.
