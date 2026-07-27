# Parliamentary and newspaper primary-record acquisition

- **Date:** 2026-07-25
- **Status:** Implemented

## Summary

- Acquired the official Sixteenth-Majles laws compilation and verified the
  nine-article oil-nationalization implementation law at printed pp. 15–16.
- Acquired and checksum-verified all 297 session scans enumerated for the
  Sixteenth and Seventeenth Majles.
- Acquired a coup-week selection from *Ettela'at*, *Bakhtar-e Emruz*, *Be
  Su-ye Ayande*, *Keyhan*, and *Shahed*.
- Replaced broad “unavailable” entries with exact resolved, partial, or
  catalog-only states for the Majles, First Senate, newspapers, and
  Bozorgmehr trial editions.

## Reason

The previous acquisition queue identified these sources precisely but had not
tested whether the underlying scans were actually obtainable. This pass turns
three parliamentary leads into verified local records, establishes a usable
multi-position newspaper sample, and records the remaining access barriers
without promoting discovery-site text into evidence.

## Dynamic SPD comparison

The Dynamic SPD checkout contains no historical bibliography, primary-source
archive, or claim-level citation system to adapt. Runtime and UI code are
unchanged. The added records remain Iran-project research infrastructure and
preserve the existing Dynamic SPD-derived application structure.

## System fit

`AVAILABLE_SOURCES.md` now inventories `SUP-006`–`SUP-009`;
`BIBLIOGRAPHY.md` defines their evidentiary roles;
`UNAVAILABLE_SOURCES.md` preserves resolved and remaining acquisition states;
and `SOURCE_AUDIT.md` records the audit decision. Ignored sidecars hold
collection manifests, hashes, issue gaps, and locator notes.

## Research and assets

The law compilation and parliamentary proceedings are official primary
records. Newspapers are politically situated primary evidence and require
cross-position comparison. Mashruteh and Iran Archive remain discovery/file
hosts, not narrative authorities. No visual game asset or historical claim
was added.

The First Senate proceedings were identified within a cataloged print serial,
but that catalog's listed holdings omit 1953 and no scan was exposed. Complete
identified editions of Mossadegh's initial trial, military appeal, and final
Court of Cassation proceedings were not acquired.

## Validation

- Verified the 263-page official law scan and inspected printed pp. 15–16
  directly at PDF images 27–28.
- Matched all 209 Sixteenth-Majles and 88 Seventeenth-Majles files to host API
  size and SHA-1 metadata; one interrupted file was resumed and rechecked.
- Confirmed page counts and SHA-256 checksums for every locally selected
  newspaper file.
- Recorded absent dates as archive gaps rather than inferring non-publication.
