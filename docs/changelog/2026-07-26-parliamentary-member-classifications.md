# Parliamentary member classifications

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Constructed source-graded individual political classifications across all
three crisis-era chamber baselines:

- twenty-two of the Sixteenth Majles's 131 returned places (out of 136
  authorized places);
- fifty-two of the Seventeenth Majles's eighty returned people; and
- twenty-seven of the First Senate's sixty places.

Every remaining roster entry is explicitly unresolved. The classification
model separates declared organization, political or constitutional tendency,
institutional allegiance, dated caucus, and observed behavior. The work also
corrected the Sixteenth roster's misreading of Abol-Qasem Amini, added a late
Sixteenth anti-government network, identified six late National Movement
deputies from a contemporary photograph caption, and added named
Seventeenth-Majles caucus and Committee-of-Eight-report positions.

A final cross-workstream audit reconciled three presentation discrepancies:
the Sixteenth's 131 is now consistently described as an eventual-return
denominator rather than its opening credential count; the post–Thirty Tir
figures distinguish 64 votes cast from 76 deputies seated; and Abrahamian
page locators are explicitly tied to the source-page anchors embedded in the
EPUBs rather than to generated-PDF pagination.

## Reason

The existing chamber aggregates could describe a royalist majority, roughly
thirty initial National Front associates, or a conservative Senate. They
could not safely assign those totals to individual members. A single
“ideology” field would also have confused political background with a dated
caucus, and either with conduct on one bill. These ledgers create the
member-level evidence needed for later parliamentary mechanics while
preserving unknowns.

## Dynamic SPD comparison

- **Reference paths:**
  `source/scenes/election_algorithm.scene.dry` and
  `source/scenes/library.scene.dry`, section `@government`, in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** the election algorithm turns explicit national
  party support into normalized vote and seat shares. The library explains
  government formation through concise party and institutional categories.
- **Decision here:** retain legible political categories and player-facing
  parliamentary arithmetic. Adapt the underlying model to individually
  returned candidates and independent, dated classification dimensions.
  Reject a fixed party-seat assignment where the sources establish only a
  background, temporary caucus, observer estimate, or issue-specific act.
- **Divergence level:** research-data implementation within the
  constituency/member divergence already planned in `docs/IMPLEMENTATION.md`;
  no core loop, state-owner, routing, persistence, or runtime change.

## System fit

`SIXTEENTH_MAJLES_LEDGER.md` remains the full lower-house return and credential
authority. `PARLIAMENTARY_CONTROL.md` now supplies the complete Seventeenth and
Senate classification tables and the common five-dimensional schema.
`CRISIS_EVIDENCE_AUDIT.md` defines what the resulting records may support in a
simulation, while `TIMELINE_PRIMER.md` explains representative memberships and
crossovers without reducing them to a modern party chart.

Future game data should preserve each dimension and locator separately. An
unresolved value is valid data and must not be filled from title, occupation,
constituency, appointment route, or a surname.

## Research and assets

- `MAJ-S1`, pp. 265–67: named late-Sixteenth opposition, British contacts,
  and Hekmat/Taheri tactical crossover; pp. 318–20: Salvation of the Movement
  and named opposition to the Committee of Eight report.
- `MAJ-S2`, pp. 179–80, 198, 201, 250–80: political biographies, Sixteenth
  groupings, National Front eight, and initial Seventeenth coalition.
- `MAJ-S3`, pp. 8–9 and 89–117: Senate profiles and Seventeenth caucus,
  fracture, and quorum evidence.
- `MAJ-S5`, p. 258: Matin-Daftari and Morteza-Qoli Bayat as Senate
  representatives on the October 1951 UN delegation.
- `SUP-031`, *Bakhtar-e Emruz*, no. 1174, 18 August 1953, p. 1: photograph
  caption naming six deputies leaving a National Movement meeting.
- `SUP-051` through `SUP-053`: official retrospective rosters.
- FRUS Iran docs. 67, 192, 193, 233, and 239: dated observer estimates and
  parliamentary operational arithmetic.

The partisan newspaper caption is used only as a dated organizational record,
not as authority for its surrounding political claims. No historical asset
was added or changed.

## Validation

- Re-read the cited book pages and the locally archived newspaper caption.
- Checked every chamber table for an explicit classification or unresolved
  state and reconciled the coverage totals.
- Cross-checked every repeated chamber denominator and post–Thirty Tir vote
  total across the member ledger, control reconstruction, crisis audit, and
  timeline primer.
- Inspected the canonical Abrahamian EPUBs and confirmed embedded source-page
  anchors for the parliamentary ranges cited in the research documents.
- Rebuilt the standalone primer and checked that internal archive identifiers
  do not leak into the generated public page.
- Ran the project tests and `git diff --check`.
