# Scholarly source and FRUS edition intake

## Summary

- Classified and renamed seven user-supplied PDFs by their internal title and
  edition evidence.
- Added Cottam's 1964 *Nationalism in Iran* as `MAJ-S8`, Ladjevardi's 1985
  *Labor Unions and Autocracy in Iran* as `MAJ-S9`, and volume II of Movahed's
  *Khab-e Ashofteh-ye Naft* as `MAJ-S10`.
- Retained the supplied 2017 first edition of the FRUS Iran retrospective
  volume and acquired the official 2018 second edition as canonical
  `SUP-010`.
- Identified the file named for Bill and Louis as a duplicate Katouzian scan,
  preserved it as a duplicate, then cataloged the subsequently supplied
  correctly identified edition as `MAJ-S11`.
- Replaced the provisional 1964-only Cottam acquisition with the requested
  1979 updated edition as canonical `MAJ-S8`, retaining the first edition for
  comparison.
- Added non-destructive OCR derivatives and extraction sidecars for
  Ladjevardi (`MAJ-S9`, English) and the official Sixteenth-Majles law
  compilation (`SUP-006`, Persian and English).

## Reason

The files arrived at the archive root with distributor-generated filenames.
Several did not exactly match the editions requested by the research queue,
and one filename misidentified the book entirely. Internal inspection was
needed before the files could safely change the acquisition catalog.

## Dynamic SPD comparison

A search of the Dynamic SPD checkout found no OCR toolchain, research-source
archive, bibliography, edition registry, or derivative-validation pattern.
Its `IRAN_1949_1953_GAME_DESIGN.md` proposes a future `research/` tree and
claim-level source metadata, but the original runtime supplies no intake
implementation to port. No runtime pattern or UI component applies here. The
Iran project keeps the Dynamic SPD-derived application structure unchanged
while adding local research controls outside the game architecture.

## System fit

The files now live under stable `major` or `supplemental` IDs with local
sidecars. `AVAILABLE_SOURCES.md` records exact held editions;
`UNAVAILABLE_SOURCES.md` distinguishes complete, partial, and false-positive
acquisitions; `BIBLIOGRAPHY.md` preserves expertise and evidentiary limits; and
`SOURCE_AUDIT.md` records the intake decision. OCR remains a search layer:
unchanged originals remain the citation authority.

## Research and assets

Cottam, Ladjevardi, Movahed, and the Bill/Louis contributors are respected
specialists. Movahed adds a major Persian legal-historical foundation, but only
volume II is present. The Bill/Louis volume must be cited by chapter author.
FRUS is an official edited primary collection for the U.S. institutional
record, not neutral evidence of Iranian motives.

No historical game claim, visual asset, or mechanical effect changed.

## Validation

- Checked PDF validity, extent, internal title/copyright matter, edition, text
  layer, and SHA-256 for every supplied file.
- Visually inspected the image-only Ladjevardi title, copyright, and contents
  pages and confirmed stable printed pagination.
- Confirmed the Movahed file is volume II, revised second edition, winter 1384
  SH, rather than both volumes of the earlier printing.
- Compared the mislabeled file with MAJ-S6 at seven pages across the book;
  rendered images had zero pixel difference.
- Verified the replacement Bill/Louis file internally as the 1988 first
  University of Texas Press edition, 376 PDF pages.
- Verified Cottam's requested 1979 edition from its title and copyright pages,
  including its “Updated Through 1978” designation and 388-page extent.
- Confirmed the canonical FRUS file is the official 2018 second edition,
  1,013 PDF pages and Documents 1–375.
- Ran OCRmyPDF 17.8.1 with Tesseract 5.5.2 using official `eng` and
  `fas+eng` models as appropriate, regular PDF output, sandwich text layers,
  and image optimization disabled.
- Retained all 175 Ladjevardi and 263 Majles-law pages; both derivatives pass
  `qpdf --check`.
- Counted 127,925 recognized Ladjevardi word tokens and 48,707 recognized
  Majles-law word tokens. Sampled visible renders, including the law at PDF
  images 27–28, were pixel-identical to their originals.
- Recorded that the Persian law OCR contains substantial recognition errors,
  especially on printed p. 16, and is unsuitable for unchecked quotation.
