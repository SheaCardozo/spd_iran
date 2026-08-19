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
- animation, color-scheme, and colored-text settings; and
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

## Rendered-browser adversarial boundary

Qualitative adversarial playtests use the generated browser rather than a
privileged Dendry-engine interface. The implementation and protocol are
specified in
[`ADVERSARIAL_BROWSER_TESTING.md`](ADVERSARIAL_BROWSER_TESTING.md).
An ephemeral static server exposes only `out/html` on `127.0.0.1`.
Isolated Playwright contexts provide screenshots, accessibility observations,
coordinate/keyboard actions, browser traces, and videos. The agent-facing
gateway has no selector, arbitrary evaluation, scene-ID, source, or shared
state method; a separate oracle may inspect state privately for invariants and
replay hashes. Status, Research Library, Save/Load, and Options remain
player-only; adversarial contexts remove and disable those utilities while
retaining the live Main, Politics, and Support sidebar tabs. The phase-gated
Parliament control is part of ordinary play and remains available to an agent
once the election begins.

Dynamic SPD's `out/html/index.html`, `out/html/game.js`, and
`out/html/game.css` establish the rendered browser as the public interaction
surface, but the reference project has no equivalent black-box agent gateway
or parallel browser-play policy. Iran retains that browser surface and adds a
testing adapter around it. This does not change Dendry state ownership, deck
semantics, action economy, persistence, or historical content.

## Sidebar and Parliament surface divergence

The v0.3 convergence initially placed Campaign, Opposition/Coalition, Support,
Parliament, and Crown in five persistent sidebar tabs. That split is retired.
It mixed campaign capacities, advisers, government, and two place-level
chambers in one narrow surface, and exposed the Majles before its election was
part of the campaign.

Dynamic SPD provides the replacement responsibility boundary:

- `out/html/index.html` defines a compact persistent tab bar;
- `source/scenes/status.scene.dry` puts date, resources, the player's political
  position, and the current government on Main;
- the Politics subscene holds parties and internal factions;
- the Polls subscene holds constituency support; and
- `out/html/game.js` centrally refreshes the selected status subscene.

Iran retains those responsibilities with three tabs: **Main** contains date,
resources, opposition position, campaign capacity, and Crown/government state;
**Politics** contains the opposition or coalition and its component
organizations; **Support** contains constituency support and its monthly
direction. Adviser identity and cooldowns remain on the pinned adviser surface,
not in the sidebar.

Iran deliberately diverges from SPD's sidebar-scale Reichstag summary. The
Majles and Senate have 196 place records, separate return, credential,
usability, attendance, and oil-position states, and touch-accessible dossiers.
When the Sixteenth-Majles election begins, a non-action **Parliament** control
appears beside the action decks. It opens a full scene containing the current
chamber totals, credential explanation, diagrams, and place dossiers. The
diagrams copy Dynamic SPD's `d3-parliament` election treatment: a 500×250
semicircle with a 0.4 inner radius, angle-sorted seats, contiguous political
blocks, center-out animation, and a keyed result table. Iran maps those seats
to actual place records and retains touch, keyboard, and dossier access; it
does not reuse German party categories, colors, or historical imagery. Opening
or closing Parliament does not reserve an action, alter the hand, or advance
time.

This is a major status-presentation change but not a state or save migration:
all existing qualities and place records retain their schema-5 meanings.
Browser-agent policy treats Parliament as gameplay information while the
full Status, Research Library, save, and option utilities remain player-only.
Validation covers phase gating, sidebar contents, return to the unchanged hand,
all chamber modes and dossiers, keyboard/touch operation, agent access, and
desktop/mobile layout.

## Implemented v0.3 architecture

The current build follows SPD in these respects:

- one shared `Q` state initialized in `root.scene.dry`;
- a four-card Dynamic-mode hand with Party Affairs, Public Campaign, and
  Parliamentary Affairs decks containing sixteen recurring actions across the
  full campaign;
- action cards selected by tags and gated by cooldown timers;
- opening a normal action card reserves the current month; the universal
  return route restores the original hand, action, cooldown, visit count, and
  last-card state until a substantive choice is committed;
- `post_event.scene.dry` advances the calendar, ticks timers, bounds state, and
  resolves every eligible tagged event before returning to the hand;
- up to three historically eligible active advisers are pinned and share one
  consultation cooldown without spending the monthly action; a separate
  pinned roster manager changes the slate without advancing time and has its
  own six-month cooldown;
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
- recurring projects remember their direction, stage, investments, and
  setbacks instead of existing only as one-shot quality awards;
- a special-scene Research Library and path-dependent scorecard ending mirror
  SPD's Library and game-over responsibility boundaries;
- browser saves persist `save_schema_version = 5`, including Dendry's normal
  PRNG state, and reject v0.2 and older saves;
- annual organizational income is applied at year rollover and reported at
  the top of the arriving January anchor, before any choice;
- every paid choice states its exact resource cost before commitment.

All numerical action effects remain game-balance abstractions rather than
historical measurements. Historical anchors, dates, identities, and source
confidence do not vary with deck order or choice. Passage of nationalization
is a scenario outcome derived from the usable members and oil commitments in
each chamber; the documented historical passage remains immutable evidence.

## Source layout

| Path | Responsibility |
| --- | --- |
| `source/scenes/root.scene.dry` | Menu and initial shared state |
| `source/scenes/events/1949/` | Sourced opening and tagged historical events |
| `source/scenes/events/campaign_spine.scene.dry` | Independently gated and routed event families for the later dated anchors |
| `source/scenes/events/reactions.scene.dry` | Counterfactual coalition and Crown reaction families |
| `source/scenes/main.scene.dry` | Hand, decks, and recurring briefing |
| `source/scenes/advisors/` | Active pinned advisers, consultations, and roster management |
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
- browser saves use schema version 5. Earlier saves began under retired
  October- or February-start chronologies and are rejected rather than
  silently loaded into the new calendar.

The migration is deliberately simple because no published save format has
been promised: begin a new campaign. Validation covers the January hand,
February/May/July/October anchors, twenty-seven calendar advances, event priority,
pre-Front card gating, save rejection, and the unchanged 20 March 1951
terminal route.

## v0.2 opposition, adviser, support, and chamber architecture

Version 0.2 makes the pre-coalition player viewpoint the constitutional
opposition. “Opposition” is a political position, not the name of a January
1949 organization: the Iran Party, aligned politicians, newspapers, and
personal networks remain institutionally separate. This boundary changes status presentation,
adviser discovery, election-facing state, and persistence, but retains the
existing monthly action economy, tagged event router, randomized Dendry decks,
and one shared `Q` state.

Dynamic SPD supplies four relevant patterns:

- `source/scenes/main.scene.dry` renders a distinct adviser-action availability
  line immediately above `#advisor`;
- each file under `source/scenes/advisors/` remains a pinned adviser card but
  uses a figure-specific `view-if` quality, so unavailable advisers do not
  appear and the shared adviser cooldown does not control visibility;
- `source/scenes/status.scene.dry` and the Polls tab in `out/html/index.html`
  put constituency support in the persistent status interface; and
- the Reichstag section of `source/scenes/library.scene.dry` uses a semicircle
  seat visualization, while `source/scenes/election_algorithm.scene.dry`
  converts demographic support into proportional seats.

The Iran implementation retains the adviser availability line, conditional
pinned cards, persistent support display, and chamber semicircle. It adapts
them as follows:

1. `player_organization` begins as `Opposition`, a description of the player's
   political position rather than an organization. Before the November 1949 formation
   scene, the sidebar and ordinary scene prose expose only institutions,
   people, and alignments that presently exist. The Opposition tab becomes a
   Coalition tab after the National Front forms.
2. Each of the original six advisers has a separate historical-availability
   flag. Mohammad Mossadegh and Allahyar Saleh are available at campaign
   start. Fatemi and Makki become visible when they join the documented
   Committee of Twenty and palace protest in October 1949. Kashani becomes an
   independent political counterpart at Front formation; his card does not
   imply subordination or physical presence. Maleki remains unavailable within
   this release unless a dated source establishes his participation before the
   March 1951 endpoint. Visibility is independent of the shared six-month
   consultation cooldown, and the same flags can remove a figure in a future
   release when a sourced departure occurs.
3. The Support tab describes qualitative campaign support among social and
   organizational constituencies. These values are scenario abstractions, not
   retrospective opinion polls. They affect campaign reach and the
   defensibility of individual place records; exact values appear only in
   debug mode.
4. Majles and Senate diagrams render all 136 and 60 place records. Their
   categories come from return, credential, usability, documented route, and
   mutable support state. Hover or focus exposes the place record. No
   unsupported party label is assigned to an unknown member.
5. Election support never passes through SPD's nationwide proportional
   vote-to-seat algorithm. Iran's election was staggered, candidate-based, and
   followed by credential judgments. The historical return remains in the
   evidence object; scenario campaign influence modifies the separate scenario
   object and the resources required to defend a returned ally's credential.
6. Parliament status explicitly presents the pipeline **authorized place →
   return → credential approval → attendance/usable member**. A credential
   challenge cannot create an elected return. It can defend or delay the
   chamber's acceptance of a returned member, and the public totals remain
   derived from individual records.

This is a major status and persistence change. Save schema 4 rejects v0.1
saves rather than guessing adviser availability, constituency support, or
place-level campaign influence. The migration path is to begin a new campaign;
there is no promised public save compatibility yet. Validation must cover
pre-formation language, adviser visibility separate from cooldown, support
effects on scenario state without mutation of historical evidence, all 196
visualized places, the credential pipeline, spending bounds, deterministic
state for identical choices, and the unchanged March 1951 terminal route.

## v0.3 Dynamic-mode convergence

Version 0.3 makes Dynamic SPD's **Dynamic mode** the explicit engineering
baseline for the v0.x line. The long-term proposal to replace card play is
deferred. The exact comparison map is:

| Iran subsystem | Dynamic SPD analogue | Decision |
| --- | --- | --- |
| Four-card agenda | `source/scenes/main.scene.dry` (`main_easy`) | Retain the hand size and conditional deck responsibility |
| Safe cancellation | `source/scenes/easy_discard.scene.dry` | Adapt to all three Iran decks and restore the exact original hand |
| Shared reducer/router | `source/scenes/post_event.scene.dry` | Retain ownership; add Iran-specific coupled consumers and place reducers |
| Adviser slate | `source/scenes/advisors/shuffle_leadership_pinned.scene.dry`, `source/scenes/party_affairs/shuffle_leadership.scene.dry` | Retain a pinned manager, adapt to no-time changes and separate cooldowns |
| Evolving projects | `source/scenes/party_affairs/media.scene.dry`, `fundraising.scene.dry`, and `party_organizations.scene.dry` | Retain remembered policy/stage and interruptions |
| Elections | `source/scenes/election_algorithm.scene.dry` | Retain central derivation, reject proportional seats, resolve sourced contestable place records |
| Presidential pressure | Hindenburg state in `root.scene.dry`, `post_event.scene.dry`, and related event families | Adapt to four sourced Crown dimensions; royal conduct only occurs in a scene |
| Library/status | `source/scenes/library.scene.dry`, `status.scene.dry` | Retain persistent summaries and special-scene return behavior |

The migration preserves one shared `Q`, one normal action per month, the three
Iran-specific decks, tagged-event routing, qualitative normal-mode display,
perfect political intelligence, and Dendry's unseeded deck stream. It changes
save schema, adviser selection, cancellation semantics, event reactivity,
resource pressure, constituency resolution, credential resolution, and
nationalization endings. There is no v0.2 save migration; players start a new
January 1949 campaign.

### Displayed-quality consumer matrix

Every scenario quality shown in normal play has a downstream consumer:

| Displayed state | Consumers |
| --- | --- |
| Faction strength, relation, dissent, organization | Coalition coordination; joint-action yield; recurring-project costs; coalition reaction variants; endings |
| Social support and trend | Contestable-place organization; meetings; fundraising; constituency reports; campaign outlook |
| Resources and dues | Printing, travel, meetings, lawsuits, press work, annual income; each action retains a free lower-yield route |
| Constitutional and procedural legitimacy | Crown reaction choices; credential defense; Majles and Senate oil commitments; endings |
| Public mandate, reach, and press | constituency campaign yield; public-pressure scenes; oil commitments; endings |
| Crown relation, resistance, court capacity, electoral influence | palace access; sourced/counterfactual Court reactions; administrative pressure on contestable places; Senate commitments |
| Adviser eligibility, active slate, and cooldowns | pinned availability; card resets; scene variants; roster reconciliation |
| Project direction and stage | later card prose and yield; event variants; ending recap |
| Return, credential, usability, attendance | chamber diagrams; National Front capacity; eligibility to receive an oil position |
| Oil position and commitment | Majles and Senate support totals and terminal chamber votes |

Aggregate cohesion, campaign capacity, chamber totals, and ending capacity are
derived only in `post_event.scene.dry`; scenes mutate components and place
scenario fields. `post_event` may identify pressure and eligibility but never
invents a historical royal act.

Zero resources is a live operating condition rather than a decorative floor.
Each unfunded month reduces press capacity and the organization of one active
coalition component. The rotation prevents one organization from absorbing
every setback, while the free route on each recurring card prevents a
resource deadlock. Fundraising and other persistent projects advance through
stages; repeating the same method gives a smaller return or a different cost
instead of reproducing its opening reward indefinitely.

### Nationalization resolution

The Oil Commission recommendation is non-terminal. The Majles vote compares
supporting attending, usable scenario records with a majority threshold
derived from those records. If it fails, the campaign ends immediately. If it passes, the
March action and Senate strategy affect a separately derived Senate vote; a
failure there also ends immediately. Exact historical attendance or an
unrecorded division is never fabricated. These thresholds are transparent
counterfactual game rules, while dates and documented approvals remain in the
historical evidence and source records.

The player-facing chamber summary presents the complete scenario partition:
members expected to attend who support the principle, remain conditional, or
oppose it, together with the majority required. Place dossiers expose return,
credential, ability to sit, attendance, and oil position. Exact influence and
administrative-pressure inputs remain debug-only. Once a chamber acts, that
partition and its place-level positions are frozen; later work in the other
chamber cannot rewrite a completed vote. The diagram's semantic seat controls
are supplemented by a touch-sized place selector for dense mobile layouts.

### Rendered adversarial repair boundary

The first qualitative v0.3 browser review is catalogued in
[`docs/reviews/2026-07-30-v03-rendered-adversarial-repair-review.md`](reviews/2026-07-30-v03-rendered-adversarial-repair-review.md).
The repair keeps Dynamic SPD's central sidebar refresh, pinned roster manager,
four-card agenda, safe cancellation, persistent card projects, and
`post_event` ownership. It adds Iran-specific protections where the reference
does not provide a fitting analogue:

- the pregame sidebar is hidden until initialized;
- each SVG chamber place is an independently named, keyboard- and
  touch-operable control;
- a required three-person adviser reconciliation cannot be bypassed;
- underfilled hands and exhausted decks explain their state; and
- terminal action totals reflect the chamber at which the campaign ended.

These are presentation and invariant repairs within the v0.3 architecture,
not changes to the turn loop, event router, or persistence model.

## v0.3 release boundary

The implemented release ends on 20 March 1951. Extending into Mossadegh's
premiership would add an economic and international layer and is not an
implicit continuation of the current reducers. Any change to the monthly
action economy, shared-state ownership, event routing, save model, or
March-1951 endpoint requires a new major-divergence note before code.

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
