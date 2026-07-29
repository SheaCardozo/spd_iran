# Exhaustive compiled-scene standards gate

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Made the scene-writing and source standard exhaustive over the compiled game.
[`SCENE_CONTENT_STANDARD.md`](../SCENE_CONTENT_STANDARD.md) now defines nine
review classes for player-facing, configuration, container, engine-internal,
and framework-internal scenes.

Added `scripts/audit-scenes.js`, which loads `out/game.json`, classifies every
compiled ID, and fails on an unclassified scene or a class-specific structural
violation. Added `test/all-scenes-standard.test.js`, which locks the current
177-scene total and the count in every class. The independent complete audit
is recorded at
[`../reviews/2026-07-29-v01-complete-scene-audit.md`](../reviews/2026-07-29-v01-complete-scene-audit.md).

The adversarial pass exposed a cross-cutting semantic-color gap. The same
compiled-scene audit now also fails on unwrapped mapped political terms,
incorrect semantic classes, and partial full-name treatments. All affected
visible scenes were brought into line with
[`COLOR_STYLE_GUIDE.md`](../COLOR_STYLE_GUIDE.md); citation-link labels remain
neutral as the guide requires.

## Reason

The earlier historical and non-event audits together covered the game, but
their split scopes made completeness harder to verify. A new scene could also
have compiled without appearing in either hand-maintained review list.

The new gate applies the standard to what the player and engine can actually
reach. Internal and container scenes remain exempt from decorative narrative,
but they must be explicitly classified rather than silently omitted.

## Dynamic SPD comparison

Paths are relative to
`/home/phroz/spd/dynamic_social_democracy`.

Dynamic SPD establishes the relevant scene responsibilities in:

- `source/scenes/main.scene.dry` for the hand and deck containers;
- `source/scenes/post_event.scene.dry` for centralized updates and routing;
- `source/scenes/library.scene.dry` and `status.scene.dry` for special
  information surfaces;
- `source/scenes/party_affairs/shuffle_leadership.scene.dry` for provisional
  leadership configuration; and
- developed event and adviser files for decision/result sequences.

The Last Majles retains those responsibility categories. It diverges by making
them an explicit compiled-scene taxonomy with a fail-closed completeness test.
Dynamic SPD is still the behavioral baseline; the taxonomy is project tooling,
not a new runtime architecture. Turn economy, shared state, deck semantics,
event routing, persistence, and build output are unchanged.

## System fit

The gate distinguishes:

- full decision menus from nested continuation decisions;
- substantive visible consequences from provisional adviser add/remove steps;
- information surfaces from deck containers;
- project engine internals from generated Dendry navigation helpers.

Every visible consequence must wait for acknowledgement. Every configuration
step must return to the roster manager. Information surfaces must contain
explanation. Decision targets must expose action titles and qualitative
subtitles. The exact class totals ensure that adding, deleting, or
reclassifying a scene requires an explicit standards update.

## Research and assets

No historical claims or assets were added by the tooling or semantic-markup
correction. The independent audit applies the existing event, person, and
system research records and the existing semantic-color guide to every
historically framed scene.

## Validation

- Exhaustive audit script: 177 classified scenes, zero failures.
- Dedicated all-scenes regression: passed; it also verifies that the independent
  report contains the same 177 IDs, classes, and PASS verdicts.
- Independent row-by-row audit: 177 PASS, 0 FAIL across all nine classes.
- `npm test`: 8/8 test files passed.
- Playwright: 12/12 Chromium and Firefox checks passed at 1440, 768, and
  390 pixels, including complete playthroughs.
- `git diff --check`: passed.
