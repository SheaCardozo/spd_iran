# Chaqueri partial documentary-corpus acquisition

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Archived and cataloged a partial copy of Cosroe Chaqueri's documentary history
of the Iranian left: searchable 2025 retypesettings of volumes 1–6 and legacy
image scans of volumes 3, 8, 19, and 20. Recorded Movahed volume I as still
unavailable after an edition-specific search.

## Reason

The user identified both works as priority gaps. Chaqueri's full 23-volume set
was not located, but the recovered volumes materially improve access to
Iranian-left primary documents. The new typesettings require explicit
provenance warnings because they are not facsimiles.

## Dynamic SPD comparison

- **Reference paths:** repository-wide review of
  `/home/phroz/spd/dynamic_social_democracy`
- **What Dynamic SPD does:** it has no historical-source archive, source
  catalog, edition registry, or claim-level citation gate.
- **Decision here:** keep the Dynamic SPD-derived application and runtime
  structure unchanged; extend only this project's separate research system.
- **Divergence level:** local.

## System fit

`SUP-011` now cross-references the available-source catalog, bibliography,
source audit, and remaining acquisition queue. The ignored source directory
contains the files and detailed checksums. No event, mechanic, UI, or runtime
state changed.

## Research and assets

Chaqueri's editorial corpus is treated as a route to interested primary
documents, not a neutral narrative. The 2025 release is a
movement-affiliated, textually normalized intermediary edition; consequential
wording must be checked against facsimiles. The full set, especially volumes
12 and 17, remains wanted. No visual assets changed.

## Validation

- Verified all ten PDFs as readable files and recorded page counts and
  SHA-256 hashes.
- Visually checked representative title pages in the legacy scans.
- Confirmed the 2025 PDFs expose searchable Persian text, with font-decoding
  warnings documented.
- Added archive-integrity tests for all ten local files.
- Re-ran the full project test suite and repository diff checks.
