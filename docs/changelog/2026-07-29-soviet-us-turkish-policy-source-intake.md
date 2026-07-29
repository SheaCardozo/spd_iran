# Soviet, U.S.-perception, and Turkish-policy source intake

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Archived and registered three previously identified open scholarly sources:
Vladislav Zubok on Soviet policy and intelligence, Mark Gasiorowski on U.S.
perceptions of communist threat, and Fulya Özkan on Turkish policy during the
oil crisis. They are now `SUP-083`–`SUP-085`. The active unavailable-source
queue no longer lists them as awaiting intake.

The initial review also updated the design boundary: Tudeh capacity, Soviet
policy, and U.S. threat perception are separate evidence domains, while Turkey
is a distinct neighboring actor rather than a proxy for British policy.

## Reason

These were the accessible first priorities for counterfactual foreign-policy
and Tudeh research. Intake closes an avoidable documentation gap and supplies
stronger evidence for why Soviet intervention was not automatic, why the
American decision for coup cooperation remained contingent, and how a
neighboring NATO state pursued its own interests.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/election_simulation.scene.dry`;
  `source/scenes/party_affairs/international_relations.scene.dry`;
  `README.md`.
- **What Dynamic SPD does:** the inspected baseline occasionally records a
  source URL and page in an adjacent code comment, but it has no equivalent
  archive catalog, checksum registry, trust assessment, or unavailable-source
  queue. Its international-relations content is implemented directly in scene
  prose and effects.
- **Decision here:** retain the principle of keeping evidence close to the
  mechanic it informs, but continue the Iran project's stricter separation of
  unchanged local carriers, source trust, access status, and claim-level use.
  No foreign-policy mechanic was implemented from intake alone.
- **Divergence level:** local research-process divergence; no runtime or
  architectural divergence.

## System fit

The sources refine the planned foreign-actor and Cold War systems without
choosing their runtime representation. The design now explicitly prohibits a
single communist-strength variable from standing simultaneously for Tudeh
organization, Soviet intentions, and American perceptions. Turkey can later
receive bounded diplomatic behavior if relevant to a scene.

## Research and assets

- `SUP-083`: Zubok accepted manuscript, DOI `10.1093/dh/dhz049`
- `SUP-084`: Gasiorowski author PDF, DOI `10.1162/jcws_a_00898`
- `SUP-085`: Özkan publisher PDF, DOI `10.1017/npt.2024.15`
- Updated `AVAILABLE_SOURCES.md`, `UNAVAILABLE_SOURCES.md`,
  `BIBLIOGRAPHY.md`, `SOURCE_AUDIT.md`, and `GAME_DESIGN.md`.
- No asset changes.

## Validation

- Verified author, title, publication, DOI, extent, and carrier identity
  against repository, journal, author-hosted, or publisher records.
- Computed and registered SHA-256 checksums for all three unchanged files.
- Inspected each introduction, source base, and conclusion and recorded
  bounded initial locators.
- Added checksum and sidecar assertions to the research-source test.
- Ran the complete project test suite.
