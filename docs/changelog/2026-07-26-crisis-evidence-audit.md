# Crisis evidence and parliamentary-control audit

## Summary

Added `docs/research/CRISIS_EVIDENCE_AUDIT.md`, a source-graded reconstruction
of:

- Thirty Tir and Nineteen August sequences, organizers, and casualty
  estimates;
- clerical, bazaar, press, and street finance and attribution;
- distributional welfare effects of the 1951–53 oil shock; and
- dated parliamentary alignments and effective control.

The timeline primer's uncertainty section now reports what the evidence
actually narrows rather than retaining four undifferentiated questions. The
economic-history record now distinguishes observed paid underemployment,
arrears, import compression, and uneven urban/rural exposure from forecasts
and aggregate resilience. The implementation plan points future parliamentary
and coup systems to the audit's evidence layers.

The bibliography and acquisition queue add M. Torkamān's Persian documentary
history of Thirty Tir as `S24`, with no inferred expertise or unverified use of
its reported casualty total. Existing available-source entries now record
their use in this audit.

## Reason

The prior primer correctly refused exact claims, but its uncertainty list did
not say which parts could already be reconstructed, why published numbers
differed, or what exact evidence was missing. That made it too easy for future
content to convert a forecast into an observation, combine deaths with
injuries, call an intended payment a received payment, or turn an intelligence
alignment estimate into an official party result.

## Dynamic SPD comparison

Dynamic SPD uses a normalized national party-support and seat calculation in
`source/scenes/election_algorithm.scene.dry`, backed by stable party and social
class variables. It can therefore expose exact national vote and seat
arithmetic. Its `source/qdisplays/confidence.qdisplay.dry` also demonstrates a
useful qualitative display pattern for state whose precision should not be
shown directly.

This project retains Dynamic SPD's centralized, inspectable state and the
principle that uncertainty can have a qualitative display. It rejects using
the SPD election algorithm for the Iranian parliament. Iranian evidence
requires separate constituency returns, credentials, attendance, dated
caucuses, roll calls, and quorum. Likewise, an eventual August crisis should
not reduce evidence of prepared crowds, police and army defection, and seizure
of institutions to one exact “coup progress” or “paid mob” scalar.

This is a research and design-boundary clarification, not implementation of a
major divergence. The previously planned election-system divergence remains
in `docs/IMPLEMENTATION.md`.

## System fit

- Future event records can cite the audit's source matrix while retaining
  claim-level locators.
- A parliamentary system can expose formal returns, reliable core, issue
  coalition, and quorum control separately.
- A coup-network system can distinguish attempted transfers, immediate
  recipients, intended recipients, confirmed onward payment, street
  mobilization, and military control.
- An economic model cannot infer a single national welfare index from the
  current corpus; it must either gather distributional data or expose the
  uncertainty.
- The standalone primer remains understandable without repository access; it
  summarizes findings in ordinary prose and lets the webpage builder expand
  its existing source identifiers.

## Research and assets

Principal acquired sources used:

- `MAJ-S1`, chapter 19, especially pp. 288–92;
- `MAJ-S2`, chapter 5, especially pp. 250–61;
- `MAJ-S3`, chapter 3, especially pp. 86–100 and 112–17;
- `MAJ-S4`, Mark Gasiorowski's chapter, pp. 227–80;
- `MAJ-S5`, pp. 138–288;
- `MAJ-S9`, printed pp. 188–92;
- `MAJ-S14`, chapters 5–6;
- `SUP-010`, especially documents 39, 63, 67, 152, 193, 233, 239, and
  306;
- `SUP-014`, pp. 159–75;
- `SUP-022`; and
- `SUP-023`, especially pp. 2–18 and its p. 3 welfare caveat; and
- `SUP-049`, the unexpurgated 2 September 1953 British memorandum.

The official FRUS web edition and the National Security Archive's publication
of the unexpurgated 2 September 1953 British memorandum were used as exact
document carriers and cross-checks. The unexpurgated memorandum was archived
locally with its NARA and carrier provenance. Ahmad Ashraf's Iranica article was used
only as a bibliographic map to Torkamān and its cited pages, consistent with
project policy.

No new historical asset was selected and the asset-rights ledger is
unchanged.

## Validation

- Compared the audit against the existing timeline, economic-history record,
  bibliography, and source catalogs.
- Checked FRUS documents 39, 63, 152, 239, 306, and volume X document 362 in
  the official online edition.
- Checked the National Security Archive's provenance and caveats for the
  British memorandum and CIA internal history.
- Checked Ashraf's exact Torkamān bibliography entry and the reported
  killed-and-injured category at pp. 465–66.
- Ran `git diff --check`.
- Rebuilt and tested the standalone timeline after integrating the revised
  uncertainty section.
