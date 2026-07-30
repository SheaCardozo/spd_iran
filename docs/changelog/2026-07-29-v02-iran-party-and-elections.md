# v0.2 Iran Party, progressive advisers, and place-level elections

- **Date:** 2026-07-29
- **Status:** Implemented for `0.2.0`

## Summary

The campaign now begins explicitly as the Iran Party. Karim Sanjabi, Ahmad
Zirakzadeh, and Allahyar Saleh are available as pinned party advisers from
January; Mossadegh, Fatemi, Makki, and Kashani appear only after the common
electoral cooperation becomes an organization. Adviser visibility is separate
from the shared consultation cooldown, and the pinned row states when an
adviser action is available. Maleki remains unavailable within the current
endpoint because the implemented evidence does not justify projecting his
later coalition role backward.

A Support tab now reports qualitative support among professional and
constitutional circles, bazaar merchants and artisans, wage earners, and
provincial party networks. Support changes place-level campaign influence and
may produce up to three explicitly counterfactual returns in historically
vacant Majles places without altering their evidence records.

The Parliament tab explains the place → return → credential → usable-member
pipeline and renders every current Majles place and, once it exists, every
Senate place as a keyboard-focusable semicircle diagram. Campaign and lawsuit
choices now offer additional uses for resources. Pre-formation scene and
sidebar copy no longer names the future coalition or unavailable advisers.
Save schema 4 rejects older states.

## Reason

The previous opening asked the player to manage abstract opposition circles
even though the natural institutional point of view is the Iran Party. It also
showed all later advisers and coalition categories from January, treated
election-facing public support only through broad national qualities, and
reported credential totals without making clear how a contested return became
a seat.

## Dynamic SPD comparison

Dynamic SPD:

- prints adviser-action availability immediately above `#advisor` in
  `source/scenes/main.scene.dry`;
- gives pinned adviser files figure-specific `view-if` gates under
  `source/scenes/advisors/`;
- puts constituency support in the Polls surface of
  `source/scenes/status.scene.dry` and `out/html/index.html`;
- renders the Reichstag with a semicircle in the Reichstag section of
  `source/scenes/library.scene.dry`; and
- converts demographic support to proportional seats in
  `source/scenes/election_algorithm.scene.dry`.

The Last Majles retains conditional pinned advisers, the visible
adviser-action affordance, a persistent support surface, and place marks in a
semicircle. It rejects SPD's proportional election algorithm. Iranian support
modifies individual scenario records, while historical return, credential,
route, and alignment evidence remains separate. The major status and
persistence divergence is planned in
[`IMPLEMENTATION.md`](../IMPLEMENTATION.md#v02-opposition-adviser-support-and-chamber-architecture).

SPD also spends abstract resources on demographic campaigning in
`source/scenes/party_affairs/campaigning.scene.dry` and on party organization
in `source/scenes/party_affairs/party_organizations.scene.dry`. Iran adapts
that pattern to candidate printing, travel, election filings, public
distribution, and sustained legal cases.

## System fit

The monthly action economy, Dendry deck randomization, common adviser cooldown,
`post_event` ownership, tagged event priority, historical event spine, and
March 1951 terminal route are unchanged. New support qualities are bounded and
reduced centrally. Chamber diagrams read the existing `Q.majles_places` and
`Q.senate_places` arrays directly. No parallel seat total is stored.

## Research and assets

The historical and mechanical boundary is recorded in
[`support-and-chamber-display.md`](../research/systems/support-and-chamber-display.md).
The two new Iran Party adviser records use `MAJ-S2`, chapter 5,
pp. 249–267. Parliamentary procedure continues to use the official
Sixteenth-Majles proceedings and First-Senate roster. Counterfactual meetings,
support values, numerical effects, and additional scenario returns are
identified as abstractions. No asset was added.

## Validation

Validation covers compilation, schema/version state, progressive adviser
visibility, shared cooldown behavior, bounded support, separation of
historical and scenario records, counterfactual return thresholds, all 136
Majles and 60 Senate marks, sidebar gating, scene-standard audit, historical
autoplay, browser overlay synchronization, and source integrity.

The Dendry build, deterministic engine tests, twenty-seven-action historical
autoplay, source-integrity checks, browser-overlay synchronization, and
automated 190-scene audit pass. The independent
[`v0.2 adversarial review`](../reviews/2026-07-29-v02-adversarial-review.md)
also found no blocking scene defect. `npm test` and `git diff --check` pass.
The Playwright matrix was invoked, but no browser assertion could run on this
host: Chromium lacks `libnspr4.so` and Firefox lacks `libasound.so.2`.
