# Research documentation map

This directory separates historical evidence, access state, source evaluation,
claim-level research, and acquisition work. The separation is intentional:
“we own a file,” “the author is trustworthy,” and “this exact claim is
supported” are different statements.

## Canonical registries

| Record | Controls | Does not control |
| --- | --- | --- |
| [`BIBLIOGRAPHY.md`](BIBLIOGRAPHY.md) | Author expertise, scholarly standing, evidentiary role, interpretive limits, and project use | Whether a local copy exists |
| [`AVAILABLE_SOURCES.md`](AVAILABLE_SOURCES.md) | Local archive IDs, editions, carriers, checksums, file quality, and review state | Whether every claim in a source is reliable |
| [`UNAVAILABLE_SOURCES.md`](UNAVAILABLE_SOURCES.md) | Active residual evidence gaps and the exact unavailable material that would close them | Resolved acquisitions or general search history |
| [`ASSETS.md`](ASSETS.md) | Historical-image provenance, rights, attribution, and use status | Historical claims in prose |

When records disagree, correct all affected current registries in one change.
Dated changelog entries preserve the earlier state; resolved sources do not
remain in the active unavailable-source queue.

## Current synthesis and boundary records

| Record | Scope |
| --- | --- |
| [`SOURCE_AUDIT.md`](SOURCE_AUDIT.md) | Repository-wide source-policy and trust reconciliation |
| [`SUBSTANTIVE_SOURCE_REVIEW_2026-07-29.md`](SUBSTANTIVE_SOURCE_REVIEW_2026-07-29.md) | Claim-level reading, interpretive limits, oral-history locators, and image-checked economic-table review for `MAJ-S13`, `SUP-048`, `SUP-061`, and `SUP-057` |
| [`ONLINE_SUBSTITUTION_AUDIT_2026-07-26.md`](ONLINE_SUBSTITUTION_AUDIT_2026-07-26.md) | What accessible source bundles can and cannot replace |
| [`KETABNAK_SECOND_BEST_ALTERNATIVES_2026-07-29.md`](KETABNAK_SECOND_BEST_ALTERNATIVES_2026-07-29.md) | Claim-specific substitutes and residual gaps for the inaccessible Ketabnak books |
| [`TIMELINE_PRIMER.md`](TIMELINE_PRIMER.md) | Standalone narrative and constitutional orientation |
| [`PARLIAMENTARY_CONTROL.md`](PARLIAMENTARY_CONTROL.md) | Membership, tendencies, caucuses, attendance, and dated control |
| [`PARLIAMENTARY_VIBE_MODEL.md`](PARLIAMENTARY_VIBE_MODEL.md) | Explicitly heuristic priors for unresolved members |
| [`SIXTEENTH_MAJLES_LEDGER.md`](SIXTEENTH_MAJLES_LEDGER.md) | Constituency, return, credential, board, and decision ledger |
| [`systems/recurring-actions.md`](systems/recurring-actions.md) | Historical boundary and mechanical abstraction for recurring cards, adviser consultations, and roster changes |
| [`systems/information-and-ending-surfaces.md`](systems/information-and-ending-surfaces.md) | Claim routing and simulation boundaries for menus, briefings, status, Library, and endings |
| [`CRISIS_EVIDENCE_AUDIT.md`](CRISIS_EVIDENCE_AUDIT.md) | Thirty Tir, 19 August, payments, welfare, and control uncertainty |
| [`ECONOMIC_HISTORY.md`](ECONOMIC_HISTORY.md) | Economic questions, observation schema, and model-neutral evidence |
| [`OCR_PROCESSING.md`](OCR_PROCESSING.md) | Local OCR toolchain, queue, benchmarks, processing order, and evidentiary limits |
| [`OCR_DERIVATIVES.json`](OCR_DERIVATIVES.json) | Tracked paths, page counts, engine settings, completion times, and checksums for generated local derivatives | Whether machine text is historically accurate |
| [`economic_observations/`](economic_observations/README.md) | Image-checked structured tables with units, date bases, vintages, locators, and missing-value conventions | A seamless or model-ready national economic series |
| [`TRANSCRIPTION_PROCESSING.md`](TRANSCRIPTION_PROCESSING.md) | Reproducible, resumable Persian discovery transcription and its evidentiary boundary | An official or quotation-ready oral-history transcript |
| [`TRANSCRIPTION_DERIVATIVES.json`](TRANSCRIPTION_DERIVATIVES.json) | Tracked transcript paths, duration, model snapshot, engine version, completion time, checksums, and review status | Evidence that machine wording is accurate |

## Acquisition-search records

These files preserve exact catalog identifiers, failed routes, and request
language. Their results are summarized—without duplicating the search
history—in `UNAVAILABLE_SOURCES.md`.

- [`FIRST_SENATE_SOURCE_ACQUISITION.md`](FIRST_SENATE_SOURCE_ACQUISITION.md)
- [`SIXTEENTH_MAJLES_SOURCE_ACQUISITION.md`](SIXTEENTH_MAJLES_SOURCE_ACQUISITION.md)
- [`NEWSPAPER_SOURCE_ACQUISITION.md`](NEWSPAPER_SOURCE_ACQUISITION.md)
- [`ECONOMIC_RECORD_SEARCH_2026-07-26.md`](ECONOMIC_RECORD_SEARCH_2026-07-26.md)
- [`WORLD_BANK_MEDIATION_FILES.md`](WORLD_BANK_MEDIATION_FILES.md)
- [`IRANIAN_CABINET_RECORDS_SEARCH_2026-07-28.md`](IRANIAN_CABINET_RECORDS_SEARCH_2026-07-28.md)
- [`US_CONSULATE_TABRIZ_RECORD_SEARCH_2026-07-28.md`](US_CONSULATE_TABRIZ_RECORD_SEARCH_2026-07-28.md)
- [`PARTICIPANT_SOURCE_ACQUISITION_2026-07-28.md`](PARTICIPANT_SOURCE_ACQUISITION_2026-07-28.md)
- [`SECOND_BEST_EVIDENCE_STACKS_2026-07-29.md`](SECOND_BEST_EVIDENCE_STACKS_2026-07-29.md)

## Claim records and update rule

Implemented historical content requires an adjacent record under `events/` or
equivalent claim metadata. A synthesis or bibliography entry does not replace
a precise page, chapter, session, document, or section locator.

The playable-scene definition of done is in
[`../SCENE_CONTENT_STANDARD.md`](../SCENE_CONTENT_STANDARD.md). In particular,
the internal `major`/`supplemental` archive role is not an authority ranking:
specialist monographs normally provide interpretation, while an official
proceeding filed as supplemental can still be the strongest source for an
exact parliamentary act. Incidental papers must not displace either.

For every source intake or status change:

1. preserve and checksum the unchanged local file under the ignored
   `sources/` archive;
2. update `AVAILABLE_SOURCES.md`;
3. update the expertise and use record in `BIBLIOGRAPHY.md`;
4. remove or narrow the corresponding entry in `UNAVAILABLE_SOURCES.md`;
5. update every synthesis that depended on the former access state; and
6. add the dated change record and run documentation/source validation.
