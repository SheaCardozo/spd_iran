# Substantive source review and economic tables

- **Date:** 2026-07-29
- **Status:** Implemented with one explicit listening check outstanding

## Summary

Completed a substantive reading pass for Azimi's campaign-relevant
constitutional chapter and notes (`MAJ-S13`), the complete Efimenco article
(`SUP-048`), and selected claim-bearing passages in the Harvard Amini, Azar,
Baghai, and Sanjabi interviews (`SUP-061`). Recorded exact locators,
permitted uses, narrator or author interests, and claims that the material
cannot support.

Matched a high-value Qashqai passage to official Harvard tape 2 at
`00:56:23–00:57:33`. It remains timecode-verified but not
quotation-cleared because exact Persian wording still requires a reliable
human listening check.

Manually transcribed and row-by-row checked three additional IMF Iran tables
from 300-dpi page images: December 1951 monthly observations and December 1954
annual and monthly observations. Together with the two August 1953 tables,
the structured collection now contains five issue-specific tables.

## Reason

OCR and speech recognition had made the sources searchable but could not
establish their argument, interpretive limits, remembered context, exact
wording, or numerical column alignment. The project needed a documented
transition from machine discovery material to evidence that is safe for
specific kinds of use.

## Dynamic SPD comparison

- **Reference paths:** `HISTORICAL_ANALYSIS.md` and
  `source/scenes/credits.scene.dry`.
- **What Dynamic SPD does:** it provides readable historiographical synthesis
  and a broad player-facing source list. It does not maintain a claim-level
  reading ledger, participant-specific reliability limits, source-vintage
  economic tables, or a distinction between timecode location and
  quotation clearance.
- **Decision here:** retain the readable synthesis and bibliography pattern,
  while adapting the research layer to record exact locators, use boundaries,
  source interests, table vintages, and review status. This is research
  infrastructure only; no game architecture or historical content was copied
  from the reference.
- **Divergence level:** no runtime, state, reducer, scene, deck, persistence,
  action-economy, or build divergence.

## System fit

The review note now mediates between the source archive and future claim-level
event records. `AVAILABLE_SOURCES.md`, `BIBLIOGRAPHY.md`, `SOURCE_AUDIT.md`,
and the processing records distinguish acquisition, machine processing,
focused reading, full-source review, and quotation clearance.

The economic CSVs preserve separate publication vintages rather than silently
merging revised values. They can support reproducible comparisons but do not
represent household welfare, regional distribution, employment, or a
model-ready national series. No implemented game event or timeline claim was
changed.

## Research and assets

`MAJ-S13` is approved as a major constitutional synthesis for the reviewed
scope, with exact votes and procedure still reserved for dated records.
`SUP-048` is limited to early post-coup historiography, explicitly attributed
constitutional interpretation, and bibliographic leads. The Harvard passages
remain interested retrospective participant testimony and require comparison
before claim use.

The Qashqai passage cannot be quoted until a Persian-speaking human listener
checks the exact words on the official recording. No visual asset was added or
changed.

## Validation

- Checked every new economic value row-by-row against 300-dpi images of the
  printed tables and retained units, date bases, missing values, and issue
  vintages.
- Added rectangularity, locator, row-count, and column-count regression
  coverage for the three new CSVs.
- Reconciled processing, availability, bibliography, audit, archive-sidecar,
  and research-map descriptions with the bounded review state.
- Ran the targeted research tests, repository tests, stale-status search, and
  patch whitespace validation.
