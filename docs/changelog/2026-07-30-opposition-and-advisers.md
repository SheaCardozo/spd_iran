# Opposition viewpoint and chronological advisers

- **Date:** 2026-07-30
- **Status:** Implemented for `0.2.0`

## Summary

The January 1949 player viewpoint is now the opposition rather
than the Iran Party itself. “Opposition” describes a political position, not
the name of a historical organization. Mossadegh, the Iran Party, other
politicians, newspapers, and personal networks retain separate positions until
the National Front forms.

The pinned roster returns to the original six figures. Mossadegh and Allahyar
Saleh are available in January. Hossein Fatemi and Hossein Makki enter with the
documented October 1949 Committee of Twenty and palace protest. Ayatollah
Abol-Qasem Kashani becomes visible at National Front formation as an
independent counterpart. Khalil Maleki remains compiled but unavailable
through the March 1951 endpoint because the current evidence does not support
an earlier organizational entry for this mechanic. Karim Sanjabi and Ahmad
Zirakzadeh remain important historical Iran Party figures but are no longer
adviser cards.

Pre-Front Mossadegh, Fatemi, and Makki consultations now describe the
institutions and cooperation that exist at the time. Later consultations are
hidden until their subject exists, avoiding advance notice through the adviser
interface.

## Reason

Beginning as the Iran Party made the player too institutionally narrow and
made Mossadegh's absence from the opening adviser hand artificial. Beginning
as a formal National Front would be chronologically false. The informal
opposition viewpoint gives the campaign a stable playable subject without
inventing a January organization.

## Dynamic SPD comparison

Dynamic SPD gives each pinned adviser a state-controlled visibility condition,
for example `source/scenes/advisors/wels.scene.dry`, while
`source/scenes/main.scene.dry` renders the shared adviser-action affordance.
Historical events can also remove advisers directly by changing those state
flags, as in `source/scenes/events/centrist_leaders_resign.scene.dry` and
`source/scenes/events/death_of_muller.scene.dry`.

The Last Majles retains conditional pinned-card visibility and direct
event-owned availability changes. It adapts SPD by making availability
chronological and automatic rather than asking the player to appoint a
leadership roster. The shared six-month action cooldown remains separate from
visibility. This follows the user's chosen pinned-adviser model and avoids
turning independent political counterparts into party officers.

## System fit

The monthly action economy, Dendry deck randomization, tagged event priority,
central `post_event` reducer, one shared `Q` state, and March 1951 terminal route
are unchanged. `player_organization` changes from `Opposition` to
`National Front` at formation. Availability flags can later remove a figure
when a sourced departure falls inside an expanded campaign.

The viewpoint boundary is recorded in
[`GAME_DESIGN.md`](../GAME_DESIGN.md) and the concrete state and unlock rules
in [`IMPLEMENTATION.md`](../IMPLEMENTATION.md#v02-opposition-adviser-support-and-chamber-architecture).

## Research and assets

Ervand Abrahamian, `MAJ-S2`, chapter 5, pp. 249–253, identifies the Iran
Party's 1947–1949 movement toward a pro-Mossadegh position, Mossadegh's
confinement after the February 1949 attempt, and Fatemi and Makki among the
Committee of Twenty around the October protest. Fakhreddin Azimi, `MAJ-S1`,
pp. 207–208, supports the protest-to-coalition sequence. Adviser-specific
boundaries remain in `docs/research/people/`, and the system abstraction is
recorded in
[`recurring-actions.md`](../research/systems/recurring-actions.md).

No asset was added or changed.

## Validation

Validation covers the initial two-card adviser hand, the six-card compiled
roster, pre-Front Mossadegh consultation, October Fatemi and Makki entry,
Front-formation Kashani entry, continued Maleki exclusion, future-scene
concealment, the compiled-scene standards gate, and the unchanged historical
autoplay.

The independent
[`Opposition and adviser adversarial review`](../reviews/2026-07-30-opposition-adversarial-review.md)
found and prompted correction of misattributed adviser locators,
pre-formation institutional language, future-action hints, and a stale
top-level player-role description. Its final pass found all blockers resolved.

`npm test`, the 184-scene audit, documentation-link validation, targeted
adviser chronology tests, and `git diff --check` pass. The Playwright matrix
was invoked but could not launch either bundled browser on this host: Chromium
lacks `libnspr4.so`, and Firefox lacks `libasound.so.2`.
