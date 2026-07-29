# Abadan orientation map

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

The standalone primer now includes a contemporary geographic orientation map
under “Iran around 1950.” It uses the British War Office's 1950 third edition
of *Persia and Afghanistan*, cropped to Iran and its immediate neighbors. A
separate modern locator marks Abadan in the far southwest beside Iraq and the
head of the Persian Gulf. The marker remains an HTML/CSS overlay, leaving the
historical map pixels unchanged apart from cropping and resampling.

The timeline renderer now supports a constrained local-image figure syntax,
copies the map into both timeline builds, and supplies responsive figure,
caption, and locator styling. The local server now returns JPEG assets with
the correct `image/jpeg` content type.

## Reason

The primer repeatedly contrasts political power in Tehran with the oil
industry at Abadan, but prose alone did not give readers unfamiliar with Iran
an immediate sense of the distance or of Abadan's position on the Iraqi
frontier and Gulf shipping route. A period map supplies that orientation
without importing present-day boundaries or visual conventions into a
1951–53 narrative.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/root.scene.dry`,
  `source/scenes/events/election_1928.scene.dry`,
  `source/scenes/events/local_election_france.scene.dry`, and
  `source/scenes/credits.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** maps such as `img/map_2.jpg` and
  `img/france_map.jpg` appear as scene backgrounds, while detailed
  provenance and rights information is collected in the credits scene.
- **Decision here:** retain the use of cartography as fast political
  orientation and the separate rights record. Adapt the presentation to an
  inline figure because a background would make labels harder to read and
  would not remain adjacent to the primer's geographic explanation.
- **Divergence level:** local presentation only. Game state, event routing,
  persistence, build/runtime model, and action economy are unchanged.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the content source. The constrained
image syntax accepts only local image paths and emits an accessible figure.
`scripts/build-timeline.js` copies the same derivative into the integrated and
standalone timeline outputs. The CSS locator scales with the image and the
caption explains both the historical sheet and the modern overlay.
`scripts/serve.js` explicitly serves `.jpg` and `.jpeg` files as images.

## Research and assets

The source is *Persia and Afghanistan*, Great Britain War Office,
Geographical Section, General Staff, map no. 2149, third edition (1950). The
National Library of Australia supplies the underlying scan; Wikimedia Commons
supplies the reusable preview and records the expired Crown-copyright
rationale. The creator, edition history, source chain, rights statement,
attribution, modification history, checksum, and intended use are recorded in
`docs/research/ASSETS.md`.

No historical argument is inferred from the map beyond the named locations
and their geographic relationship. The map's own warning that international
boundaries are not authoritative remains visible in the crop.

## Validation

- Visually inspected the full 1950 sheet and final crop.
- Confirmed that Abadan, Tehran, the Persian Gulf, Iraq, and Iran's national
  outline remain visible.
- Rebuilt the integrated and standalone primer outputs.
- Added regressions for the accessible figure, Abadan locator, asset copy, and
  map caption.
- Ran the complete test suite and `git diff --check`.
