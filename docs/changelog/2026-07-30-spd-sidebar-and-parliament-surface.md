# Dynamic SPD sidebar and Parliament surface

- **Date:** 2026-07-30
- **Status:** Implemented

## Summary

Rebuilt the persistent status sidebar around Dynamic SPD's information
boundaries. The sidebar now contains Main, Politics, and Support. Main combines
date, resources, political position, campaign capacity, and Crown/government
state; Politics contains the opposition or coalition and its component
organizations; Support contains constituency support and monthly direction.
Adviser names and cooldowns no longer appear there.

Removed the Majles and Senate from the sidebar. Once the Sixteenth-Majles
election begins, a Parliament control appears to the right of the action decks.
It opens a full-width, non-action scene with the current chamber totals,
credential explanation, place diagrams, oil-position mode, and accessible
dossiers. The diagrams now use the complete Dynamic SPD election treatment:
500×250 semicircles, the same `d3-parliament` geometry and inner radius,
contiguous political blocks, center-out animation, and keyed composition
tables.

## Reason

The five-tab sidebar divided closely related information across Campaign,
Opposition/Coalition, Parliament, and Crown while also repeating adviser
information already present below the hand. The chamber ledger was especially
ill-suited to a narrow persistent column and appeared before the election was
politically current.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/status.scene.dry`,
  `out/html/index.html`, `out/html/game.js`, `out/html/game.css`,
  `out/html/d3-parliament.js`, `source/scenes/main.scene.dry`, and
  `source/scenes/events/election_1928.scene.dry`.
- **What Dynamic SPD does:** Main combines date, resources, political position,
  and government; Politics contains parties and internal factions; Polls
  contains electorate support. The shared browser refreshes one selected
  status subscene, while the hand surface owns action and pinned-card access.
- **Decision here:** retain those sidebar responsibilities as Main, Politics,
  and Support. Fold Crown state into Main and keep adviser access with pinned
  advisers. Diverge by giving Iran's 196-record chamber ledger a phase-gated
  full scene rather than compressing it into the sidebar. Copy the Reichstag
  semicircle, grouping, animation, and results-table grammar while replacing
  German parties with Iran's return, credential, attendance, route, coalition,
  and oil-position groups.
- **Divergence level:** major status-presentation change, planned in
  `docs/IMPLEMENTATION.md`; no turn-loop, state, or persistence change.

## System fit

The Parliament control is browser-rendered beside the action decks only when
`parliamentary_deck_unlocked` is true. It navigates to the `parliament` scene
without reserving an action, advancing time, redrawing, or changing the stored
hand. Returning restores the same monthly briefing and hand.

The chamber renderer now accepts a target surface and redraws its mode in the
Parliament scene. Each plotted seat still owns its stable Majles or Senate
place record, so the copied election layout preserves the existing picker,
keyboard focus, touch behavior, and dossier. Place evidence and scenario
records are unchanged. The
browser-agent boundary retains Main, Politics, and Support, and permits the
ordinary Parliament control after its historical gate.

## Research and assets

No new historical claim or historical asset was introduced. The credential
explanation and chamber fields move under an adjacent source comment citing
Abrahamian, Azimi, the official Sixteenth-Majles proceedings, and the official
First-Senate roster already registered for these systems. Historical evidence
remains separate from mutable scenario state. The layout algorithm is adapted
from Geoffrey Brossard's MIT-licensed `d3-parliament`; its copyright and
license are recorded in `THIRD_PARTY_NOTICES.md`. German party colors and
Reichstag photography were not copied because they do not fit the Iranian
historical institutions.

## Validation

- `npm test`: 10/10 suites passed.
- Compiled-scene audit: 216/216 scenes, zero failures.
- Focused engine coverage confirms Parliament preserves time, the monthly
  action, and the existing hand.
- Browser protocol and UI-sync tests cover the new tab IDs, phase gate,
  separate scene, and agent-facing surface.
- Chromium/Firefox launch was attempted; this host lacks Playwright's system
  libraries and `sudo` requires an interactive password, so rendered execution
  remains environment-blocked.
- `git diff --check`: clean.
