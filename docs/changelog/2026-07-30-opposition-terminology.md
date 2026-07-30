# Opposition terminology

- **Date:** 2026-07-30
- **Status:** Implemented for `0.2.0`

## Summary

Before the National Front forms, the game now calls the playable side simply
the **opposition**. The title screen, January briefing, sidebar tab and heading,
about text, persisted `player_organization` label, README, design documents,
research-system note, review record, and tests use the same term. The label
changes to **National Front** or **Coalition** after formation as before.

The adviser chronology is unchanged: Mossadegh and Saleh are initially
available, Fatemi and Makki enter through the October palace protest, Kashani
becomes an independent counterpart at Front formation, and Maleki remains
unavailable within the current endpoint.

## Reason

Naming the opening viewpoint after a particular personal grouping gave a
generic player perspective the sound of a formal historical organization.
“Opposition” communicates the player's political position without implying
common membership, command, or a name used by the separate January 1949
politicians and parties.

## Dynamic SPD comparison

Dynamic SPD's `source/scenes/status.scene.dry` reports the SPD's current
position as “opposition” when it is outside government. It uses the generic
political condition rather than inventing an alliance name for that state.

The Last Majles adopts the same clarity principle. Unlike SPD, the Iran
campaign's opening opposition contains separate politicians, an organized Iran
Party, newspapers, and personal networks rather than one mass party. The
generic label therefore describes the player perspective only; component state
and historical evidence remain separate.

## System fit

This is a presentation and persisted-label correction. It does not change the
turn loop, shared state ownership, event routing, action economy, adviser
availability flags, support model, election model, or terminal route.
`player_organization` begins as `Opposition` and changes to `National Front`
at formation.

## Research and assets

No historical claim or asset was added. The change removes an over-specific
game label and retains the documented pre-formation separation described by
`MAJ-S2`, chapter 5, pp. 249–253, and `MAJ-S1`, pp. 207–208.

## Validation

Validation searches all tracked game, browser, documentation, and test
surfaces for the retired label; checks the initial and post-formation
`player_organization` values; runs the compiled-scene standard and automated
engine suites; verifies documentation links; and confirms the local
hot-reload build serves the Opposition tab.

The independent terminology follow-up in
[`2026-07-30-opposition-adversarial-review.md`](../reviews/2026-07-30-opposition-adversarial-review.md)
found one stale design-document phrase, which was corrected; its final pass
found no retired label. `npm test` passes all eight suites, the 184-scene audit
reports zero failures, and `git diff --check` passes.
