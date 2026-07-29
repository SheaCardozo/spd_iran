# Model-neutral economic-history corpus

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Reframed economic work as source reconstruction rather than selection of a
game model. Added `docs/research/ECONOMIC_HISTORY.md` with the economic story,
an observation-ledger schema, a table-by-table S9 evidence audit, source
hierarchy, exact acquisition paths, current holdings, and extraction order.

Added economic trust and availability records to the bibliography and source
catalogs, expanded the unavailable queue from one generic row into exact Bank
Melli, Customs, fiscal, oil, planning, labor, institutional, and scholarly
targets, and updated the source audit. Acquired:

- IBRD E-99 (1950) and AS-55 (1957) as `SUP-040` and `SUP-041`;
- IMF exchange-restriction reports for 1952–55 as `SUP-042`–`SUP-045`;
- the official Iranian 1332 SH legal budget as `SUP-046`; and
- the UN 1956–57 Middle East survey, including Bank Melli series back through
  1952, as `SUP-047`.

`GAME_DESIGN.md` and `IMPLEMENTATION.md` now state explicitly that source
collection does not approve an economic simulation architecture.

## Reason

S9 makes a vital qualitative correction to an instant-bankruptcy narrative,
but its aggregate tables cannot by themselves support the full economic story.
The project needs to retain detailed historical observations and competing
definitions so that a later simple or complicated design remains possible.
Choosing variables and causal update rules now would prematurely turn the gaps
and assumptions of one 1987 article into architecture.

The audit also exposed two structural cautions: Iran had no contemporary
all-purpose national statistical yearbook, and enacted budgets often differed
substantially from actual collection and expenditure. The corpus therefore
must join institutional series without pretending they form one seamless
dataset.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/root.scene.dry`,
  `source/scenes/post_event.scene.dry`,
  `source/scenes/government_affairs/fiscal_policy.scene.dry`,
  `source/scenes/government_affairs/economic_policy.scene.dry`,
  `source/scenes/status.scene.dry`, and
  `source/scenes/library.scene.dry` in the Dynamic SPD checkout.
- **What Dynamic SPD does:** it centralizes a compact set of exact global
  scalars—budget, inflation, unemployment, growth, tax, tariff, and welfare
  levels. `post_event.scene.dry` applies hand-tuned monthly feedback, described
  there as implicitly drawing a Phillips curve. Fiscal and economic cards
  directly change the scalars and political support. Status and library scenes
  expose exact current values and inflation/unemployment history.
- **Decision here:** retain SPD's useful principle that economic decisions
  connect to political groups and unfold through shared time. Do not treat its
  German macro scalars or thresholds as historical evidence for Iran. Also do
  not yet reject its compact architecture: the Iran model remains an explicit
  later design decision. This change records observations and provenance only.
- **Divergence level:** none implemented. A more detailed economy would alter
  shared state, monthly routing, and status presentation and therefore remains
  a candidate major divergence requiring a separate plan before code changes.

## System fit

The new record is upstream of later event writing, policy cards, state design,
status UI, balancing, and endings. It allows those systems to cite the same
underlying observations without forcing every acquired series into runtime
state. No Dendry scene, reducer, turn rule, browser asset, or persisted state
changed.

## Research and assets

S9 (`SUP-023`) was read table by table. Its underlying evidence includes IMF
IFS data supplied by Bank Melli, Customs annual statistics, Bank Melli
bulletins and history, budget and Plan Organization material, and several
dissertations. The audit records its official-rate valuation, errors and
omissions, fragmentary budget data, imprecise reconstructed GNP, interpolated
monthly output, low regression explanatory power, period sensitivity, and
explicit inability to evaluate welfare.

Exact catalog paths now cover the Bank Melli *Bulletin* (LOC LCCN `45049141`),
annual Customs statistics (LCCN `sf85019491`), and monthly foreign-trade
statistics (LCCN `78271590`). The queue includes books by Katouzian, Bharier,
Brew, Jones, Baldwin, Bostock and Jones, Bamberg, and Lambton; the direct Majd
critique of S9; the Afshar, Khosropour, and Moghadam dissertations; the ILO oil
labor mission; and the Bartsch–Bharier discovery bibliography.

The eight acquired source files are official public institutional or Iranian
records stored only under the ignored local source archive. Each has a
provenance sidecar and SHA-256 checksum. No visual asset changed.

## Validation

- Extracted all 22 journal pages of S9 with the installed maintained PDF
  library and checked Tables 1–7, Appendices I–II, and notes.
- Verified each acquired file as a PDF and counted pages independently.
- Recorded SHA-256 checksums in sidecars and `AVAILABLE_SOURCES.md`.
- Confirmed that two UN 1952/1953 survey endpoints returned HTTP 403 and did
  not catalog them as acquired.
- Rejected and removed an HTML landing page initially returned in place of the
  `SUP-047` PDF, then acquired the actual 177-page PDF through the UN direct
  document endpoint.
- `npm test` passes: browser build, monthly-loop tests, archive/catalog
  integrity and checksum tests, and UI-sync tests.
- `git diff --check` reports no whitespace errors.
