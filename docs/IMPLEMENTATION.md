# Implementation baseline

## Current rule

Use *Dynamic Social Democracy* as the structural baseline and diverge
piecemeal. A system remains SPD-like until a specific design or historical
requirement demonstrates why it should change.

This reverses any earlier assumption that the project must first design a wholly
different interaction model. The long-term design document remains a source of
candidate divergences, not a requirement to replace proven Dendry structures
before the campaign is playable.

## “What did Dynamic SPD do?” gate

Every implementation or design change begins with a comparison against the
local Dynamic SPD reference at
`/home/phroz/spd/dynamic_social_democracy`. The developer should:

1. identify the matching Dynamic SPD scenes, state variables, reducer path,
   deck pattern, UI, or toolchain;
2. describe the behavior and the responsibility boundaries it establishes;
3. decide explicitly what this project retains, adapts, or rejects; and
4. record that decision, including exact reference paths, in the dated entry
   under `docs/changelog/`.

This is an architectural gate, not a demand for visual or mechanical identity.
When a difference is small and local, the changelog rationale is enough. Before
a major divergence is implemented, this document or a linked design note must
describe its motivation, effects on dependent systems, migration strategy, and
validation. Major divergences include the core turn loop, shared-state
ownership, event routing, hand/deck semantics, action economy, time advancement,
status UI, persistence, and build/runtime structure.

Dynamic SPD is not a historical source. Iran-specific content and mechanics
still require independent research and claim-level citations.

## Implemented foundation

The current build follows SPD in these respects:

- one shared `Q` state initialized in `root.scene.dry`;
- a card hand with a Party Affairs deck;
- action cards selected by tags and gated by cooldown timers;
- opening a normal action card commits the current month;
- `post_event.scene.dry` advances the calendar, ticks timers, bounds state, and
  returns to the hand;
- a numerical status screen exposes the live simulation state;
- annual organizational income is applied at year rollover.

The initial Party Affairs deck contains three prototype cards:

- Coalition Meeting;
- Coordinate the Press;
- Build an Electoral Committee.

Their numerical effects are balance scaffolding, not historical measurements.

## Source layout

| Path | Responsibility |
| --- | --- |
| `source/scenes/root.scene.dry` | Menu and initial shared state |
| `source/scenes/palace_protest.scene.dry` | Sourced campaign opening |
| `source/scenes/main.scene.dry` | Hand, decks, and recurring briefing |
| `source/scenes/party_affairs/` | Organizational action cards |
| `source/scenes/post_event.scene.dry` | Calendar and shared reducers |
| `source/scenes/status.scene.dry` | Visible state |
| `docs/research/events/` | Claim-level research records |

## Near-term extension order

1. Add an event deck and an SPD-style event-resolution pass in `post_event`.
2. Implement the October 1949 protest sequence as several sourced events and
   decisions rather than one briefing.
3. Add advisers as cards with a shared action cooldown.
4. Add coalition factions and faction-specific dissent.
5. Implement Sixteenth Majles constituencies and candidates.
6. Add the first oil-policy state only when the campaign reaches the relevant
   proposals.

## Candidate divergences

These should be evaluated when their dependent system is implemented:

- qualitative or uncertain displays for intelligence;
- institution-specific compliance instead of automatic government control;
- named constituencies instead of a normalized national election algorithm;
- term-by-term oil proposals instead of one policy meter;
- a network model for coup operations instead of aggregate preparation;
- daily time during the August 1953 crisis.

Until then, keeping numerical state and centralized updates makes the build
easier to inspect, balance, and compare with SPD.

## Current reference map

| Concern | Dynamic SPD reference |
| --- | --- |
| Shared state and startup | `source/scenes/root.scene.dry` |
| Hand, recurring decks, and turn selection | `source/scenes/main.scene.dry` |
| Post-card event routing and shared updates | `source/scenes/post_event.scene.dry` |
| Numerical state display | `source/scenes/status.scene.dry` |
| Party-affairs action pattern | `source/scenes/party_affairs/media.scene.dry` |
| Image attribution | `credits_images.txt` |
| Packaged browser assets | `out/html/img/` |

Paths in this table are relative to the Dynamic SPD reference checkout.
