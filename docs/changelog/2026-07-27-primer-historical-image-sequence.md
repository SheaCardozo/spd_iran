# Primer historical image sequence

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

The historical primer now uses four additional period photographs at the
moments they depict: an Abadan workers' gathering in January 1952,
Mohammad Mossadegh with President Harry S. Truman in Washington in October
1951, the pro-Mossadegh Tehran demonstration after the failed first coup
attempt on 16 August 1953, and tanks in Ferdowsi Square during the decisive
phase on 19 August.

The timeline renderer now emits a common accessible historical-figure
component for both maps and photographs. The Abadan map retains its locator as
a map-specific modifier; the four photographs use the same frame and caption
system without acquiring map semantics. All five figures remain local assets
in the integrated and standalone builds.

## Reason

The primer had strong textual orientation but little visual evidence of the
people and physical settings involved. The new sequence gives readers four
different anchors: organized workers in the oil center, face-to-face
diplomacy, the apparent public victory after the first coup attempt, and the
military force that helped decide the second. Placing each image beside the
relevant passage keeps it explanatory rather than decorative.

## Dynamic SPD comparison

- **Reference paths:**
  `source/scenes/party_affairs/party_organizations.scene.dry`,
  `source/scenes/party_affairs/crisis_program.scene.dry`,
  `source/scenes/party_affairs/rally.scene.dry`,
  `source/scenes/government_affairs/war_guilt.scene.dry`, and
  `source/scenes/government_affairs/coalition_affairs.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** event and political scenes generally declare one
  `card-image` or `face-image` that identifies the scene's particular
  historical moment. Images are attached to content rather than assembled as
  a decorative gallery.
- **Decision here:** retain the one-image-to-one-moment relationship. Adapt it
  to a captioned inline figure because the primer is a long-form reading
  surface, while preserving a reusable component instead of adding
  image-specific markup or styling.
- **Divergence level:** presentation only. No game state, event routing, deck
  semantics, persistence, or runtime architecture changes.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the single content source.
`scripts/build-timeline.js` translates its constrained local-image syntax into
accessible lazy-loaded figures and copies every referenced asset into the
standalone bundle. `web/timeline.css` provides the shared visual treatment,
with the existing map locator remaining an explicit modifier. The integrated
and standalone pages therefore carry the same sequence without duplicate
content or presentation logic.

## Research and assets

Complete provenance, direct-file locations, rights rationales, attributions,
modification records, checksums, and intended uses are in
`docs/research/ASSETS.md`.

- The Abadan photograph was published in *Tehran Mosavvar*, no. 439,
  11 January 1952, and is approved for prototype use.
- The Truman–Mossadegh photograph is a US federal record held by the National
  Archives and Truman Library and is public domain.
- The 16 August rally photograph is approved for prototype use; its exact
  federal assignment or original catalog record remains a release-review
  condition.
- Stephen Langlie's 19 August photograph is identified to the Langlie
  collection at the Middle East Centre Archive and is public domain as a US
  Air Force official-duty photograph.

The photographs illustrate documented people, places, and dated events. They
are not used to infer crowd size, motive, command, or representativeness.
Captions are deliberately descriptive and contain no external links.

## Validation

- Confirmed the four downloaded files' formats, dimensions, and SHA-256
  checksums.
- Visually inspected each image against its catalog description.
- Rebuilt both timeline outputs and checked that every image and caption
  appears in chronological context.
- Added regressions for lazy-loaded figure markup, map specialization,
  standalone asset copying, captions, and print-safe figure layout.
- Ran the complete automated test suite and `git diff --check`.
