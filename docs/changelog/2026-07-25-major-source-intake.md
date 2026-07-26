# Major source intake and catalog resolution

## Summary

- Matched seven user-supplied books to bibliography entries `S1`–`S7`.
- Renamed the local files with stable `MAJ-S1`–`MAJ-S7` archive IDs and clean,
  edition-aware filenames.
- Recorded exact editions, checksums, page counts, searchability, locator
  limitations, and project roles in local metadata sidecars and the tracked
  available-source catalog.
- Moved S1–S7 out of the active unavailable queue while preserving their
  acquisition history in a resolved table.
- Corrected Rahnema's local edition year from 2014 to 2015 and identified the
  Katouzian copy as the revised 1999 paperback reprinted in 2009.
- Verified Azimi's printed pp. 207–08 and added them to the October 1949
  opening's claim-level source record.
- Added a searchable OCRmyPDF/Tesseract `eng+lat` derivative beside the
  unchanged Katouzian scan, covering 322 nonblank pages while preserving all
  326 visible page images.
- Added the source EPUBs behind the converted S2 and S3 PDFs, renamed them with
  their archive IDs, and made EPUB chapter/section structure the preferred
  local electronic locator.

## Reason

The newly supplied books resolve the project's entire outstanding
English-language core-book queue. Intake needed to distinguish mere file
presence from citation readiness: some copies preserve printed pagination,
some are converted electronic editions, and one arrived as an image-only scan.
The latter now has a separate OCR finding aid without replacing the original.

## Dynamic SPD comparison

Dynamic SPD has no corresponding historical source archive, book-first
research gate, or three-catalog acquisition workflow. This change therefore
does not alter or intentionally diverge from its runtime architecture or UI.
It adds project-specific research governance required by this game's
historical subject.

## System fit

`BIBLIOGRAPHY.md` remains the authority and trust registry;
`AVAILABLE_SOURCES.md` now records the acquired local copies; and
`UNAVAILABLE_SOURCES.md` remains the active acquisition queue while preserving
resolved history. Event records continue to carry the actual claim locators.
The ignored local archive keeps source files and reading sidecars out of Git.

## Research and assets

All seven books are academic monographs or an academic edited volume already
approved in the source audit. Intake does not certify every claim in them.
Azimi's pp. 207–08 were directly checked for the two generalized opening
claims. The exact protest day and participant count remain deliberately
unstated pending contemporary Iranian corroboration.

No visual asset was added or changed.

## Validation

- Inspected title/copyright pages, page counts, and text-layer availability.
- Computed and recorded SHA-256 checksums for all seven PDFs.
- Verified Azimi's printed page headers and relevant text on pp. 207–08.
- Confirmed the Katouzian derivative has 326 pages and searchable text on 322;
  `qpdf` reports no structural or stream errors; sampled visible renders at
  pages 4, 17, 100, 200, 290, and 325 are pixel-identical to the original.
- Rejected an `eng+fas` trial after it inserted false Persian characters and
  bidirectional controls into romanized English text; the accepted `eng+lat`
  result contains neither. Actual Persian-script sources will require `fas`.
- Added conditional local-archive tests so a clean clone still passes without
  the ignored files while a populated archive validates names and checksums.
