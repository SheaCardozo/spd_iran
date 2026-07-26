# Research registry and historical assets

- **Date:** 2026-07-25
- **Status:** Implemented

## Summary

Added the running bibliography, the asset-rights ledger, three period images,
an asset-copy build wrapper, and an initial use of the 1940s Majles photograph
on the electoral card. Tightened the palace-protest record to mark its current
source base as provisional.

## Reason

Historical source traceability and asset rights must be built into the content
pipeline before a large event and image library accumulates.

## Dynamic SPD comparison

- **Reference paths:** `credits_images.txt`, `out/html/img/`, and the image
  fields used by scenes.
- **What Dynamic SPD does:** associates images with scenes, packages browser
  assets, and maintains a central image-credit list.
- **Decision here:** retained scene-linked imagery and packaged assets, but
  expanded the credit list into a per-file provenance and rights ledger. A
  build wrapper copies source assets into generated output rather than treating
  generated files as the authoritative originals.
- **Divergence level:** local build and documentation adaptation.

## System fit

The source registry now separates works used for claims from works awaiting
locators. The asset ledger makes provenance review a prerequisite for use.
Future event records can link directly to both registries.

## Research and assets

The exact sources, expertise notes, rights rationales, attribution text, and
file hashes are recorded in `docs/research/BIBLIOGRAPHY.md` and
`docs/research/ASSETS.md`.

## Validation

All downloaded images were visually inspected. The build copied them to
`out/html/img/`, and the smoke test verified the referenced file exists.
