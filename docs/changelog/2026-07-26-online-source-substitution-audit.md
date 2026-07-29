# Online substitutes for inaccessible priority sources

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The remaining acquisition queue was re-audited on the assumption that its
highest-priority originals may never become available. A new
[`online substitution audit`](../research/ONLINE_SUBSTITUTION_AUDIT_2026-07-26.md)
maps each inaccessible target to a convergent accessible evidence bundle,
states which claims that bundle can safely support, and preserves the narrower
claims that still require the missing original.

The audit also:

- reclassifies the queue from general blockers to residual precision gaps;
- adds Siavush Randjbar-Daemi's open peer-reviewed reconstruction of Radio
  Tehran on 19 August 1953 as `SUP-060`;
- updates the crisis and World Bank research notes with newly inspectable
  evidence and disputes;
- records the numbering ambiguity around the priority Chaqueri title; and
- rejects a false Kamran Dadkhah acquisition lead after the downloaded file
  proved to be only a contents sheet.

## Reason

Repeated catalogue, repository, archive, and general-web searches did not
produce the First-Senate proceedings, `FO 371/75466`, the Iranian institutional
accounts, Torkamān, Movahed volume I, Majd, Bamberg, the priority Chaqueri
volumes, or the World Bank mediation folders. Treating every one of these as a
campaign-wide blocker would overstate what is missing: much of the desired
event structure, institutional outcome, economic direction, and negotiation
sequence can be established by joining independent official and scholarly
records already held by the project.

The new rule is claim-specific. Work may proceed where the substitute bundle
supports the proposition, while exact divisions, account values, casualty
ledgers, payment chains, private motives, and quotations remain unavailable
unless their particular originals are acquired.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/credits.scene.dry` and
  `source/scenes/modinfo.scene.dry`.
- **What Dynamic SPD does:** Dynamic SPD exposes a readable in-game bibliography
  divided into books, articles, and media, marks especially important works,
  and supplies links where available. Its credits do not separately track
  acquisition status, source trust, claim locators, failed leads, or the
  evidentiary limits of substitutes.
- **Decision here:** Retain the visible, authoritative bibliography as the
  eventual player-facing pattern. Adapt the research layer by keeping distinct
  available, unavailable, bibliography, and claim-audit records. This
  separation is necessary to prevent a carrier page, incomplete file, or
  secondary substitute from being mistaken for an inspected original.
- **Divergence level:** Local. This changes research provenance and
  implementation gates, not the core turn loop, state ownership, event
  routing, action economy, persistence, or build model.

## System fit

The audit changes no runtime code. It clarifies which historical mechanics can
be designed now:

- Senate outcomes may be represented at chamber level, but not as invented
  member-level divisions;
- Sixteenth-Majles deputies may receive dated, confidence-graded tendencies,
  but not a synthetic complete party register;
- economic pressure may use trends, ranges, and observation vintages, but not
  false account-level precision;
- 30 Tir and 19 August may use plural organizers, bounded casualty language,
  and phase-based sequences, but not totalizing organizer or payment claims;
  and
- World Bank mediation may present documented terms and competing scholarly
  interpretations, but not unattributed private motives.

Future event source records should link the audit only as a scope decision;
the underlying official or scholarly source must still carry each historical
claim.

## Research and assets

`SUP-060` is an unchanged Cambridge Core full-text HTML archive of Siavush
Randjbar-Daemi, “Radio Tehran and the 19 August 1953 Coup: A New Perspective,”
*International Journal of Middle East Studies* 56, no. 2 (2024), pp. 280–287,
DOI `10.1017/S0020743824000588`. Its St Andrews repository record identifies
peer-review status and a CC BY 4.0 license. The source and metadata sidecar
remain in the Git-ignored local source archive; the tracked catalog preserves
the checksum and provenance.

The audit also uses existing official Majles, FRUS, IMF, UN, IBRD, ILO, and
World Bank records together with acquired specialist books. Web archive and
repository pages are treated as carriers or discovery aids rather than
historical authorities. No historical asset was added or changed.

## Validation

- Confirmed the archived `SUP-060` checksum against its catalog and sidecar.
- Checked every new archive ID and bibliography link across the tracked
  research records.
- Compared the research presentation with Dynamic SPD's credits and source
  navigation.
- Ran the research-source regression test and the complete project test suite.
- Residual uncertainty is explicitly retained in the substitution audit; no
  unavailable proceeding, chapter, article, volume, folder, or account is
  represented as inspected.
