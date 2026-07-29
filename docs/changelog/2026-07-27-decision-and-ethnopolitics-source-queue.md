# Decision-making and ethnopolitics source queue

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

- Expanded the residual-evidence dashboard and unavailable-source register to
  cover Iranian cabinet decision-making, foreign-policy choice, regional
  politics, and ethnopolitics.
- Added exact, cross-referenced bibliography records for the principal
  acquisition candidates.
- Separated genuinely unavailable works from four accessible intake targets:
  the Harvard Iranian Oral History Project and focused studies of Soviet,
  American, and Turkish decision-making.
- Prioritized Iranian Council of Ministers records and Lois Beck's Qashqai
  monograph; recorded Azerbaijani and Kurdish works as conditional inputs to
  regional systems rather than prerequisites for the whole campaign.

## Reason

The current corpus can support the constitutional offices, public decisions,
main diplomatic sequence, and broad legacies of the 1946 autonomy crises. It
does not yet support high-resolution recurring advisers, private cabinet
dialogue, a detailed Soviet intervention tree, or unitary ethnic “factions.”
The revised queue states exactly which evidence would close each gap and what
the project may safely do without it.

## Dynamic SPD comparison

Dynamic SPD implements recurring advisers as named, stateful scenes with
cooldowns and political effects in:

- `source/scenes/advisors/hilferding.scene.dry`
- `source/scenes/advisors/rosenfeld.scene.dry`
- `source/scenes/advisors/stampfer.scene.dry`

It handles cabinet composition as a party- and ministry-based choice in
`source/scenes/government_affairs/shuffle_cabinet.scene.dry`, while election
results feed party strength through
`source/scenes/events/election_1928.scene.dry`.

The Iran project retains the idea that recurring political actors and
portfolio control should have persistent systemic consequences. It does not
yet copy SPD's stable party-cabinet arithmetic: Iranian ministries, court
influence, personal networks, parliamentary confidence, and coercive offices
require their own sourced decision map. This research-only change creates no
major architectural divergence.

## System fit

These records define research prerequisites for future adviser, cabinet,
foreign-actor, provincial, and ethnopolitical mechanics. They prevent a
character system from assigning stable bonuses or preferences on the strength
of generic biographies, and they preserve the distinction between a social
community, its organizations, its prominent families, and any one political
claim made in its name. No game mechanic or runtime architecture changed.

## Research and assets

The new bibliography records explain expertise, scholarly standing,
interpretive limits, access state, and planned use. Online carrier pages were
used only to establish identity and access; no unavailable text was treated as
reviewed. Existing `SUP-010` Qashqai reporting, memoirs, party records, Majles
proceedings, court records, and core scholarly books remain the safe
substitutes at lower resolution. No visual asset was added or changed.

## Validation

- Checked every new unavailable entry against its bibliography status.
- Confirmed that accessible full texts are labeled for intake rather than
  acquisition.
- Compared the proposed research roles with the relevant Dynamic SPD adviser,
  cabinet, and election patterns.
- Ran repository documentation and UI tests and `git diff --check`.
