# Source audit

- **Audit date:** 2026-07-26
- **Scope:** every source identified as `P1`–`P11`, `S1`–`S13`, and
  `R1`–`R12` in `docs/GAME_DESIGN.md`, plus the 2026-07-25 reference-mining
  intake recorded as `SUP-002`–`SUP-022`, `MAJ-S8`–`MAJ-S12`, and
  `S14`–`S20`

This audit applies the project's book-first standard to the existing design
bibliography. It does not certify that a source supports a particular claim.
That requires reading the relevant text and recording a precise locator in the
event or claim record.

Local source files are inventoried in
[`AVAILABLE_SOURCES.md`](AVAILABLE_SOURCES.md); missing priority material is in
[`UNAVAILABLE_SOURCES.md`](UNAVAILABLE_SOURCES.md); trust and author expertise
are maintained in [`BIBLIOGRAPHY.md`](BIBLIOGRAPHY.md).

## Audit decisions

### Scholarly books and edited volumes

| IDs | Decision | Use and limits |
| --- | --- | --- |
| S1, S2, S3, S5, S6 | **Approved as core scholarship; acquired locally.** | Scholarly monographs by established modern-Iran specialists. They are suitable book-length foundations, but each new claim still requires a checked page, chapter, or stable-section locator. |
| S4 | **Approved as a core edited volume; cite chapter author.** | The editors and press are credible, but each chapter has its own author, evidence, and argument. A claim must cite the individual chapter and locator. |
| S7 | **Approved as a serious interpretive counterpoint, not a neutral baseline.** | A scholarly monograph by an Iran analyst and historian. Its revisionist account of domestic agency must be compared with operational records and other specialist histories. |
| S14 / MAJ-S11 | **Approved major edited volume; cite chapter author.** | The acquired University of Texas Press edition brings together specialists with distinct evidentiary bases and interpretations. Attribute every use to its chapter author and locator. |
| S15 / MAJ-S8 | **Approved major source; preferred updated edition acquired.** | Cottam's 1979 edition contains the original research and “Fifteen Years Later.” The 1964 predecessor is retained for comparison; compare Cold War-era categories with later work. |
| S16 / MAJ-S9 | **Approved major labor history; acquired locally.** | Ladjevardi's university-press monograph is a specialist foundation for unions and state–labor relations. Compare it with later labor scholarship and organization-level primary records. |
| S17 / MAJ-S10 | **Approved major Persian oil history; volume II acquired.** | Movahed's legal and historical expertise makes the work important for oil law and negotiations. Only volume II is local, and its interpretations still require comparison. |
| S18 / MAJ-S12 | **Approved major oil-history monograph; acquired locally.** | Elm's training as an economist and experience as an Iranian diplomat make the book a valuable Iranian account of negotiations and economic pressure. Compare its political and causal judgments with later scholarship and primary records. |
| S20 / SUP-011 | **Approved documentary collection; partial corpus acquired.** | Chaqueri's editorial work gives access to dispersed records of the Iranian left. Cite individual documents as situated primary evidence. The local 2025 typesettings require checking against facsimiles because their editors acknowledge textual normalization. |

All of S1–S7 are now present in the local archive and have passed edition,
page-count, searchability, and checksum intake. Acquisition does not clear a
new claim by itself. `S1` is presently the only one used by implemented
content, after its pp. 207–08 were checked for the October 1949 opening.

The local formats affect locator practice:

- S1, S4, S5, S6, and S7 preserve stable print layout and pagination.
- S2 and S3 include their source EPUBs and converted PDFs. MAJ-S12 retains its
  source EPUB without an unnecessary conversion. EPUB chapter and section
  structure is suitable for stable electronic-edition locators; generated PDF
  page numbers are not reliable print locators.
- S6's canonical scan is image-only; a separate searchable OCR derivative is
  now available for discovery.
- MAJ-S8 and MAJ-S11 have OCR layers and stable pages; MAJ-S9 preserves
  two-page spreads and printed pagination and now has a separate English OCR
  derivative; MAJ-S10 has stable Persian page images and a flawed OCR layer
  suitable only for discovery.
- SUP-011 combines searchable retypesettings of volumes 1–6 with image-only
  scans of volumes 3, 8, 19, and 20. The overlap at volume 3 enables sample
  comparison but does not validate every transcription.

### Peer-reviewed and focused scholarship

| ID | Decision | Expertise and proper role |
| --- | --- | --- |
| S8 / SUP-012 | **Approved supplement; acquired.** | Arash Azizi is a historian of the communist movement and the Middle East; the peer-reviewed state-of-the-field intervention is useful for framing competing Cold War and anti-imperial interpretations, not as the only authority for an event. |
| S9 / SUP-023 | **Approved focused source; acquired, methodological review pending.** | A peer-reviewed economic-history analysis relevant to foreign-exchange adjustment. Its estimates need comparison with Iranian fiscal records and later scholarship before mechanical use. |
| S10 / SUP-024 | **Approved focused source; acquired.** | Azimi's established expertise directly supports its use on parties and institutional weakness; cite exact pages and pair its broad argument with organization-specific evidence. |
| S11 / SUP-013 | **Approved focused source; accepted manuscript acquired.** | Siavush Randjbar-Daemi is a modern-Iran historian whose research uses Persian political and party materials. Appropriate for the Tudeh peasant question, with exact manuscript pages and version identification. |
| S12 / SUP-014 | **Approved focused source with a narrow remit; acquired.** | Nukii's specialist bazaar research supports bazaar organization and mobilization. Do not use it as the sole book-length political narrative. |
| S13 / SUP-015 | **Approved focused source; acquired.** | Firoozeh Kashani-Sabet is an established historian of modern Iran. The article is appropriate for women's organization and suffrage during nationalization; follow its notes into Persian publications and cite exact pages. |

The present opening uses Azimi's S1/MAJ-S1, pp. 207–08, as its book-length
foundation and the separate Nukii article archived as
[`SUP-001`](AVAILABLE_SOURCES.md#sup-001), p. 10, as specialist
corroboration. The project still withholds a precise date and participant count
pending contemporary Iranian evidence.

### Primary and institutional sources

| IDs | Decision | Use and limits |
| --- | --- | --- |
| P1 / SUP-010 | **Approved and acquired official documentary edition.** | The canonical local copy is the 2018 second edition. Cite the individual FRUS document, date, record type or correspondents, and editorial notes; it represents the U.S. institutional record, not neutral Iranian reality. |
| P2 / SUP-016, P3 / SUP-017, P4 / SUP-018, P6 / SUP-020, P7 / SUP-021, P8 / SUP-022 | **Approved primary/institutional collections; acquired.** | Cite the individual document, meeting, judgment, file, date, sender, and recipient as applicable. These sources are authoritative evidence of what their institutions recorded, argued, or did—not neutral accounts of Iranian motives. |
| P5 / SUP-019 | **Approved archival finding aid; inventory acquired, underlying records missing.** | Use the World Bank folder list to locate the underlying mediation files; do not treat the inventory as the final source for a claim. |
| P9 | **Approved document portal and editorial aid.** | Distinguish National Security Archive commentary from the attached declassified documents. |
| P10 | **Approved finding aid.** | Use the Truman Library entry to locate and cite the underlying document. |
| P11 | **Approved official historical orientation.** | Follow the essay to British files and cite those files for implemented events. |

Institutional provenance is not the same as impartiality. CIA, diplomatic,
cabinet, parliamentary, corporate, party, and court material must be read for
its purpose, omissions, and intended audience.

### Specialist reference works

| IDs | Decision | Use and limits |
| --- | --- | --- |
| R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12 | **Discovery and cross-check only.** | *Encyclopaedia Iranica* is a respected specialist reference, but these entries cannot be the sole authority for an implemented event. Record the individual entry author, then follow its bibliography to a monograph, article, or primary record. |

Authorship is already explicit for R6. Before any other `R` entry contributes
to a claim, its individual author and revision date must be added to the claim
record.

### Follow-up reference mining and Persian intake

The bibliographies of MAJ-S1–MAJ-S7 were searched for recurring works,
official proceedings, Persian memoirs, party collections, and newspaper runs.
Iranica entries on oil agreements, the 1953 coup, Kashani, and the Tudeh Party
were then used only to cross-check and extend those leads. This produced the
exact scholarly acquisition queue `S14`–`S20` and the official-record leads
`IR-P1`–`IR-P6` in `UNAVAILABLE_SOURCES.md`.

Iran Archive and Mashruteh were evaluated as discovery repositories, not
authorities. Four identified Persian books or documentary editions were
downloaded from Iran Archive and cataloged as `SUP-002`–`SUP-005`. The intake
verified PDF validity, page count, scan searchability, title information where
present, and checksums. It did **not** certify any historical assertion within
them.

The evidence classes remain distinct:

- `SUP-003` and `SUP-004` are named edited primary collections. Their
  editorial apparatus gives them stronger provenance than detached web
  transcriptions, but the individual party document or letter remains
  interested evidence.
- `SUP-002` and `SUP-005` are participant memoirs. They establish testimony
  and retrospective self-presentation, not neutral chronology or motive.
- Iran Archive catalog prose, Mashruteh narrative and typed transcriptions,
  and Iranica article prose remain discovery-only. A claim must point to the
  underlying edition, record, or scholarship.

All four Persian acquisitions now also have separate OCRmyPDF/Tesseract
`fas+eng` derivatives. The original scan remains the citation object. OCR
warnings, extracted-text counts, derivative checksums, and the special
force-mode treatment required to replace Sanjabi's malformed sparse layer are
recorded in the available catalog and local sidecars.

### Official-record and newspaper acquisition

The exact `IR-P1`–`IR-P6` leads were searched at file and catalog level.
`IR-P1`–`IR-P3` are now resolved: the official Sixteenth-Majles law
compilation and the host's complete enumerated Sixteenth- and
Seventeenth-Majles session-scan corpora are archived as `SUP-006` and
`SUP-007`. The nine-article law was checked at printed pp. 15–16 rather than
accepted from a transcription. All 297 session files were checked against
repository-recorded byte sizes and SHA-1 values.

`SUP-006` now has a separate `fas+eng` OCR derivative for discovery. Its
unchanged page images remain controlling because inspection found substantial
recognition errors on the implementation law, especially printed p. 16.

`IR-P5` is partially resolved by `SUP-008` and `SUP-009`: five *Ettela'at*
issues, four consecutive *Bakhtar-e Emruz* issues, and isolated sheets from
three other titles. Newspaper scans are primary evidence of publication and
rhetoric, not neutral scholarship. Missing dates and issue numbers are
explicit gaps.

`IR-P4` and `IR-P6` remain unavailable. A National Diet Library catalog record
confirms that the print serial includes Senate proceedings, but its listed
holdings omit 1953 and no accessible First-Senate scan was located. Search
results for Bozorgmehr's trial editions yielded a gated volume,
commercial/catalog listings, and a
discovery-site transcription corpus—not complete, identified local editions.

### User-supplied scholarly and FRUS intake

Seven newly supplied files were inspected internally rather than classified
from their filenames:

- Cottam's 1964 first edition became `MAJ-S8`; the updated 1979 edition remains
  available as the canonical `MAJ-S8`, while the first edition remains
  preserved for comparison.
- Ladjevardi's complete 1985 monograph became `MAJ-S9`, resolving S16.
- Movahed's revised second edition of volume II became `MAJ-S10`; volume I
  remains unavailable.
- The supplied 2017 first edition of P1/FRUS was retained under `SUP-010`.
  The official 2018 second edition specified by the design bibliography was
  downloaded from the Department of State and made canonical.
- The file labeled as Bill and Louis was not their edited volume. Its internal
  title, contents, 326-page extent, and rendered pages identify a
  pixel-identical duplicate of MAJ-S6. It is preserved in a duplicate holding
  directory. A subsequent correctly identified 376-page University of Texas
  Press scan became `MAJ-S11` and resolves S14.
- Elm's complete Syracuse University Press EPUB became `MAJ-S12`, resolving
  S18. Its internal title and copyright matter identify the 1992 first edition;
  electronic metadata records ISBN 978-0-8156-2642-8.

No historical claim was approved from filename metadata. Page count, internal
title/copyright matter, text-layer state, and SHA-256 were checked for every
intake item.

### Chaqueri and Movahed follow-up search

Chaqueri's `S20` is now partially available as `SUP-011`. Six searchable
retypeset volumes were acquired from a 2025 release, and four older facsimile
scans were recovered from a separate labor-history library. The release
description and its political provenance make the retypesettings useful
finding copies rather than controlling textual editions. The full 23-volume
corpus remains incomplete; volumes 12 and 17 are the most relevant outstanding
parts for 1941–53.

The follow-up search for Movahed volume I found bibliographic and retail
records, including ISBN `978-964-431-023-2`, but no accessible PDF suitable for
local intake. Volume II remains the only acquired volume. Catalog evidence
records the missing edition; it cannot support historical claims from its
contents.

### Focused-scholarship and institutional-record ingestion

The “accessible but not yet ingested” queue was resolved conservatively.
Publisher or institutional copies became `SUP-012`–`SUP-021`; two complete
public-domain archival carriers for declassified CIA records became the
multi-file `SUP-022`. PDF signatures, page counts, text availability, EPUB
structure, HTML content, and SHA-256 values were checked during intake.

All six focused articles are now local. The publisher PDFs for S8, S12, and
S13 and the open accepted manuscript for S11 became `SUP-012`–`SUP-015`.
User-supplied complete JSTOR copies subsequently resolved S9 and S10 as
`SUP-023` and `SUP-024`. Their stable journal pagination and searchable text
were verified. The earlier S10 access-page HTML response remains rejected.

The institutional intake adds:

- P2's official FRUS 1949 volume, with Document 273 verified in the EPUB;
- P3's complete ICJ judgment and opinions in official UN carrier `S/2746`;
- P4's official Security Council record `S/PV.559`;
- P5's World Bank folder inventory, which remains only a route to underlying
  mediation files;
- P6's official `CAB 195/9`, with the 2 July 1951 Persia discussion located
  at PDF pages 126–131;
- P7's official Hansard record at HC Deb 11 June 1951, vol. 488,
  cols. 1664–66; and
- P8's Wilber and *Battle for Iran* internal histories. Complete public-domain
  scans came through archival mirrors after agency endpoints failed to yield
  usable complete files, so both the originating institution and carrier are
  recorded.

No article, judgment, speech, or internal history has been promoted to an
implemented claim merely by acquisition. In particular, the CIA histories are
interested operational narratives, Hansard's translation does not replace the
official Persian law in `SUP-006`, and the World Bank inventory cannot replace
the file it describes.

## Registry synchronization rules

- `docs/GAME_DESIGN.md` remains the broad discovery inventory and preserves the
  original `P`, `S`, and `R` identifiers.
- `docs/research/BIBLIOGRAPHY.md` is the authority registry. It records sources
  actually used and core works whose author expertise and scholarly standing
  have been checked.
- `docs/research/AVAILABLE_SOURCES.md` is the inventory of files actually held
  under the ignored `docs/research/sources/` archive, with archive IDs,
  checksums, access status, and project uses.
- `docs/research/UNAVAILABLE_SOURCES.md` is the acquisition queue. Inclusion
  there signals that a source is promising and respected, not that its contents
  have been verified.
- An event or historical mechanic is release-ready only when its own research
  metadata points to an accessible source and precise locator.
- Edited volumes are recorded at chapter level when used. Reference entries,
  finding aids, and curated portals are recorded at the underlying document
  level when used.

## Gaps exposed by the audit

1. S2, S3, and MAJ-S12 still need publisher-layout or print-equivalent copies
   when a claim specifically requires printed-page rather than EPUB section
   locators.
2. The bibliography remains weighted toward English-language scholarship and
   Western institutional archives. Persian primary editions, a partial
   Chaqueri corpus, and volume II of Movahed's major Persian oil history are now
   local, but Movahed volume I, most Chaqueri volumes, and further Iranian
   institutional records remain important gaps.
3. The Sixteenth and Seventeenth Majles proceedings and the official
   nine-article law are acquired, but the First Senate proceedings and
   Bozorgmehr trial editions remain unavailable. Newspaper acquisition is
   event-specific and partial; economic official records remain a major gap.
4. Most planned events in `docs/GAME_DESIGN.md` have discovery citations but
   not adjacent claim-level records or precise locators.
5. All six focused articles are available, but they still require
   claim-specific reading before numerical or causal arguments are translated
   into mechanics. S9 particularly requires method and dataset comparison with
   Iranian fiscal records and later scholarship.
6. The P5 World Bank inventory is local, but its underlying mediation files
   remain unavailable.
