# Parallel parliamentary and source-workstream reconciliation

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Reconciled the shared result of five recent workstreams:

- economic institutional-record acquisition;
- Iran-first constitutional comparison and primer editing;
- individual parliamentary-member classifications;
- heuristic political priors for unresolved members; and
- Sixteenth-Majles source acquisition and online substitution.

The reconciliation corrected the shared research taxonomy, parliamentary
denominators, citation semantics, implementation schema, and validation
hierarchy without promoting unresolved historical claims.

## Reason

The workstreams edited overlapping catalogs and parliamentary documents at
different moments. Each result was locally coherent, but their combination
left an uncataloged archival file, ambiguous membership denominators, a
replacement counted inconsistently, two apparently conflicting descriptions
of the same post–Thirty Tir vote, and an implementation plan that treated a
public primer as the validation authority for member data.

These differences had to be resolved before the work could be committed as
one coherent state.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/credits.scene.dry`,
  `source/scenes/election_algorithm.scene.dry`, and
  `source/scenes/library.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** maintains a single player-facing bibliography,
  computes seats from normalized national party support, and presents
  government formation through concise party and institutional categories.
- **Decision here:** retain the coherent bibliography and readable political
  presentation, but preserve the already planned Iran-specific distinction
  among returns, credentials, dated alignment, caucus, attendance, votes, and
  heuristic priors. The research ledgers, not the public primer, control those
  records.
- **Divergence level:** reconciliation inside the documented member-data and
  research-taxonomy divergences. No turn loop, state owner, event routing,
  deck, persistence, or runtime model changed.

## System fit

- `AVAILABLE_SOURCES.md`, `UNAVAILABLE_SOURCES.md`, and `BIBLIOGRAPHY.md`
  now agree on `SUP-054` through `SUP-059`.
- `SIXTEENTH_MAJLES_LEDGER.md` and `PARLIAMENTARY_CONTROL.md` are the
  canonical membership and political-classification records.
- `PARLIAMENTARY_VIBE_MODEL.md` supplies only separately stored heuristic
  priors.
- `CRISIS_EVIDENCE_AUDIT.md` controls the wider historical-evidence boundary.
- `TIMELINE_PRIMER.md` is a public explanation checked against those records,
  not an upstream authority.
- `IMPLEMENTATION.md` now names the same member fields and evidence hierarchy
  as the research documents.

## Research and assets

The reconciliation made the following material corrections:

- cataloged orphaned British Library file `IOR/L/PS/12/1225` as `SUP-054`
  with sidecar, checksum, provenance, and trust record;
- corrected its coverage through 24 October 1949 while explicitly preserving
  that it is not `FO 371/75466` and does not contain that file's two known
  candidate-influence documents;
- recorded the Sixteenth Majles's 131 as eventual returned places, not opening
  usable membership;
- recorded the Shadlu succession as one place with two named occupants;
- reconciled Mossadegh's post–Thirty Tir result as 61 affirmative votes out of
  64 votes cast, while a contemporary report compared those same 61 votes
  with 76 deputies then seated;
- standardized individual-classification coverage at 22 of 131 returned
  Sixteenth-Majles places, 52 of 80 returned Seventeenth-Majles people, and 27
  of 60 First-Senate places; and
- verified that Abrahamian page citations use source-page anchors embedded in
  the canonical EPUBs, not generated-PDF pagination.

The existing unresolved queue remains unresolved: the complete Sixteenth
credential crosswalk, Azad and Baghai constituency details, the Seventeenth
81/80/79/77 join, the Qashqai identity discrepancy, the CIA's 79/80 arithmetic
error, complete First-Senate proceedings, and most individual allegiances.

No historical asset or asset-rights status changed.

## Validation

- Inspected all recent uncommitted workstreams and their dated change records.
- Confirmed every new changelog entry has the required sections and a valid
  Dynamic SPD comparison.
- Confirmed every cited Dynamic SPD reference path exists.
- Verified local Markdown links and catalog anchors.
- Verified all archived IDs appear in the available-source and bibliography
  catalogs, with no duplicate anchors.
- Added checksum and sidecar regression coverage for `SUP-054`–`SUP-059`,
  including the `SUP-057` and `SUP-058` collections.
- Confirmed the standalone primer contains no repository-only identifiers or
  game-only framing.
- Ran the complete build and test suite.
- Ran `git diff --check`.
