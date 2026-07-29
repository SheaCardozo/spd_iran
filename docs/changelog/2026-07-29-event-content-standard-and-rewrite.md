# Event content standard and full v0.1 rewrite

- **Date:** 2026-07-29
- **Status:** Implemented

## Summary

Added the binding
[`SCENE_CONTENT_STANDARD.md`](../SCENE_CONTENT_STANDARD.md), commissioned an
independent adversarial audit of all four prologue scenes and fourteen campaign
events, and rewrote the complete historical spine.

Every event now has an orienting setup, a choice count justified by its actual
decision space, action titles and qualitative subtitles, and a consequence
passage that remains visible until the player acknowledges it. Fixed
institutional results use one continuation where no historical choice should
be invented; strategic scenes normally expose three distinct channels. The
rewrite also corrects the oil-committee rejection heading to 25 November 1950
and separates the 8 March committee recommendation from the 15 March Majles
approval.

## Reason

The mechanically complete v0.1 spine read as a sequence of terse state-update
forms. Sixteen of eighteen scenes were binaries, no event choice had a
subtitle, and most branches routed away before their consequence prose could
be read. The uniformity obscured both political tradeoffs and the boundary
between a fixed historical result and the organization the player can shape.

The source presentation also gave a focused supplemental article more
visibility than the controlling specialist monograph in the palace scene and
incorrectly grouped the later nine-article implementation-law locator with the
March nationalization principle.

## Dynamic SPD comparison

- **Reference paths:**
  `source/scenes/events/black_thursday.scene.dry`,
  `source/scenes/events/hindenburg_explode_referendum_campaign.scene.dry`,
  `source/scenes/events/panzerkreuzer.scene.dry`,
  `source/scenes/events/all_quiet.scene.dry`,
  `source/scenes/events/wittorf_affair.scene.dry`,
  `source/scenes/events/bruning_vonc.scene.dry`, and
  `source/scenes/events/young_plan_referendum.scene.dry`.
- **What Dynamic SPD does:** its developed events orient the player to the
  actors and institution, use one, two, three, or more choices according to the
  event, disclose salient costs or requirements in subtitles, and narrate the
  political result of the selected action.
- **Decision here:** retain the setup → choice → consequence responsibility
  boundary and variable choice count. Adapt numerical previews into
  qualitative institutional and coalition directions, and require an explicit
  continuation so Dendry cannot clear a result before it is read. Reject SPD's
  freedom to create broad counterfactual historical outcomes: assassination
  responsibility, chamber evidence, dates, and passage of nationalization
  remain fixed.
- **Divergence level:** local content and routing adaptation. The monthly
  action economy, tagged-event priority, shared state, post-event reducer, and
  terminal routing are unchanged.

Paths are relative to
`/home/phroz/spd/dynamic_social_democracy`.

## System fit

The prologue now has 81 valid strategy paths rather than sixteen binary paths,
while retaining the five-point cap on each starting modifier. Historical
events still resolve in the existing tagged priority queue and consume no
additional monthly action. Result acknowledgements add readable beats, not
time advancement.

Regression coverage now verifies developed setups, fixed one-choice and
multi-strategy three-choice pacing, choice subtitles, visible consequence content without immediate
`go-to`, all 81 prologue paths, the eighteen-action historical route, and a
browser-visible first consequence.

The independent review is preserved at
[`../reviews/2026-07-29-v01-event-adversarial-audit.md`](../reviews/2026-07-29-v01-event-adversarial-audit.md).

## Research and assets

The palace event now uses Fakhreddin Azimi, `MAJ-S1`, pp. 207–08, as its sole
implemented authority rather than displaying the narrower Nukii paper. Front
composition uses Ervand Abrahamian, `MAJ-S2`, chapter 5, especially printed
pp. 250–61. Constitutional revision uses Abrahamian, `MAJ-S3`, chapter 3,
especially pp. 82–86; First-Senate route uses the official `SUP-053` appointed
and elected tables.

Oil interpretation remains grounded in the specialist monographs `MAJ-S3` and
`MAJ-S14`. Exact committee acts now point to the official Oil Commission
record `SUP-059` by print order, period, meeting, and date. The March record
removes `SUP-006`, pp. 15–16, as evidence for the principle and identifies it
only as the later implementation-law boundary. The Senate ending states only
the chamber-level outcome permitted by the unavailable session-record
boundary.

No historical assets were added or changed.

## Validation

- Dendry build and hot-reload rebuild: passed.
- Engine autoplay: reaches Senate approval and the ending after exactly
  eighteen actions.
- All 81 prologue paths: passed the five-point modifier cap.
- Event-standard structural regression and visible consequence routing:
  passed.
- Full `npm test`: seven of seven suites passed.
- Playwright: twelve of twelve Chromium and Firefox tests passed at 1440,
  768, and 390 pixels, including complete playthroughs.
- `git diff --check`: passed.
- Independent post-rewrite adversarial gate: eighteen of eighteen scenes
  passed after the four narrow blocker corrections.
