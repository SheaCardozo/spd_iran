# Pinned advisers, perfect information, and source comments

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Replaced the three-active-adviser roster with six continuously pinned adviser
cards. All consultations remain outside the monthly action economy and share
the existing six-month cooldown. Deleted the Leadership Roster card, its
manager and add/remove scenes, active flags, roster timer, save snapshot, and
ending recap. Added the recurring **Common Resolution** Party Affairs card so
the three decks still contain twelve normal actions.

Removed the `political_intelligence` quality and every effect or choice that
treated political knowledge as a purchasable capacity. The player now sees all
decision-relevant political state. Report, dossier, and consultation choices
instead change procedure, organization, press capacity, relationships,
legitimacy, or parliamentary support.

Rebuilt the Research Library around short subject pages and human-readable
source names. Player-facing scene prose no longer prints internal `MAJ-*` or
`SUP-*` tags or inline “Research:” citations. Historical scene, adviser, and
recurring-action files now carry adjacent `# Source:` comments. Status, monthly
hand, prologue, event, and ending copy was stripped of interface narration and
repeated tutorial language.

The browser card renderer now treats semantic title spans as trusted authored
markup while deriving plain-text `title` attributes. This corrects literal
`<span>` text and missing adviser colors in captions and tooltips.

## Reason

The roster system made adviser selection into an unrelated monthly card and
hid half of the researched figures. Political intelligence also contradicted
the intended decision model: the player could already read the relevant
political facts, so a stat promising “better information” did not create
coherent gameplay.

Inline archive codes were useful to maintainers but poor public citations, and
the surrounding explanations repeatedly described the interface instead of
presenting the political situation. Sources remain traceable in comments,
research records, and the primer without turning every event into a footnote
display.

## Dynamic SPD comparison

Paths are relative to
`/home/phroz/spd/dynamic_social_democracy`.

- `source/scenes/main.scene.dry` displays advisers in the pinned-card row and
  reports shared availability through `pinnedCardsDescription`.
- `source/scenes/advisors/wels.scene.dry` and
  `source/scenes/advisors/stampfer.scene.dry` present a named political figure,
  bounded consultations, a shared adviser-action timer, and no time advance.
- `source/scenes/cancel_advisor_action.scene.dry` preserves the separation
  between a consultation and the normal turn action.
- `source/scenes/advisors/shuffle_leadership_pinned.scene.dry` and
  `source/scenes/party_affairs/shuffle_leadership.scene.dry` implement a
  separate reshuffle system.
- `source/scenes/status.scene.dry` and `source/scenes/library.scene.dry`
  present status and reference material directly in their special surfaces.

The Last Majles retains the pinned row, named adviser menus, shared cooldown,
and no-time-advance consultation behavior. It rejects the separate reshuffle
system for this campaign: all six researched figures remain available, with
Kashani still written as an independent counterpart rather than staff. It
also adapts the browser renderer because this project's semantic political
color markup appears in card titles, while Dendry's stock renderer escapes
those titles as text.

This is not a major architectural divergence. Shared state, the one-action
month, deck and hand semantics, event routing, persistence, and the build model
remain unchanged.

## System fit

- `Q` no longer owns adviser-roster or political-intelligence state.
- `post_event` no longer bounds or snapshots those deleted fields.
- Twelve normal actions remain available across the three tagged decks.
- The exhaustive scene taxonomy now contains seven responsibility classes and
  166 compiled scenes; obsolete roster configuration classes are gone.
- `SCENE_CONTENT_STANDARD.md` now forbids routine interface narration and
  player-facing internal citation tags, and requires adjacent source comments.
- Browser coverage checks six pinned advisers and actual semantic markup in
  their captions.

## Research and assets

No new asset was added. No new historical claim depends on an unreviewed
source. The source comments use the existing controlling monographs by Azimi,
Abrahamian, Elm, and Painter/Brew, plus official Majles, Oil Commission, and
First-Senate records for exact institutional acts. The Common Resolution card
is explicitly marked as a counterfactual organizational abstraction grounded
only in the documented heterogeneity and narrow common program of the Front.

## Validation

- Reproducible Dendry and primer build: passed.
- `node scripts/audit-scenes.js`: 166 classified scenes, zero failures.
- `test/v01-data-integrity.test.js`: passed.
- Independent adversarial review: 166 scenes passed, zero failures; see
  [`docs/reviews/2026-07-29-v01-complete-scene-audit.md`](../reviews/2026-07-29-v01-complete-scene-audit.md).
- `npm test`: eight suites passed, zero failures.
- `git diff --check`: passed.
- The Playwright Chromium/Firefox matrix could not launch in this environment
  because the installed browser binaries are missing system libraries
  (`libnspr4.so` and `libasound.so.2`). Installing them requires interactive
  administrator access; no browser assertion failed before launch.
