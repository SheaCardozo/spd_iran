# JSTOR source intake

## Summary

Ingested the three exact JSTOR targets previously tracked as `S21`–`S23`.
Azimi's *The Quest for Democracy in Iran* is now `MAJ-S13`, Painter and Brew's
*The Struggle for Iran* is `MAJ-S14`, and Efimenco's 1955 article is
`SUP-048`. The availability, bibliography, audit, acquisition queue, local
metadata, and integrity test now cross-reference the same archive records.

## Reason

The two books fill important modern secondary-source gaps in constitutional
and oil-crisis history. Efimenco preserves a useful near-contemporary
historiographic lead. Recording them as acquired—but not reviewed or
claim-ready—keeps availability separate from evidentiary approval.

## Dynamic SPD comparison

Dynamic SPD's `source/scenes/credits.scene.dry` maintains a broad bibliography,
while `HISTORICAL_ANALYSIS.md` discusses historical grounding without a local
edition registry. This intake follows its practice of preserving the
scholarly basis for content and retains the Iran project's planned divergence:
archive IDs, per-copy provenance, checksums, access states, and explicit
limitations. No runtime, UI, scene, or gameplay architecture changed.

## System fit

The major/supplemental split follows research role: both scholarly books can
support major systems after close reading, while the short, dated Efimenco
article remains supplemental. Future content must still cite checked page or
chapter locators and, for exact Senate procedure, the official proceedings.

## Research and assets

No historical claim or asset changed. The source files and their sidecars
remain local under the Git-ignored archive. The tracked catalogs retain only
metadata and status.

## Validation

- Matched all three files to the queued JSTOR stable records.
- Verified file signatures and extents: a 508-page PDF, a valid EPUB, and the
  complete journal article.
- Recorded SHA-256 checksums and added all three holdings to the archive
  integrity test.
