# Reference mining and Persian-source intake

- **Date:** 2026-07-25
- **Status:** Implemented

## Summary

- Mined the reference sections of all seven acquired major sources for
  recurring scholarship, Persian books, official proceedings, party
  collections, and newspaper runs.
- Used Iranica articles on oil, the coup, Kashani, and the Tudeh Party as
  bibliographic maps, producing an exact `S14`–`S20` scholarly acquisition
  queue.
- Evaluated Iran Archive and Mashruteh as discovery repositories and recorded
  explicit rules against treating their editorial prose or web transcriptions
  as historical authority.
- Acquired and cataloged four Persian primary editions as `SUP-002`–`SUP-005`:
  Mossadegh's memoir, an edited Iran Party document collection, Khalil Maleki's
  edited letters, and Karim Sanjabi's memoir.
- Added separate searchable OCR derivatives and text sidecars for all four
  Persian scans using OCRmyPDF/Tesseract's official `fas+eng` models.
- Replaced broad requests for parliamentary material with exact leads for the
  Sixteenth and Seventeenth Majles, First Senate, nine-article oil law, named
  newspaper runs, and Mossadegh trial editions.

## Reason

The initial source base was strong but English-heavy and depended heavily on
secondary reconstruction. The user's proposed repositories contain difficult
to find Persian material, while the acquired books and Iranica bibliographies
make it possible to distinguish repeatedly respected leads from whatever a
political archive happens to host.

## Dynamic SPD comparison

A search across the Dynamic SPD checkout found no corresponding bibliography,
source archive, source-trust policy, or research catalog. There is therefore no
runtime or UI pattern to port. This project retains Dynamic SPD's architecture
unchanged and adds research infrastructure required by the Iran campaign's
historical release gate.

## System fit

`BIBLIOGRAPHY.md` records expertise, evidentiary class, and discovery-site
limits; `AVAILABLE_SOURCES.md` records the four verified local files;
`UNAVAILABLE_SOURCES.md` now contains exact scholarly and official-record
targets; and `SOURCE_AUDIT.md` records how the leads were produced. Local
sidecars preserve the provenance chain from repository page to direct file.
No historical claim or mechanic changed.

## Research and assets

The four acquisitions are primary or edited-primary material, not newly
approved neutral narratives. Party documents establish issued positions;
letters and memoirs establish situated testimony. Any future use requires an
individual locator and comparison with contemporary records and scholarship.

Iran Archive, Mashruteh, and Iranica remain finding aids only. The underlying
book, document, official proceeding, or scholarly work must be the source
attached to a claim.

No visual asset was added or changed.

## Validation

- Confirmed all four downloads are valid PDFs and recorded SHA-256 checksums.
- Counted 169, 425, 548, and 484 PDF pages respectively.
- Inspected rendered cover, title, catalog, and ISBN pages where present.
- Checked the first ten pages of each for text-layer availability: three are
  image-only and the Sanjabi scan has only a sparse, unusable existing layer.
- Preserved all four originals and produced `fas+eng` sandwich-layer
  derivatives. The first three retain pixel-identical sampled renders.
  Sanjabi required force mode to replace its malformed layer; sampled mean
  channel differences were 0.28–3.96 on a 0–255 scale.
- Verified all derivative page counts and structures with `qpdf`, recorded
  derivative checksums, and retained extraction sidecars for corpus search.
- Cross-checked recurring leads across multiple acquired bibliographies and
  named Iranica entries rather than accepting a single recommendation.
