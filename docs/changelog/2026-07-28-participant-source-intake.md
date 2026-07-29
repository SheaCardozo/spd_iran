# Participant memoir and documentary-source intake

- **Date:** 2026-07-28
- **Status:** Implemented

## Summary

Archived and verified five participant-source objects as `SUP-071`–`SUP-075`:

- Ahmad Zirakzadeh's *Porsesh-hā-ye bī-pāsokh dar sāl-hā-ye estesnāʾī*;
- Gholam-Hossein Sadighi's final interview;
- Ardeshir Zahedi's *Panj ruz-e bohrāni*;
- the published summary of eleven Sadighi–Gholamreza Nejati interview
  sessions; and
- Sadighi's written hour-by-hour account of 28–29 Mordad 1332.

Added unchanged local files and metadata sidecars, checksums, available-source
records, trust entries, source-regression coverage, and the
[`participant-source acquisition audit`](../research/PARTICIPANT_SOURCE_ACQUISITION_2026-07-28.md).
Reorganized the residual participant-source queue around genuine missing
works and online readers that still require an authorized CAPTCHA, account,
subscription, or purchase flow.

## Reason

The adviser, cabinet, coalition, foreign-policy, and counterfactual design
needs better evidence for what individual actors remembered deciding and why.
The prior queue did not distinguish a genuinely absent text from a readable
online edition whose underlying file was not yet in the workspace. This pass
acquired the direct public files, documented access-controlled candidates
without bypassing their controls, and corrected the mistaken attribution of
Makki's *Khalʿ-e yad* material to Shams al-Din Amir-Alai.

## Dynamic SPD comparison

Dynamic SPD records a broad historical bibliography in
`source/scenes/credits.scene.dry`. It does not maintain a local source archive,
file checksums, edition sidecars, an available/unavailable distinction, or
participant-specific evidentiary warnings. Its later repository-level
assessment in `HISTORICAL_ANALYSIS.md` identifies the difficulty of auditing
claims without scene-level source provenance.

This project retains Dynamic SPD's readable end-user bibliography as the
eventual presentation baseline but continues the already planned divergence:
research intake is stored in the ignored archive and cross-referenced through
tracked trust, availability, gap, and claim records. This is a research
infrastructure difference, not a change to the runtime, event routing, state
ownership, deck, or turn loop, so no major-divergence plan is required.

## System fit

The new sources enlarge the participant-evidence layer without changing any
implemented historical claim. `SUP-071` supports future Iran Party and
National Front prosopography; `SUP-072`, `SUP-074`, and `SUP-075` support
future Sadighi, cabinet-response, and 28-Mordad research; `SUP-073` provides a
needed coup-side account. The available catalog says what files exist, the
bibliography says how testimony should be trusted, the unavailable queue now
contains only residual access gaps, and the acquisition audit preserves exact
search routes and barriers.

## Research and assets

The PDFs were acquired from direct public Iran Archive carriers. The two
Sadighi web texts were retained as unchanged public HTML captures whose
underlying print editions and page ranges are named in the source. No carrier
asserts a public-domain or Creative Commons license, so all files remain in
the Git-ignored local archive and must not be redistributed on an assumed
license.

Participant proximity is recorded as both value and limitation. Zirakzadeh,
Sadighi, and Zahedi were directly involved, but their late accounts are
selective and interested. Iranchehr and Iran Archive are discovery carriers,
not historical authorities. Claim-level use still requires printed pages or
sections and comparison with contemporary records, contrary participant
accounts, and established specialist books.

No visual asset was added or changed.

## Validation

- Confirmed SHA-256 for all five unchanged archive objects.
- Parsed all three PDFs with PDF.js: 279 pages for `SUP-071`, 18 for
  `SUP-072`, and 97 for `SUP-073`.
- Visually checked title or publication matter, sampled body images, and
  terminal pages or sections.
- Confirmed Zirakzadeh's two-page-spread structure, Niloufar colophon, and
  ISBN; Sadighi's two preliminary plus sixteen numbered pages; and Zahedi's
  numbered terminal page and electronic-edition date.
- Checked both HTML captures for title, named speaker or interviewer, complete
  body sequence, and original print locators.
- Confirmed that an anonymous Ketabnak download attempt returned CAPTCHA HTML
  rather than source bytes; no access control was bypassed.
- Added checksum and sidecar regression entries for `SUP-071`–`SUP-075`.
- Ran the repository test suite and documentation-link validation.
