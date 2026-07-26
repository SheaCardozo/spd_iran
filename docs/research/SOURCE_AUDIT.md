# Source audit

- **Audit date:** 2026-07-25
- **Scope:** every source identified as `P1`–`P11`, `S1`–`S13`, and
  `R1`–`R12` in `docs/GAME_DESIGN.md`

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
| S1, S2, S3, S5, S6 | **Approved as core scholarship; text required before use.** | Scholarly monographs by established modern-Iran specialists. Suitable as book-length foundations once the relevant pages or chapters are accessible and recorded. |
| S4 | **Approved as a core edited volume; cite chapter author.** | The editors and press are credible, but each chapter has its own author, evidence, and argument. A claim must cite the individual chapter and locator. |
| S7 | **Approved as a serious interpretive counterpoint, not a neutral baseline.** | A scholarly monograph by an Iran analyst and historian. Its revisionist account of domestic agency must be compared with operational records and other specialist histories. |

None of S1, S2, S3, S4, S5, S6, or S7 is presently cleared for a new claim solely by appearing in the
design bibliography. The current workspace lacks the relevant searchable pages
or scans; they are tracked in `UNAVAILABLE_SOURCES.md`.

### Peer-reviewed and focused scholarship

| ID | Decision | Expertise and proper role |
| --- | --- | --- |
| S8 | **Approved supplement.** | Arash Azizi is a historian of the communist movement and the Middle East; the peer-reviewed state-of-the-field intervention is useful for framing competing Cold War and anti-imperial interpretations, not as the only authority for an event. |
| S9 | **Approved focused source, pending full-text and author-method review.** | A peer-reviewed economic-history analysis relevant to foreign-exchange adjustment. Its estimates need comparison with Iranian fiscal records and later scholarship. |
| S10 | **Approved focused source.** | Azimi's established expertise directly supports its use on parties and institutional weakness; cite exact pages. |
| S11 | **Approved focused source.** | Siavush Randjbar-Daemi is a modern-Iran historian whose research uses Persian political and party materials. Appropriate for the Tudeh peasant question, with exact pages. |
| S12 | **Approved focused source with a narrow remit.** | Nukii's specialist bazaar research supports bazaar organization and mobilization. Do not use it as the sole book-length political narrative. |
| S13 | **Approved focused source.** | Firoozeh Kashani-Sabet is an established historian of modern Iran. The article is appropriate for women's organization and suffrage during nationalization; follow its notes into Persian publications and cite exact pages. |

The present opening uses the separate Nukii article archived as
[`SUP-001`](AVAILABLE_SOURCES.md#sup-001). That use remains provisional because
the opening still lacks the preferred book-length and contemporary Iranian
corroboration.

### Primary and institutional sources

| IDs | Decision | Use and limits |
| --- | --- | --- |
| P1, P2, P3, P4, P6, P7, P8 | **Approved primary/institutional collections.** | Cite the individual document, meeting, judgment, file, date, sender, and recipient as applicable. These sources are authoritative evidence of what their institutions recorded, argued, or did—not neutral accounts of Iranian motives. |
| P5 | **Approved archival finding aid/orientation.** | Use the World Bank exhibit and folder list to locate the underlying mediation files; do not treat the exhibit narrative as the final source for a claim. |
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

1. The core monographs are not available in the workspace at page level.
2. The bibliography is weighted toward English-language scholarship and
   Western institutional archives.
3. Sixteenth and Seventeenth Majles proceedings, Iranian laws, budgets,
   newspapers across factions, party publications, and critical editions of
   speeches and correspondence have not yet been acquired.
4. Most planned events in `docs/GAME_DESIGN.md` have discovery citations but
   not adjacent claim-level records or precise locators.
5. Several focused articles still need full-text review before their numerical
   or causal claims are translated into mechanics.
