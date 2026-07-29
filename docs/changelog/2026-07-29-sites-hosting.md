# Production hosting adapter

- **Date:** 2026-07-29
- **Status:** Implemented for the `0.1.0` public demo

## Summary

Registered the game with Sites, persisted the opaque project identity in
`.openai/hosting.json`, and added a reproducible `build:hosting` step. The step
copies the completed Dendry output into a Worker static-assets bundle and adds
the minimal entrypoint required to serve `/`, direct files, and extensionless
fallback routes. A data-level test verifies that the game, primer, project
configuration, and Worker entrypoint are present.

## Reason

The v0.1 campaign was complete and validated locally, but the generated
`out/html` directory was not yet in a production-hostable runtime format. The
adapter makes the public artifact explicit without changing game state,
historical content, action economy, or browser behavior.

## Dynamic SPD comparison

Dynamic SPD documents `dendrynexus make-html` in `README.md`, declares
`out/html/index.html` as its package entrypoint in `package.json`, and keeps its
generated HTML directly under `out/html/`. It does not contain a deployment
adapter, Worker, or hosting manifest.

The Last Majles retains that static Dendry output as the authoritative browser
build. It adapts the delivery layer only: `scripts/build-hosting.js` wraps the
same generated files in a static-assets Worker bundle. This is a deployment
concern, not a second gameplay or runtime architecture.

## System fit

`npm run build:hosting` first runs the existing build, including the tracked
browser overlay, historical images, and timeline primer. It then creates the
disposable `.open-next/` artifact. `npm test` now exercises this complete build
path before running the existing engine, data, source, documentation, and UI
checks. The hosting project ID is non-secret; runtime credentials are neither
stored nor committed.

## Research and assets

No historical prose, claim, source locator, image, attribution, or rights
decision changed. The deployed asset set is exactly the already-ledgered
`out/html` build, so the bibliography and asset ledger require no updates.

## Validation

Validation includes `npm test`, `git diff --check`, inspection of the generated
Worker bundle, a source-revision-matched hosting archive, and production URL
smoke checks after deployment.
