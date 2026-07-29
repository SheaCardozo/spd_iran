# World Bank mediation-file search and partial acquisition

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Reclassified the World Bank Iran oil-mediation record from “inventory only” to
an exact 24-folder acquisition record. Recovered the officially migrated copy
of folder `1806440`, the Bank's contemporaneous published negotiation review,
its 1951–52 annual summary, two participant oral histories, and three official
access-status records as `SUP-026`. Added a folder-by-folder request plan and
documented two records known to be restricted.

## Reason

`SUP-019` was described as a two-page inventory whose underlying files were
simply unavailable. The inventory itself contains 23 legacy scan URLs. Their
current failure is a World Bank platform-migration/access problem, not a lack
of precise archival identification. That distinction changes both what can be
used now and what should be requested next.

## Dynamic SPD comparison

- **Reference path:** `source/scenes/credits.scene.dry`.
- **What Dynamic SPD does:** the credits scene groups books, articles, and
  image sources and marks heavily referenced books, but the checkout has no
  local source archive, archival access queue, per-file checksum ledger, or
  claim-level research workflow.
- **Decision here:** retain the readable separation of source types while
  adapting it into the Iran project's existing available/unavailable/
  bibliography taxonomy and ignored local archive. No runtime or content
  architecture changed.
- **Divergence level:** local research infrastructure; no major design
  divergence.

## System fit

`AVAILABLE_SOURCES.md` now distinguishes the finding aid (`SUP-019`) from the
partial primary corpus (`SUP-026`). `UNAVAILABLE_SOURCES.md` carries only the
remaining folder requests, `BIBLIOGRAPHY.md` records institutional authority
and limits, and `SOURCE_AUDIT.md` prevents oral histories or the inventory from
silently replacing contemporaneous files. The detailed reconstruction lives
in
[`WORLD_BANK_MEDIATION_FILES.md`](../research/WORLD_BANK_MEDIATION_FILES.md)
so future events can link to exact folder IDs without duplicating the search.

## Research and assets

- World Bank Group Archives, *Iran Oil Nationalization Inventory List*, fonds
  `WB IBRD/IDA MNA`, local `SUP-019`.
- World Bank folder `1806440`, report `75976`, 19 February 1952, official
  67-page migrated copy.
- IBRD Press Release No. 285 and “Review of the International Bank's
  Negotiations Concerning the Iranian Oil Problem,” report `147458`, 3 April
  1952.
- *International Bank for Reconstruction and Development Annual Report
  1951–1952*, report `10914`, Iran section at printed pp. 17–18.
- Robert L. Garner oral history, report `79009`, and Hector Prud'homme oral
  history, report `79097`.
- World Bank access records `AI2258`, `AI3487`, and `AI9493`.
- Nicolas Gorjestani, “The Anglo-Iranian Oil Crisis Re-revisited,” used as a
  peer-reviewed document locator and interpretive comparison, not as a
  substitute for the folders.

No visual asset changed.

## Validation

- Parsed the local inventory and confirmed 24 rows, 23 embedded folder-scan
  IDs, and one unlinked folder (`1806451`).
- Tested representative legacy `pubdocs` links and confirmed World Bank 404
  responses; current Documents & Reports searches did not resolve the core
  meeting and correspondence folders.
- Located and downloaded the official migrated `1806440` copy and Press
  Release No. 285, then verified PDF signatures, page counts, and SHA-256
  values.
- Preserved a separately sourced legacy carrier of `1806440` but designated
  the current official 67-page report as canonical.
- Archived and checksummed the annual report, oral histories, and access
  records.
- Checked the World Bank request guidance and recorded the first request
  tranche by exact folder ID.
- Added local-archive checksum validation for every `SUP-026` file and ran the
  research-source tests.
