# Adversarial historical-primer revision

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

An adversarial editorial review of the standalone primer produced a focused
revision for readers who understand politics and economics but know little
about Iran. The narrative now:

- establishes Iran's social geography before introducing the constitutional
  system;
- marks the political and economic dossiers as optional and provides a direct
  route into the chronology;
- moves the 22 July 1952 ICJ judgment after 30 Tir and places the late-crisis
  economic assessment with the coup decision;
- distinguishes the referendum, disputed deputy resignations, election
  preparations, and the government's formal 16 August dissolution
  announcement;
- explains the First Senate's unsettled role in government formation and how
  shortening its term caused it to expire;
- compresses parliamentary names and exact snapshots while preserving the
  explanation of credentials, shifting coalitions, attendance, and quorum;
- explains exchange certificates and removes unscaled project appropriations;
- identifies Qavam, Zahedi, Kermit Roosevelt, the Rashidian network, *bast*,
  Point Four, CFP, SAVAK, and the 1946 Azerbaijan and Mahabad crises at the
  point a new reader needs them;
- connects the 1949 palace protest to the Tehran rerun, the National Front's
  eight deputies, Mossadegh's oil-committee chairmanship, and the wider
  nationalization coalition;
- uses the vote of inclination, firman, and confidence sequence when
  Mossadegh becomes prime minister, and explains the scope and contested
  constitutional logic of his delegated lawmaking powers;
- integrates women's exclusion and suffrage campaign into the electoral
  explanation and their disputed referendum participation into the referendum
  sequence;
- removes the repeated economic-shock account, compresses the radio clock, and
  rewrites the uncertainty section as reader-facing limits on the evidence;
- treats the post-15 August operation as a renewed, partly improvised effort
  and qualifies claims about Afshartus, street clearing, and covert command;
  and
- adds a collapsible mobile contents control, print and forced-color
  fallbacks, reduced-motion behavior, and safer print pagination.

Source references in the canonical Markdown now point only to the tracked
bibliography and catalogs. Source labels remain uncolored in generated HTML.
Every citation now leads to the relevant source-level entry in a complete
selected bibliography rather than to the top of a generic locator table.
Attached titles such as “Prime Minister Zahedi” and “Ayatollah Kashani”
receive their complete documented political treatment.

## Reason

The review found two chronological rewinds, too much parliamentary
prosopography before the main story, and several points where a general reader
would have to supply Iran-specific constitutional or social knowledge. It
also identified language that risked converting a disputed causal
reconstruction into settled fact. The revision keeps the page's strongest
feature—explaining how formal institutions translated into practical
power—while giving the reader a cleaner narrative path. A follow-up
reader-interface pass found malformed citation punctuation, a hard-wrap typo,
generic bibliography jumps, duplicated economic analysis, and print modes
that could erase gradient-colored text; those defects are included in this
revision.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/modinfo.scene.dry`,
  `source/scenes/credits.scene.dry`, and `out/html/game.css` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** its explanatory prose is action-oriented and uses
  political coloring to make institutional alignments legible. Sources are
  separated into credits, with direct URLs, and the project does not maintain
  a standalone long-form historical orientation equivalent to this primer.
- **Decision here:** retain concise, consequence-first institutional
  explanation and the shared semantic color vocabulary. Adapt the pattern to
  a self-contained essay by adding early social orientation, strict
  chronology, a color-neutral internal bibliography, and a responsive
  contents control. Reject direct source links and roster-level detail on this
  surface because they interrupt rather than support the reader's model of
  political power.
- **Divergence level:** local presentation and content structure. The turn
  loop, shared state, event routing, persistence, and build/runtime model are
  unchanged.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains canonical. The renderer recognizes
bibliography and source-catalog links as source references, suppresses
political highlighting in their labels, assigns stable anchors to full
bibliographic entries, and renders the bibliography without outbound links.
Reader-facing introductory and bibliography prose now lives only in the
Markdown; the build no longer silently replaces it. The tracked template,
stylesheet, and script implement an accessible mobile contents disclosure;
the normal build copies the same result to `out/html/timeline.html` and
`out/timeline/index.html`.

The detailed parliamentary ledgers and catalogs remain unchanged. The primer
summarizes their defensible conclusions rather than attempting to replace
them.

## Research and assets

The constitutional revisions use Abrahamian, *Oil Crisis in Iran*, chapter 3,
especially pp. 79–117, for government formation, Senate practice, quorum,
resignations, referendum procedure, and dissolution. The social orientation
uses Abrahamian, *Iran Between Two Revolutions*, chapters 1, 2, 5, and 7. The
economic distinction uses Clawson and Sassanpour, pp. 2–18, and Brew,
*Petroleum and Progress in Iran*, pp. 120–44. The election-to-oil-committee
bridge uses Abrahamian, pp. 250–67, and Painter and Brew, chapter 1. Coup
qualifications retain Rahnema, pp. 49–288; Painter and Brew, chapters 5–6; the
contemporary crisis memorandum `SUP-049`; and the existing comparative
scholarship.

No new image or other historical asset was introduced. A prose orientation
was used instead of adding an unsourced schematic map.

## Validation

- Rebuilt the integrated and standalone timeline pages.
- Ran the complete project test suite: four test files passed.
- Added chronology-order, dissolution-sequence, source-neutrality,
  title-color, economic-explanation, mobile-contents, source-anchor,
  bibliography-completeness, source-of-truth, hard-wrap, print,
  forced-colors, and reduced-motion regressions.
- Confirmed that the canonical primer and generated HTML contain no external
  source links.
- Confirmed that citations and the bibliography contain no political term
  spans.
- Confirmed that every generated source citation resolves to an entry on the
  page.
- A read-only follow-up audit found 138 citation links, no generic
  bibliography jumps, missing targets, duplicate IDs, external links,
  political coloring inside citations, or exposed internal source markers.
- Ran `git diff --check`.
