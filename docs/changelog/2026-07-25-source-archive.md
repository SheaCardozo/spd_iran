# Local historical-source archive

- **Date:** 2026-07-25
- **Status:** Implemented

## Summary

Created the ignored `docs/research/sources/major/` and
`docs/research/sources/supplemental/` archive, added a tracked catalog of locally
available source files, and cross-referenced it with the bibliography and
unavailable-source queue. Archived the currently cited Nukii article as
supplemental source `SUP-001`, with provenance, checksum, access status, and
links to the opening's claim record.

## Reason

Bibliographic metadata alone cannot show whether the project actually possesses
the evidence behind a citation. The archive makes access, exact file identity,
source quality, and claim use independently auditable.

## Dynamic SPD comparison

- **Reference paths:** `credits_images.txt` and the source-adjacent use of
  assets and text throughout `source/scenes/`.
- **What Dynamic SPD does:** maintains a central credit record for assets but
  does not provide a comparable scholarly source archive and claim-level
  historical catalog.
- **Decision here:** retained the useful pattern of central attribution while
  adding an Iran-specific research-evidence layer. This is necessary because
  historical sourcing is a release requirement for this project.
- **Divergence level:** local research-governance divergence; runtime behavior
  is unchanged.

## System fit

Every historical claim can now point from its event record to a stable archive
ID, from that ID to the exact local file and checksum, and from there to the
bibliography's expertise and trust assessment. Missing major books remain
visible as blockers rather than implicit evidence.

## Research and assets

`SUP-001` is the publisher's 34-page PDF of Mari Nukii, “Protest Events in the
Tehran Bazaar during the Oil Nationalization Movement of Iran.” The PDF and its
reading sidecar are saved locally in the archive, which is ignored wholesale.
The tracked catalogs retain its citation, provenance, checksum, and use.

No game asset changed.

## Validation

Verified the downloaded file as PDF 1.6 with 34 pages and recorded SHA-256
`9856dd235674899ceb9170cfd98371ac3b194668f3505631c3be4d26427bd860`.
Checked the bibliography, available catalog, unavailable queue, source sidecar,
and palace-protest record for reciprocal archive references. Added an automated
test for the taxonomy, cross-references, and local checksum.
