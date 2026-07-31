# Rendered-browser adversarial harness

- **Date:** 2026-07-30
- **Status:** Implemented

## Summary

Added a player-only browser gateway, isolated visual and accessible sessions,
parallel rendered-play smoke policies, private invariant checks, and
screenshots/transcripts/traces/video artifacts. The gateway serves the
generated build on an ephemeral loopback port and does not publish it.

## Reason

The engine tests can traverse Dendry without rendering the game, while the
fixed Playwright suite uses selectors and direct state inspection. Neither is
the same as asking an adversarial reviewer to understand and operate the game
from the player surface. The new boundary permits that review without granting
the agent a scene, source, selector, or `Q` interface and allows multiple
isolated runs to proceed concurrently.

## Dynamic SPD comparison

Dynamic SPD exposes its public runtime through `out/html/index.html`,
`out/html/game.js`, and `out/html/game.css`. Its Dendry browser supports the
same cards, choices, pinned advisers, status panels, saves, and responsive
presentation that a player operates, but the reference checkout contains no
automated test suite, black-box agent protocol, private invariant oracle, or
parallel browser-player runner.

Iran retains the Dynamic SPD rendered browser as the subject under test. It
adds an external Playwright adapter under `scripts/browser-agent/` rather than
creating a second game or engine interface. The adapter rejects arbitrary
navigation and external requests and exposes only screenshot/accessibility
observation and player actions. This is a testing-tooling addition, not a
divergence in the runtime, state, hand, event, or persistence architecture.

## System fit

`scripts/browser-agent/static-server.js` serves only `out/html`.
`session.js` owns isolated browser contexts, public observations/actions,
private checks, and artifacts. `gateway.js` provides keyed JSON-lines requests
for external reviewers. `batch.js` and `policies.js` validate parallel
operation through accessible rendered controls. Same-session gateway requests
are serialized while different sessions remain parallel. Built-in policies
are smoke drivers, not claimed LLM reviews.

Adversarial contexts now remove the player-only Status, Research Library,
Save/Load, and Options utilities. Their header links and overlays are absent,
their entry functions and full-page scene routes are blocked, and matching
scene links are removed. The Main, Opposition/Coalition, Support, Parliament,
and Crown sidebar tabs remain available to the reviewer. Autosave, slots,
quick persistence, import/export, storage, and browser reload are also
disabled. A reviewer therefore receives one continuous decision history and
cannot branch or rewind through the ordinary player save system. This lock
exists only in the external harness; the public game's utilities and
persistence behavior are unchanged.

During validation, an unavailable parliamentary deck was initially classified
as actionable because Dynamic SPD's browser class is `unavailable-card`,
whereas unavailable scene choices use `unavailable`. The accessible adapter
now recognizes both. A temporary fallback card used to investigate the report
was removed after private state confirmed that Party Affairs still had legal
cards; the sixteen-card design and game economy were not changed.

The investigation also showed that Dendry's incremental build retained scenes
after their source file was deleted. `scripts/build.js` now records the
generated list of `.dry` inputs and removes the single disposable
`out/game.json` compiler product when a previously compiled input disappears.
It does not clean every build: clean Dendry compilations vary the quoting of
equivalent generated function strings, while incremental no-change builds are
byte-reproducible. Dynamic SPD keeps customized generated output in place and
does not provide this deletion check; Iran retains its tracked-overlay build
model.

The private oracle checks bounds, adviser count, chamber record derivation,
historical-evidence immutability, finite values, overflow, and browser errors.
It returns only failure counts and state hashes to the action transcript. The
full initial state remains in a private artifact for replay and does not
restore a public seed.

The gateway is not an operating-system sandbox. Enforced source isolation
requires the calling agent to run without the repository mount or filesystem
tools and to receive only the gateway capability. This limitation is stated
in the testing documentation.

## Research and assets

No historical claim, scene, source locator, bibliography record, or asset was
added or changed. Browser recordings contain the existing rendered game and
are ignored local test artifacts, not distributable historical assets.

## Validation

Protocol tests cover path traversal, strict session IDs, the absence of
selector/state/source methods, allowed player actions, accessible filtering,
the player-only utility boundary, retained sidebar tabs, same-session
serialization, and policy choice from rendered controls. The external
JSON-lines gateway was exercised at a 390-pixel viewport from session creation
through observation, player action, close, and shutdown.

Passage, contrarian, cancellation-heavy, and first-available policies ran in
four parallel isolated sessions on both Chromium and Firefox. All eight runs
reached visible endings after 162–168 rendered browser actions with no oracle,
policy, or browser failure. The ordinary nine-suite `npm test`, 217-scene
audit, 18-test/six-project browser matrix, and `git diff --check` pass. After the
generated source-input manifest was established, two consecutive `out/html`
builds produced aggregate SHA-256
`4ed84e2751bb176c81a435316d88f27785c510d0e3b0fa647ef460eb84651023`.

After restricting the four player-only utilities, the four Chromium policies
were rerun in parallel. All reached a visible ending after 162–168 actions;
the per-action oracle found neither an exposed player utility nor a missing
sidebar tab.
