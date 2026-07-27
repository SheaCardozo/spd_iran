# Unavailable-source queue reconciliation

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Reconciled the unavailable-source queue against the local archive, available
catalog, and bibliography. The official Persian oil-law texts are now recorded
as resolved, partially acquired Persian-language and economic families are
narrowed to their actual gaps, and a ranked current-acquisition table identifies
the next high-leverage requests.

## Reason

Several acquisitions had changed the evidence position without fully changing
the broad queue language. In particular, the official Sixteenth-Majles law
volume already resolved the Persian oil-law target, while the acquired memoir,
court, party, press, ILO, IMF, UN, roster, chapter, and Oil Commission records
substantially narrowed—but did not eliminate—their source families. Leaving
the old wording in place risked duplicate acquisition and overstated blockers.

## Dynamic SPD comparison

Dynamic SPD maintains its public books and articles as a retrospective credits
list in `source/scenes/credits.scene.dry`. It does not distinguish available,
partially acquired, unavailable, and resolved sources or rank acquisition
requests.

This project retains the useful reader-facing separation of books and other
sources, but continues its planned research-process divergence: local archive
status, trust assessment, acquisition gaps, and resolution history remain
cross-referenced. The new ranking changes research triage only; it does not
alter game runtime, state, or event architecture.

## System fit

The queue now directs effort toward the First Senate record, Iranian economic
series, member-level Sixteenth-Majles alignment evidence, and unresolved crisis
records before lower-leverage duplication. It preserves partial-source limits:
an acquired proxy, roster, chapter, or selected issue does not falsely resolve
the unavailable underlying record family.

## Research and assets

No source file or historical asset was added. The reconciliation uses the
existing `MAJ-S*` and `SUP-*` archive records and makes no new historical claim.
It explicitly distinguishes `SUP-054` from `FO 371/75466`, the Senate roster
from Senate proceedings, institutional economic proxies from Iranian originals,
and `SUP-056`/`SUP-059` from the still-missing non-oil chapters of `S25`.

## Validation

- Cross-checked every active unavailable-source section against
  `AVAILABLE_SOURCES.md`, `BIBLIOGRAPHY.md`, and the ignored local archive.
- Confirmed that `E18` appears only as a resolved acquisition rather than an
  active economic target.
- Confirmed that the authoritative Persian oil-law target appears only in the
  resolved record.
- Ran the research-source and full project test suites.
