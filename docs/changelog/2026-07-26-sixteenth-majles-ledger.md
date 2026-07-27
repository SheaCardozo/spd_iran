# Sixteenth-Majles member and credential ledger

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Added a complete 136-place Sixteenth-Majles constituency ledger and joined it
to the official proceedings:

- 131 completed returns and the five differently unfilled places;
- the Shadlu replacement, deaths, office-related vacancies, and duplicate
  Baghai return;
- all temporary and permanent presiding-board members;
- the 98-person initial credential block plus 23 later members assigned to
  verified admission waves, narrowing the unmapped later group to ten; the
  98-name row-by-row crosswalk remains explicit follow-up work;
- the eight-member National Front return cohort and only those additional
  tendencies supported by specialist scholarship; and
- dated standing-vote treatment of nationalization and its implementation.

The public primer and crisis audit now use the same return/credential/
attendance/vote distinction. Sepehr Zabih's *The Communist Movement in Iran*
was added as `MAJ-S15`, and a byte-identical duplicate of the already archived
Movahed volume was identified without creating a second catalog entry.

## Reason

The previous Sixteenth-Majles account was a four-group aggregate. It could
explain the National Front's weakness but not who represented each
constituency, when a return became a usable seat, how late the Tehran
credentials arrived, or why unanimous oil votes did not imply a party
realignment. This is the historical-data prerequisite for constituency and
parliament mechanics.

## Dynamic SPD comparison

- **Reference paths:**
  `source/scenes/election_algorithm.scene.dry` and
  `source/scenes/library.scene.dry`, section `@government`, in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** its election algorithm normalizes support into
  precise national party vote and seat shares. Its library gives players a
  concise institutional explanation of the Reichstag, government formation,
  confidence, and presidential power.
- **Decision here:** retain the concise institutional framing and the demand
  for legible political arithmetic. Adapt the underlying data to
  constituency returns, credentials, seat usability, dated tendencies,
  attendance, and question-specific votes. Reject a normalized fixed
  party-seat distribution because the Sixteenth-Majles evidence shows those
  layers changing independently.
- **Divergence status:** this implements research data and documentation
  inside the constituency/member divergence already planned in
  `docs/IMPLEMENTATION.md`; it does not change the turn loop, state owner,
  event routing, or runtime.

## System fit

`docs/research/SIXTEENTH_MAJLES_LEDGER.md` is the member-level authority.
`PARLIAMENTARY_CONTROL.md` remains the comparative control analysis,
`CRISIS_EVIDENCE_AUDIT.md` states what can safely become mechanics, and
`TIMELINE_PRIMER.md` presents the result to a reader. Future member data can
use the ledger's separate fields without treating an elite social category,
official role, or oil vote as a permanent faction.

## Research and assets

- `SUP-051`, official 1977 parliamentary roster, pp. 1–11: all places,
  returns, vacancies, replacements, and boards.
- `SUP-007`, Sixteenth-Majles sessions 2, 3, 5, 6, 7, 8, 25, 30, and 69:
  credential waves; sessions 128 and 141: nationalization and implementation
  standing votes.
- `MAJ-S2`, pp. 250–67: social profile, broad alignments, and National Front
  eight.
- `MAJ-S3`, chapter 3: parliamentary control and government formation.
- `MAJ-S15`, pp. 161–75: the Tudeh ban, underground organization, and the
  National Front's formation in the legal political field.

The Mashruteh transcription was used only as discovery and checked against
the locally archived official page scans. It is not promoted to claim
authority. No asset was added or changed.

## Validation

- Compared all roster rows and board notes with the eleven-page official
  roster.
- Read the relevant credential headings and decisions in the archived
  official session scans; distinguished the aggregate session-2 block from
  the 23 later members already crosswalked by name.
- Checked the final voting language for sessions 128 and 141: all present
  rose, but neither record prints a numerical tally.
- Rebuilt both timeline outputs and ran the project test suite.
- Ran `git diff --check` and link/count consistency checks.
