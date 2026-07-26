# Historical timeline primer

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Added `docs/research/TIMELINE_PRIMER.md`, a sourced narrative orientation to
the campaign's historical arc. It begins with the 1941 political opening,
follows the National Front, oil nationalization, the two Mossadegh
governments, coalition fracture, and the August 1953 coup, and continues
through the 1954 oil settlement and longer consequences for royal
authoritarianism and the 1979 Revolution.

The primer includes:

- a concise overview and actor guide;
- a specific account of Khalil Maleki, the Third Force, and the socialist
  current that remained with Mossadegh after the Toilers' Party split;
- a named account of the secular constitutionalist cadre around the Iran Party
  and National Front, including Sanjabi, Zirakzadeh, Shayegan, Nariman, and
  Saleh;
- a chronological account with local archive IDs and page or chapter
  locators;
- explicit separation of established chronology from disputed interpretation;
- an interpretive synthesis of constitutional, oil, economic, coalition,
  Cold War, and covert-intervention dynamics;
- a source-locator map; and
- a list of questions that still require event-level primary-source research.

## Reason

The source archive and catalogs had become much more mature than the project's
high-level narrative documentation. A newcomer could identify individual
books, records, and acquisition gaps without having a reliable orientation to
how the events connected. The primer supplies that orientation while warning
that it is not a substitute for claim-level event records.

## Dynamic SPD comparison

- **Reference paths:** `README.md` and `source/scenes/credits.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** its repository README is limited to build
  instructions, while its in-game credits scene provides one readable list of
  books and articles and emphasizes the works heavily referenced by the game.
  The checkout contains no separate historical timeline or narrative research
  primer.
- **Decision here:** retain the virtue of a single approachable historical
  orientation, but adapt it to the Iran project's existing layered source
  system. The primer links to archive IDs, bibliographic trust records, and
  precise locators instead of becoming a parallel bibliography. It remains
  outside the runtime and does not replace event-specific source notes.
- **Divergence level:** local. This is a research-documentation extension and
  makes no change to the core game architecture or build.

## System fit

The primer sits between the general game-design documents and event-level
research records. It gives future scene, deck, character, and mechanic work a
common chronological frame. Its explicit evidentiary limits prevent a broad
synthesis from authorizing precise dialogue, crowd sizes, casualty figures,
vote counts, or individual covert attributions.

No runtime state, turn loop, scene routing, deck behavior, build process, or
browser UI changed.

## Research and assets

The narrative is principally grounded in `MAJ-S1`–`MAJ-S7`, `MAJ-S9`,
`MAJ-S12`, and `MAJ-S14`, with focused support from `SUP-006`, `SUP-012`,
`SUP-014`, `SUP-015`, `SUP-017`, and `SUP-023`. The document links every
chronological section to the tracked available-source catalog and records a
locator map for follow-on research.

The later revision naming Maleki and the Third Force relies on `MAJ-S2`,
chapter 5, especially printed pp. 256–57 and 275–78. It distinguishes
Maleki's Marxist intellectual wing from Baghai's traditional-bazaar
organization rather than treating the Toilers' Party as ideologically
homogeneous.

The named secular constitutionalist cadre relies on `MAJ-S2`, chapter 5,
especially printed pp. 250–61 and 275–78, which identifies their
organizational affiliations, modern professional base, constitutional
commitments, and continued alignment with Mossadegh.

An independent adversarial factual review checked the draft for erroneous
dates, overstatement, unsupported causal language, and failure to distinguish
contested interpretations. Corrections from that pass were incorporated
before validation.

No archive file or asset-rights status changed.

## Validation

- Compared the documentation boundary with Dynamic SPD's README and credits
  scene.
- Checked every relative Markdown file target in the primer for existence.
- Checked the Maleki and Third Force addition against `MAJ-S2`, chapter 5,
  especially printed pp. 256–57 and 275–78.
- Checked the named constitutionalist cadre against `MAJ-S2`, chapter 5,
  especially printed pp. 250–61 and 275–78.
- Ran an independent adversarial factual review against the archived major
  and supplemental sources and incorporated its material corrections.
- Ran the project test suite.
- Ran `git diff --check`.
