# Documentation and source-registry reconciliation

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The tracked documentation was reconciled after several overlapping research
and implementation workstreams. The unavailable-source file is now an active
residual-gap register rather than a mixture of queue, resolved history, search
logs, and research notes.

The change:

- adds a research-document authority map and update order;
- moves detailed First-Senate and newspaper searches into dedicated records;
- reorganizes unavailable material by the exact claim granularity it still
  blocks and the substitute already available;
- removes resolved acquisitions from the active queue;
- updates the source audit through `MAJ-S18`, `SUP-060`, `S26`, and
  `P12`–`P17`;
- reconciles actual cited/use status for the core narrative books, official
  parliamentary rosters, British crisis memorandum, Cabinet Manual, IMF/UN
  economic bundles, and Radio Tehran article;
- restores `SUP-048` to archive-ID order;
- adds missing `SUP-043`–`SUP-045` anchors;
- removes stale “required” language for Majd and the three economic
  dissertations;
- repairs cross-references affected by the reorganization; and
- standardizes missing date/status metadata in earlier changelog entries.

## Reason

Parallel work had left individually plausible but mutually inconsistent
snapshots. In particular, one economic table still made an inaccessible
article mandatory after the substitution audit had downgraded it; the
available catalog contradicted an earlier claim that `SUP-048` had been moved
into order; current research use contradicted “review pending” for
`MAJ-S14`; and the source audit's declared scope ended before the newest
parliamentary, economic, and crisis evidence.

The old unavailable-source file also duplicated detailed search records and
retained resolved acquisitions. That made it difficult to answer the only
current implementation question that matters: what exact assertion is still
blocked if the source is never acquired?

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/modinfo.scene.dry` and
  `source/scenes/credits.scene.dry`.
- **What Dynamic SPD does:** Dynamic SPD exposes one clear “Credits and
  Sources” route and a readable bibliography grouped by source type. It does
  not separately represent local availability, trust assessment,
  claim-level use, or failed acquisition routes.
- **Decision here:** Retain the simple player-facing bibliography model while
  making the development documentation's layered responsibilities explicit.
  The new research map prevents the additional rigor layers from turning into
  competing source-of-truth files.
- **Divergence level:** Local documentation and research-governance
  divergence. No runtime, turn-loop, state, persistence, or build
  architecture changes.

## System fit

`BIBLIOGRAPHY.md` controls expertise and evidentiary role;
`AVAILABLE_SOURCES.md` controls local files and checksums;
`UNAVAILABLE_SOURCES.md` controls only active residual gaps; domain acquisition
records preserve detailed search and request routes; claim records remain the
release gate for historical content.

The new documentation-integrity test checks local Markdown paths and anchors,
changelog coverage and required sections, archive anchor coverage, and the
absence of resolved-history or obsolete mandatory language in the active
queue. Existing research-source tests now enforce the reorganized queue and
later archive-ID order.

## Research and assets

No source file or historical asset was added, removed, or modified. No
historical claim was promoted solely through this reconciliation. Existing
source status was corrected to match actual documented use:

- `MAJ-S4`, `MAJ-S6`, `MAJ-S7`, `MAJ-S9`, and `MAJ-S12` now record the
  chapters or pages already cited in the primer and evidence audits;
- `MAJ-S14` is reviewed and cited by chapter/section in the historical primer;
- `MAJ-S13` and `SUP-048` remain acquired but substantively unreviewed;
- `SUP-049` and `SUP-060` now record their evidence-mapped crisis uses;
- `SUP-050` and official rosters `SUP-051`–`SUP-053` now record their
  documented comparative and parliamentary uses;
- `SUP-057`–`SUP-058` are explicitly observation-mapped without implying
  exhaustive review; and
- inaccessible sources remain claim-specific precision gaps under the online
  substitution audit.

The three approved visual assets and their recorded SHA-256 checksums were
rechecked without change.

## Validation

- Checked every tracked Markdown local path and fragment.
- Checked changelog index coverage, required sections, dates, and statuses.
- Checked source archive-ID order and the grouped IMF anchors.
- Recomputed the three historical-asset checksums against the rights ledger.
- Ran `git diff --check`.
- Ran the research-source regression suite and complete project test suite.
