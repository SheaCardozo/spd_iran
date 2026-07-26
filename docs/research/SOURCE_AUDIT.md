# Source audit

- **Audit date:** 2026-07-26
- **Scope:** every source identified as `P1`–`P11`, `S1`–`S13`, and
  `R1`–`R12` in `docs/GAME_DESIGN.md`, plus the 2026-07-25 reference-mining
  intake recorded as `SUP-002`–`SUP-031`, `MAJ-S8`–`MAJ-S12`, and
  `S14`–`S23`, and the model-neutral economic corpus registered as
  `E1`–`E23` (including subrecords `E2a` and `E9a`) and acquired as
  `SUP-040`–`SUP-047`

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
| S9 / SUP-023 | **Approved focused source; acquired and evidence-mapped; independent validation pending.** | A peer-reviewed economic-history analysis relevant to foreign-exchange adjustment. Its tables, footnotes, regressions, definitions, and underlying record families are audited in `ECONOMIC_HISTORY.md`. Its estimates still need comparison with the identified Iranian fiscal, Bank Melli, Customs, oil, labor, and planning records before numerical or causal use. |
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
| P5 / SUP-019 / SUP-026 | **Approved institutional collection; partial corpus acquired and exact remainder queued.** | `SUP-019` is a finding aid, not claim evidence. `SUP-026` supplies folder `1806440`, the Bank's published negotiation review, annual summary, participant oral histories, and access decisions. Cite individual records and preserve institutional interest; the unavailable meeting, proposal, and correspondence folders cannot be replaced by the inventory or oral histories. |
| IR-P6 / SUP-025 | **Approved interested primary editions; complete target set acquired.** | Bozorgmehr's direct role as defense counsel makes the first-instance, appeal, and cassation editions central to the recorded defense and procedure, but assertions and later editorial commentary require comparison. Cite the exact proceeding, document, and printed page. |
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
exact scholarly acquisition queue `S14`–`S23` and the official-record leads
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

`IR-P5` is now substantially but incompletely resolved. `SUP-008` contains 21
selected *Ettela'at* issues; `SUP-009` has complete *Kayhan* and *Bakhtar-e
Emruz* coup-week issues, isolated sheets, and seven complete *Shahed* issues
for 20, 22, and 24–28 Mordad; and `SUP-027`–`SUP-031` add the
gapped Tudeh *Mardom*, a complete 247-issue *Niruye Sevvom* run, a
near-complete surviving *Mardom-e Iran* run, selected *Apadana*, and all 38
*Bakhtar-e Emruz* issues exposed by Iran Archive. Together the new five
collections contain 479 unchanged PDFs and 2,106 scanned pages.

This materially improves Persian primary coverage and political range, but it
does not create a neutral newspaper of record. Each title is situated party or
movement evidence. Missing dates and issue numbers remain explicit gaps, and
every claim needs issue/date/page/item locators plus comparison with other
positions and scholarship. Seven complete *Shahed* issue PDFs for 20, 22, and
24–28 Mordad are now locally archived as part of `SUP-009`; all 26 image pages
render and the first-page mastheads and dates were visually checked. *Shahed*
for the 1949 opening and Thirty Tir, other opposing 28 Mordad issues,
religious-right press, *Shurish*, and *Tihran-i Musavvar* remain priorities.
Institutional digital, microfilm, and ILL routes are recorded under `IR-P5` in
`UNAVAILABLE_SOURCES.md`.

`IR-P4` remains unavailable locally, but is no longer a merely physical lead.
The Shahr-e Danesh Institute for Law Research and Study (SDIL) public catalog,
database 13, exposes individual First-Senate records whose “complete work”
links resolve to digitized files. Exact records were confirmed for the oil-law
sessions 84, 91–92, 95, and 125 and for the 1952 sequence 190–193. The file
server returns HTTP Basic authentication rather than the scan to an anonymous
request, and the guest endpoint returns only a generic PDF thumbnail. SDIL's
current digital-library registration form advertises download allowances but
requires an Iranian national ID, identity-card upload, and Iranian contact
details. The project therefore records this as accessible by account or direct
institutional request, not as reviewed evidence.

The catalog chronology makes one useful correction: session 190 was 13 Mordad
1331, session 191 was 18 Mordad, session 192 was 20 Mordad, and session 193 was
not until 26 Shahrivar. There was therefore no First-Senate sitting on
30 Mordad 1331. The enacted law's colophon and the Senate letter read to the
Majles on 21 Mordad independently confirm that the Senate passed the
six-month emergency-powers bill on 20 Mordad, making session 192 the exact
official-record target.

The lower-house procedure is now verified directly in `SUP-007`: Seventeenth
Majles session 23, 12 Mordad 1331, printed p. 13 (session-scan PDF p. 7),
records a standing vote in which “the majority rose” and the bill passed; it
does not provide a numerical tally. A *Le Monde* dispatch from Tehran,
published 12 August 1952 and attributed to AFP, United Press, and AP, reports
the Senate division as 26 votes for and 4 against. That aggregate is retained
as strong contemporary corroboration, but the current article could not be
archived unchanged and the official session 192 scan remains access-controlled.
The project therefore does not infer attendance, abstentions, or individual
votes from the press report.

The University of Chicago remains a concrete independent partial holding:
First-Senate sessions 38–126 (15 Mehr 1329–13 Mehr 1330) on 35 mm microfilm
under `microfm K13.U84`. The University of Washington's microform union list
independently confirms the session ranges and Chicago holding. This run covers
the principal 1950–51 oil and early-Mossadegh debates, but not sessions 1–37
or the later 1951–53 Senate conflict.

A second Iran Archive pass searched the standalone Senate title, Royal
Official Gazette title, exact Persian dates, and alternate romanizations. It
found a self-published parliamentary chronicle and an appendix reproducing the
law, but no official First-Senate proceeding or Gazette run. The chronicle is
retained only as a discovery clue. Azimi's *Iran: The Crisis of Democracy*,
bibliography p. 406 (local PDF p. 422), provides the stronger carrier lead: it
identifies the Senate debates as part of *Ruznamih-yi Rasmi-yi Kishvar-i
Shahanshahi* for 1950–52. The acquired official law at `SUP-006`, printed
p. 16 (PDF p. 28), confirms that Senate approval occurred on 9 Ordibehesht
1330, correcting the former 7–8 Ordibehesht target range.

Mashruteh's indexed Senate transcript set is limited to the seventh term,
Internet Archive returns no Persian or romanized metadata match, and Wikimedia
Commons' First-Senate category contains a membership booklet rather than
debates. A Commons file generically titled “session 190” was downloaded and
visually checked; its title page identifies Second-Senate session 190, 28 Mehr
1335, so it was rejected and removed rather than miscataloged as the 1331
session. The National Diet Library record remains a non-digital additional
holding lead.

`IR-P6` is now resolved. Complete scans of Bozorgmehr's military appeal and
Court of Cassation editions were retrieved from Iran Archive,
visually checked against their title and copyright pages, independently
catalog-checked through Open Library and CiNii, checksummed, and archived as
`SUP-025`. The cassation scan identifies itself as a second edition/printing
even though the external catalog describes a 1367 copy as a first edition, so
the local page image controls the edition statement.

The user supplied the first-instance files previously located at public
Telegram posts `@sheikhesmaeili/708` and `/709`. Image inspection identifies
them as the 1363 Nashr-e Tarikh-e Iran two-volume edition. The 504-page volume
I ends its proceeding text at printed p. 398; the 483-page volume II resumes
at p. 399 and concludes at p. 802, after which both scans contain photographic
plates. CiNii's catalog record independently agrees on the editor, publisher,
date, series, and 802-page printed extent. The files are checksummed and
archived with the appellate records as `SUP-025`; all four originals remain
non-searchable reference scans. Mashruteh's typed sessions remain
discovery-only.

Three exact JSTOR acquisition targets were added as `S21`–`S23`. Azimi's
Harvard University Press monograph is the priority parliamentary and
constitutional synthesis; Painter and Brew's recent UNC Press book is the
priority updated oil-crisis synthesis; Efimenco's 1955 article is a
supplemental bibliographic and historiographic lead only.

The user subsequently supplied complete JSTOR copies of all three targets.
They are now archived as [`MAJ-S13`](AVAILABLE_SOURCES.md#maj-s13),
[`MAJ-S14`](AVAILABLE_SOURCES.md#maj-s14), and
[`SUP-048`](AVAILABLE_SOURCES.md#sup-048). This resolves acquisition only:
none has yet been promoted to reviewed or claim-level evidence.

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
- P5's World Bank folder inventory plus the `SUP-026` partial corpus: folder
  `1806440`, Press Release No. 285 and its attached negotiation review, the
  annual summary, participant oral histories, and access-status records. The
  24-folder reconstruction and remaining request queue are tracked separately;
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

### Model-neutral economic corpus

The S9 audit now distinguishes the economic story from any future gameplay
model. `ECONOMIC_HISTORY.md` maps S9's seven tables, appendices, definitions,
transformations, and source lineage; defines an observation ledger; and
separates oil flows, external adjustment, legal and cash fiscal histories,
Bank Melli functions, distributional effects, planning, and post-coup
comparators.

Official IBRD reports E-99 (1950) and AS-55 (1957), IMF exchange-restriction
reports for 1952–55, the Iranian 1332 legal budget, and a 1958 UN survey
reproducing Bank Melli series were acquired as `SUP-040`–`SUP-047`. These are
contemporary or near-contemporary cross-checks, not replacements for the
underlying Iranian records. Exact LOC and Japanese holding paths now exist for
the Bank Melli bulletin, annual Customs statistics, and monthly foreign-trade
statistics. The direct S9 challenge by Majd and the principal book-length
economic interpretations are separately queued.

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
   nine-article law are acquired. First-Senate sessions 38–126 now have a
   precise Chicago microfilm acquisition path, but no local or digital copy;
   the remaining First-Senate sessions are unresolved. Bozorgmehr's complete
   target court-record set is now local. Newspaper holdings are now broad but
   still uneven: *Shahed* outside the acquired coup window, opposing
   coup-period titles, and further full 28 Mordad issues remain major gaps.
   Economic official records also remain a major gap, although `SUP-040`–
   `SUP-047` now provide official international cross-checks and the 1332
   legal budget. Seven complete coup-week *Shahed* PDFs are now local;
   Princeton's five-reel 1946–53 run remains the strongest route for the 1949,
   Thirty Tir, and wider missing dates. Exact reproduction paths are recorded
   for Bank Melli and Customs serials.
4. Most planned events in `docs/GAME_DESIGN.md` have discovery citations but
   not adjacent claim-level records or precise locators.
5. All six focused articles are available, but they still require
   claim-specific reading before numerical or causal arguments are translated
   into content. S9's method and evidence trail have been mapped, but its
   estimates remain unapproved pending dataset comparison with Iranian records
   and later scholarship. No economic gameplay model has been selected.
6. P5 is partially resolved: folder `1806440` and the Bank's published
   negotiation review are local, while the principal meeting, proposal,
   calculation, mission, and correspondence folders remain identified but
   inaccessible through obsolete `pubdocs` links. Known withheld legal and
   Board records are restrictions, not ordinary search gaps.
