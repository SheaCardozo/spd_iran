# Ketabnak substitute-evidence map

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Replaced the undifferentiated “obtain the Ketabnak books” queue with a
claim-specific substitute-evidence map. Ingested Mehdi Bazargan's official
collected works volume 34 as `SUP-081` and the first volume of his
Nejati-mediated memoir as `SUP-082`. The map explains which oil-dispossession
and Kashani questions the existing archive can answer, which missing books
would still add unique evidence, and what subjects occupy the sixteen-page
gap in `SUP-080`.

The unavailable queue now distinguishes a useful but non-blocking original
from an irreplaceable gap. Kashani volume IV and the volume V addenda are
demoted, while specific missing pages or newspaper dates remain requestable
when a claim requires them.

## Reason

Ketabnak's download path remains access-controlled and no complete alternate
mirror was found. Treating every inaccessible carrier as an equal blocker
overstated the research problem. The project needs a defensible evidentiary
route for historical claims, not necessarily one particular modern
compilation.

## Dynamic SPD comparison

Dynamic SPD provides a readable bibliography in
`source/scenes/credits.scene.dry` and broad source discussion in
`HISTORICAL_ANALYSIS.md`. It does not maintain a local acquisition taxonomy,
carrier checksums, or a claim-by-claim substitution matrix.

This project retains the readable-source principle but continues the
Iran-specific research divergence: participant evidence, official records,
press, and scholarship are cross-referenced without pretending that one
source class silently replaces another. No runtime architecture or game
mechanic changed.

## System fit

The new map links the available-source catalog, unavailable queue,
bibliography trust records, participant acquisition audit, and local source
archive. Future event writers can now select the actual evidence for a claim
and see the residual limitation without reopening a failed access search.

## Research and assets

`SUP-081` is an official Bazargan Foundation publisher PDF. `SUP-082` is an
unchanged image scan supplied through Iran Archive for noncommercial research.
Bazargan's direct operational access makes both valuable, but his
retrospective testimony remains interested participant evidence. A passage
that `SUP-081` reproduces from Makki is explicitly marked as transmission
through Makki rather than independent corroboration.

No game narrative, historical claim, or visual asset was changed.

## Validation

- Visually verified the title and publication matter of both acquisitions.
- Parsed `SUP-081` as a 606-page searchable PDF and checked its contents,
  contemporary oil speeches, retrospective oil interview, appendices, and
  terminal sequence.
- Parsed `SUP-082` as a 682-page image scan and visually checked its title,
  colophon, contents, oil chapter, and terminal leaf.
- Confirmed SHA-256 values
  `67d62ea6a38d4be1864500588259b6d845496f4a476acb95ec6bcbc1c5e64561`
  and
  `b8bcf6549e449b383ed8f12bab79bd6aaeab2525c89b8e48bc31ad7ce7f157bf`.
- Compared the contents and adjacent page images in `SUP-080` to bound the
  missing printed pp. 425–440 without reconstructing their text.
- Added source-presence, sidecar, and checksum regression coverage.
- `npm test` passed all five test files after rebuilding the browser and
  standalone primer outputs.
- `git diff --check` passed.
