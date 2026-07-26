# Available sources

This catalog lists source files actually archived under the local,
Git-ignored [`sources/`](sources/README.md) directory.
It cross-references the scholarly trust registry in
[`BIBLIOGRAPHY.md`](BIBLIOGRAPHY.md) and the acquisition queue in
[`UNAVAILABLE_SOURCES.md`](UNAVAILABLE_SOURCES.md).

“Available” means this workspace has a usable local copy. It does not mean the
source is authoritative for every claim or already read in full. The archive
itself is never committed; this catalog is the durable record.

## Status key

- **Cited** — supports an implemented claim with a precise locator.
- **Reviewed** — read for a defined research question but not yet cited by
  implemented content.
- **Acquired** — saved locally; substantive review remains incomplete.
- **Local-only** — available in this workspace's ignored archive, as all source
  files are.

## Major sources

No major source is currently available. The priority book-length works are
listed in [`UNAVAILABLE_SOURCES.md`](UNAVAILABLE_SOURCES.md#priority-scholarly-books).

## Supplemental sources

<a id="sup-001"></a>
### SUP-001 — Mari Nukii, “Protest Events in the Tehran Bazaar”

- **Status:** Cited; local-only; provisional historical-coverage warning.
- **Bibliography:** [`SUP-001` trust record](BIBLIOGRAPHY.md#sup-001)
- **Local source:** [`SUP-001` PDF](sources/supplemental/SUP-001-nukii-2012-protest-events-tehran-bazaar.pdf)
- **Metadata and notes:** [`SUP-001` sidecar](sources/supplemental/SUP-001-nukii-2012-protest-events-tehran-bazaar.md)
- **Stable identifier:** <https://doi.org/10.24498/ajames.28.1_1>
- **Local file status:** Publisher PDF downloaded and verified as a 34-page
  PDF. It is excluded by the archive-wide Git ignore rule.
- **SHA-256:** `9856dd235674899ceb9170cfd98371ac3b194668f3505631c3be4d26427bd860`
- **Used by:** [`1949-10 palace protest`](events/1949-10-palace-protest.md),
  p. 10.
- **Role:** Supplemental specialist evidence. It does not satisfy the opening's
  outstanding need for a major political history and Iranian corroboration.

## Intake checklist

1. Confirm that the source is academic or an authoritative primary record and
   that its author/editor and publication venue meet project standards.
2. Decide `major` or `supplemental` based on project role, not prestige alone.
3. Confirm a lawful basis for downloading and retaining the copy.
4. Save the unchanged file with its archive ID.
5. Compute SHA-256 and create a metadata sidecar.
6. Add this catalog entry and cross-references in the bibliography and, if
   applicable, remove the work from the unavailable queue.
7. Add precise locators to every implemented claim that uses it.
