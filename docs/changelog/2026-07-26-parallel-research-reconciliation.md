# Parallel research-workstream reconciliation

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Audited the shared result of seven concurrent research workstreams: First
Senate proceedings, JSTOR intake, economic-history reconstruction, World Bank
mediation files, Mossadegh court records, broad newspaper acquisition, and the
focused *Shahed* search. Reconciled their shared catalogs, authority registry,
audit, changelog, and integrity tests without changing any archived source
file.

The reconciliation:

- corrected the economic intake count from seven to eight files;
- added the omitted `E2a` and `E14`–`E23` expertise, standing, limitations,
  and access records to `BIBLIOGRAPHY.md`;
- linked those economic records back from the unavailable queue and clarified
  the audit's inclusion of subrecords `E2a` and `E9a`;
- documented that `SUP-032`–`SUP-039` are intentionally unassigned because
  the economic workstream began at `SUP-040` while lower primary-source IDs
  were being allocated concurrently;
- restored archive-ID order for `SUP-011` and the new newspaper records in the
  bibliography, and moved `SUP-048` into order in the available-source
  catalog; and
- replaced a stale Senate-workstream validation note with the integrated
  outcome after the concurrent `SUP-009` checksum fixture landed.

## Reason

Each workstream was internally coherent, but several recorded the state of
shared files at different moments. That left one obsolete failure report, one
miscount, an unexplained archive-ID gap, and an authority-registry scope claim
that was broader than the actual bibliography. These are exactly the kinds of
cross-thread discrepancies that can later produce duplicate archive IDs or
make an unavailable lead appear to have passed a trust review when it has not.

## Dynamic SPD comparison

- **Reference path:** Dynamic SPD's `source/scenes/credits.scene.dry`.
- **What Dynamic SPD does:** maintains a single human-readable bibliography
  for the historical material surfaced in the game.
- **Decision here:** retain that concept of one coherent source record, while
  preserving the Iran project's established additional layers for local-copy
  availability, acquisition status, expertise, provenance, claim locators, and
  checksums. This reconciliation changes research metadata and validation
  only; it does not alter scenes, event routing, shared state, persistence, or
  the browser build.
- **Divergence:** the layered registry remains an intentional research-rigor
  extension, not a new runtime architecture.

## System fit

`BIBLIOGRAPHY.md` is again coextensive with the economic source-family scope
claimed by `SOURCE_AUDIT.md`; `AVAILABLE_SOURCES.md` remains the authority for
local holdings; and `UNAVAILABLE_SOURCES.md` remains the acquisition queue.
The new test protects those boundaries and the intentionally vacant archive-ID
range from another partial cross-thread update.

## Research and asset implications

No source was promoted from unavailable to available, no substantive
historical claim was approved, and no asset-rights status changed. The
provisional Senate emergency-powers count remains **26–4**, attributed to
contemporary wire-service reporting and explicitly awaiting the official First
Senate session 192 record. The Majles record still supplies only an unnumbered
standing majority.

## Validation

- Checked all changed research Markdown links for existing local targets.
- Checked explicit catalog anchors for duplicates.
- Recomputed newspaper collection counts and manifest checks through the
  research-source suite.
- Ran the complete project test suite.
- Ran `git diff --check`.
