# Election results, parliamentary alignments, and Senate color

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The historical primer now distinguishes constituency returns, credential
approval, dated alignment estimates, caucus membership, attendance, and
roll-call votes. It gives the National Front's eight-deputy result in the
Sixteenth Majles, the incomplete Seventeenth Majles return, a clearly labeled
contemporary estimate of its alignments, later caucus approximations, and
specific Majles and Senate votes. It also explains why the accessible evidence
does not support a fixed Senate party chart.

The implementation plan now records the data layers a future Iranian election
system will need. “The Senate” receives a monarchy-blue to
parliamentary-gold treatment, reflecting its constitutional division between
thirty royal appointees and thirty elected members. The highlighter now also
requires uppercase `US` for the country abbreviation, preventing ordinary
English “us” from receiving a flag treatment.

## Reason

Elections and parliamentary survival are likely to be central mechanics, but
the available Iranian numbers are not interchangeable with modern national
party results. Recording the distinctions now prevents a later interface from
turning a dated intelligence estimate or one roll call into a fictitious,
permanent party-seat distribution.

## Dynamic SPD comparison

- **Reference path:** `source/scenes/library.scene.dry`, especially the
  `@government` entry.
- **What Dynamic SPD does:** it can explain a nationwide proportional
  Reichstag election in terms of party votes and seats, then connect that
  stable party representation to government formation.
- **Decision here:** retain its rule that institutional and electoral
  machinery should be legible before it becomes a mechanic. Diverge from its
  national party-seat model because Iranian polling was staggered,
  candidate- and constituency-based, subject to credential review, and
  followed by fluid personal caucuses. The proposed member-level layers are
  recorded in `docs/IMPLEMENTATION.md` before implementation.
- **Divergence level:** planned major-mechanic divergence, not yet implemented.
  This change adds the historical and data-design guardrail; it does not alter
  the turn loop or shared state.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the canonical narrative. Its new
sections establish which numbers may later drive constituency, chamber,
attendance, and voting systems. `scripts/build-timeline.js` assigns the Senate
its own semantic class, while both browser stylesheets render the same
blue-to-gold treatment. Disabled-color mode continues to remove all gradients.

## Research and assets

The Sixteenth Majles result uses Ervand Abrahamian, *Iran Between Two
Revolutions*, chapter 5, especially pp. 250–61. The Seventeenth Majles
alignment estimate, caucuses, credential issues, speaker ballot, and the July
1952 Majles and Senate votes use Abrahamian, *Oil Crisis in Iran*, chapter 3,
especially pp. 92–117. These sources are already registered as `MAJ-S2` and
`MAJ-S3`. The prose marks the intelligence classification as a dated observer
estimate rather than an official result. No new asset was introduced.

## Validation

- Rebuilt the application, normal timeline, and standalone timeline.
- Added rendering assertions for both new sections, representative election
  figures, the Senate semantic class, and its blue-to-gold gradient.
- Ran the complete Node test suite and `git diff --check`.
