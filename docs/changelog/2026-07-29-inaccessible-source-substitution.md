# Inaccessible-source substitution rules

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

- Added a claim-by-claim [second-best evidence
  map](../research/SECOND_BEST_EVIDENCE_STACKS_2026-07-29.md) for Iranian
  cabinet records, First Senate session 192, and Mohammad Nasser Qashqai's
  *Salhā-ye bohrān*.
- Reclassified the missing originals as targeted blockers: private
  ministerial deliberation, named Senate behavior, and diary-specific
  chronology remain unavailable, while institutional-scale representation can
  proceed from the documented evidence stacks.
- Preserved a complete third-party searchable transcript of Qashqai's Harvard
  oral history inside the ignored local source archive as a discovery aid. It
  is not treated as an official transcript or an independent source.

## Reason

Repeated repository, catalog, reader, and web searches did not locate complete
inspectable copies of the requested originals. Leaving them described simply
as highest-priority gaps obscured how much can already be established and
encouraged either unnecessary implementation paralysis or unsupported
reconstruction. The new map states both the usable route and the point at which
work must stop.

## System fit

Adviser, cabinet, and Senate mechanics can now be designed at the resolution
the evidence permits. Formal acts, public positions, contemporary attributed
reports, participant memory, and later synthesis remain separate layers. A
scene cannot turn an institutional outcome into an invented individual motive,
speech, vote, or veto.

## Dynamic SPD comparison

Dynamic SPD's
`source/scenes/government_affairs/shuffle_cabinet.scene.dry` treats ministries
as stable party assignments and makes cabinet reshuffling a recurring
mechanical choice. Its `source/scenes/credits.scene.dry` provides a readable
bibliography, while `HISTORICAL_ANALYSIS.md` notes that many mechanics lack
scene-level historical support.

This project retains the legibility of named portfolios and chamber-scale
politics, but diverges from stable party-cabinet arithmetic where Iranian
evidence is personal, institutional, and portfolio-specific. The divergence is
evidentiary rather than architectural: existing state and scene patterns are
unchanged, and unsupported private conduct is withheld instead of inferred.

## Research and assets

The Qashqai transcript carrier is marked all-rights-reserved and remains local;
it is not a redistributable game asset. Its eight transcript headings do not
map cleanly onto Harvard's seven cataloged delivery objects, and no transcriber
or method is identified. Exact language must be checked against official
Harvard audio. No historical asset changed.

## Validation

- Rechecked the three prior acquisition audits and the current available,
  unavailable, and bibliography registries.
- Verified the Qashqai HTML checksum and recorded its source, retrieval date,
  rights warning, and transcript/audio mismatch.
- Cross-checked the cabinet and Senate substitutes against the locally archived
  official, contemporary, participant, and scholarly carriers.
- Passed the documentation-integrity suite and targeted source-taxonomy and
  Harvard-oral-history tests; `git diff --check` is clean. The full local
  archive sweep still reports the separate in-progress `SUP-027` file-count
  mismatch (140 local files against 103 cataloged), outside this evidence-map
  change.
