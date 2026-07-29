# Sixteenth-Majles source acquisition search

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Precisely identified and searched for the Parliament Library conference volume
on the Thirteenth through Sixteenth Majles and UK National Archives file
`FO 371/75466`. No online copy of either complete target was found. A later
archive-first search recovered and locally archived a complete-looking
author-posted version of one priority chapter as `SUP-056`. A substitution
pass then mapped each important chapter to the strongest accessible evidence
and archived both official volumes of the Sixteenth-Majles Special Oil
Commission minutes as `SUP-059`. The bibliography and unavailable-source
queue now distinguish these partial and primary substitutions from the
still-unavailable 618-page volume.

A reconciliation pass also cataloged the previously orphaned Qatar Digital
Library download `IOR/L/PS/12/1225` as `SUP-054`. The catalog, bibliography,
sidecar, and acquisition audit now state consistently that this British
Library India Office file is contextual 1947–49 diplomatic evidence, **not**
`FO 371/75466` and not a substitute for its two known candidate-influence
documents.

## Reason

The member ledger still lacks a reliable member-by-member allocation of the
Sixteenth Majles's royalist majority and southern conservatives. These two
sources are the best current leads for Iranian parliamentary analysis and
contemporary reporting about court- and oil-agreement-sponsored candidates.
Recording a negative search prevents catalog records and snippets from being
mistaken for reviewed evidence.

The follow-up substitution pass was necessary to determine whether failure to
acquire the book blocks the parliamentary reconstruction. It does not:
membership, procedure, and the oil sequence have strong reconstructive or
primary alternatives. The religious-election, Mesbahzadeh, and land-reform
chapters remain meaningful scholarly gaps.

## Dynamic SPD comparison

- **Reference path:** `source/scenes/credits.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** groups historical books and articles in a
  player-facing credits bibliography and emphasizes heavily used works, but
  does not maintain an acquisition queue, access audit, or source-trust
  record.
- **Decision here:** retain the distinction between books and other evidence
  while adapting it into a cross-referenced bibliography and acquisition
  workflow. The additional access and trust controls are required by this
  project's historical-source policy.
- **Divergence level:** local research-process divergence; no game
  architecture or runtime change.

## System fit

`SIXTEENTH_MAJLES_SOURCE_ACQUISITION.md` is the durable search and request
record. `BIBLIOGRAPHY.md` assesses the sources, and
`UNAVAILABLE_SOURCES.md` keeps them in the acquisition queue. No member
allegiance or game state was changed because the source texts have not been
reviewed. `SUP-059` lowers the acquisition priority of the missing oil
chapters without being mistaken for their scholarly analysis.

## Research and assets

- Parliament Library volume: ISBN `9786002201720`, LCCN `2013358066`, OCLC
  `883726138`, national bibliography no. `3176388`.
- Partial recovery: Ahmadi-Nasab and Sadeghi's “The Sixteenth Majles and the
  Nationalization of Oil,” posted by coauthor Younes Sadeghi in 1392 SH,
  archived as `SUP-056`. It is not accepted as a paginated surrogate for the
  edited volume.
- Primary substitution: official Majles print-order nos. 172 and 300,
  preserving the first, second, and third periods of the Special Oil
  Commission in 367 image pages, archived as `SUP-059`. Wikimedia Commons
  marks both scans public domain and identifies the Iranian Parliament Library
  as their source.
- UK National Archives: `FO 371/75466`, with known correspondence dated
  19 July and 13 October 1949.
- Iranica was used only to identify the underlying archival documents, not as
  claim evidence.
- No asset was added or changed.

## Validation

- Checked exact title, ISBN, catalog identifiers, Google Books searchability,
  Open Library metadata, Library of Congress digitization metadata, Internet
  Archive holdings, Iranian article-title searches, and commercial archival
  indexes.
- Rechecked Iran Archive's complete relevant title run, editor indexes,
  National Front and Iran Party collections, linked opposition libraries, and
  public Telegram previews; queried Mashruteh's public API by title, ISBN,
  editor, and six chapter titles.
- Confirmed the archived `SUP-056` snapshot contains the article body,
  bibliography, and forty numbered notes, computed its checksum, and confirmed
  that `docs/research/sources/` remains ignored by Git.
- Queried the Wikimedia Commons API to identify both Oil Commission volumes;
  downloaded and checksummed the 198- and 169-page PDFs; used local PDF.js
  inspection to verify page counts, image-only status, title pages,
  print-order numbers, period labels, and sampled opening and closing pages.
- Repeated targeted Persian-title and author searches for the deputy-statistics,
  religious-election, Mesbahzadeh, and land-reform chapters. No standalone
  scholarly copy was found; lower-authority web essays were not promoted into
  claim sources.
- Confirmed that the Qatar Digital Library's open Hazhir and Tehran files do
  not supply the two target documents. Locally inspected all 259 carrier
  pages of `IOR/L/PS/12/1225` through PDF.js text extraction, recorded its
  128-folio identity and checksum as `SUP-054`, and preserved the distinction
  between overlapping date coverage and archival equivalence.
- Checked internal links and Markdown formatting; both sources remain
  explicitly unavailable rather than cited as reviewed.
- Added recent-source integrity coverage for `SUP-054` through `SUP-059` and
  reran `node --test test/research-sources.test.js`.
