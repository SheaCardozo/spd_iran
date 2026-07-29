# Recent source-documentation reconciliation

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Reconciled the research documentation affected by the recent parallel source
intakes. The pass synchronizes the current availability, bibliography,
unavailable-source, source-audit, acquisition, crisis-evidence, and research
navigation records, together with the timeline and economic source maps, for
the Harvard oral histories, Iranian cabinet and oil documents, ethnopolitics
books, participant accounts, U.S. Consulate Tabriz reports, and the Ketabnak
substitute-evidence map. The standalone-primer citation renderer now resolves
the two newly cited regional monographs to reader-facing author/title labels
rather than exposing archive IDs.

The process layer was reconciled at the same time: every dated entry remains
indexed once, the index is chronological, recent entry statuses follow the
changelog template, Dynamic SPD paths are repository-relative, and a
regression now protects chronological index ordering. This entry consolidates
those cross-cutting corrections rather than creating a second source intake.

## Reason

Several source families were acquired, classified, and discussed in parallel.
Each workstream was internally useful, but their results needed one final pass
through every current registry and synthesis so that resolved acquisitions did
not remain described as wholly unavailable, partial carriers did not become
complete sources by implication, and source-specific limitations remained
consistent across documents.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/credits.scene.dry`,
  `HISTORICAL_ANALYSIS.md`, and `changes.txt`.
- **What Dynamic SPD does:** the reference project provides a readable
  bibliography and broad historical-design discussion, with some source notes
  retained in a running changes file. It does not maintain an ignored source
  archive, checksum catalog, live acquisition queue, claim-specific
  substitution map, or automated cross-registry documentation checks.
- **Decision here:** retain the readable source trail while continuing the
  established Iran-specific research-infrastructure divergence. Availability,
  scholarly or participant standing, residual gaps, and claim support remain
  separate but cross-referenced records.
- **Divergence level:** local research and documentation infrastructure only.
  No turn loop, shared state, event routing, deck semantics, action economy,
  persistence, or browser runtime changed.

## System fit

The available-source catalog remains the authority for local carriers, the
bibliography for expertise and evidentiary limits, and the unavailable list
for residual gaps. Research audits and acquisition notes now summarize those
registries without silently overriding them. The synchronized records give
future event and mechanic work a consistent route from a historical question
to an accessible carrier, exact locator, limitation, and remaining
acquisition request.

No OCR queue, derivative, processing script, or source binary was changed by
this reconciliation; OCR work remains a separate concurrent workstream.

## Research and assets

This pass changes source status, locators, and documentation; it does not add
a new event or historical interpretation. It covers the recently introduced
archive range `SUP-061`–`SUP-082` and `MAJ-S19`–`MAJ-S21`, while preserving
important boundaries:

- oral histories and memoirs are participant testimony, not independent proof
  of private motives or other actors' conduct;
- cabinet fragments and foreign summaries do not constitute continuous
  Iranian institutional series;
- incomplete and access-controlled books retain exact residual requests even
  where claim-specific substitutes are adequate; and
- ethnopolitics scholarship supports differentiated networks and provincial
  pressures, not automatic unitary ethnic blocs.

No historical image or asset-rights record changed.

## Validation

- Confirmed that every dated changelog entry is indexed exactly once and that
  all recent entries contain the required sections.
- Confirmed that the Dynamic SPD paths named by the recent research entries
  exist in the reference checkout.
- Added a documentation-integrity regression for chronological changelog
  ordering.
- `npm test` rebuilt both browser outputs and passed all five test files,
  including documentation integrity, source hashes, timeline source mappings,
  and the OCR-tooling tests.
- `git diff --check` passed after the parallel workstreams settled.
- The separate OCR workstream remains responsible for synchronizing newly
  completed derivative metadata; this reconciliation did not edit its queue,
  scripts, derivatives, or processing records.
