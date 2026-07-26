# Project process controls

- **Date:** 2026-07-25
- **Status:** Implemented

## Summary

Added the mandatory Dynamic SPD comparison gate, this dated change-record
system, a complete audit of the design bibliography, and an acquisition queue
for respected sources that are not currently accessible. The long-term design
document now routes technical proposals and bibliography entries through those
maintained gates.

## Reason

The project needs durable checks against accidental architectural drift and
against treating promising citations as evidence before the relevant text has
actually been reviewed.

## Dynamic SPD comparison

- **Reference paths:** the comparison map in `docs/IMPLEMENTATION.md`, covering
  `source/scenes/root.scene.dry`, `main.scene.dry`,
  `post_event.scene.dry`, `status.scene.dry`,
  `party_affairs/media.scene.dry`, `credits_images.txt`, and `out/html/img/`.
- **What Dynamic SPD does:** provides the working architectural baseline whose
  responsibility boundaries can be inspected system by system.
- **Decision here:** made that inspection an explicit pre-implementation gate
  while allowing planned divergences for Iran-specific needs.
- **Divergence level:** process-only; no runtime behavior changed.

## System fit

Each future change now joins architecture, rationale, research implications,
and validation in one dated record. Major divergences must be planned before
they can reshape dependent systems.

## Research and assets

`docs/research/SOURCE_AUDIT.md` classifies every source family currently listed
in the design document. `docs/research/UNAVAILABLE_SOURCES.md` distinguishes
scholarly priority from actual access, so inaccessible books cannot silently
support implemented claims.

## Validation

Checked the control language against the current implementation map and
cross-referenced every `P`, `S`, and `R` bibliography identifier in
`docs/GAME_DESIGN.md`.
