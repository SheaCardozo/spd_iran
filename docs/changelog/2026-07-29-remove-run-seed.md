# Remove the public run seed

- **Date:** 2026-07-29
- **Status:** Implemented for `0.1.0`

## Summary

Removed `run_seed`, its custom PRNG state, the fixed deck seed, the unused
report-reliability and constituency-pressure variation, seeded URL parsing,
and seed labels from the Library, ending, README, and browser tests.

New campaigns now use Dendry's ordinary randomized engine stream for deck
draws. Saving still preserves Dendry's internal random state as part of the
engine state, so loading a save continues the same in-progress deck sequence
without exposing or promising a replay seed.

## Reason

The public seed controlled only two bounded fields that no card, event, score,
or ending consumed. Meanwhile, a separate hard-coded seed forced every new
campaign to receive the same deck stream. That combination added visible
complexity without meaningful replayability and suppressed useful card-order
variation.

## Dynamic SPD comparison

Dynamic SPD does not initialize campaign seed qualities or replace the browser
engine's random function. Dendry's `lib/engine.js` makes a unique RNG stream in
`DendryEngine.beginGame()` when no explicit test seed is supplied, consumes
that stream in `drawCard()`, and stores `currentRandomState` with engine state.
Dynamic SPD's `out/html/game.js` leaves those responsibilities untouched.

The Last Majles now follows that baseline directly. Deterministic engine tests
may still pass explicit seeds to Dendry's test API, but the shipped game does
not expose a seed or override the deck RNG.

## System fit

The monthly clock, event priority, save schema, action economy, cooldowns, and
historical anchors are unchanged. Existing saves may contain inert legacy seed
qualities, but no current scene or browser code reads them. New saves omit the
removed campaign qualities while retaining Dendry's normal internal RNG state.

## Research and assets

No historical content, source locator, interpretation, image, attribution, or
rights record changed.

## Validation

The data suite requires all former public seed fields to be absent. The browser
overlay test prohibits a replacement `random.uint32` function and the fixed
`deck_rng_state`. Browser coverage verifies new saves omit `run_seed`, while
save/load and complete campaign playthroughs continue to work.
