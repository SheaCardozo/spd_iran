# Implementation baseline

## Current rule

Use *Dynamic Social Democracy* as the structural baseline and diverge
piecemeal. A system remains SPD-like until a specific design or historical
requirement demonstrates why it should change.

This reverses any earlier assumption that the project must first design a wholly
different interaction model. The long-term design document remains a source of
candidate divergences, not a requirement to replace proven Dendry structures
before the campaign is playable.

## “What did Dynamic SPD do?” gate

Every implementation or design change begins with a comparison against the
local Dynamic SPD reference at
`/home/phroz/spd/dynamic_social_democracy`. The developer should:

1. identify the matching Dynamic SPD scenes, state variables, reducer path,
   deck pattern, UI, or toolchain;
2. describe the behavior and the responsibility boundaries it establishes;
3. decide explicitly what this project retains, adapts, or rejects; and
4. record that decision, including exact reference paths, in the dated entry
   under `docs/changelog/`.

This is an architectural gate, not a demand for visual or mechanical identity.
When a difference is small and local, the changelog rationale is enough. Before
a major divergence is implemented, this document or a linked design note must
describe its motivation, effects on dependent systems, migration strategy, and
validation. Major divergences include the core turn loop, shared-state
ownership, event routing, hand/deck semantics, action economy, time advancement,
status UI, persistence, and build/runtime structure.

Dynamic SPD is not a historical source. Iran-specific content and mechanics
still require independent research and claim-level citations.

## Browser baseline

The generated browser experience now follows Dynamic SPD's customized
`out/html/game.css`, `game.js`, and `index.html` conventions:

- the same warm paper palette, typography, card geometry, hover treatment,
  overlays, dark mode, and responsive breakpoints;
- a persistent left status panel with live tabs;
- visible Status, Save/Load, and Options controls;
- event-image, animation, color-scheme, and colored-text settings; and
- SPD's special-scene return behavior for the full Status page.

Only controls backed by implemented Iran systems are exposed. Music, mod
loading, D3 election graphs, and the hidden right-hand scheming panel remain
out until their dependent systems exist.

Dynamic SPD stores its customized files directly in generated `out/html/`.
This repository deliberately keeps them in `web/` and overlays them after the
Dendry build. This local tooling divergence makes `out/` reproducible and
disposable without changing the runtime UI model.

Historical scene prose uses the semantic classes and authoring rules in
[`COLOR_STYLE_GUIDE.md`](COLOR_STYLE_GUIDE.md). The same palette is implemented
in `web/game.css` and `web/timeline.css`, so the playable campaign and its
historical primer share one visual language. The CSS class names, not their
current hexadecimal values, are the content-facing interface.

Playable historical scenes also follow
[`SCENE_CONTENT_STANDARD.md`](SCENE_CONTENT_STANDARD.md). That standard adopts
Dynamic SPD's setup → choice → consequence rhythm, requires the number of
choices to match the actual decision space, defines information-only and
internal-only exceptions, and makes an independent scene-by-scene source and
content audit part of release readiness. Choice subtitles state political
logic and likely reaction rather than quality names; `?debug=1` adds
hover/focus tooltips derived from the target scene's exact immediate state
changes.

## Implemented v0.1 architecture

The current build follows SPD in these respects:

- one shared `Q` state initialized in `root.scene.dry`;
- a card hand with Party Affairs, Public Campaign, and Parliamentary Affairs
  decks containing sixteen recurring actions across the full campaign;
- action cards selected by tags and gated by cooldown timers;
- opening a normal action card commits the current month;
- `post_event.scene.dry` advances the calendar, ticks timers, bounds state, and
  resolves every eligible tagged event before returning to the hand;
- six continuously pinned adviser cards share one cooldown without spending
  the monthly action;
- a tabbed status sidebar exposes the live simulation state;
- the Shah has separate relationship, resistance, court-capacity, and
  electoral-influence state, adapting SPD's separation of Hindenburg's
  relationship and anger;
- 136 Majles and 60 Senate place records separate historical evidence from
  mutable scenario state; reducers derive every public total from the records;
- coalition cohesion is derived from four component prefixes, each with
  strength, relation, dissent, and organization;
- Gass–Golshayan, nationalization, and the player's minimum position use
  separate term-by-term records with explicit nulls;
- the campaign begins with an ordinary January 1949 hand and then runs exactly
  twenty-seven monthly actions through March 1951;
- before the National Front forms, the Party Affairs deck deals
  opposition-network cards rather than relabelling a nonexistent coalition;
- new campaigns use Dendry's normal randomized deck stream, which continues
  from stored engine state when a save is loaded;
- a special-scene Research Library and conditional scorecard ending mirror
  SPD's Library and game-over responsibility boundaries;
- browser saves persist `save_schema_version = 3` and reject saves from the
  retired compressed opening;
- annual organizational income is applied at year rollover.

All numerical action effects remain game-balance abstractions rather than
historical measurements. Historical anchors, dates, identities, source
confidence, and passage of nationalization do not vary with deck order or
choice.

## Source layout

| Path | Responsibility |
| --- | --- |
| `source/scenes/root.scene.dry` | Menu and initial shared state |
| `source/scenes/events/1949/` | Sourced opening and tagged historical events |
| `source/scenes/main.scene.dry` | Hand, decks, and recurring briefing |
| `source/scenes/advisors/` | Pinned advisers using one shared cooldown |
| `source/scenes/party_affairs/` | Organizational action cards |
| `source/scenes/public_campaign/` | Press, meeting, bazaar, and legal-response actions |
| `source/scenes/parliamentary_affairs/` | Election, credential, oil-committee, and deputy actions |
| `source/scenes/post_event.scene.dry` | Calendar, shared reducers, and tagged-event routing |
| `source/scenes/status.scene.dry` | Visible state |
| `source/scenes/research_library.scene.dry` | Special-scene research interface |
| `source/scenes/campaign_ending.scene.dry` | Score presentation and causal recap |
| `source/qdisplays/` | Shared human-readable quality displays |
| `web/` | Reproducible Dynamic SPD-style browser overlay |
| `docs/research/events/` | Claim-level research records |

## January 1949 campaign-start divergence

The first public-demo implementation compressed February–September 1949 into
four consecutive decisions before an eighteen-action monthly campaign. That
prologue is removed. New campaigns begin in January 1949 and use the ordinary
monthly action economy from the first hand onward.

Dynamic SPD does not use a separate prologue. Its
`source/scenes/root.scene.dry` initializes January 1928 directly, and
`source/scenes/main.scene.dry` gives the player normal monthly party work
before the May election. Historical developments enter the same hand and
post-event loop used later in the campaign. The Last Majles now retains that
pattern directly: the player receives an ordinary January hand, then the
February attempt and emergency measures, May constituent assembly, July
election preparations, and October palace protest resolve as dated events
between ordinary actions.

This changes the core turn loop and therefore has the following system-wide
consequences:

- the campaign contains twenty-seven monthly actions, January 1949 through
  March 1951 inclusive;
- `post_event.scene.dry` remains the sole owner of calendar advancement,
  cooldown ticks, reducers, and tagged-event priority;
- pre-Front actions modify the political circles that may later enter the
  coalition, but no Front structure or aggregate cohesion is presented as an
  existing institution before October;
- the election-facing parliamentary deck unlocks when election preparations
  become active, while Front-specific Party and Public Campaign cards retain
  their historical gates;
- the additional nine actions require separate early-card cooldowns so the
  ordinary hand cannot deadlock and so later Front cards do not begin the
  campaign already cooling down;
- browser saves use schema version 3. Earlier saves began under retired
  October- or February-start chronologies and are rejected rather than
  silently loaded into the new calendar.

The migration is deliberately simple because no published save format has
been promised: begin a new campaign. Validation covers the January hand,
February/May/July/October anchors, twenty-seven calendar advances, event priority,
pre-Front card gating, save rejection, and the unchanged 20 March 1951
terminal route.

## v0.1 release boundary

The implemented release ends on 20 March 1951. Extending into Mossadegh's
premiership would add an economic and international layer and is not an
implicit continuation of the current reducers. Any change to the monthly
action economy, shared-state ownership, event routing, save model, or fixed
nationalization anchor requires a new major-divergence note before code.

## Structural adoption policy for v0.1

Dynamic SPD is the default implementation architecture for the first playable
slice. The project copies its responsibility boundaries before considering a
new system:

- the browser sidebar renders status subscenes and refreshes them after content
  changes;
- normal action cards live in tagged decks and commit time when opened;
- advisers are pinned cards selected through `#advisor` and share
  `advisor_action_timer`;
- `post_event.scene.dry` owns calendar advancement, common reducers, timer
  ticks, bounds, and event discovery;
- historical events own their eligibility through the `event` tag,
  `view-if`, `priority`, and `max-visits`;
- the monarch has distinct relationship and resistance state rather than being
  collapsed into a national popularity value; and
- parliamentary state is centrally summarized for the status UI.

Iranian adaptations change the data, not those boundaries. Mohammad Reza Shah
occupies the structural role that Hindenburg occupies in SPD, but Iranian royal
power must be sourced to the constitutional and institutional record rather
than inheriting presidential mechanics. The Majles occupies the structural
role of the Reichstag, but it does not inherit a nationwide proportional-vote
algorithm or stable party caucuses. Its authoritative model keeps constituency
returns, credentials, usable seats, dated alignments, attendance, and observed
votes separate, following
[`SIXTEENTH_MAJLES_LEDGER.md`](research/SIXTEENTH_MAJLES_LEDGER.md) and
[`PARLIAMENTARY_CONTROL.md`](research/PARLIAMENTARY_CONTROL.md).

Changing any of these responsibility boundaries requires the major-divergence
plan described above. Adding Iran-specific records or event effects within the
boundaries does not.

## Candidate divergences

These should be evaluated when their dependent system is implemented:

- qualitative or uncertain displays for intelligence;
- institution-specific compliance instead of automatic government control;
- named constituencies instead of a normalized national election algorithm.
  Dynamic SPD can convert a nationwide proportional vote into party seats; the
  Iranian elections in scope were staggered, candidate-based contests whose
  returns were followed by credential disputes and fluid caucus alignments.
  Before implementing this system, define separate records for constituency
  returns, credential status, declared party or organization, dated
  constitutional or ideological tendency, dated institutional alignment,
  dated caucus, attendance, and roll-call behavior. For the Senate, also
  preserve whether a member was elected or appointed. A separate
  `inherited_prior` may supply
  qualitative, phase-specific expectations for unresolved members, following
  `docs/research/PARLIAMENTARY_VIBE_MODEL.md`; it must carry heuristic status
  and must never populate a historical-evidence field. Do not derive a
  permanent party-seat chart from any one of those layers. The migration path
  from the current placeholder is to introduce constituency and member
  records before any national summary display; validate them against named
  returns, credentials, dated alignments, and votes in
  `docs/research/SIXTEENTH_MAJLES_LEDGER.md` and
  `docs/research/PARLIAMENTARY_CONTROL.md`, then confirm that any public
  summary remains consistent with `docs/research/TIMELINE_PRIMER.md`. The
  wider evidentiary boundary is summarized in
  `docs/research/CRISIS_EVIDENCE_AUDIT.md#5-parliamentary-factions-and-effective-control`;
- term-by-term oil proposals instead of one policy meter;
- an economic representation more detailed than SPD's abstract budget,
  inflation, unemployment, and growth scalars. Source collection and the
  observation ledger in `docs/research/ECONOMIC_HISTORY.md` do not approve a
  simulation architecture; plan that divergence only after the historical
  corpus and player-facing purpose are reviewed;
- a network model for coup operations instead of aggregate preparation;
- daily time during the August 1953 crisis.

The last two divergences must preserve the distinction between prepared
street networks, police and military defection, and institutional seizure.
The payment-attribution and hour-by-hour evidence boundaries are recorded in
`docs/research/CRISIS_EVIDENCE_AUDIT.md`; disputed individuals and casualty
totals must remain uncertainty-bearing evidence rather than hidden exact
values.

Until then, keeping numerical state and centralized updates makes the build
easier to inspect, balance, and compare with SPD.

## Current reference map

| Concern | Dynamic SPD reference |
| --- | --- |
| Shared state and startup | `source/scenes/root.scene.dry` |
| Hand, recurring decks, opening month, and turn selection | `source/scenes/main.scene.dry`, `source/scenes/root.scene.dry` |
| Post-card event routing and shared updates | `source/scenes/post_event.scene.dry` |
| Numerical state display | `source/scenes/status.scene.dry` |
| Pinned advisers and shared adviser cooldown | `source/scenes/advisors/wels.scene.dry`, `source/scenes/main.scene.dry` |
| Monarch relationship and resistance | `source/scenes/root.scene.dry`, `source/qdisplays/hindenburg_angry.qdisplay.dry`, `source/scenes/post_event.scene.dry` |
| Parliamentary state and display | `source/scenes/root.scene.dry`, `source/scenes/status.scene.dry`, `source/scenes/election_algorithm.scene.dry` |
| Tagged historical event | `source/scenes/events/black_thursday.scene.dry` |
| Party-affairs action pattern | `source/scenes/party_affairs/media.scene.dry` |
| Browser shell and responsive styling | `out/html/index.html`, `out/html/game.js`, `out/html/game.css` |
| Inline political colors | `source/scenes/**/*.scene.dry`, especially `source/scenes/main.scene.dry` |
| Image attribution | `credits_images.txt` |
| Packaged browser assets | `out/html/img/` |

Paths in this table are relative to the Dynamic SPD reference checkout.
