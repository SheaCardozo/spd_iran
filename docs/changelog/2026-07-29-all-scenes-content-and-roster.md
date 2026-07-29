# Game-wide scene content and adviser-roster rewrite

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Extended [`SCENE_CONTENT_STANDARD.md`](../SCENE_CONTENT_STANDARD.md) from the
historical event spine to every player-facing surface. Rewrote all twelve
recurring action cards and all six adviser cards with operational setup,
qualitative choice previews, and consequence text that remains visible until
acknowledged. Expanded the monthly hand, title and about pages, status panels,
Research Library, and campaign ending so they explain their data, evidence
boundaries, and navigation.

Replaced the three preset adviser slates with a six-person add/remove manager.
Any three of the six researched figures may now be pinned, including rosters
without Mossadegh. A change still consumes the normal monthly action and has a
six-month roster cooldown; substantive consultations retain their separate
shared six-month cooldown.

The Research Library now returns to the scene that opened it, prints the
Gass–Golshayan, March nationalization-principle, and player-minimum term
records, and no longer describes removed seeded variation. The historical
primer has a visible route back to the campaign. The ending interprets all
four outcomes and turns structure, election, credential, oil, Razmara,
adviser, and Crown state into a causal recap.

## Reason

The completed historical spine exposed that the rest of the game still read
like a prototype state-update interface. Recurring choices often had only a
heading, advisers were attached to unexplained bonuses, results routed away
before the player could read them, and the ending printed variables without
interpreting the run. The preset roster also contradicted the promised
three-from-six selection and unnecessarily forced one figure into every
configuration.

The broader rewrite makes the historical scenes, recurring systems, reference
surfaces, and ending feel like one authored game while preserving the
historical/counterfactual boundary.

## Dynamic SPD comparison

Paths are relative to
`/home/phroz/spd/dynamic_social_democracy`.

- `source/scenes/party_affairs/media.scene.dry`,
  `party_affairs/fundraising.scene.dry`, and
  `party_affairs/party_organizations.scene.dry` introduce an organizational
  problem, offer concrete allocations or strategies, preview important costs,
  and report the result. The Last Majles retains that sequence but applies
  effects to coalition components, constitutional institutions, and bounded
  Crown conduct rather than SPD mass-party demographics.
- `source/scenes/advisors/wels.scene.dry` and
  `advisors/stampfer.scene.dry` connect a named figure's political role to
  bounded consultations sharing one cooldown. This project retains the pinned
  card and shared cooldown, adds explicit biography/counterfactual boundaries,
  and treats Kashani as an autonomous counterpart.
- `source/scenes/party_affairs/shuffle_leadership.scene.dry` and
  `advisors/shuffle_leadership_pinned.scene.dry` manage leaders through
  individual add/remove operations rather than hard-coded slates. The new
  manager follows that responsibility boundary while enforcing exactly three
  active figures and preserving the existing monthly action.
- `source/scenes/library.scene.dry`, `status.scene.dry`,
  `game_over.scene.dry`, and `ending_slides.scene.dry` give reference and
  terminal surfaces different jobs from decision scenes. This project retains
  special-scene return behavior and conditional interpretation, while adding
  Iran-specific evidence/scenario separation and avoiding SPD's speculative
  long-range alternate histories.

This is not a major turn-loop divergence. Shared `Q`, tagged hands, one normal
action per month, cooldown ownership, `post_event`, persistence, and terminal
routing remain unchanged.

## System fit

Normal action and adviser result branches now require one acknowledgement
click; only the normal action advances time through `post_event`. The roster
manager's internal add/remove operations do not advance time repeatedly, and
confirmation writes the six active flags plus the `active_advisors` array in
one place.

Autoplay and browser helpers explicitly confirm the unchanged three-person
draft if the leadership card appears, preventing a first-choice loop. New
regressions cover setups, subtitles, visible results, genuine two- and
three-way action spaces, adviser consultation boundaries, arbitrary
three-person rosters, Library round trips, monthly briefings, printed oil
records, and causal ending content.

The independent all-scenes audit is preserved at
[`../reviews/2026-07-29-v01-all-scenes-adversarial-audit.md`](../reviews/2026-07-29-v01-all-scenes-adversarial-audit.md).

## Research and assets

Recurring simulation text is bounded by
[`../research/systems/recurring-actions.md`](../research/systems/recurring-actions.md);
monthly, status, Library, and ending claims are bounded by
[`../research/systems/information-and-ending-surfaces.md`](../research/systems/information-and-ending-surfaces.md).
The six adviser roles continue to use adjacent person records, with the
monograph controlling the general role and official proceedings used only for
exact credential acts.

The rewrite relies on `MAJ-S2`, chapter 5, especially pp. 250–267; `MAJ-S3`,
chapters 1 and 3; `MAJ-S13`, chapter 3, pp. 118–153; `MAJ-S14`, chapter 1;
official Majles sessions in `SUP-007`; and official Oil Commission records in
`SUP-059`. `SUP-006`, pp. 15–16, remains only a boundary source for the later
implementation law. No new historical claim relies on an incidental paper or
tertiary webpage.

No assets were added or changed. Semantic political coloring uses the existing
classes and palette; no new color interpretation was introduced.

## Validation

- Dendry compile and local hot-reload build: passed.
- Engine and data regressions, including eighteen-action autoplay and a
  roster without Mossadegh: passed.
- Full `npm test`: seven of seven suites passed.
- Chromium and Firefox Playwright suite at 1440, 768, and 390 pixels: twelve
  of twelve tests passed, including full playthroughs and Library return from
  the ending.
- `git diff --check`: passed.
- Independent game-wide adversarial review: 94 of 94 player-facing compiled
  scenes passed after the seven information-layer corrections.
