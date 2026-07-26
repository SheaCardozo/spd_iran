# Persian newspaper corpus expansion

## Summary

- Expanded `SUP-008` from five to twenty-one selected *Ettela'at* issues,
  adding sixteen dates cited in the project's local copy of Abrahamian's *Oil
  Crisis in Iran*.
- Expanded `SUP-009` with four complete *Kayhan* issues dated 25–27 and 29
  Mordad 1332, plus four previously un-ingested discovery clippings.
- Acquired and cataloged five local-only Persian newspaper collections:
  - `SUP-027`: 103 gapped Tudeh *Mardom* PDFs;
  - `SUP-028`: the complete numbered 247-issue *Niruye Sevvom Piruz Mishavad*
    run plus its introduction;
  - `SUP-029`: 49 numbered *Mardom-e Iran* issues plus its introduction;
  - `SUP-030`: 40 selected *Apadana* issues; and
  - `SUP-031`: all 38 *Bakhtar-e Emruz* issues exposed by Iran Archive.
- Added exact Manchester, Princeton, CRL, and University of Chicago digital,
  microfilm, and reproduction leads, organized around remaining event and
  political-position gaps.

## Reason

The previous holdings comprised twelve files and were concentrated almost
entirely in 24–31 Mordad 1332. That was too narrow for a campaign whose press
system is supposed to represent party organization, competing public claims,
propaganda, and information uncertainty from 1949 through 1953.

This intake favors coherent runs and dates already cited by the project's
major scholarship. It does not equate bulk acquisition with claim-level
research. The next priorities are *Shahed* for the implemented 1949 opening,
multi-title Thirty Tir coverage, genuinely opposing coup-period titles, and
full issues from different positions on 28 Mordad.

## Dynamic SPD comparison

Dynamic SPD collects its scholarly and asset sources in
`source/scenes/credits.scene.dry` and occasionally attaches numerical source
comments directly to initialization and calculation code in
`source/scenes/root.scene.dry` and
`source/scenes/election_simulation.scene.dry`. Newspapers appear as historical
actors in scenes such as `source/scenes/advisors/stampfer.scene.dry`, but the
reference project has no local primary-source archive, issue inventory,
political-provenance record, or claim-level newspaper locator system.

The Iran project retains the useful idea of a readable central bibliography
and source credits. It deliberately diverges by preserving local issue scans,
per-file checksums, repository provenance, explicit gaps, political-position
warnings, and separate acquisition and trust catalogs. This is research
infrastructure, not a runtime or architectural divergence, so no
`docs/IMPLEMENTATION.md` plan is required.

## System fit

The ignored files live under `docs/research/sources/supplemental/`.
`AVAILABLE_SOURCES.md` records local holdings; `BIBLIOGRAPHY.md` records
institutional identity, evidentiary value, and limitations;
`UNAVAILABLE_SOURCES.md` retains the precise acquisition queue; and
`SOURCE_AUDIT.md` records the project-level judgment.

The collections improve the evidence base for future organization,
mobilization, coalition, referendum, Thirty Tir, and coup scenes. They do not
authorize any historical content by themselves: implemented claims still need
issue/date/page/item locators and comparison with scholarly books and other
positions.

## Research and assets

The scans are politically situated primary sources, not scholarly authorities
or neutral narratives. Iran Archive and Mashruteh are treated as carriers and
discovery infrastructure. Manchester, Princeton, CRL, Chicago, and Wikimedia
Commons records provide institutional or file-level provenance where
available.

All downloaded files remain Git-ignored and local-only. Their availability for
research does not clear them for republication as visual assets; any future
asset use still requires an entry in `docs/research/ASSETS.md`.

## Validation

- Confirmed all 479 newly acquired collection files are readable PDFs.
- Counted 2,106 scanned pages across `SUP-027`–`SUP-031`.
- Preserved direct-file URL lists and carrier index snapshots.
- Computed per-file SHA-256 manifests and recorded each manifest checksum.
- Confirmed `SUP-028` has every numbered issue from 1 through 247.
- Recorded issue-number gaps for `SUP-027`, `SUP-029`, `SUP-030`, and
  `SUP-031`, including carrier inconsistencies and filename typos.
- Verified the four added *Kayhan* PDFs as eight-page issues and the expanded
  *Ettela'at* set as 21 PDFs / 208 pages.
- Ran the research-source test suite and link/anchor checks after catalog
  updates.
