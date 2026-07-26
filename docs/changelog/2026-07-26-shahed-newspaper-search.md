# *Shahed* newspaper search and coup-window intake

## Summary

- Located complete PDF attachments for Baghai's *Shahed* dated 20, 22, and
  24–28 Mordad 1332 in the public `@mohammadmosaddegh` Telegram archive.
- Ingested the seven manually downloaded PDFs into `SUP-009`, normalized their
  local filenames, and recorded their original carrier provenance and
  checksums. The files total 26 image-only pages.
- Preserved the public carrier pages locally under `SUP-009`, together with
  low-resolution front-page previews for 27 and 28 Mordad. Confirmed that the
  existing 26 Mordad image is byte-identical to Mashruteh's direct original.
- Refined the acquisition queue with exact issue dates cited by the project's
  major scholarship and with full-run microfilm routes at Princeton and the
  University of Chicago.
- Located a reported four-volume 1385 / 2006 facsimile covering second-series
  nos. 1–773 and confirmed that it and Princeton `MICROFILM S00895` encompass
  the 24 October 1949 and 19/23 July 1952 priority issues. No open issue scans
  were found.
- Resolved an important title-history problem: catalogs merge an earlier 1946
  weekly and Baghai's 1949 daily iteration under شاهد / *Shahid* / *Shahed*.
  The openly digitized Princeton object is the 1946 run despite metadata that
  assigns it to 1328–29, so it was not ingested as Baghai-era evidence.

## Reason

*Shahed* is necessary both for the implemented October 1949 opening and for
understanding the Toilers Party's anti-Mossadegh rhetoric during the coup. The
previous archive held only one front-page image dated 26 Mordad, while the
acquisition record treated institutional *Shahid* holdings as an unverified
title collision. The new search establishes what can be read immediately,
what is now locally reviewable and which microfilm request can supply the
missing 1949–53 run.

## Dynamic SPD comparison

Dynamic SPD centralizes its source list in
`source/scenes/credits.scene.dry`, attaches some numerical locators directly to
`source/scenes/root.scene.dry` and
`source/scenes/election_simulation.scene.dry`, and treats a party newspaper as
a historical institution in `source/scenes/advisors/stampfer.scene.dry`. It
does not preserve issue files, title-history disputes, carrier provenance, or
an acquisition queue.

The Iran project retains the readable central bibliography and the treatment
of newspapers as political actors. It continues the planned research-layer
divergence by separating local scans, carrier records, trust judgments, and
unavailable issue runs. This is research infrastructure, not a change to the
turn loop, shared state, event routing, persistence, or runtime architecture,
so no implementation-plan amendment is required.

## System fit

`SUP-009` remains the local collection ID. Its metadata and checksum manifest
now distinguish seven complete issue PDFs, an original-size front page, two
low-resolution previews, and the saved carrier pages.
`AVAILABLE_SOURCES.md` records only what is actually local;
`UNAVAILABLE_SOURCES.md` keeps the manual-transfer and microfilm queue;
`BIBLIOGRAPHY.md` records the title and editorial-history cautions; and
`SOURCE_AUDIT.md` states the remaining coverage gap. The palace-protest
research record now identifies the 24 October 1949 issue as an unimplemented
primary-source lead without changing the scene's claims.

## Research and assets

The underlying newspaper pages are interested primary evidence, not scholarly
authority or neutral reporting. Telegram, Mashruteh, and the Persian-web
repositories are treated only as carriers. Scholarship by Azimi, Katouzian,
Rahnema, Abrahamian, Gasiorowski and Byrne, Cottam, and Bill and Louis supplied
publication history and target dates; precise local locators are recorded in
the bibliography, event record, and acquisition queue.

No scan was found online for the 24 October 1949 declaration or the priority
Thirty Tir dates. Princeton's five-reel `MICROFILM S00895` is the strongest
institutional copy route, while a bibliographic survey records a scarce
four-volume 2006 facsimile containing all three dates. Princeton accepts
external-library copy requests through OCLC symbol `PUL`; Canadian requests
must be placed through a local or academic library. The seven Telegram
document attachments were manually downloaded because the unauthenticated
archive does not expose PDF file URLs.

The two saved Telegram images are watermarked, low-resolution research
previews. They are not cleared as game assets; any future visual use still
requires a separate `ASSETS.md` rights entry.

## Validation

- Verified the existing 26 Mordad file against Mashruteh by SHA-256:
  `bf6dd98b1f483a9a0c83801d202093fd350bf9bd03b5c501c78e9ed1f0a7b5d6`.
- Verified the 27 and 28 Mordad previews as 549×800 and 532×800 JPEGs and added
  their hashes to the `SUP-009` manifest.
- Saved public carrier pages that expose all seven attachment filenames,
  sizes, dates, and post IDs, plus the date-and-title index.
- Verified all seven PDFs as readable image documents, counted 26 pages
  (4, 5, 5, 4, 2, 2, and 4), rendered every page, and visually checked every
  first-page masthead and date.
- Added the seven file hashes to `SUP-009/SHA256SUMS` and verified the complete
  manifest.
- Inspected the Princeton IIIF pages against their mastheads and dates rather
  than trusting the conflicting collection metadata.
- Checked Princeton's full catalog JSON and holdings notes to distinguish the
  openly scanned 1325 weekly from the second-series print holdings and the
  five-reel 1946–53 microfilm.
- Checked Telegram's internal channel search, Mashruteh's MediaWiki API, Iran
  Archive's periodical index, Internet Archive metadata, and exact-date web
  and image searches for the three priority issues; none exposed an issue
  scan.
- Checked the updated `SUP-009` checksum manifest and ran the research-source
  test suite and Markdown whitespace validation.
