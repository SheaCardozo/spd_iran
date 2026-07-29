# Dynamic SPD browser and structure sync

- **Date:** 2026-07-25
- **Status:** Implemented

## Summary

Added a tracked browser overlay derived from Dynamic SPD's customized web
shell, enabled its tabbed live status sidebar and event-image setting, adopted
its CSS and responsive card behavior, added a shared month qdisplay, and moved
the opening into a dated event directory.

## Reason

The project is intended to begin close to Dynamic SPD in presentation,
interaction conventions, implementation boundaries, and repository
organization. The default Dendry output looked related but omitted the dynamic
mod's most recognizable UI refinements.

## Dynamic SPD comparison

- **Reference paths:** `out/html/game.css`, `out/html/game.js`,
  `out/html/index.html`, `source/qdisplays/month.qdisplay.dry`,
  `source/scenes/status.scene.dry`, `source/scenes/main.scene.dry`, and the
  domain directories under `source/scenes/`.
- **What Dynamic SPD does:** customizes generated browser files in place; uses
  a warm paper palette, red interaction feedback, Minion/Georgia typography,
  fixed sidebars, tabbed live status content, image and display settings,
  responsive card sizing, qdisplays, and domain-oriented scene folders.
- **Decision here:** retained the visual system, responsive card shell, header
  controls, live tabbed status pattern, month qdisplay, and scene-domain
  organization. Adapted labels and tabs to the Iran state that actually exists.
  Omitted SPD's music, mod loader, D3 election graphs, and hidden scheming
  sidebar until this project has corresponding systems.
- **Divergence level:** local tooling divergence. Rather than tracking generated
  `out/html/` files as SPD does, this project keeps source-controlled browser
  files under `web/` and applies them after every Dendry build. This preserves
  the same runtime structure without making generated output authoritative.

## System fit

`scripts/build.js` now applies `web/` before copying rights-reviewed assets.
The sidebar reads `status`, `status.coalition`, or `status.relations` without
navigating away from the current scene. The header Status link uses SPD's
special-scene return convention. Historical events can now be grouped by year
under `source/scenes/events/` while retaining stable scene IDs.

The browser code adapted from Dynamic SPD is attributed under its MIT license
in `THIRD_PARTY_NOTICES.md`.

## Research and assets

No historical claim or numerical effect changed. The palace-protest source
record was updated to its new scene path. Existing image provenance and rights
records remain unchanged.

## Validation

`npm test` builds the overlaid browser shell and passes the monthly-loop,
research-source, and UI-sync suites. The UI suite verifies byte-for-byte overlay
copying, visible controls and tabs, compiled status scenes, the qdisplay, and
the dated event path. `web/game.css` is byte-for-byte identical to the current
Dynamic SPD stylesheet. The local server successfully served the synced HTML
shell. `git diff --check` is clean.
