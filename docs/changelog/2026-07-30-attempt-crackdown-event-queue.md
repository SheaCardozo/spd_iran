# Attempt and crackdown event queue

- **Date:** 2026-07-30
- **Status:** Implemented

## Summary

Separated the February 1949 attempt on Mohammad Reza Shah from the ensuing
Tudeh ban and opposition crackdown in the playable event queue. Resolving the
attempt now returns the player to the event list. The newly eligible crackdown
then appears there as its own named, one-time event.

## Reason

The former scene presented two decisions, but linked the first consequence
directly into the second setup. That made two distinct political incidents
feel like successive pages of one decision and bypassed the event-list rhythm
used elsewhere in the game.

## Dynamic SPD comparison

Dynamic SPD's `source/scenes/post_event.scene.dry` recompiles its
`@events_choice` list from `#event` after a resolved incident. Individual
events such as `source/scenes/events/panzerkreuzer.scene.dry` are independently
tagged and gated rather than being displayed as one uninterrupted sequence.

Iran retains that router and tagged-event boundary. The attempt still has
priority 30; its resolution makes the separately tagged crackdown eligible at
priority 29. The consequence selector says only “Continue”; the event-list
routing remains interface behavior rather than being narrated to the player.

## System fit

The new `emergency_crackdown_seen` flag keeps the incident independently
one-time, appears in the derived event record, and is initialized with the
campaign. The crackdown remains in February without advancing the month or
spending another action. Its choices and all downstream callbacks are
unchanged.

## Research and assets

No historical claim or asset changed. Both incidents remain supported by the
adjacent source note and
`docs/research/events/1949-02-attempt-and-emergency.md`. This is solely a scene
boundary and routing change.

## Validation

- `npm test`: passed, including all nine combinations of attempt and crackdown
  choices and an explicit assertion that the crackdown is selected from the
  refreshed event list.
- Tagged-event integrity now checks the separate crackdown event and its
  priority.
- `git diff --check`: clean.
