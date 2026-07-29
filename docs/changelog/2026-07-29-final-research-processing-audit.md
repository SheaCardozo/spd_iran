# Final research-processing coverage audit

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Audited the complete local source archive for image-only carriers that were
neither natively searchable nor represented in the OCR queue. Added and
completed 44 derivatives covering Makki's incomplete coup volume, all selected
`SUP-008` and `SUP-009` press files, three official parliamentary rosters, and
two short CIA scans. The tracked catalog now records 493 managed derivatives
and 10,632 searchable pages.

Added four Chaqueri legacy facsimiles as a deliberately deferred priority-six
job, reconciled stale source descriptions, and distinguished OCR completion
from substantive historical review, structured data transcription, and
audio-verified quotation.

Also reconciled the seven accepted OCR derivatives created before the queue.
They remain checksum-documented in their source records and are explicitly
excluded from the 493 queue-managed count rather than being lost or
double-counted.

## Reason

The earlier queue completed every job it knew about, but a repository-wide
carrier scan exposed useful image sources outside that manifest. A nominally
complete queue was therefore not the same as complete high-value corpus
coverage. The audit closes those avoidable gaps without turning every
newspaper issue or duplicate facsimile into an equally urgent processing job.

## Dynamic SPD comparison

- **Reference paths:** `package.json`,
  `source/scenes/credits.scene.dry`, and `HISTORICAL_ANALYSIS.md`.
- **What Dynamic SPD does:** the reference project exposes a compact build
  command surface and a prose bibliography. It has no local source archive,
  derivative catalog, OCR coverage audit, processing checksums, or distinction
  between machine search text and reviewed historical evidence.
- **Decision here:** retain the small command-oriented tooling style and keep
  all processing outside the game runtime, while using the Iran project's
  existing source-aware queue to make important Persian and image-only
  carriers discoverable.
- **Divergence level:** local research infrastructure only; no runtime,
  persistence, state, event, deck, or UI architecture changed.

## System fit

The new jobs use the existing `OCR_QUEUE.json` schema and
`research-ocr.js` checkpoint, verification, and catalog paths. Warning-only
QPDF extraction is now accepted for malformed input carriers while final
derivative verification remains strict. Originals remain unchanged and ignored
by Git; paths, page counts, engine settings, and checksums are retained in
`OCR_DERIVATIVES.json`.

## Research and assets

OCR does not alter source standing. Press remains interested contemporary
evidence, Makki remains retrospective participant testimony, official rosters
do not supply ideology, and CIA digests do not become the underlying consular
reports. The Makki derivative does not restore missing printed pp. 425–440.
No historical asset or implemented claim changed.

The residual queue is explicit: four low-priority Chaqueri facsimiles, broader
newspaper runs only when a defined research question requires them,
image-checked economic-table transcription beyond the current observations,
substantive review of acquired searchable sources, and audio verification of
any Qashqai quotation.

## Validation

- Verified all 44 new derivatives by page count, PDF and text checksum, and
  strict final-PDF integrity.
- Regenerated the 493-entry, 10,632-page derivative catalog.
- Confirmed the queue is complete through priority five and that no OCR or
  transcription process remains active.
- Ran the documentation, OCR, source-registry, and complete repository tests;
  checked the patch with `git diff --check`.
