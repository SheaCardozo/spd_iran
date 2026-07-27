# Parliamentary membership and dated control reconstruction

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Expanded the parliamentary research from a handful of aggregate estimates
into a source-graded membership and control record for the Sixteenth Majles,
Seventeenth Majles, and First Senate.

The new record:

- separates authorized seats, constituency returns, named people, accepted
  credentials, usable members, attendance, caucus, and votes;
- transcribes the complete official Seventeenth-Majles return list and the
  First Senate's thirty appointed and thirty indirectly elected members;
- records only evidence-supported initial tendencies, leaving unresolved
  deputies unclassified;
- follows control from the National Front's eight Sixteenth-Majles deputies
  through election returns, speakership, confidence votes, 30 Tir, caucus
  fracture, quorum obstruction, and the July 1953 resignations; and
- makes disagreements among the 80-person official roster, 79 accepted
  credentials, 77 initially usable members, and inconsistent CIA arithmetic
  explicit.

The standalone primer now explains the same evidence for a political reader,
including the complete Senate roster, named tendencies, control snapshots,
and the distinction between a Westminster-style division and Iran's fluid
issue coalitions.

## Reason

The prior summary—eight National Front deputies, 79 Seventeenth-Majles
returns, and a 30/4/45 alignment estimate—was directionally sound but too
compressed. It did not explain who sat, how the Senate was composed, why the
denominators conflict, or how a government could win large confidence votes
while losing the chair or later relying on quorum denial.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/library.scene.dry`, section
  `@government`, and `source/scenes/election_algorithm.scene.dry`.
- **What Dynamic SPD does:** the library gives a compact institutional primer
  for the Reichstag, cabinet, chancellor, president, elections, confidence,
  and emergency powers. Its election algorithm then normalizes class and
  party support into precise national party votes and seats.
- **Decision here:** retain the institutional-first explanation and
  player-readable political arithmetic. Deliberately reject a fixed
  normalized party-seat chart for Iran. Iranian evidence requires separate
  records for return, credential, attendance, dated caucus or tendency, and
  each vote; the Senate additionally requires appointment route.
- **Divergence level:** local research and content divergence within the
  already planned constituency/member model in `docs/IMPLEMENTATION.md`. No
  core turn-loop, state-ownership, or runtime divergence is implemented here.

## System fit

`docs/research/PARLIAMENTARY_CONTROL.md` is now the detailed control ledger.
The crisis audit summarizes its evidentiary boundary, the implementation plan
links it as the prerequisite for future member and constituency data, and the
standalone primer presents the readable public explanation. Its source-name
renderer now recognizes all three roster IDs, so the distributed HTML uses
descriptive citations rather than repository shorthand. Future
parliamentary mechanics can add named members without first committing the
project to invented permanent factions.

## Research and assets

The principal scholarly foundation remains Ervand Abrahamian,
`MAJ-S2`, pp. 250–80, and `MAJ-S3`, pp. 79–117, with Fakhreddin Azimi for
constitutional context. Dated observer estimates come from *Foreign Relations
of the United States*, Iran, documents 67, 192, 193, 233, and 239, and are
identified as diplomatic or covert-operational categories.

Three official Majles Press roster sections were acquired from scans of the
1977 parliamentary compilation and archived locally as `SUP-051`,
`SUP-052`, and `SUP-053`. They establish names, constituencies, appointment
route, and replacements—not ideology. The still-unavailable First Senate
proceedings remain necessary for member-level attendance and divisions.

No historical asset was added or changed.

## Validation

- Verified all three archived PDF checksums and file sizes.
- Rebuilt the standalone and playable primer pages.
- Ran the complete test suite and `git diff --check`.
- Preserved the unresolved Azad constituency, Qashqai given-name/chamber,
  Bahram/Bahman Majdzadeh, Seventeenth-Majles denominator, and CIA arithmetic
  discrepancies rather than silently choosing one version.
