# Ethnopolitics monograph intake

- **Date:** 2026-07-28
- **Status:** Implemented

## Summary

- Ingested Lois Beck's *Nomads in Postrevolutionary Iran* as `MAJ-S19` and
  Farideh Koohi-Kamali's *The Political Development of the Kurds in Iran* as
  `MAJ-S20`.
- Ingested the complete 2021 Turkish translation of Touraj Atabaki's revised
  Iranian-Azerbaijan study as `MAJ-S21`, closing the focused structural
  acquisition gap left open by the malformed EPUB.
- Cleaned filenames, added provenance and checksum sidecars, and removed
  Windows download-zone metadata.
- Detected that the purported Touraj Atabaki EPUB actually contains Suha
  Bölükbaşı's *Azerbaijan: A Political History*. Preserved it as quarantined
  `SUP-065`; the later verified Turkish translation, rather than that package,
  closes the real Atabaki acquisition.
- Reconciled the available-source catalog, bibliography, and residual
  ethnopolitics gaps around the new evidence.

## Reason

The new books materially improve the project's ability to distinguish ethnic
communities from political organizations and leadership networks. They do not
support turning Qashqai, Kurdish, or Azerbaijani identity into a single
faction. Detecting the malformed Azerbaijan ebook prevented an unrelated book
from silently closing the Iranian-Azerbaijan evidence gap before the verified
translation arrived.

## Dynamic SPD comparison

Dynamic SPD's election implementation in
`source/scenes/events/election_1928.scene.dry` converts relationships,
ideological currents, and organized constituencies into party-level electoral
effects. Recurring actors such as Friedrich Stampfer in
`source/scenes/advisors/stampfer.scene.dry` are represented through named,
stateful choices, while
`source/scenes/government_affairs/shuffle_cabinet.scene.dry` assigns
portfolios through party labels.

The Iran project retains the idea that organized networks and named leaders
can have persistent effects. The new scholarship reinforces the planned
divergence from treating ethnic identity as a party variable: Qashqai tribal
hierarchy, Kurdish parties and tribal forces, provincial society, and
individual leaders require separate state and evidence. No runtime or
architectural change was made.

## System fit

`MAJ-S19` can support a Qashqai network model and its relationship with the
National Front, subject to contemporaneous corroboration. `MAJ-S20` supports
the institutional inheritance of Mahabad and distinctions among Kurdish
social and political actors. `MAJ-S21` supports the Iranian-Azerbaijan
centralization, party, autonomy, and 1945–46 institutional inheritance.
None supports exact 1953 force strength, automatic ethnic allegiance, or a
detailed 1949–53 provincial event chain. `SUP-065` remains excluded from
content pending identity-safe verification.

## Research and assets

All four user-provided originals remain local-only under the ignored source
archive. The catalogs record author expertise, edition and file integrity,
precise initial locators, checksums, and limitations. No visual asset changed.

## Validation

- Verified the two PDFs as complete, searchable monographs and inspected
  title matter, contents, relevant chapters, and publisher metadata.
- Inspected the EPUB package, copyright, contents, chapter, and author files
  and compared the actual ISBN and title with Bloomsbury's records.
- Verified the Atabaki translation against its title, copyright, translator,
  contents, chapter text, bibliography, publisher record, and checksum.
- Ran source-registry tests, the full project test suite, and
  `git diff --check`.
