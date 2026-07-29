# Title-menu primer and bounded-report copy

- **Date:** 2026-07-29
- **Status:** Implemented for `0.1.0`

## Summary

Moved the standalone Historical Primer from the persistent browser header to a
selection on the title menu. The selection redirects to `timeline.html` and
retains an ordinary fallback link if browser navigation is unavailable.

Removed the normal-play sentences that described monthly reports as
fragmentary, unchanged, or clearer. The deterministic `report_reliability` and
`constituency_pressure` fields remain bounded to 48–52 and remain part of the
seeded state contract, but their exact values now appear only in debug mode.

## Reason

The primer is orientation material best offered before the campaign begins,
not a permanent utility beside Status, Research Library, saves, and settings.
The monthly reporting sentence implied a consequence that the v0.1 engine does
not implement: no card, event, choice, score, or ending currently reads either
minor-variation field. Removing the normal-play copy avoids presenting
decorative seeded state as actionable intelligence.

## Dynamic SPD comparison

Dynamic SPD puts Start, Mod Info, Credits, and Achievements on the opening menu
in `source/scenes/root.scene.dry`, while its persistent
`out/html/index.html` header contains Library, Save/Load, and Options. Its
pre-1928 timeline is an entry inside `source/scenes/library.scene.dry`, not an
independent top-bar link.

The Last Majles follows the same separation of opening orientation from
persistent campaign utilities. It retains Research Library in the header and
adapts SPD's opening-menu pattern for the independent, long-form primer.
Dynamic SPD has no corresponding seeded monthly report-reliability message.
The Iran campaign therefore retains its planned deterministic bounded fields
but rejects unsupported player-facing flavor until a system actually consumes
them.

## System fit

No turn-loop, state-ownership, event-routing, persistence, or action-economy
responsibility changed. The first title-menu option remains campaign start, so
autoplay and existing save behavior are stable. Browser navigation owns the
primer redirect; the Dendry scene provides a fallback and returns safely to the
title menu outside a browser.

## Research and assets

No historical claim, interpretation, source locator, image, attribution, or
rights record changed.

## Validation

The UI-sync suite checks that the header link is absent, the three title-menu
options compile in order, the redirect targets `timeline.html`, and the
misleading monthly sentence is absent. Playwright opens the primer through the
title menu before continuing onboarding. Full validation uses `npm test`, the
browser matrix, and `git diff --check`.
