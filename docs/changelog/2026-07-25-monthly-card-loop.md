# First playable monthly card loop

- **Date:** 2026-07-25
- **Status:** Implemented
- **Commit:** `8ef5540`

## Summary

Added the October 1949 opening, a recurring hand, three Party Affairs cards,
cooldowns, monthly time advancement, annual income, a shared post-event
reducer, a status page, a local runner, and a smoke test.

## Reason

The first milestone needed a complete playable loop before deeper historical
systems were layered onto it.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/main.scene.dry`,
  `source/scenes/post_event.scene.dry`, `source/scenes/status.scene.dry`, and
  `source/scenes/party_affairs/media.scene.dry`.
- **What Dynamic SPD does:** presents actions through tagged decks, commits
  time when a normal card is opened, centralizes recurring updates and event
  routing after a card, and exposes shared numerical state in a status scene.
- **Decision here:** retained those responsibility boundaries and the
  card/cooldown pattern. Adapted the calendar, variables, action names, and
  annual income for the Iran campaign.
- **Divergence level:** local adaptation. No major loop divergence was made.

## System fit

The reducer is the integration point for future event decks, advisers,
coalition reactions, elections, and annual rules. Prototype numbers are balance
scaffolding rather than historical quantities.

## Research and assets

The opening has an adjacent research record at
`docs/research/events/1949-10-palace-protest.md`. Its present article source is
provisional pending an accessible specialist book and Iranian primary
material.

## Validation

The game built successfully and the smoke test checked the hand, action
effects, cooldowns, reducer, time advancement, and status route.
