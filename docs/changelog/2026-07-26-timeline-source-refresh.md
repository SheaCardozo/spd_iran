# Historical-primer source refresh

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The historical primer now incorporates three useful bodies of evidence from
the latest source intake:

- the International Labour Office's 1950 field baseline for Abadan housing,
  essential supplies, and the unequal company-town order;
- Gregory Brew's reconstruction of the 1952 oil-less economic program, Point
  Four assistance, the pre-coup economic assessment, and the “collapse
  narrative” that connected economic forecasts to regime-change policy; and
- Siavush Randjbar-Daemi's broadcast reconstruction, checked against the
  near-contemporary British crisis memorandum, for the Radio Tehran takeover
  and premature victory announcements on 19 August.

The Markdown remains the canonical text. The integrated and standalone HTML
outputs were regenerated from it, and the build's readable source-name map and
regression tests were extended for the new citations and sections.

## Reason

The parliamentary material from the same intake had already reached the
primer, but the newer labor, economic, and communications evidence had not.
The omissions made Abadan look too generically poor, “economic adjustment”
sound more passive than Mossadegh's actual policy package, and the radio
station appear as only one more building captured during the coup.

The revision adds information only where the imported text could be inspected
at claim level. It does not promote the unreviewed remainder of either the ILO
report or Brew's book.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/modinfo.scene.dry` and
  `source/scenes/credits.scene.dry`.
- **What Dynamic SPD does:** its introductory material explains institutions
  and political stakes in direct prose, while its credits scene presents
  heavily used books and articles in a readable player-facing bibliography.
- **Decision here:** retain the Iran primer's existing generated, standalone
  long-form format while following the same player-facing principle: historical
  explanation appears in ordinary prose and internal archive IDs are replaced
  by recognizable author/title citations in the rendered page.
- **Divergence level:** content and documentation only. No turn loop, state,
  event routing, persistence, deck, action economy, or runtime architecture
  changed.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the single narrative source.
`scripts/build-timeline.js` continues to convert its internal source IDs into
readable citations and to produce identical integrated and standalone pages.
The source catalogs now distinguish the reviewed chapter/page ranges from the
unreviewed remainder, and the economic research record preserves the new ILO
baseline without converting it into a 1951–53 welfare series.

The added regression assertions make the Abadan figures, oil-less-program
section, readable source names, and Radio Tehran clock part of the generated
page's contract.

## Research and assets

No source PDF or visual asset changed. The ignored local metadata sidecars for
`MAJ-S18`, `SUP-055`, and `SUP-057` now record the reviewed ranges and claim
links.

- `SUP-055`, printed pp. 31–38, supports the 1950 Abadan population,
  salaried/wage-earner housing contrast, overcrowding and emergency tents, and
  dependence on company distribution. The report's date and partial reliance
  on AIOC information remain explicit.
- `MAJ-S18`, chapter 4, especially pp. 120–44, supports the oil-less program,
  Point Four activity, pre-coup economic assessment, and collapse-narrative
  interpretation. The primer presents the continued fiscal risk as well as
  the absence of an already completed collapse.
- `SUP-057`, printed pp. 187–88, controls the June 1953 certificate-rate
  chronology and transaction categories.
- `SUP-060`, pp. 284–86, controls the broadcast sequence; `SUP-049`,
  paragraphs 8–9, supplies the interested near-contemporary British clock and
  casualty estimate. The absence of a reconciled casualty ledger remains
  visible.

## Validation

- Regenerated the integrated and standalone historical-primer pages.
- Checked that both generated pages are byte-identical.
- Checked that no archive IDs or repository-only instructions leak into the
  reader-facing HTML.
- Ran Markdown link/fragment and source-registry validation.
- Ran `git diff --check` and the complete project test suite.
