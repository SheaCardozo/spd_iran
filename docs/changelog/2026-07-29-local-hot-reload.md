# Local rebuild and browser reload

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Extended `npm run play` into a complete local watch loop. The server watches
the Dendry source, tracked browser overlay, assets, historical-primer source,
and build scripts. It debounces file events, runs the canonical build, and
reloads connected game or primer pages through a local server-sent-events
channel after a successful build.

Failed builds remain visible in the terminal and do not reload the browser.
Changes received during a build queue one follow-up build.

## Reason

The existing runner rebuilt once before starting but did not implement the
watch behavior claimed by its original change record. That forced manual
restarts and made visual iteration needlessly slow. The local page should track
the current workspace while the development server is running.

## Dynamic SPD comparison

Dynamic SPD's `README.md` documents manual `dendrynexus make-html`, its
`package.json` exposes only the Dendry command, and its generated browser files
live in `out/html/`. It has no repository-local watch server or live-reload
client.

The Last Majles retains SPD's generated-output boundary and canonical Dendry
build, then adds a development-only wrapper in `scripts/serve.js`. The injected
reload client is served in memory and is not written into `out/html`, the
hosting artifact, or production pages.

## System fit

The watcher invokes `scripts/build.js`, so browser overlays, assets, and the
standalone primer continue through the same production build path. It watches
inputs only and therefore does not rebuild in response to its own generated
`out/` files. The game engine, saves, turn loop, and hosted runtime are
unchanged.

## Research and assets

No historical content, citation, asset, attribution, or rights status changed.
Primer edits merely trigger the existing renderer.

## Validation

The UI-sync suite checks the watch call, canonical build subprocess, local SSE
endpoint, and injected EventSource client. Manual validation starts
`npm run play`, changes a watched source file, observes a successful rebuild,
and confirms that the open local page reloads.
