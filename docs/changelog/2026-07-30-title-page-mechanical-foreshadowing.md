# Title-page mechanical foreshadowing

- **Date:** 2026-07-30
- **Status:** Implemented

## Summary

Removed the title-page statement that nationalization is not assured and that
the player's decisions determine passage and organizational survival.

## Reason

The paragraph described terminal mechanics before the campaign began. The
opening should establish the historical situation and player viewpoint; the
possibility of failure should emerge from parliamentary conflict in play.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/root.scene.dry`.
- **What Dynamic SPD does:** its first menu is sparse, while later mode
  selection pages explain campaign modes and rules explicitly.
- **Decision here:** retain the sparse title-menu approach and reject
  outcome-rule exposition on that surface.
- **Divergence level:** local.

## System fit

This is a prose-only change. Nationalization remains contingent, both chamber
resolvers remain unchanged, and all terminal routes continue to operate.

## Research and assets

None. The removed passage was a mechanical statement, not a historical claim.

## Validation

- Rebuilt `out/html`.
- Confirmed the removed language is absent from source and compiled output.
- `git diff --check`: clean.
