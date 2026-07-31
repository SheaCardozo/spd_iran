# v0.3 rendered adversarial repair pass

- **Date:** 2026-07-30
- **Status:** Implemented

## Summary

Repaired the blocking, accessibility, feedback, roster, balance, and writing
findings from four completed qualitative rendered-browser playthroughs. The
repair adds safe pregame sidebar behavior, dependable chamber-place controls,
mandatory adviser reconciliation, transparent chamber vote partitions,
resource strain, staged recurring projects, clearer hand/deck feedback,
phase-correct card gating, and player-facing political prose.

The source review and acceptance list are recorded in
[`docs/reviews/2026-07-30-v03-rendered-adversarial-repair-review.md`](../reviews/2026-07-30-v03-rendered-adversarial-repair-review.md).

## Reason

The initial v0.3 convergence was traversable and produced distinct endings,
but its first black-box qualitative review found one pregame exception,
incorrect seat-to-dossier focus, a bypassable adviser invariant, obsolete
late cards, underexplained agenda and chamber results, repeatable flat project
rewards, and several internal labels in public prose. These problems made the
political simulation harder to read and easier to exploit than its underlying
state warranted.

## Dynamic SPD comparison

The corresponding reference paths are:

- `source/scenes/main.scene.dry` and
  `source/scenes/easy_discard.scene.dry` for the four-card agenda and safe
  cancellation;
- `source/scenes/advisors/shuffle_leadership_pinned.scene.dry` and
  `source/scenes/party_affairs/shuffle_leadership.scene.dry` for a pinned
  three-person leadership manager;
- `source/scenes/post_event.scene.dry` for central time, timer, derived-state,
  and event-routing ownership;
- `source/scenes/party_affairs/media.scene.dry`,
  `fundraising.scene.dry`, `party_organizations.scene.dry`, and
  `inter_party_relationships.scene.dry` for persistent organizational work
  whose later use depends on prior investment; and
- `out/html/game.js`, `out/html/game.css`, and `out/html/index.html` for the
  central sidebar refresh and tab structure.

Iran retains those responsibility boundaries. It adapts the agenda with an
explicit explanation for open hand slots and exhausted decks, and adapts the
leadership manager so historical eligibility changes can require an immediate
reconciliation without consuming a month. It diverges by hiding the
uninitialized sidebar before campaign start and by making every chamber place
an accessible dossier control. Dynamic SPD has no equivalent place-level
parliament SVG to copy.

## System fit

Adviser eligibility now owns a reconciled signature. Only a real entry or
departure overrides the roster cooldown, required reconciliation cannot
return to the hand, an unchanged slate does not restart the timer, and event
routing resumes only after exactly three eligible advisers are active.

The chamber reducer now derives supporting, conditional, and opposing counts
that exactly partition attending scenario records. The status surface and
terminal scenes state all three groups and the required majority. Historical
evidence remains immutable; exact scenario influence and administrative
pressure stay in debug mode.

Resources now feed back monthly: operating at zero reduces press capacity and
one active component's organization without disabling the free choice on any
card. Persistent projects use stage, prior direction, costs, and diminishing
returns instead of granting the same package indefinitely.

Every paid choice now states its one- or two-resource cost while it is still
available, and January reports annual subscription income instead of changing
the treasury silently. The corresponding Dynamic SPD recurring cards expose
costs directly in their subtitles (for example
`party_affairs/party_organizations.scene.dry`,
`campaigning.scene.dry`, and `media.scene.dry`). Iran retains that disclosure
responsibility while writing the cost into the political description rather
than presenting a detached optimizer label.

The Majles and Senate vote partitions now freeze once the relevant chamber
acts. Dynamic SPD's `election_algorithm.scene.dry` converts the live support
simulation into an election result that later systems consume; Iran adapts the
same resolved-result boundary to place-level oil positions. Later
cross-chamber work can change the Senate contest, but cannot retroactively
rewrite the displayed Majles vote.

Pregame guards, correct place closures, keyboard activation, semantic seat
names, phase gates, action-target correction, and explicit hand/deck messages
do not alter the one-action month or shared-state ownership.

The SVG also has a touch-sized place-dossier selector and a persistent selected
state. On compact layouts its densely packed marks are visual-only, avoiding
scores of impossible eight-pixel touch controls while retaining the selector
as the complete interactive route. Dynamic SPD has no place-by-place chamber
control, so this remains an Iran-specific accessibility surface rather than a
copied interaction.

Terminal chamber routing now updates the public phase label, and the ending
calls the chamber-wide number “returns recorded” rather than incorrectly
describing every return as opposition-aligned.

When every remaining eligible card is already held or cooling down, the hand
now says so instead of instructing the player to draw into an impossible open
slot. Adviser and roster availability are suppressed after a terminal result,
and the Crown label now identifies its aggregate as current pressure on the
campaign.

## Research and assets

No new historical fact, source, or asset was introduced. Historical scene
claims retain their adjacent authoritative source comments. Revisions remove
methodological and resolver-facing language, expose the counterfactual vote
partition more plainly, and preserve the existing statement that an
unrecorded historical division is not being reconstructed.

## Validation

Validation is completed in the same repair pass and must include:

- deterministic engine, data-integrity, scene-standard, source, and UI tests;
- Chromium and Firefox browser coverage;
- the four parallel rendered-policy traversals;
- four fresh qualitative rendered-browser playthroughs;
- `git diff --check`; and
- a reproducible `out/html` build.

Completed deterministic validation:

- `npm test`: 10/10 suites passed;
- scene audit: 217/217 compiled scenes, zero failures;
- Playwright: 24/24 passed in Chromium and Firefox at 1440, 768, and 390
  pixels, including complete playthroughs;
- final rendered-policy batch:
  passage 168 actions, contrarian 168, cancellation 161, and first-choice
  159; all four reached a visible ending in Chromium. The report is
  `artifacts/adversarial-browser/2026-07-30-final3-policy-chromium/report.json`;
- four qualitative gateway reviewers completed or rechecked distinct
  390-, 1280-, and 1440-pixel paths with no oracle failures. Their routes
  included a 26-support Majles defeat and passage outcomes with different
  chamber partitions. They caught the resolved-vote, cost, touch-target,
  terminal-phase, return-label, income-notice, and post-cancellation feedback
  defects described in the review; every one received a focused repair and
  regression; and
- `git diff --check`: clean.
