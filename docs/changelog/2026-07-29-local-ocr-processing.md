# Resumable local OCR processing

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Added a tracked, prioritized OCR queue; a rootless bootstrap for a repository-
local Persian/English toolchain; resumable PDF, spread-splitting, and page-image
processing; status, benchmark, bounded-run, verification, catalog, and metadata
commands; operational documentation; and regression tests. Completed both
processing waves: the 2,872-page first wave plus 6,189 pages across the Harvard
transcripts, all 297 Majles session files, all four Mossadegh court-record
volumes, and Makki volume V.

## Reason

The expanded archive contains thousands of image-only or badly OCRed pages.
One-off commands would be slow to supervise, difficult to resume, and likely to
apply the wrong treatment to mixed carriers. The queue makes the fast path
repeatable while keeping machine text explicitly subordinate to the scan.

## Dynamic SPD comparison

- **Reference paths:** `package.json`,
  `source/scenes/credits.scene.dry`, and `HISTORICAL_ANALYSIS.md`.
- **What Dynamic SPD does:** the reference checkout has a minimal game build
  script and a prose credits bibliography. It does not archive research
  carriers, expose an OCR pipeline, record per-source processing state, or
  distinguish acquired files from derived search text.
- **Decision here:** retain the small, command-oriented Node tooling style and
  leave the Dendry runtime untouched, but add research-only infrastructure
  because the Persian primary-source corpus depends heavily on scans. Generated
  derivatives remain outside Git, consistent with this project's local archive
  policy.
- **Divergence level:** local. This changes research operations only, not the
  turn loop, state ownership, event routing, deck semantics, persistence, or
  browser build.

## System fit

`docs/research/OCR_QUEUE.json` is the processing control plane.
`scripts/research-ocr.js` supplies doctor, status, benchmark, run, verification,
and catalog commands; the package scripts expose the common entry points. PDF
jobs checkpoint by chunk, directory jobs use source-specific concurrency, and
transcript images use bounded page concurrency. Outputs remain in the ignored
source archive, while `OCR_DERIVATIVES.json` durably records their paths,
processing metadata, and checksums.

## Research and assets

No historical claim or asset changed. OCR derivatives are discovery aids, not
new historical authorities. The pipeline preserves original carriers and
requires visual verification of names, dates, quotations, vote counts, and
tables. The queue covers the outstanding core books, commission minutes,
letters, oral-history transcript facsimiles, parliamentary proceedings, court
records, and newspapers; Qashqai audio and structured economic tables retain
separate transcription requirements.

## Validation

- Confirmed local Tesseract 5.5 loads `fas`, `eng`, and `osd`.
- Confirmed qpdf 12.3.2, Ghostscript 10.06.0, and OCRmyPDF 17.8.1 execute.
- Visually checked `SUP-071`: each scan has the lower-numbered Persian page on
  the right, so `right-left` splitting preserves reading order.
- Caught invalid optional page boxes in both `SUP-059` carriers during the
  first run, stopped the batch, added normalization on a processing copy, and
  visually compared the corrected page image with the archived original.
- Recovered cleanly from executor SIGTERM interruptions and added
  `--max-chunks` so bounded invocations exit before short remote-runtime caps.
- Added grayscale/downsampled processing copies for the 3,864×5,000 Harvard
  transcript JPEGs after a raw-image batch proved unnecessarily slow; source
  images remain unchanged.
- Corrected the Harvard transcript queue from an initial `eng` assumption to
  `fas` after the first prepared-page benchmark visibly showed Persian script.
  Persian-only recognition was both cleaner and faster than `fas+eng`; eight
  English-only discovery outputs were quarantined and replaced.
- Switched Harvard pages from uniform-block segmentation (`PSM 6`) to
  automatic page segmentation (`PSM 3`) after spaced typewritten lines caused
  pathological runtimes; the same outlier fell from over a minute to 0.67
  seconds and produced cleaner text.
- Limited each Tesseract process to one OpenMP thread after six page workers
  multiplied their internal threads and saturated the eight-core machine.
- Benchmarked representative ten-page samples: `MAJ-S10` 36.74 pages/min,
  `SUP-078` 71.12 pages/min, and `SUP-071` 106.33 split pages/min.
- All six first-wave merged PDFs passed `qpdf --check`.
- SHA-256 checksums for all six PDFs and six text sidecars were recorded in
  `AVAILABLE_SOURCES.md`.
- Completed all 1,745 Harvard transcript pages, all 1,936 pages in the 297-file
  Majles collection, all 1,976 pages in the four-volume court collection, and
  all 532 pages of Makki volume V.
- Tuned the Majles collection to Persian-only recognition, a conservative
  1,800-pixel OCR processing image, sandwich text-layer assembly, five
  concurrent files, and one Tesseract worker per file. The original scan image
  remains unchanged in the derivative.
- Verified all 306 second-wave artifacts end-to-end: every recorded checksum
  and page count matched, every text sidecar matched its recorded checksum, and
  all searchable PDFs passed `qpdf --check`.
- Generated a tracked 312-entry catalog covering the six first-wave and 306
  second-wave derivatives.
- `npm test` passes all five suites.
