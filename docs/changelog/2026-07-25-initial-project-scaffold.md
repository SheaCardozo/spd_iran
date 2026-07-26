# Initial project scaffold

- **Date:** 2026-07-25
- **Status:** Implemented
- **Commit:** `e855800`

## Summary

Created the DendryNexus project, its initial root scene, package metadata,
design specification, and project README.

## Reason

The repository needed a buildable base and a documented historical-simulation
scope before campaign systems could be added.

## Dynamic SPD comparison

- **Reference paths:** `package.json`, `source/info.dry`, and
  `source/scenes/root.scene.dry`.
- **What Dynamic SPD does:** uses DendryNexus, initializes one shared `Q` state
  from the root scene, and routes the player from a menu into the game.
- **Decision here:** retained the engine, source layout, root-owned state, and
  scene-routing model. Iran-specific state and text replaced SPD content.
- **Divergence level:** local content adaptation, not an architectural
  divergence.

## System fit

The scaffold establishes the state and scene conventions on which the monthly
loop, event routing, status UI, and future historical systems depend.

## Research and assets

The initial design bibliography was a research inventory rather than a
claim-level source registry. No historical image was shipped in this change.

## Validation

Dependency installation and the initial Dendry build completed successfully.
