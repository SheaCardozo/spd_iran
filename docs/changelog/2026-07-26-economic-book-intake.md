# Economic monograph intake

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Cataloged three user-supplied books as major sources: Homa Katouzian's *The
Political Economy of Modern Iran* (`MAJ-S16`), Julian Bharier's *Economic
Development in Iran, 1900–1970* (`MAJ-S17`), and Gregory Brew's *Petroleum and
Progress in Iran* (`MAJ-S18`). Renamed the local files, added provenance
sidecars and integrity checks, linked the available catalog and bibliography,
and moved `E10`–`E12` from the active acquisition queue to resolution history.

## Reason

All three works were high-priority book-length economic foundations. Together
they add a major Iranian political-economy interpretation, the foundational
long-run statistical and bibliographic synthesis, and a recent archival study
of oil and development. Accurate intake prevents the project from continuing
to request sources it already has and gives the economic review stable,
cross-referenced editions.

## Dynamic SPD comparison

Dynamic SPD lists books and articles in
`source/scenes/credits.scene.dry`, emphasizing a few heavily used works but
without edition, file-quality, checksum, availability, or acquisition-state
records.

This project retains the distinction between major books and supplemental
material while continuing its established research-process divergence:
acquired copies receive local archive IDs, sidecars, integrity hashes, trust
records, and explicit movement out of the unavailable queue. No game-runtime
or state architecture is affected.

## System fit

The additions strengthen the evidence layer for a later model-neutral economic
reconstruction. They do not select an economic model or make their estimates
mechanics automatically. Katouzian's framework, Bharier's reconstructed
series, and Brew's oil-development argument must still be compared with one
another and with Iranian, IMF, UN, IBRD, ILO, AIOC, and NIOC records.
`ECONOMIC_HISTORY.md` now links each Tier-C interpretive role to its local
major-source record.

Because the three books close the largest interpretive economic gap, the
unavailable queue now places Sixteenth-Majles election and alignment evidence
ahead of the Iranian economic-record spine. Economic originals remain third:
they are required for exact mechanics even though interpretive research can
now proceed. An immediate request shortlist separates the next discrete
orders from broader record-family goals.

## Research and assets

The three unchanged user-supplied PDFs are stored under the ignored
`docs/research/sources/major/` archive. Sidecars preserve their original
filenames, editions, acquisition state, file quality, limitations, intended
role, and SHA-256 checksums. No historical asset was added.

## Validation

- Opened all three PDFs with PDF.js and verified page counts.
- Checked title and copyright matter for all three editions.
- Verified Katouzian's contents and complete index through printed p. 389.
- Verified Bharier's tables, bibliography pp. 283–303, and index through
  printed p. 314.
- Verified Brew's ISBN, DOI, notes, archival-source list, bibliography, and
  terminal index.
- Confirmed all post-rename SHA-256 hashes match the supplied files.
- Confirmed the current priority order is First Senate, Sixteenth-Majles
  alignment, and then Iranian primary economic records.
- Ran the research-source integrity tests and full project test suite.
