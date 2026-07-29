# Ebtehaj and Makki source intake

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Ingested two user-supplied Persian image scans into the ignored supplemental
archive:

- Abolhassan Ebtehaj's complete-looking combined two-volume memoir as
  `SUP-078`; and
- volume V of Hossein Makki's *Twenty-Year History of Iran* as `SUP-079`.

Renamed the files to stable archive identifiers without changing their bytes,
added metadata sidecars and checksums, recorded edition and trust information,
updated the available and unavailable catalogs and participant acquisition
audit, and extended source-integrity coverage.

## Reason

Ebtehaj's memoir was the highest-priority accessible participant source for
economic administration and institutional decision-making. Makki volume V was
not one of the campaign-period titles on the acquisition queue, but it is a
usable background source and needed identification so it would not be mistaken
for Makki's missing memoir, Thirty-Tir, oil, or coup works.

## Dynamic SPD comparison

Dynamic SPD lists books and articles for readers in
`source/scenes/credits.scene.dry` but does not assign archive IDs, retain local
edition sidecars, distinguish access state, record checksums, or explain the
limits of participant testimony. Its repository-level
`HISTORICAL_ANALYSIS.md` also notes the difficulty of auditing historical
claims without finer source provenance.

This project retains the readable bibliography as the eventual public-facing
pattern while continuing the established Iran-specific research divergence:
the ignored local archive is cross-referenced through tracked availability,
trust, and acquisition records. No runtime architecture, scene, state,
reducer, deck, action economy, or build behavior changed, so no major
divergence plan is required.

## System fit

`SUP-078` closes the local-access gap for Ebtehaj and can support future
economic-administration and adviser decision research after claim-level
reading. `SUP-079` narrows Reza-Shah background research but deliberately
leaves the campaign-period Makki requests open. The bibliography controls
evidentiary use, the available catalog controls the files actually present,
and the unavailable queue now reflects only the residual acquisition gaps.
No historical narrative, event, or mechanic was changed.

## Research and assets

Both sources are book-length Persian image scans supplied locally by the user.
Their original acquisition URLs and redistribution status were not provided,
so they remain exclusively in the Git-ignored source archive. Ebtehaj and
Makki are treated as knowledgeable but interested participants, not as neutral
scholarly authorities. No visual asset was added or changed.

## Validation

- Confirmed the unchanged SHA-256 checksums recorded in both sidecars.
- Parsed the PDFs with PDF.js: 931 pages for `SUP-078` and 532 pages for
  `SUP-079`; neither has a text layer.
- Visually inspected title and publication matter, representative body pages,
  the Ebtehaj volume boundary, and terminal index pages.
- Confirmed both Ebtehaj volumes and continuous printed pagination through
  p. 900.
- Confirmed Makki volume V and its terminal name index through printed p. 515.
- Added checksum and sidecar regression coverage and ran the repository
  validation suite.
