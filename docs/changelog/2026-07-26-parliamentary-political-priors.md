# Parliamentary political priors

- **Date:** 2026-07-26
- **Status:** Designed

## Summary

Added a source-safe political “vibe” model for every unresolved member of the
Sixteenth Majles, Seventeenth Majles, and First Senate. The model supplies
weak, phase-specific defaults inherited from chamber composition and, for the
Senate, appointment route. It keeps these heuristics separate from documented
party, caucus, allegiance, attendance, and vote records.

The model distinguishes four information states: documented, reported,
heuristic, and unresolved. It also separates political milieu,
constitutional tendency, relationship to the government, issue behavior,
organization, and dated caucus instead of reducing a member to one left–right
or loyalty score.

## Reason

Complete rosters exist, but defensible individual political classifications
do not. Leaving every unknown member politically blank would make future
parliamentary play unreadable; assigning the chamber's aggregate majority to
each unknown member would fabricate history. An explicitly inherited prior
provides useful expectations without converting aggregate evidence into
personal fact.

## Dynamic SPD comparison

- **Reference paths:**
  `source/qdisplays/loyalty.qdisplay.dry`,
  `source/qdisplays/confidence.qdisplay.dry`,
  `source/qdisplays/strength.qdisplay.dry`, and
  `source/scenes/election_algorithm.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** maps hidden continuous scores to qualitative
  phrases such as “divided,” “mostly loyal,” and “uncertain,” while its
  election algorithm calculates exact national party support and seat shares.
- **Decision here:** retain readable qualitative phrases. Add an explicit
  evidence state, date, and scope, and use question-specific priors for oil,
  confidence, constitutional power, and quorum. Reject a single permanent
  loyalty value and exact unsupported probabilities.
- **Divergence level:** planned member-data and presentation behavior inside
  the constituency/member divergence already recorded in
  `docs/IMPLEMENTATION.md`. No runtime or state architecture changed.

## System fit

`docs/research/PARLIAMENTARY_VIBE_MODEL.md` defines the inheritance and
precedence rules. The member ledgers remain historical authorities and link to
the model only for unresolved rows. `docs/IMPLEMENTATION.md` now requires an
`inherited_prior` structure that cannot populate historical-evidence fields.
The crisis audit records the same boundary for future mechanics.

## Research and assets

The defaults use no new individual claims. They are calibrated to the
aggregate chamber evidence already cited in `PARLIAMENTARY_CONTROL.md`,
principally Azimi, Abrahamian, official parliamentary rosters and proceedings,
and dated FRUS estimates. No source status or historical asset changed.

## Validation

- Checked every default against the aggregate chamber and phase summaries.
- Confirmed that each heuristic phrase contains uncertainty language and that
  the model forbids promotion into a factual member field.
- Reconciled the implementation plan's member-field terminology with the
  canonical schema in `PARLIAMENTARY_CONTROL.md`, including dated tendency,
  alignment, caucus, evidence, and inherited-prior layers.
- Corrected the validation route so the member ledgers and their source
  locators control implementation data, while the timeline primer is checked
  only as a public summary rather than treated as a data authority.
- Compared the data and display rules with Dynamic SPD's qualitative displays
  and election algorithm.
- Ran Markdown consistency checks, the build, and the test suite.
