# Economic institutional-record search

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Searched online for crisis-period Bank Melli, Iranian state-budget, NIOC, and
ILO records. Archived the complete official 1950 ILO oil-labor report as
`SUP-055`, four selected IMF *International Financial Statistics* vintages as
`SUP-057`, and three contemporary UN Middle East surveys as `SUP-058`. Added
a detailed search audit and revised the source catalogs to distinguish
unobtainable Iranian originals from workable, confidence-labeled online
substitutes.

## Reason

The economic-history queue named these four families at high priority, but its
brief labels obscured important differences between a serial that survives in
libraries, provisional fiscal authority, internal company accounts, and an
open institutional field report. A second pass was required when physical or
digital reproduction from Iranian institutions proved unrealistic: the
project needed a defensible path forward, not a permanent acquisition
blocker.

## Dynamic SPD comparison

Dynamic SPD puts a general bibliography in
`source/scenes/credits.scene.dry`. Its retrospective review in
`HISTORICAL_ANALYSIS.md` notes that broad bibliography entries and vague
references do not make individual claims auditable. It does not maintain a
local source archive, an availability queue, or record-level provenance and
checksum sidecars.

This project retains the useful idea of an accessible public bibliography but
adapts it into cross-referenced availability, trust, and acquisition records.
The more granular archive is an intentional research-process divergence, not
a game-runtime or state-architecture divergence.

## System fit

The change does not choose or implement an economic model. It improves the
evidence layer feeding later fiscal, monetary, oil-industry, employment,
welfare, and regional-condition mechanics. The evidence policy now permits
directional effects and bounded ranges from triangulated IMF, UN, IBRD, ILO,
parliamentary, diplomatic, and scholarly evidence while reserving exact
figures where original records remain missing. The NIOC target no longer
presumes that a published 1951–54 annual-report run exists, and the budget
target separates provisional legal authority from actual Treasury execution.

## Research and assets

The complete ILO report, four IFS page-image issues plus navigation OCR, and
three official UN page-image surveys are stored locally under the ignored
source archive with URLs, retrieval dates, limitations, planned use, and
SHA-256 checksums. The IFS issues are institutional transcriptions rather than
Bank Melli originals; OCR never controls a number. The Mashruteh NIOC statement
remains an attributed low-confidence carrier. No historical asset was added.

## Validation

- Confirmed the ILO download is a PDF 1.5 file with 106 PDF pages and computed
  SHA-256 `08217aa82252a109f9d2d3518d779be80c19f9f8b6d7bf6b84a9dd382ec6e4c7`.
- Cross-checked Bank Melli holdings against CiNii and British Library catalog
  records.
- Cross-checked the budget-law chronology against the Majles law index and the
  already acquired 1332 budget.
- Located the 9 Azar 1333 NIOC statement in the parliamentary transcription
  and documented how it may be used cautiously without falsely treating it as
  an official scan.
- Confirmed Internet Archive's public 70-issue IFS run for 1950–55 and checked
  the August 1953 Iran sheet and its printed pp. 99–101 and 187–188 notes.
- Downloaded four complete IFS PDFs and OCR derivatives, computed all eight
  checksums, and recorded why OCR is non-authoritative.
- Downloaded the official UN 1949/50, 1950/51, and 1951/52 survey PDFs,
  verified PDF signatures and terminal `%%EOF` markers, and computed their
  checksums.
- Rechecked Iran Archive's site search and public book/article catalog; it did
  not expose the missing Bank Melli, Treasury, or NIOC record runs.
- Checked Internet Archive for UN energy and trade series and Bank Melli
  bulletins. Trade yearbook records exist but the inspected copies are
  lending/print-disabled; no Bank Melli issue was returned.
- The indexed UN 1952–53 survey's current legacy full-text endpoint returned
  HTTP 404 and remains unarchived.
- PDF text extraction for `SUP-055` remains pending because no PDF text
  utility is installed in the current workspace.
- `npm test` passes all three test suites, including the research-source
  integrity checks.
