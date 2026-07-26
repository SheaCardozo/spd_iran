# Local browser runner

- **Date:** 2026-07-25
- **Status:** Implemented

## Summary

Added `npm run play`, which builds the game, serves `out/html/`, and watches
source files so the current build can be opened at a local HTTP address.

## Reason

A browser-served development loop is easier to use and closer to the reference
project experience than opening generated HTML directly.

## Dynamic SPD comparison

- **Reference paths:** `package.json`, `README.md`, and generated
  `out/html/`.
- **What Dynamic SPD does:** builds a browser game with DendryNexus and keeps
  its distributable output under `out/html`; its repository does not provide
  this project's small watch-and-serve wrapper.
- **Decision here:** retained the same generated-output boundary and added a
  local development convenience around it.
- **Divergence level:** local tooling divergence; it does not alter runtime
  game architecture.

## System fit

The runner remains downstream of the canonical build command. Deployment can
continue to package `out/html/` without depending on the development server.

## Research and assets

None.

## Validation

The runner served the generated page at `127.0.0.1:8080` and rebuilt source
changes.
