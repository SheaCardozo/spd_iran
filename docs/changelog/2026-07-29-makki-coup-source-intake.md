# Makki coup-source intake

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Ingested the user-supplied scan of Hossein Makki's *Kūdetā-ye 28 Mordād 1332
va rūydādhā-ye motaʿāqeb-e ān* into the ignored supplemental archive as
`SUP-080`. Identified the first 1378 SH / 1999–2000 Entesharat-e Elmi edition,
recorded ISBN `964-404-023-6`, preserved the unchanged carrier, and added its
checksum, metadata, availability, trust, and acquisition records.

The intake also confirmed a material defect: the carrier jumps directly from
printed p. 424 to p. 441. The missing pp. 425–440 remain an exact acquisition
request, while the rest of the volume is now available with normal
participant-source cautions. The Kashani acquisition record was corrected to
describe Dehnavi's five-volume collection, including the fifth addenda volume.

## Reason

Makki's account supplies a major participant position on the August 1953 coup
and its aftermath. Cataloging the incomplete copy is more useful and accurate
than continuing to describe the entire book as inaccessible, but the verified
gap must remain visible so future writers do not treat the carrier as complete
or infer anything from its missing interval.

## Dynamic SPD comparison

Dynamic SPD presents a readable bibliography in
`source/scenes/credits.scene.dry` and uses repository-level historical
discussion in `HISTORICAL_ANALYSIS.md`. It does not track carrier checksums,
incomplete page ranges, local archive state, or participant-source trust at
this granularity.

This project retains Dynamic SPD's readable-source principle but follows the
established Iran-specific archive divergence: the ignored source file is
cross-referenced through tracked availability, bibliography, acquisition, and
test records. No runtime architecture or game mechanic changed.

## System fit

`SUP-080` can support future Makki-side comparison for coup chronology and
National Front fracture after exact pages are reviewed. The available catalog
records what can be inspected; the bibliography records why it is useful and
limited; the unavailable queue now asks only for the missing interval or a
complete replacement. No historical narrative or implemented claim was
changed.

## Research and assets

The source is a Persian image scan supplied locally by the user. Makki is
treated as a knowledgeable but interested participant, not as a neutral
scholarly authority. Its acquisition route is not asserted beyond the supplied
file; a matching public Telegram mirror is recorded as a discovery lead.
No visual asset was added or changed.

## Validation

- Confirmed SHA-256
  `ef599ffd7c9dc5abe9a98870155fdf53015f8c5533e0011ac20697614f3b2ca8`.
- Parsed the unencrypted PDF as 509 image pages with no OCR layer.
- Visually checked title and publication leaves, contents, body samples, the
  discontinuity from printed p. 424 to p. 441, and the terminal index through
  printed p. 514.
- Confirmed that QPDF renders the file despite non-fatal damaged-linearization
  and cross-reference warnings.
- Added source-presence, sidecar, and checksum regression coverage.
