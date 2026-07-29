# Dynamic SPD gameplay-architecture foundation

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Added Dynamic SPD-style tagged-event discovery and routing, a pinned Mohammad
Mossadegh adviser with a shared adviser cooldown, a sourced November 1949 Front
formation event, separate Mohammad Reza Shah relationship and resistance state,
separate Sixteenth-Majles legal and practical denominators, and Main,
Coalition, Majles, and Crown sidebar tabs.

## Reason

The first playable opposition slice needs to grow through Dynamic SPD's proven
responsibility boundaries rather than accumulate unrelated local mechanisms.
This change establishes the shared integration points before the remaining
1949–51 content is authored.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/main.scene.dry`,
  `source/scenes/post_event.scene.dry`,
  `source/scenes/advisors/wels.scene.dry`,
  `source/scenes/events/black_thursday.scene.dry`,
  `source/scenes/root.scene.dry`,
  `source/scenes/status.scene.dry`,
  `source/qdisplays/hindenburg_angry.qdisplay.dry`,
  `out/html/index.html`, and `out/html/game.js`.
- **What Dynamic SPD does:** renders status subscenes in a persistent tabbed
  sidebar; exposes advisers as pinned `#advisor` cards sharing one cooldown;
  commits time through normal action cards; centralizes recurring updates in
  `post_event`; discovers eligible `#event` scenes there; gives Hindenburg
  separate relationship and anger state; and centrally calculates and displays
  Reichstag state.
- **Retained:** sidebar subscenes, pinned adviser tags, the common adviser
  timer, normal-card time commitment, centralized reduction, and event
  eligibility owned by tagged scenes.
- **Adapted:** Mohammad Reza Shah receives separate relationship and resistance
  state without inheriting Hindenburg's constitutional powers or formulas.
  The Majles receives a central status model without SPD's proportional
  election algorithm: authorized places, returns, credentials, usable members,
  dated alignments, attendance, and votes remain distinct.
- **Rejected:** no Dynamic SPD historical values, German presidential
  mechanics, nationwide vote-to-seat conversion, or stable party-seat chart
  was copied.
- **Divergence level:** Iran-specific data adaptation inside the retained SPD
  architecture, not a major architectural divergence.

## System fit

`root.scene.dry` owns the new shared state. `main.scene.dry` renders tagged
advisers. `post_event.scene.dry` advances time, ticks the shared adviser timer,
bounds state, compiles eligible events, and routes through them until none
remain. The status sidebar reads the same shared qualities without navigating
away from the current scene. Future Majles and Crown events now have stable
state and UI destinations.

## Research and assets

The broad claim that the October protest cooperation produced the National
Front remains sourced to `MAJ-S1`, Fakhreddin Azimi, *Iran: The Crisis of
Democracy, 1941–1953*, pp. 207–08, and `SUP-001`, Mari Nukii, “Protest Events
in the Tehran Bazaar during the Oil Nationalization Movement of Iran,” p. 10.
The adjacent claim record at
`docs/research/events/1949-10-palace-protest.md` now covers the November event
and adviser text. The Front-structure choices and all numerical effects are
identified as counterfactual prototype abstractions.

The 136 authorized Majles places and the separation of returns, credentials,
usable seats, alignments, attendance, and votes follow
`docs/research/SIXTEENTH_MAJLES_LEDGER.md` and
`docs/research/PARLIAMENTARY_CONTROL.md`. No new asset was added.

## Validation

`npm test` rebuilt the browser game and standalone primer, then passed all five
test files. Automated coverage verifies event routing after the October
action, the November event's one-time resolution, the pinned adviser tag and
shared cooldown without time advancement, the new sidebar tabs, the compiled
Majles and Crown status scenes, documentation integrity, local source
integrity, and UI synchronization.
