# January campaign start and ordinary pre-Front play

- **Date:** 2026-07-29
- **Status:** Implemented for `0.1.0`

## Summary

Removed the compressed February–October 1949 prologue. A new campaign now
opens with the ordinary January hand. The 4 February attempt on the Shah and
immediate emergency measures, constituent assembly, Senate and election
preparations, and October palace protest are one-time dated events inside the
shared post-event route.

The campaign now contains twenty-seven ordinary actions through March 1951.
Four recurring pre-Front Party Affairs cards cover opposition consultation,
emergency legal work, political correspondence, and election preparation.
Front-specific coalition cards remain unavailable until the Front exists.
All six adviser cards remain pinned, following the established adviser
interface, but their substantive consultations are gated to the institution
or cooperation they describe. Kashani's card explicitly represents messages
and intermediaries during his Beirut banishment rather than placing him in
Tehran.
The status surface describes the earlier actors as separate political circles,
and save schema 3 rejects October- and February-start saves from retired
chronologies.

## Reason

Beginning ordinary play only after the October palace protest denied the
player meaningful participation in the constitutional emergency and the early
Sixteenth-Majles election campaign. It also made the first playable hand arrive
after the historical process that created the Front had already begun.

January is now the point at which the player acquires agency, without
inventing a National Front organization before the October cooperation that
produced it. The February emergency is a development inside play rather than a
precondition imposed before the first ordinary action.

## Dynamic SPD comparison

Dynamic SPD initializes January 1928 directly in
`source/scenes/root.scene.dry`. Its `source/scenes/main.scene.dry` supplies the
ordinary monthly party hand before the May election, while historical
developments continue through `source/scenes/post_event.scene.dry`. It does not
separate early campaign preparation into a compressed prologue.

The Last Majles now retains that responsibility boundary directly. January is
an ordinary hand; the February attempt and emergency and all later anchors use
tagged-event eligibility, priority, and `max-visits`; and
`post_event.scene.dry` remains the only owner of time advancement and event
discovery. Iran-specific history still requires a distinct pre-Front deck
because the player cannot be treated as the leadership of an organization
that did not yet exist.

Reference paths inspected:

- `/home/phroz/spd/dynamic_social_democracy/source/scenes/root.scene.dry`
- `/home/phroz/spd/dynamic_social_democracy/source/scenes/main.scene.dry`
- `/home/phroz/spd/dynamic_social_democracy/source/scenes/post_event.scene.dry`

## System fit

The major-divergence plan and migration boundary are recorded in
[`IMPLEMENTATION.md`](../IMPLEMENTATION.md#january-1949-campaign-start-divergence).
The shared `Q` state, deck semantics, one-action monthly economy, adviser
economy, timer ownership, reducers, chamber records, oil records, and March
1951 terminal route remain unchanged.

The additional nine turns use four separately cooled pre-Front cards, so
later coalition cards do not enter October already on cooldown. Parliamentary
work becomes available during the election period; public and coalition work
retains its Front-formation gate. The ordinary randomized Dendry deck stream
remains unseeded.

## Research and assets

The opening chronology and recurring-card historical boundaries use:

- Fakhreddin Azimi, *Iran: The Crisis of Democracy, 1941–1953*, pp. 201–08;
- Ervand Abrahamian, *Iran Between Two Revolutions*, chapter 5,
  especially pp. 249–53; and
- Mostafa Elm, *Oil, Power, and Principle*, chapter 3, “The Constitution”;
- Habib Ladjevardi, *Labor Unions and Autocracy in Iran*, pp. 90–92, for
  the exact 4 February date and immediate suppression.

These major scholarly sources were already registered and locally archived.
Adjacent source comments connect each new scene to its locator and identify
all recurring operations and numerical effects as counterfactual
abstractions. No new asset was added or changed.

The exhaustive compiled-scene audit in
[`2026-07-29-v01-complete-scene-audit.md`](../reviews/2026-07-29-v01-complete-scene-audit.md)
was regenerated against 182 compiled scenes. All pass the shared scene
standard.

## Validation

- Rebuilt the Dendry and browser outputs.
- Verified the ordinary January hand routes all nine emergency paths through
  the February event queue after one action.
- Historical-path autoplay reaches Senate approval after exactly twenty-seven
  monthly actions with no unavailable-action deadlock.
- Verified the February, May, July, October, and later fixed anchors remain one-time
  tagged events with priority.
- Verified sixteen phase-gated action cards, six pinned advisers, and schema-3
  save state.
- Independently reviewed the changed scenes. The initial review's adviser
  chronology and exact-date/source-ID failures were corrected through
  institution-sensitive consultation gates, explicit exile framing,
  Ladjevardi's precise locator, and `MAJ-S12` registry corrections.
- Re-ran the adversarial review after moving the hand to January. It caught and
  prompted corrections to pre-emergency adviser and card wording, adviser
  availability, the pre-election chamber phase, the completed-action label,
  stale duration/card counts, and false print pagination for Elm.
- Ran the exhaustive automated scene audit: 182 passes, 0 failures.
- `npm test`: passed.
- `git diff --check`: passed.
- Playwright was invoked for all Chromium/Firefox viewport projects, but the
  installed browsers could not launch because the host lacks `libnspr4.so`
  (Chromium) and `libasound.so.2` (Firefox). No browser assertion ran; this is
  an unresolved environment dependency rather than a passing browser result.
