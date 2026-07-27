# Primer adversarial image audit

- **Date:** 2026-07-27
- **Status:** Implemented and independently cleared

## Summary

An independent adversarial reader reviewed the complete rendered primer after
the historical-image sequence was added. The review-and-correction loop ran
three times and ended only when the reviewer returned `ALL CLEAR`.

The revisions:

- correct the hero image's alt text and caption from an interior chamber to
  the exterior of the old Majles building;
- add visible credits for all three hero photographs;
- qualify the Abadan-workers and 16 August rally rights language to match the
  exact confidence recorded in the asset ledger;
- move the January 1952 Abadan workers image beside the discussion of the oil
  enclave and connect it to organized labor and mass politics;
- add intrinsic dimensions to all inline historical images and the hero
  images;
- expand the `USAF/MAAG` caption abbreviation;
- remove repeated Defense Ministry and emergency-powers exposition from the
  start of the coalition-fracture chapter;
- replace a single unexplained deputy name with the more useful description
  “allied deputies”; and
- increase the visible hero-credit text to the same size as ordinary figure
  captions; and
- remove the reader-routing aside that described the orientation sections as
  optional, allowing the primer to proceed directly from its summary into the
  geographic and institutional context.

## Reason

Historical images make claims through placement, captions, attribution, and
accessibility text even when the prose remains unchanged. The audit checked
those claims from the perspective of a politically and economically literate
reader who knows little about Iran and has no access to the repository.
Iterating to an explicit all-clear prevented the first correction pass from
becoming the endpoint by default.

## Dynamic SPD comparison

- **Reference paths:**
  `source/scenes/party_affairs/party_organizations.scene.dry`,
  `source/scenes/party_affairs/crisis_program.scene.dry`,
  `source/scenes/party_affairs/rally.scene.dry`,
  `source/scenes/government_affairs/war_guilt.scene.dry`, and
  `source/scenes/government_affairs/coalition_affairs.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** each of these political or event scenes uses one
  scene-specific `card-image` or `face-image`, keeping the historical visual
  attached to the moment it represents. Its root scene also presents a direct
  start path rather than explaining which introductory material a reader may
  skip.
- **Decision here:** retain the same content-to-image discipline. The Abadan
  image was moved because its former adjacency implied a connection to a later
  economic program that the photograph did not depict. The primer continues
  to diverge in presenting images as captioned inline figures, appropriate to
  a long-form reading surface. Follow the root scene's directness by removing
  the optional-orientation aside; the contents navigation still permits
  readers to move nonlinearly without editorial instructions in the prose.
- **Divergence level:** presentation and editorial structure only. No change
  affects game state, the turn loop, event routing, deck semantics,
  persistence, or the runtime architecture.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the narrative source and
`web/timeline.html` the page shell. `scripts/build-timeline.js` now associates
each permitted historical image with its intrinsic dimensions, so both
integrated and standalone outputs reserve the correct layout space before
lazy-loaded files arrive. `web/timeline.css` keeps the shared historical
figure treatment and adds readable hero-credit typography.

Regression coverage verifies the corrected alt text, visible credits, rights
qualifications, expanded institutional name, image dimensions, revised
coalition wording, and standalone asset output.

## Research and assets

No asset files were altered and no new historical claim sources were introduced.
`docs/research/ASSETS.md` remains the rights authority. The reader-facing
captions were narrowed to match it:

- the Abadan photograph is described as public domain in Iran according to
  its Wikimedia Commons record; and
- the 16 August rally photograph reports Commons' US-government
  public-domain identification without presenting the unresolved federal
  provenance as independently confirmed.

The visible hero credits use the attribution strings and qualifications
already recorded in the ledger.

## Validation

- Rebuilt the integrated and standalone primer after each correction round.
- Ran the complete automated test suite after each implementation pass.
- Checked `git diff --check`.
- Conducted three independent rendered-page audits. The first found five
  actionable issues, the second found three low-level polish issues, and the
  third returned `ALL CLEAR`.
