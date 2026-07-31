# v0.3 Dynamic SPD convergence

- **Date:** 2026-07-30
- **Status:** Implemented for `0.3.0`

## Summary

The campaign now uses a four-card agenda with exact cancellation restoration,
a historically gated three-person adviser slate and no-time pinned roster
manager, persistent recurring projects, coupled coalition/support/resource/
Crown feedback, and place-level election, credential, usability, and oil-vote
state. The chamber interface can switch between institutional status and
nationalization position. Majles or Senate rejection ends the campaign;
successful passage still produces one of four organizational evaluations.
Saves use schema 5.

## Reason

The v0.2 responsibility boundaries resembled Dynamic SPD, but many displayed
qualities were score accumulators rather than inputs into later political
behavior. Cards were one-shot packages, opening a card irreversibly consumed
the month, adviser eligibility had no three-person agenda constraint, and the
historical event spine did not sufficiently consume earlier decisions. This
change makes those systems interact before any larger Iran-specific departure
from the reference architecture.

## Dynamic SPD comparison

The exact reference analogues are relative to
`/home/phroz/spd/dynamic_social_democracy`:

- `source/scenes/main.scene.dry`: Dynamic mode deals a four-card hand from
  conditionally available decks. Iran retains four cards and its three
  historically appropriate decks.
- `source/scenes/easy_discard.scene.dry`: a card may restore the action,
  cooldown, visits, last-card state, and hand. Iran adapts this into one
  universal return scene for all sixteen cards.
- `source/scenes/post_event.scene.dry`: time, timers, derived political state,
  and event routing share one reducer boundary. Iran retains that ownership
  and adds faction, support, Crown, constituency, credential, and oil-vote
  consumers.
- `source/scenes/advisors/shuffle_leadership_pinned.scene.dry` and
  `source/scenes/party_affairs/shuffle_leadership.scene.dry`: leadership
  selection is managed through a pinned interface. Iran retains the pinned
  manager but makes roster work a no-time action with a cooldown separate from
  adviser consultations.
- `source/scenes/advisors/wels.scene.dry`: an adviser has distinctive powers
  that reopen or reshape systems. Iran retains that pattern for all six
  figures, within each figure's historical role.
- `source/scenes/party_affairs/media.scene.dry`,
  `source/scenes/party_affairs/fundraising.scene.dry`, and
  `source/scenes/party_affairs/party_organizations.scene.dry`: recurring cards
  remember prior policy and investment. Iran adapts this to press,
  fundraising, local committees, elections, credentials, coalition
  procedure, and oil work.
- `source/scenes/election_algorithm.scene.dry`: one central reducer converts
  political state into parliamentary state. Iran retains central derivation
  but rejects SPD's proportional formula in favor of sourced contestable
  place records and the return → credential → usability → oil-position
  pipeline.
- Hindenburg state in `source/scenes/root.scene.dry`,
  `source/scenes/post_event.scene.dry`, and the related event families makes
  presidential pressure affect later conduct. Iran adapts the responsibility
  boundary to relation, resistance, court capacity, and electoral influence;
  no reducer silently invents a royal act.
- `source/scenes/library.scene.dry` and `source/scenes/status.scene.dry`
  provide persistent political summaries. Iran retains the boundaries,
  qualitative normal-mode display, and special-scene return behavior while
  adding support trends, active advisers, project state, credentials, and
  chamber oil positions.

The project rejects German historical assumptions, proportional elections,
inline optimization prose, and Dynamic SPD's weaker source discipline.

## System fit

`root.scene.dry` remains the sole initializer of shared `Q`.
`post_event.scene.dry` remains the sole owner of time, cooldown ticks,
aggregate derivation, pressure eligibility, and tagged-event routing. Scenes
mutate faction components, resources, projects, Crown dimensions, or mutable
place scenario fields; they do not edit chamber totals or historical evidence.
The browser reads the same place arrays as the reducer. Dendry's unseeded PRNG
continues to determine deck order and is preserved in save state.

The migration from v0.2 is a new campaign. Schema 5 states cannot be safely
constructed from older saves because the adviser slate, project history,
support history, contestable-place state, and oil commitments did not exist.

## Research and assets

The historical/mechanical boundary and authoritative locators are recorded in
[`dynamic-political-simulation.md`](../research/systems/dynamic-political-simulation.md),
[`recurring-actions.md`](../research/systems/recurring-actions.md), and
[`support-and-chamber-display.md`](../research/systems/support-and-chamber-display.md).
Historical evidence remains immutable. Counterfactual Crown reactions and
chamber defeats identify themselves as such. No new asset was added and the
rights ledger is unchanged.

## Validation

The Dendry build and exhaustive 217-scene audit pass with zero failures.
Engine coverage includes the four-card hand, cancellation, no-time adviser and
roster actions, historical adviser entry, twenty-seven-month passage autoplay,
Majles and Senate terminal routing, immutable 136/60 place ledgers, separate
return/credential/usability/oil-position state, Crown bounds, event priority,
and all four successful passage evaluations. Browser assertions cover support
trends, chamber modes and dossiers, grayscale patterns, debug downstream
effects, schema rejection, and removal of inert settings. `npm test`,
`git diff --check`, and all 18 Chromium/Firefox projects at 1440, 768, and 390
pixels pass. Two consecutive `out/html` builds produced the same aggregate
SHA-256, `4ed84e2751bb176c81a435316d88f27785c510d0e3b0fa647ef460eb84651023`.
Because the host lacked `libnspr4`, `libnss3`, and `libasound2`,
the browser matrix used copies extracted under `/tmp`; no system package or
repository asset was added.
