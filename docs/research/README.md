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
| [`ONLINE_SUBSTITUTION_AUDIT_2026-07-26.md`](ONLINE_SUBSTITUTION_AUDIT_2026-07-26.md) | What accessible source bundles can and cannot replace |
| [`TIMELINE_PRIMER.md`](TIMELINE_PRIMER.md) | Standalone narrative and constitutional orientation |
| [`PARLIAMENTARY_CONTROL.md`](PARLIAMENTARY_CONTROL.md) | Membership, tendencies, caucuses, attendance, and dated control |
| [`PARLIAMENTARY_VIBE_MODEL.md`](PARLIAMENTARY_VIBE_MODEL.md) | Explicitly heuristic priors for unresolved members |
| [`SIXTEENTH_MAJLES_LEDGER.md`](SIXTEENTH_MAJLES_LEDGER.md) | Constituency, return, credential, board, and decision ledger |
| [`CRISIS_EVIDENCE_AUDIT.md`](CRISIS_EVIDENCE_AUDIT.md) | Thirty Tir, 19 August, payments, welfare, and control uncertainty |
| [`ECONOMIC_HISTORY.md`](ECONOMIC_HISTORY.md) | Economic questions, observation schema, and model-neutral evidence |

## Acquisition-search records

These files preserve exact catalog identifiers, failed routes, and request
language. Their results are summarized—without duplicating the search
history—in `UNAVAILABLE_SOURCES.md`.

- [`FIRST_SENATE_SOURCE_ACQUISITION.md`](FIRST_SENATE_SOURCE_ACQUISITION.md)
- [`SIXTEENTH_MAJLES_SOURCE_ACQUISITION.md`](SIXTEENTH_MAJLES_SOURCE_ACQUISITION.md)
- [`NEWSPAPER_SOURCE_ACQUISITION.md`](NEWSPAPER_SOURCE_ACQUISITION.md)
- [`ECONOMIC_RECORD_SEARCH_2026-07-26.md`](ECONOMIC_RECORD_SEARCH_2026-07-26.md)
- [`WORLD_BANK_MEDIATION_FILES.md`](WORLD_BANK_MEDIATION_FILES.md)

## Claim records and update rule

Implemented historical content requires an adjacent record under `events/` or
equivalent claim metadata. A synthesis or bibliography entry does not replace
a precise page, chapter, session, document, or section locator.

For every source intake or status change:

1. preserve and checksum the unchanged local file under the ignored
   `sources/` archive;
2. update `AVAILABLE_SOURCES.md`;
3. update the expertise and use record in `BIBLIOGRAPHY.md`;
4. remove or narrow the corresponding entry in `UNAVAILABLE_SOURCES.md`;
5. update every synthesis that depended on the former access state; and
6. add the dated change record and run documentation/source validation.
