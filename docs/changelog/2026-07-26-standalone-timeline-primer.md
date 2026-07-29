# Standalone historical timeline primer

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The historical timeline is now framed as a self-contained introduction for a
reader with little prior knowledge of Iran. It removes application branding,
navigation, internal research identifiers, and instructions that require
access to the repository. New political and economic orientation sections
explain the constitutional institutions, informal power networks, the
National Front coalition, the oil industry's structure, nationalization, and
the effects and limits of the embargo.

The build now also writes a shareable bundle to `out/timeline/`. Its
`index.html`, stylesheet, script, and three credited historical images do not
depend on the application page.

## Reason

The earlier page remained visibly attached to the application and assumed too
much knowledge of both Iranian politics and the project's internal research
system. A primer intended for independent circulation needs to explain its
terms on the page and carry only the files required to display it.

## Dynamic SPD comparison

Dynamic SPD was checked at
`/home/phroz/spd/dynamic_social_democracy/out/html/index.html`,
`/home/phroz/spd/dynamic_social_democracy/out/html/game.css`, and
`/home/phroz/spd/dynamic_social_democracy/README.md`.

Dynamic SPD presents historical context inside the application shell rather
than as a separately distributable long-form essay. This project retains its
strong typographic hierarchy and ideologically meaningful term colors. It
deliberately diverges by exporting the primer as a small independent bundle
with no application navigation or runtime dependency. This is a local
publishing choice, not a change to the core turn loop, state ownership, event
routing, or build/runtime model of the application.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the canonical narrative.
`scripts/build-timeline.js` still transforms citations into human-readable
author-and-title references and now writes identical rendered markup to both
the in-application output and the standalone bundle. The standalone directory
contains only the page dependencies it actually references.

## Research and assets

The new political and economic orientation uses the same scholarly spine
already registered for the primer, especially Azimi, Abrahamian, Ladjevardi,
Painter and Brew, Elm, and Clawson and Sassanpour. No new source was acquired.
No new image was introduced; the standalone bundle copies the three existing
ledgered images and preserves their on-page attribution.

## Validation

- Ran the complete build and Node test suite.
- Added checks for standalone framing, the political and economic orientation
  sections, absence of application/repository language, and exact equality
  between the normal and standalone rendered pages.
- Verified that all standalone stylesheet, script, and image dependencies are
  emitted.
- Ran whitespace-error checking with `git diff --check`.
