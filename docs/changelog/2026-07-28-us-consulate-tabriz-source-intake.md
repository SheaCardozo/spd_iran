# U.S. Consulate Tabriz source intake

- **Date:** 2026-07-28
- **Status:** Implemented

## Summary

- Archived two declassified CIA publications that explicitly summarize U.S.
  Consulate Tabriz reporting from July 1951 and January 1953.
- Added exact locators for three further Tabriz observations already present
  in the project's official FRUS volume: the August 1952 Constitution Day
  meetings and the April and June 1953 political reports.
- Added a source-family trust record, catalog entries, checksums, provenance,
  and a dedicated search note separating original dispatches from Embassy and
  CIA summaries.
- Located the likely NARA routes for surviving originals in RG 59 Central
  Files and RG 84 Tehran Embassy files, while marking the box ranges as
  candidates rather than proof of survival.
- Classified the originals as an optional acquisition for detailed Tabriz
  scenes, not a blocker for the national campaign or a license to invent an
  Azerbaijani political bloc.

## Reason

The project needed to know whether U.S. provincial reporting could add
campaign-period detail after the broader Iranian-Azerbaijan structural source
intake. Public evidence exists, but mostly as derivative institutional
summaries. Preserving both the useful observations and the shortened source
chain prevents isolated diplomatic impressions from becoming a synthetic
provincial faction model.

## Dynamic SPD comparison

Dynamic SPD exposes a general bibliography in
`source/scenes/credits.scene.dry` and occasionally records the sources and
analogies behind speculative historical mechanics in `changes.txt`, including
its Popular Front notes. It does not maintain an ignored primary-source
archive, item metadata sidecars, a live unavailable-source queue, or
claim-level archival locators.

The Iran project retains SPD's principle that historical design should expose
its evidentiary basis. It deliberately diverges at the research-infrastructure
layer by preserving the source bytes, carrier history, source-chain limits,
and exact archival follow-up route before any provincial mechanic is
implemented. This is not a gameplay or runtime architectural divergence.

## System fit

The new material can support a handful of dated Tabriz references and can
inform later decisions about whether a provincial scene is warranted. It does
not yet support local faction strengths, ethnic vote modifiers, broad public
opinion, or a detailed Tudeh/Soviet intervention system.

## Research and assets

`SUP-076` and `SUP-077` are declassified U.S. government scans held only in
the ignored local archive. Their official CIA endpoints were redirecting to
the Reading Room landing page, so unchanged bytes were recovered from dated
Internet Archive captures and both provenance layers were recorded. No visual
asset was added.

## Validation

- Verified both downloaded files as PDFs and recorded SHA-256 checksums.
- Confirmed the 1951 item through the CIA-indexed text and the 1953 item
  through the official CIA-indexed text and scan structure.
- Verified FRUS documents 114 and 233 against the local official second
  edition, including printed and PDF page locators and archival file numbers.
- Cross-checked NARA series identifiers `2124150` and `1715291`, their current
  container lists, and the College Park reference contact.
- Ran research-source tests and Markdown/diff validation.
