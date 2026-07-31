# Rendered-browser adversarial testing

## Purpose

Adversarial playtesting should exercise the game a player receives: generated
HTML in a real browser, visible prose, cards, controls, responsive layout,
keyboard focus, and browser persistence. It must not become a privileged
shortcut into Dendry scene IDs or shared `Q` state.

The browser-agent harness therefore serves the generated `out/html` build on
an ephemeral loopback port and controls isolated headless Chromium or Firefox
contexts through Playwright. Nothing is deployed or made available outside
`127.0.0.1`.

## Player-only boundary

The JSON-lines gateway at `scripts/browser-agent/gateway.js` exposes:

- creation of an isolated visual or accessible browser session;
- observation of the rendered viewport;
- screenshot, visible-text, focus, and accessibility observations according
  to the selected mode;
- coordinate clicks, keyboard presses and typing, scrolling, waiting, browser
  back; and
- accessible activation by a rendered role and accessible name in accessible
  mode.

It deliberately has no selector, JavaScript-evaluation, arbitrary navigation,
scene-ID, source, save-state, or `Q` method. Browser requests outside the
ephemeral game origin are blocked. Downloads are disabled. The gateway does
not accept executable policy code.

Status, Research Library, Save/Load, and Options are player-only utilities.
Their header controls and overlays are removed from every adversarial context,
and their full-page entry points are disabled. Scene links to the full Status
page or Research Library are also removed. Agents retain the live sidebar and
may inspect its Main, Opposition/Coalition, Support, Parliament, and Crown
tabs.

Persistence is disabled inside every adversarial context. Autosave, manual
save/load, quick save/load, import, export, and deletion methods are replaced
with no-ops; browser storage is cleared; and browser reload is not an allowed
action. This forces one continuous decision history. The ordinary player
build, utilities, settings, and save system are unchanged.

Visual mode returns the screenshot, viewport, focus, title, and local URL.
Accessible mode additionally returns the accessibility snapshot, rendered
visible text, and a list of enabled or disabled accessible controls with their
visible page region and bounding boxes. The accessible list models the link
and control enumeration available to assistive technology; it is not a DOM
selector interface.

The gateway is a capability boundary, not by itself an operating-system
sandbox. To **enforce** that an LLM agent cannot inspect the repository, run
the agent without a repository mount or filesystem/terminal tools and provide
only a wrapper around the gateway's `observe` and `act` requests. A Codex
subagent inside this workspace shares the filesystem and can only be asked,
not forced, to respect the black-box boundary.

## Local use

Install Playwright's browser runtimes, build the game, then start the gateway:

```sh
npm run browser:agent
```

The gateway reads one JSON object per line on standard input and writes keyed
JSON responses to standard output:

```json
{"id":1,"method":"create","params":{"sessionId":"reviewer-1","mode":"accessible","viewport":{"width":1280,"height":800}}}
{"id":2,"method":"observe","params":{"sessionId":"reviewer-1"}}
{"id":3,"method":"act","params":{"sessionId":"reviewer-1","action":{"kind":"activate","role":"link","name":"Begin the Historical Scenario"}}}
{"id":4,"method":"close","params":{"sessionId":"reviewer-1"}}
{"id":5,"method":"shutdown"}
```

Visual agents normally use `click`, `press`, `type`, and `wheel`. Accessible
agents may also use `activate`. Requests may be in flight concurrently and are
matched by their top-level `id`; actions for the same session are serialized,
while separate sessions may proceed in parallel. `--max-sessions` limits
simultaneous contexts. Launch one gateway process per reviewer when
process-level crash isolation is preferable to shared-browser efficiency.

## Parallel smoke policies

The repository includes small non-LLM policies to validate the transport and
exercise concurrent rendered play:

```sh
npm run test:agents
npm run test:agents -- --runs 8 --browser chromium
npm run test:agents -- --runs 4 --browser firefox \
  --profile passage,contrarian,cancellation,first
```

These policies make decisions from accessible rendered controls. They are
not substitutes for qualitative LLM review. Their job is to prove that
multiple isolated players can traverse the actual browser, detect deadlocks,
and produce artifacts before a more capable adversarial agent is connected.

## Private oracle and artifacts

The player never receives hidden state. A separate private oracle checks after
each browser action:

- finite state values and action/calendar bounds;
- no more than three active advisers;
- the immutable 136-place Majles and 60-place Senate evidence ledgers;
- settled chamber totals against their scenario records;
- mutation of historical chamber evidence;
- horizontal overflow; and
- browser console, page, and request failures.

The oracle stores only its failure count and a private state hash in the
player-action transcript. Maintainer artifacts include:

- viewport screenshots for every observation;
- a JSON-lines player transcript;
- a Playwright trace without source capture;
- browser video;
- console and oracle summaries; and
- a private initial state snapshot for exact replay without adding a public
  run seed.

Artifacts default to `artifacts/adversarial-browser/` and are ignored by Git.
They may contain save state and should not be supplied to the reviewing agent.
Long runs are intentionally artifact-heavy; use a temporary `--artifacts`
directory in CI if retention is unnecessary.

## Responsibility boundary

Rendered-browser agents can judge whether the political situation is
understandable, whether choices and consequences connect, whether navigation
or cards deadlock, and whether layouts remain operable. They do not replace:

- engine/data-integrity tests for exhaustive hidden-state invariants;
- source audits for historical authority and claim locators; or
- the fixed Chromium/Firefox Playwright matrix for deterministic UI
  assertions.

An adversarial report should cite transcript steps and screenshots, not hidden
quality values. A maintainer may use the corresponding private hashes and
trace to diagnose the report afterward.
