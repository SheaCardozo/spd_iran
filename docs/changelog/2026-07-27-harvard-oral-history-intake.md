# Harvard Iranian oral-history intake

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

Added `SUP-061`, a selected local archive of the Harvard Iranian Oral History
Project:

- complete official transcript facsimiles for Karim Sanjabi, Nosratollah
  Amini, Mehdi Azar, and Mozaffar Baghaie-Kermani;
- the complete seven-tape public Harvard audio delivery for Mohammad Nasser
  Ghashghaie, whose HOLLIS group exposes no transcript object;
- official collection and item metadata, persistent identifiers, IIIF
  manifests, HLS playlists, and file-level checksums; and
- explicit rules for using retrospective participant testimony.

The bibliography and availability catalogs now identify the preserved forms
and planned use. `P19` has been removed from the accessible-intake list in the
unavailable-source register.

## Reason

These interviews can supply unusually detailed leads about ministerial
selection, access to Mossadegh, National Front relationships, Baghai's break,
and Qashqai political networks. Online availability made a lawful local
research copy practical, but a carrier page or third-party transcription was
not sufficient. Preserving Harvard's own page images, manifests, metadata,
and public audio delivery keeps later citations verifiable.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/credits.scene.dry`,
  `source/scenes/advisors/hilferding.scene.dry`,
  `source/scenes/advisors/rosenfeld.scene.dry`, and
  `source/scenes/advisors/stampfer.scene.dry`.
- **What Dynamic SPD does:** its credits combine scholarly works and
  participant memoirs, while named advisers recur as stateful political
  actors with mechanical effects.
- **Decision here:** retain participant testimony as a legitimate source for
  political voice and actor relationships, but add an Iran-specific evidence
  gate before it informs an adviser or cabinet effect. A narrator's memory is
  evidence of that narrator's testimony; private decisions and causal claims
  still require comparison with contemporary records and scholarship.
- **Divergence level:** research preservation and source governance only. No
  runtime, state, turn-loop, or persistence architecture changed.

## System fit

`SUP-061` supports the prosopographical work required before recurring adviser,
cabinet, foreign-actor, or regional mechanics can be specified. Its selected
scope matches the immediate actor list rather than mirroring all 118 digitized
narratives. Stable transcript page order and preserved audio playlists make
future claim metadata possible without coupling game code to Harvard's live
delivery systems.

## Research and assets

The source is an institutionally preserved Persian-language primary oral
history collection directed by Habib Ladjevardi. Four interviews were
available as full transcript facsimiles; the Qashqai interview was audio-only.
The preserved material remains local and ignored by Git.

The interviews were recorded roughly thirty years after the 1951–53 crisis.
They are vulnerable to self-justification, later political experience, memory
compression, and retrospective knowledge. Sanjabi's interview must not be
counted as independent corroboration of his published memoir without checking
their textual relationship. No historical claim was implemented from these
interviews during intake, and no visual asset changed.

## Validation

- Matched every selected interview to its HOLLIS component and Harvard NRS
  persistent identifier.
- Confirmed the absence of a Qashqai transcript object in the official finding
  aid and preserved all seven public audio tapes instead.
- Verified that Harvard's alternate documented IIIF endpoint returned
  byte-identical JPEG data for a sample transcript page.
- Checked transcript canvas counts against the saved page counts.
- Generated and verified the complete file-level SHA-256 inventory.
- Ran documentation, source-integrity, and complete project tests plus
  `git diff --check`.
