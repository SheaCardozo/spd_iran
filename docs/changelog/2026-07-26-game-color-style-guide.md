# Game-wide political text-color standard

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Promoted the historical primer's political color conventions into a binding
game-wide standard:

- added `docs/COLOR_STYLE_GUIDE.md` with semantic, naming, sourcing, palette,
  country, composite-gradient, accessibility, and authoring rules;
- implemented the same semantic classes and light/dark variables in
  `web/game.css`;
- made disabled-color mode remove gradient fills as well as solid colors;
- applied the classes to the playable opening and title scene;
- linked the guide from the README and implementation baseline;
- added the standard to `AGENTS.md` so future scene and UI work must follow it;
  and
- added regression coverage for compiled scene markup, shared palette values,
  surname-only examples, and grayscale fallback.

## Reason

The primer and the playable campaign should not develop separate visual
languages. A written convention without game CSS would force scene authors to
repeat inline hexadecimal values, making palette drift, inconsistent naming,
and broken dark or grayscale behavior likely. Semantic classes make the
historical meaning reviewable independently of its current rendering.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/main.scene.dry`,
  `source/scenes/library.scene.dry`, `source/scenes/game_over.scene.dry`,
  `out/html/game.css`, and `out/html/game.js`.
- **What Dynamic SPD does:** repeatedly hardcodes recognizable ideological
  colors in scene markup, including `#c00000` for SPD/social democracy,
  `#700000` for the KPD/communism, `#7A3C00` for the NSDAP/fascism, blue for
  national conservatives, and grey for unaffiliated establishment figures.
  Its colored-text preference suppresses span colors, but the scene files do
  not centralize the palette and do not consistently choose full personal
  names or surnames.
- **Decision here:** retain recurrent ideological color and the user-controlled
  disabled mode. Adapt the implementation into semantic CSS classes shared by
  game and primer, formalize surname-only personal coloring, and give composite
  alignments named classes. Iran-specific assignments require Iran-specific
  sources. The AIOC/TPAJAX brown remains a documented editorial analogy rather
  than a transferable classification.
- **Divergence level:** local. Content markup and CSS presentation change; no
  state, routing, action, persistence, or build model changes.

## System fit

`web/game.css` now exposes the content-facing color interface. Dendry authors
use raw-HTML blocks with semantic classes, while normal build overlay copying
places those styles in `out/html/game.css`. `web/timeline.css` retains the
matching implementation for the generated primer. The style guide requires
both surfaces and their tests to change together when the palette changes.

The opening palace-protest scene demonstrates parliamentary gold, Mossadegh's
teal-to-gold blend, and National Front teal. The title scene demonstrates
National Front teal. All words remain present and understandable when color is
disabled.

## Research and assets

The guide consolidates decisions already supported in the formatted-primer
change record. The main organizational basis is `MAJ-S2`, chapter 5,
especially printed pp. 250–61 and 275–78. Fatemi's treatment also uses
`MAJ-S1`, chapter 20, especially printed pp. 304–05. The guide links these
records directly and distinguishes sourced political characterization from
editorial color analogy.

No asset or rights status changed.

## Validation

- Built the Dendry game and browser output.
- Ran the complete project test suite.
- Inspected compiled opening-scene markup for semantic classes.
- Checked light, dark, and disabled-color CSS rules.
- Checked all new relative documentation links.
- Ran `git diff --check`.
