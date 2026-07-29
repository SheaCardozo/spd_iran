# Player-facing scene content and source standard

This is the definition of done for every player-facing scene in *The Last
Majles*. It applies to:

- the title menu, onboarding, prologue, fixed campaign anchors, pressure
  events, and monthly briefings;
- every recurring action card and every action-result branch;
- every adviser consultation and result;
- status explanations, Research Library pages, and other special scenes; and
- campaign endings and causal recaps.

Reducer-only, initialization, and routing scenes are still reviewed for correct
responsibility boundaries and clear developer comments. They are exempt from
narrative setup and consequence prose when the player never sees them. A scene
must not be called internal merely to avoid rewriting a visible surface.

## Exhaustive compiled-scene gate

The standard is applied to the compiled game, not only to files or scenes that
an author remembers to nominate. `scripts/audit-scenes.js` must classify every
ID in `out/game.json` into exactly one of these review classes:

1. **decision menu** — historical decisions, recurring cards, adviser menus,
   and prologue decision surfaces;
2. **continuation decision** — a titled and described strategy menu that
   immediately follows a fixed development and therefore does not repeat its
   setup prose;
3. **visible consequence** — the result of a substantive choice, which must
   remain visible until acknowledged;
4. **information surface** — title, onboarding, monthly hand, status, Library,
   and ending scenes;
5. **deck container** — a Dendry hand/deck wrapper whose authored content lives
   in its cards;
6. **engine internal** — initialization, reducers, queues, and root routing;
   or
7. **framework internal** — Dendry's generated navigation helpers.

Unclassified scenes, duplicate classifications, unexpected new internal
scenes, unwrapped mapped political terms, incorrect semantic classes, and
partially wrapped complete names fail the test suite. Citation-link labels are
excluded from the color lint because citations must remain neutral under the
color guide. The complete inventory and independent verdict are recorded in
[`reviews/2026-07-29-v01-complete-scene-audit.md`](reviews/2026-07-29-v01-complete-scene-audit.md).
That audit includes the historical spine and internal/container classes rather
than relying on separate implicit scope.

The distinction is about responsibility, not importance. Deck containers,
reducers, and framework routes do not need invented dramatic prose, but they
must be explicitly inventoried so a visible scene cannot silently escape
review.

## Dynamic SPD comparison

Dynamic SPD normally treats a visible decision as a short dramatic sequence
rather than as a disguised state-update form. Representative patterns include:

- `source/scenes/events/black_thursday.scene.dry`: a dated development receives
  a descriptive setup, then the player may acknowledge it or turn it into a
  political question; and
- `source/scenes/events/hindenburg_explode_referendum_campaign.scene.dry`: the
  setup explains the actors and stakes, a menu exposes several genuinely
  different strategies, option titles say what the party will do, subtitles
  communicate costs or availability, and each selected strategy receives
  consequence prose before play continues.
- `source/scenes/party_affairs/media.scene.dry`,
  `party_affairs/fundraising.scene.dry`, and
  `party_affairs/party_organizations.scene.dry`: recurring cards explain the
  organizational problem, expose several concrete allocations or strategies,
  preview important costs, and report the operational result;
- `source/scenes/advisors/wels.scene.dry` and
  `source/scenes/advisors/stampfer.scene.dry`: adviser cards connect a named
  figure's role to bounded forms of consultation and provide result prose; and
- `source/scenes/library.scene.dry`, `status.scene.dry`, and
  `game_over.scene.dry`: reference and terminal surfaces have different jobs
  from decision scenes, but still provide enough explanation for their data
  and routes.

Those paths are relative to
`/home/phroz/spd/dynamic_social_democracy`. This project retains the
setup → choice → consequence anatomy and variable choice count wherever the
player makes a substantive decision. It adapts the presentation to an Iranian
coalition rather than a mass party and keeps exact numerical effects out of
the default interface. It rejects any SPD historical premise that has not been
established independently for Iran.

## Scene classes and required anatomy

### Decision scenes

Historical decisions, recurring action cards, and adviser consultations follow
the full setup, choices, and consequences standard below. Recurring cards need
not repeat a dated history lesson every time, but
they must explain the operational problem, why the available approaches
differ, and what the organization actually does after selection.

Adviser scenes must distinguish documented biography or political role from
the counterfactual advice and capacity effect. An adviser is a character and
political counterpart, not merely a portrait attached to a bonus.

### Information and navigation scenes

The title menu, main hand, status pages, Library, and other special scenes do
not require artificial choices or consequence passages. They must:

- present their useful content directly;
- explain an unfamiliar institution only when that explanation is necessary
  to understand what is shown;
- avoid stale or contradictory mechanics;
- source every historical assertion at claim level;
- make navigation and return behavior clear through labels; and
- avoid tutorial, developer, and design-language commentary where the
  political or historical content can speak for itself.

Do not narrate the interface back to the player. Phrases such as “this panel
reports,” “the game tracks,” “the player controls,” “this is a simulation
prompt,” and repeated explanations of fixed-versus-mutable state are normally
editorial notes, not scene prose. Put those boundaries in source comments,
research records, tests, and system documentation. Keep a player-facing
boundary only when omitting it would materially misrepresent the historical
choice.

Monthly historical briefings are sourced historical content even when they
offer no decision. They need a precise adjacent locator and must distinguish a
dated development from simulation state.

### Endings

An ending must interpret the result, not merely print a label and numbers. It
needs:

- a concise account of what the named outcome means;
- the four score dimensions in intelligible language;
- a causal recap that turns major decisions into prose;
- explicit separation of the fixed historical endpoint from the player's
  organizational result; and
- a clear route to research or a new campaign.

### Internal-only scenes

Initialization, aggregate reducers, timer ticks, and event queues may remain
prose-free. They should own no visible historical narration, and a visible
choice must never route through them so quickly that its result is skipped.

### 1. Setup

A decision scene opens with enough prose for a player unfamiliar with the
problem to understand:

1. what has happened and when;
2. which people or institutions are acting;
3. why it matters to the coalition now;
4. what is documented, disputed, or still unknown; and
5. what part of the response the player can actually shape.

Most major events need two to four compact paragraphs. Recurring action and
adviser scenes generally need one to three. Length is not a goal by itself:
every paragraph must add context, stakes, uncertainty, character, or a
decision boundary. A heading, date, card label, or proper name is not a
substitute for explanation.

The setup must not imply that the player controls a fixed historical outcome.
When an anchor will occur regardless of the decision, say or show that the
choice concerns preparation, framing, organization, procedure, or the
coalition that emerges from it.

### 2. Choices

Choice count follows the real decision space:

- use one choice when the scene is principally a fixed development or a
  transition and there is no meaningful alternative to invent;
- use two choices only for a genuine binary;
- use three or more when the coalition can pursue distinct strategies; and
- never pad a scene with cosmetically different options.

Every substantive option must have:

- an active title that states what the player will do;
- a short subtitle written in the political voice of the scene: it should
  clarify the action's logic, likely reaction, compromise, or exposure rather
  than summarize a bundle of state variables;
- a mechanically distinct effect, unless the point of the choice is explicitly
  expressive;
- an unavailable explanation when a requirement can fail; and
- no promise of certainty that the historical record cannot support.

Default-facing subtitles should imply mechanical direction through historical
action and reaction: “One great gathering makes the Front impossible to
overlook and gives the Crown a single target,” not “stronger mandate and
organization; increased Crown resistance.” Do not name qualities, enumerate
bonuses, or use optimizer shorthand such as “balanced legitimacy, procedure,
and support.” Hard prerequisites and commitments from the common purse may
remain explicit when hiding them would make the choice misleading.

Exact immediate state changes are a developer aid. With `?debug=1`, hovering a
choice or focusing it from the keyboard displays the target scene's numerical
`on-arrival` changes. They are absent from the ordinary interface and are not
a substitute for a well-written subtitle.

### 3. Consequences

Every substantive choice leads to visible consequence prose before the next
event, action hand, or option menu. This includes recurring action cards,
adviser consultations, and roster changes. The result normally explains:

1. what the coalition actually did;
2. the immediate response from another actor or institution;
3. what capacity, relationship, or vulnerability changed; and
4. what remains unresolved.

One to three compact paragraphs are normally sufficient. A bare state mutation
followed by `go-to` is not a completed choice. Consequence prose may describe a
plausible counterfactual organizational response, but it must not manufacture a
historical fact. Use conditional phrasing where the text is simulation output.

## Historical authority and citations

The source registry category (`MAJ`, `SUP`, or another internal label) does not
decide authority. Use the strongest available source for the particular claim:

1. specialist scholarly monographs from university or reputable scholarly
   presses provide the normal interpretive foundation;
2. official parliamentary proceedings, archival documents, statutes, and
   contemporary institutional records support exact acts, dates, terms, and
   votes, interpreted alongside scholarship;
3. focused peer-reviewed articles or scholarly chapters supplement a
   monograph or may control a narrow claim when their author and evidence are
   demonstrably authoritative;
4. memoirs, partisan newspapers, diplomatic impressions, and oral histories
   are attributed evidence, not an omniscient account; and
5. encyclopedias, general websites, search snippets, unattributed
   transcriptions, and incidental papers are discovery aids, not the sole
   authority for implemented historical prose.

Prefer the most authoritative source actually available and reviewed; do not
add a weaker citation merely to increase the citation count. Every implemented
claim needs a precise page, chapter, session, document, or stable-section
locator in its adjacent event, person, institution, or system record under
`docs/research/`. Exact parliamentary acts may cite the official record even
when that record is filed under `supplemental/`; its archival role does not
make it a “random supplemental paper.”

Playable scene prose contains no inline citations, source tags, “Research:”
labels, footnote markers, or bibliography codes. Put a concise `# Source:` or
`# Sources:` comment beside each historical scene in its `.scene.dry` file,
using human-readable author, title, and locator text. Internal archive IDs may
also appear in comments when they help maintainers, but never as the
player-facing name of a source. The Research Library may recommend sources by
author and title and link to the public primer; it must not expose internal
`MAJ-*` or `SUP-*` tags.

If the accessible evidence does not support a detail, narrow the statement,
mark the uncertainty, or omit it. Never fill the gap from memory.

## Adversarial review gate

Before a player-facing scene is release-ready, a reviewer who did not write
the current draft must answer:

- Can an unfamiliar player explain the scene's purpose and stakes?
- Does the scene match Dynamic SPD's setup → choice → consequence rhythm?
- Is the number of choices justified by the decision rather than a template?
- Does each option communicate a distinct action and qualitative tradeoff?
- Does its subtitle express political logic and reaction rather than recite
  quality names or optimization categories?
- Does every substantive option produce consequence prose?
- Are fixed outcomes and player-shaped outcomes clearly separated?
- Is every historical assertion supported by the strongest suitable source
  with a precise locator?
- Are disputes and unknowns preserved?
- Do the mechanics follow from the described action rather than from an
  unexplained aggregate bonus?
- Does the full personal-name coloring and grayscale-readable presentation
  follow `docs/COLOR_STYLE_GUIDE.md`?
- If the scene is informational, does it explain its data and navigation
  without inventing a decision?
- If it is an ending, does it causally interpret the run rather than dump
  variables?

The review must list failures scene by scene. A scene passes only after the
failures are corrected or explicitly accepted in a dated change record with a
reason.
