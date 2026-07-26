# Focused scholarship and institutional source ingestion

## Summary

Ingested all six focused articles and seven institutional-source families as
`SUP-012`–`SUP-024`. Each local holding now has provenance,
format/extent, SHA-256, role, and limitations recorded in an ignored sidecar
and the tracked source catalogs. User-supplied JSTOR copies resolved S9 and
S10 after publisher endpoints had failed to expose their full text.

## Reason

The research audit had identified these items as accessible leads, but their
texts were not yet in the controlled local archive. Bringing them into the
same taxonomy as the books and Persian primary records makes later
claim-specific research reproducible without pretending that acquisition
alone validates a historical claim.

## Dynamic SPD comparison

Dynamic SPD exposes a broad credits bibliography in
`source/scenes/credits.scene.dry` and discusses historical grounding in
`HISTORICAL_ANALYSIS.md`. Its own analysis acknowledges that broad
bibliographic credit is not equivalent to scene-level sourcing, while
`IRAN_1949_1953_GAME_DESIGN.md` proposes structured research data for an Iran
adaptation.

This change follows that research intent but deliberately diverges at the
repository layer: the Iran project retains local editions, per-item provenance
sidecars, integrity hashes, availability states, and explicit limitations.
Dynamic SPD does not provide an equivalent local edition archive and
integrity-check system in the reference checkout. No gameplay, UI, or runtime
structure changed.

## System fit

`AVAILABLE_SOURCES.md`, `BIBLIOGRAPHY.md`,
`UNAVAILABLE_SOURCES.md`, and `SOURCE_AUDIT.md` now agree on access and trust
status. Automated integrity checks cover the new PDFs, EPUB, HTML record, and
the two-file CIA collection. Future events can cite these records through
precise document/page/column locators; they cannot cite an archive ID alone.

## Research and assets

The intake includes publisher or repository copies of S8 and S11–S13;
user-supplied complete JSTOR copies of S9 and S10; official FRUS, ICJ/UN,
World Bank, UK Cabinet, and Hansard materials; and two
declassified CIA internal histories carried by documented public-domain
archival mirrors. The World Bank item is only a finding aid. The CIA histories
are interested operational accounts. Hansard's English translation does not
replace the official Persian legal text already held as `SUP-006`.

No visual asset or implemented historical claim changed. The source binaries
and local metadata sidecars remain under the Git-ignored
`docs/research/sources/` tree.

## Validation

- Verified source signatures, page counts or container structure, and text
  availability during intake.
- Verified specific anchors: FRUS Document 273; ICJ printed p. 93 start;
  `CAB 195/9` PDF pp. 126–131; and HC Deb 11 June 1951, vol. 488,
  cols. 1664–66.
- Rejected an HTML access page masquerading as an S10 PDF.
- Verified the later S9 and S10 JSTOR copies as complete searchable articles
  with stable journal pagination.
- Added SHA-256 integrity coverage for every new retained file.
