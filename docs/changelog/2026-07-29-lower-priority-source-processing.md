# Lower-priority source processing

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Completed the three priority-three Persian PDFs; OCRed focused Thirty Tir and
August-coup windows in five newspaper collections; added a resumable,
fixed-Persian transcription path for Mohammad Nasser Qashqai's seven-tape
Harvard oral history; and manually transcribed selected annual and monthly
Iran observations from the August 1953 *International Financial Statistics*
sheet into checked CSV tables.

## Reason

The core corpus was already searchable, but these remaining carriers blocked
efficient discovery across official documents, rival contemporary political
positions, an interview without an official transcript, and numerical series
whose row-and-column structure ordinary OCR cannot safely recover.

## Dynamic SPD comparison

- **Reference paths:** `package.json`, `source/scenes/credits.scene.dry`, and
  `HISTORICAL_ANALYSIS.md`.
- **What Dynamic SPD does:** the reference project keeps a small command-based
  build surface and a prose source record. It has no local archival-processing
  queue, machine-transcript provenance, newspaper-window selection, or
  structured observation ledger.
- **Decision here:** retain its modest repository tooling style and avoid any
  runtime dependency, while extending the Iran project's research-only
  processing because Persian scans, HLS audio, and historical statistical
  sheets require reproducible local derivatives. Machine outputs remain
  subordinate to the acquired carrier.
- **Divergence level:** local. No turn loop, state ownership, event routing,
  deck semantics, persistence, build model, or browser presentation changed.

## System fit

`OCR_QUEUE.json` defines exact newspaper files rather than treating whole runs
as equally urgent. `research-ocr.js` filters directory jobs by those patterns,
verifies their derivatives, and records them in `OCR_DERIVATIVES.json`.
`transcribe-qashqai.py` reassembles preserved HLS segments into temporary
five-minute carriers and checkpoints timestamped Persian discovery text.
`economic_observations/` holds rectangular, source-located CSVs while
`ECONOMIC_HISTORY.md` continues to govern interpretation and reconciliation.

## Research and assets

No historical claim or visual asset changed. `SUP-027`–`SUP-031` remain
interested primary newspapers; OCR does not validate their reports. The
Qashqai transcript is machine-generated discovery text and is not
quotation-ready. Every quoted passage still requires listening against the
Harvard recording. The `SUP-057` tables were checked against printed pp.
100–101, retain their row codes, units, date bases, report vintage, and missing
values, and remain an IMF compilation rather than original Bank Melli records.

## Validation

- Verified all three priority-three PDFs and all 134 targeted newspaper
  derivatives by page count, file and text checksums, and PDF integrity.
- Regenerated a 449-entry derivative catalog covering 9,768 searchable pages.
- Tested interruption recovery at a five-minute Qashqai checkpoint and
  completed all seven tapes: 22,321.452 seconds (6.20 hours), 8,113 timestamped
  machine segments, 82 durable part files plus the pre-checkpointed short third
  tape, and checksummed JSON/text aggregates. Recognition remained fixed to
  `fa` with CPU `int8` inference.
- Checked the two `SUP-057` CSVs for expected row counts, rectangular shape,
  source IDs, printed-page locators, and image-review status.
- Ran the complete repository test suite and whitespace validation.
