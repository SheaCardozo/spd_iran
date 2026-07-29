# v0.1 end-to-end public demo

- **Date:** 2026-07-29
- **Status:** Implemented as `0.1.0`

## Summary

Completed the four-scene February–October 1949 prologue and eighteen-action
October 1949–March 1951 campaign. Added twelve actions across three decks, six
advisers with a three-person active roster, the fourteen-anchor event spine,
four component coalition records, expanded Crown state, 136 Majles and 60
Senate place records, structured oil proposals, seeded bounded variation,
versioned saves, a Research Library, four ending evaluations, claim-level
event/adviser records, and deterministic engine/data tests.

## Reason

The project needed one complete playable historical argument rather than a
larger collection of disconnected foundations. The March 1951 endpoint allows
the current institutional, coalition, and oil systems to reach a fixed
historical conclusion without prematurely implementing premiership, embargo,
international litigation, or coup mechanics.

## Dynamic SPD comparison

- **Shared state and startup:** SPD `source/scenes/root.scene.dry` initializes
  one large `Q`. Retained for campaign, save, adviser, faction, chamber, oil,
  decision, event, and ending state.
- **Monthly hand and tagged decks:** SPD `source/scenes/main.scene.dry` and
  `source/scenes/party_affairs/*.scene.dry` use tagged decks and commit time
  when a normal card opens. Retained and expanded to three Iran-specific decks.
- **Central reducer and event routing:** SPD
  `source/scenes/post_event.scene.dry` ticks timers, reduces shared state, uses
  `_compileChoices`, and routes every eligible `#event`. Retained. Iran adds
  record-derived chamber totals, component-derived cohesion, ending formulas,
  and a whitelisted xorshift32 update.
- **Advisers and roster:** SPD `source/scenes/advisors/wels.scene.dry`,
  `source/scenes/advisors/shuffle_leadership_pinned.scene.dry`, and
  `source/scenes/party_affairs/shuffle_leadership.scene.dry` expose pinned
  figures, one shared cooldown, and three active leaders. Retained and adapted
  to six researched figures; Kashani is explicitly an independent counterpart.
- **Monarch:** SPD separates Hindenburg relationship and anger in
  `source/scenes/root.scene.dry`,
  `source/qdisplays/hindenburg_angry.qdisplay.dry`, and
  `source/scenes/post_event.scene.dry`. Adapted to relationship, resistance,
  court capacity, and electoral influence. Iranian events own royal conduct.
- **Parliament:** SPD's Reichstag summaries and election reducer appear in
  `source/scenes/status.scene.dry` and
  `source/scenes/election_algorithm.scene.dry`. Retained only for centralized
  summary responsibility. Rejected the proportional vote-to-seat algorithm
  and permanent party chart; Iran uses separate evidence/scenario records.
- **Library and endings:** SPD `source/scenes/library.scene.dry`,
  `source/scenes/game_over.scene.dry`, and
  `source/scenes/ending_slides.scene.dry` use special scenes and conditional
  end-state presentation. Retained and adapted to a research library, four
  formula-driven scores, seed display, and a causal recap.
- **Browser shell and saves:** SPD `out/html/index.html` and
  `out/html/game.js` provide sidebar, settings, and save/load conventions.
  Retained via the tracked `web/` overlay; added schema validation and seeded
  replay. Keeping generated output disposable remains the existing local
  tooling divergence.

No major architectural divergence was introduced. Constituency records,
structured oil terms, fixed historical passage, and bounded uncertainty are
Iran-specific adaptations inside the planned responsibility boundaries.

## System fit

`root.scene.dry` owns all persistent state. Normal cards set
`month_actions`; `post_event.scene.dry` advances the clock, runs bounded
variation, ticks timers, derives coalition/chamber/ending state, and drains
eligible events by priority. March 1951 deliberately receives the eighteenth
normal action before Senate approval closes the campaign. Sidebar and Library
read the same state. Saves include seed and PRNG state.

## Research and assets

The implemented claims use existing registered scholarship and official
records: `MAJ-S1`–`MAJ-S3`, `MAJ-S13`–`MAJ-S15`, `SUP-006`, `SUP-007`,
`SUP-008`, `SUP-051`, and `docs/research/SIXTEENTH_MAJLES_LEDGER.md`.
Individual records under `docs/research/events/` and
`docs/research/people/` distinguish anchors, disputes, counterfactual choices,
and mechanical abstractions. Unknown oil and member fields remain null. No new
historical asset was added, so `ASSETS.md` required no change.

## Validation

`npm test` rebuilds `out/html` and the standalone primer, then checks all
prologue paths, adviser cooldowns, event priority and one-time routing,
eighteen-action autoplay through Senate approval, exact 136/60 record counts,
unique IDs, evidence/scenario separation, oil-term structure, twelve cards,
six advisers, browser-overlay synchronization, research-source integrity,
documentation, color contrast, and archive checks. `git diff --check` is also
required before handoff.

The Playwright matrix passed twelve cases: onboarding, sidebar tabs, keyboard
navigation, Research Library return, normal and pinned cards, save/load,
import/export, seeded URLs, ending presentation, dark/grayscale modes, and
complete playthroughs in Chromium and Firefox at 1440, 768, and 390 pixels.
Because the container lacks browser shared libraries and passwordless `sudo`,
the validation run used the official Playwright browsers with the four missing
Ubuntu libraries extracted into a temporary, untracked directory.
