# Implementation baseline

## Current rule

Use *Dynamic Social Democracy* as the structural baseline and diverge
piecemeal. A system remains SPD-like until a specific design or historical
requirement demonstrates why it should change.

This reverses any earlier assumption that the project must first design a wholly
different interaction model. The long-term design document remains a source of
candidate divergences, not a requirement to replace proven Dendry structures
before the campaign is playable.

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
