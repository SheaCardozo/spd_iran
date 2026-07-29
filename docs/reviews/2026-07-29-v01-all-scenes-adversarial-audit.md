# The Last Majles v0.1 all-scenes adversarial audit

**Review date:** 29 July 2026  
**Reviewed build:** current `source/` and compiled `out/game.json` after the
all-scenes rewrite  
**Scope:** every player-facing compiled scene outside the separately reviewed
four-scene prologue and fourteen-event historical spine  
**Review posture:** adversarial content, source-authority, navigation,
semantic-color, and Dynamic SPD consistency review; no game-source changes
were made by this reviewer

## Final release verdict

The rewrite has closed the systemic writing defect. All twelve recurring
cards and all six adviser surfaces now use a Dynamic SPD-style sequence:

> political or organizational setup → a justified number of described choices
> → a visible simulated consequence → return to the monthly loop

The compiled non-event inventory contains **94 player-facing scene IDs**:

- 4 title, primer, about, and monthly-hand surfaces;
- 4 status surfaces;
- 9 Research Library surfaces;
- 55 recurring-card and leadership-management surfaces;
- 21 adviser and adviser-result surfaces; and
- 1 campaign ending.

After a targeted correction and second adversarial pass, **all 94 pass and
none fail**. The seven information-surface failures in the first pass are
closed:

1. `status` now displays qualitative organizational reach, press capacity, and
   political intelligence.
2. `status.coalition` now displays strength, relationship, dissent, and
   organization for all four components.
3. `status.majles` now displays usable Front representation, oil-coalition
   support, and parliamentary-procedure legitimacy before the derived
   parliamentary-capacity label.
4. `research_library.government` now explains cabinet formation and
   responsibility, Crown overlap, elected/appointed chamber routes, and the
   commission → Majles → Senate sequence.
5. `research_library.coalition_people` now uses political rather than
   developer language and introduces all six pinned figures.
6. `research_library.chambers` now cites the official Majles roster at
   `SUP-051`, pp. 1–11; the appointed/elected First-Senate tables at
   `SUP-053`; and precise credential sessions 2, 25, and 30.
7. `research_library.events` now provides a public fourteen-entry index with
   working primer or bibliography anchors and responsibility boundaries.

No player-facing content or source blocker remains in this audit's scope.

## Verification of the six requested residuals

All six residuals identified during the rewrite were rechecked after the final
source freeze:

| Residual | Result | Evidence |
|---|---:|---|
| Select any three of six advisers, including a roster without Mossadegh | **PASS** | `leadership_roster.roster_manager` exposes add/remove controls for all six, permits every valid three-person combination, and only enables confirmation at exactly three. |
| Context-aware Research Library return | **PASS** | The index exits through `backSpecialScene`; main → Library → main and ending → Library → ending preserve their origin. |
| Primer return to play | **PASS** | `web/timeline.html` now includes a visible “Play the campaign” link to `./`. |
| October 1949–January 1950 briefings | **PASS** | `main` contains four separate documented/campaign-state briefings and clearly distinguishes simulation prompts from documented history. |
| Printed oil records | **PASS** | `research_library.oil` presents Gass–Golshayan, the March principle, and the player's minimum terms field by field, preserving unknown/not-yet-settled values. |
| Semantic political coloring | **PASS** | Recurring cards, advisers, roster controls, status, Library, and ending use the shared semantic classes for mapped people, parties, chambers, Crown, and AIOC; no new inline color values were introduced. |

## Standard and method

The review applies
[`docs/SCENE_CONTENT_STANDARD.md`](../SCENE_CONTENT_STANDARD.md) according to
scene class:

- Decision scenes require enough setup to understand the problem, an option
  count justified by the real decision space, qualitative subtitles, distinct
  effects, and a visible consequence.
- Information scenes do not require artificial decisions. They must explain
  unfamiliar data, stay consistent with current mechanics, use authoritative
  claim-level sources, and provide clear navigation.
- Endings must interpret the named outcome and turn decisions into causal
  prose rather than dump variables.
- Internal reducers, initializers, deck containers, and routing scenes are
  exempt from decorative narrative.

The reviewer inspected the Dendry source, compiled scene inventory, current
event/person/system research records, generated primer, special-scene
JavaScript, semantic color guide, and representative Dynamic SPD equivalents.
Automated validation after the correction also produced:

- `npm test`: **7/7 test files passed**;
- `git diff --check`: **passed**.

Every new `timeline.html` fragment referenced by the corrected Library was
also found in the generated `out/html/timeline.html`, including
`source-sup-059`.

The Playwright suite could not launch in this execution environment because
the installed browser binaries are missing host shared libraries
(`libnspr4.so` for Chromium and `libasound.so.2` for Firefox). All twelve
projects failed before opening a page; this is an environment dependency
blocker, not a game assertion failure. Browser acceptance therefore remains to
be rerun in the provisioned browser environment.

Passing automated tests is supporting evidence, not a substitute for the
content findings below.

### Source flags

- **A — adequate:** a strong source and sufficiently precise locator support
  the historical claim, or the scene is explicitly bounded as a mechanical
  abstraction on top of such a foundation.
- **B — strong foundation, broad locator:** the cited specialist monograph or
  official record is suitable but the locator covers a chapter or broad
  range.
- **C — source-route defect:** a controlling record is absent from the
  adjacent route, or a hosted player cannot reach the claimed research record.
- **— — not applicable:** the surface contains only navigation or current-run
  scenario state.

The audit does not treat the repository's `SUP` category as a mark of weak
authority. Official Majles proceedings are the correct source for recorded
sessions, credentials, motions, and votes. The Maleki record's focused
scholarly supplement is used alongside the stronger Abrahamian foundation,
not as a random substitute for it.

## What Dynamic SPD does

Paths in this section are relative to
`/home/phroz/spd/dynamic_social_democracy`.

- `source/scenes/party_affairs/party_organizations.scene.dry` and
  `fundraising.scene.dry` explain an organizational problem, present several
  distinct allocations with costs or tradeoffs, and report what the selected
  work produced.
- `source/scenes/party_affairs/media.scene.dry` and `rally.scene.dry` treat
  press and public activity as strategy rather than generic popularity
  buttons.
- `source/scenes/advisors/wels.scene.dry` and `stampfer.scene.dry` connect a
  named figure's role to several bounded consultations and visible results.
- `source/scenes/party_affairs/shuffle_leadership.scene.dry` and
  `source/scenes/advisors/shuffle_leadership_pinned.scene.dry` use an
  add/remove leadership-management flow instead of hard-coded roster presets.
- `source/scenes/library.scene.dry` uses `backSpecialScene` so Library exit
  restores the calling context.
- `source/scenes/status.scene.dry` provides a detailed interpretation of the
  party and political environment.
- `source/scenes/ending_slides.scene.dry` interprets the final configuration
  through conditional narrative.

The Last Majles now retains those responsibility patterns while adapting them:
coalition components replace German party factions; default status is
qualitative rather than exact; Kashani remains an independent counterpart;
Iranian historical anchors and chamber evidence are not inherited from SPD;
and the ending cannot erase documented nationalization.

## Title, onboarding, monthly hand, and ending

| Compiled scene | Result | Source | Finding |
|---|---:|---:|---|
| `root.start_menu` | **PASS** | — | States the campaign boundary, fixed endpoint, one-action/eighteen-turn structure, and qualitative/debug presentation. Its three routes are justified. |
| `root.historical_primer` | **PASS** | — | Same-tab redirect has a fallback link and the primer now provides an explicit route back to play. |
| `root.about` | **PASS** | A/B | Concisely distinguishes fixed historical acts from scenario evaluation and identifies the Dynamic SPD architecture adaptation. |
| `main` | **PASS** | A/B | Explains action commitment, advisers, and consequence screens. Every month or bounded phase receives documented or explicitly simulated orientation. Exact parliamentary acts use official sessions; broader oil phases use specialist books. |
| `campaign_ending` | **PASS** | A/B | Each named outcome has interpretive prose, the four dimensions are explained, fixed approval is separated from evaluation, and conditional recap prose covers structure, election, credentials, oil, Razmara, advisers, and Crown relations. |

## Status and sidebar

These scenes are also rendered into persistent sidebar tabs by `web/game.js`.
They are information surfaces and do not need setup → choice → consequence
anatomy.

| Compiled scene | Result | Source | Finding |
|---|---:|---:|---|
| `status` | **PASS** | — | Displays legitimacy, mandate, organizational reach, press capacity, political intelligence, resources, and adviser availability qualitatively without exposing exact optimization values. |
| `status.coalition` | **PASS** | A/B | Explains the derived cohesion boundary and displays qualitative strength, relationship, dissent, and organization for every component while keeping Mossadegh's authority separate. |
| `status.majles` | **PASS** | A/B | Explains return/credential/usability, shows record-derived totals, and displays all three parliamentary-capacity inputs before the derived label. |
| `status.crown` | **PASS** | A/B | Clearly distinguishes relationship, resistance, Court capacity, and electoral influence and explains that events change conduct while the panel summarizes risk. |

The corrected status layer now meets the intended balance: every important
causal component is visible through terms such as
“limited/workable/strong,” while exact values remain a debug concern.

## Research Library

| Compiled scene | Result | Source | Finding |
|---|---:|---:|---|
| `research_library` | **PASS** | — | Defines documented history, uncertainty, and mechanics, maps eight sections, and exits through `backSpecialScene`. |
| `research_library.government` | **PASS** | A/B | Explains government formation, confidence, ministerial responsibility, Crown overlap, chamber composition, and the separate commission/Majles/Senate acts, with public primer routes and precise source locators. |
| `research_library.timeline` | **PASS** | A/B | Correctly separates the 25 November committee rejection, 11 January Majles rejection, and March principle, and explicitly keeps the later implementation law outside the endpoint. |
| `research_library.coalition_people` | **PASS** | A/B | Defines the four political currents and state fields, introduces all six pinned figures, preserves Kashani's independence, and links public coalition/formation anchors. |
| `research_library.chambers` | **PASS** | A | Separates evidence and scenario totals and cites the official Majles roster, appointed/elected Senate tables, and exact displayed credential sessions. |
| `research_library.oil` | **PASS** | A/B | Presents both historical positions and the player's floor term by term; distinguishes unknown, unsettled, and unset player minima; and labels the later law as a boundary source only. |
| `research_library.events` | **PASS** | A/B | Provides fourteen public entries that identify the fixed development, player-shaped boundary, and strongest relevant primer or source anchor. The generated `SUP-059` anchor resolves. |
| `research_library.uncertainty` | **PASS** | — | Accurately states the current non-seeded deck behavior, debug boundary, null meaning, and prohibition on randomizing facts. No removed run-seed mechanic remains. |
| `research_library.bibliography` | **PASS** | A | Although it names the tracked registry, it also provides a working public link to the generated primer bibliography. |

## Recurring action cards

All twelve menus pass. Choice counts now vary between two and three according
to the modeled decision rather than following a rigid binary template. Every
available option has a qualitative subtitle, mechanically distinct effect,
and visible consequence. Resource-gated choices explain their unavailable
condition.

The shared
[`docs/research/systems/recurring-actions.md`](../research/systems/recurring-actions.md)
record uses Abrahamian, Painter and Brew, and exact official sessions to
establish the historical field, then labels each repeated meeting,
fundraising drive, press brief, petition, and conversation as counterfactual
simulation output. This is the right source boundary.

### Card menus

| Compiled scene | Result | Source | Finding |
|---|---:|---:|---|
| `coalition_meeting` | **PASS** | A/B | Three priorities expose constitutional focus, internal listening, and oil coordination. |
| `fundraising` | **PASS** | A/B | Three sources of funds carry distinct organizational dependence and public effects. |
| `leadership_roster` | **PASS** | A/B | Introduces the three-active limit, normal-action cost, shared consultation cooldown, and Kashani boundary before entering the manager. |
| `membership_committees` | **PASS** | A/B | A genuine common-machinery versus component-autonomy binary with a visible resource cost. |
| `bazaar_outreach` | **PASS** | A/B | Three approaches preserve network autonomy and avoid claiming uniform bazaar opinion. |
| `legal_defense` | **PASS** | A/B | Direct cases and a documented public record are legibly distinct and neither promises relief. |
| `press` | **PASS** | A/B | Three editorial strategies distinguish constitutional emphasis, term-by-term oil explanation, and coalition pluralism. |
| `public_meetings` | **PASS** | A/B | A clear concentration-versus-reach binary with resource and Crown-resistance tradeoffs. |
| `credential_petitions` | **PASS** | A | Separates case files from coordinated floor work without inventing credential outcomes. |
| `deputy_outreach` | **PASS** | A/B | Three specific asks distinguish procedure, nationalization, and carefully bounded constituency reporting. |
| `electoral_committee` | **PASS** | A/B | Reporting, constitutional petitions, and a provisional public register form three distinct priorities. |
| `oil_committee` | **PASS** | A/B | Technical terms, coalition building, and uncertainty registration use the structured oil model. |

### Every recurring-card result

| Compiled result scene | Result | Consequence check |
|---|---:|---|
| `coalition_meeting.meeting_constitution` | **PASS** | Reports the shared program, component response, gain, and unresolved social disagreement. |
| `coalition_meeting.meeting_dissent` | **PASS** | Reports what consultation clarifies and the cost of leaving without a sharp line. |
| `coalition_meeting.meeting_oil` | **PASS** | Reports coalition overlap without pretending every reason or issue is settled. |
| `fundraising.fund_small` | **PASS** | Reports limited yield and organizational lists/habits. |
| `fundraising.fund_notables` | **PASS** | Reports larger yield and suspicion/dependency. |
| `fundraising.fund_subscription` | **PASS** | Reports the public collection and press/collector coordination. |
| `membership_committees.committees_shared` | **PASS** | Reports common machinery, cost, and unresolved authority. |
| `membership_committees.committees_autonomy` | **PASS** | Reports component capacity and the weakness of parallel systems. |
| `bazaar_outreach.bazaar_oil` | **PASS** | Reports negotiated transmission, organization, and independent ownership of contacts. |
| `bazaar_outreach.bazaar_constitution` | **PASS** | Reports the bounded constitutional appeal and what it does not consolidate. |
| `bazaar_outreach.bazaar_autonomy` | **PASS** | Reports the joint channel, intelligence gain, and lower immediate pressure. |
| `legal_defense.defense_cases` | **PASS** | Reports counsel/filings, preserved organization, and incomplete broader record. |
| `legal_defense.defense_record` | **PASS** | Reports evidence handling, public response, and Crown strain. |
| `press.press_constitution` | **PASS** | Reports the shared brief and the issue displaced this cycle. |
| `press.press_oil` | **PASS** | Reports structured term explanation and the constitutional opportunity cost. |
| `press.press_plural` | **PASS** | Reports honest difference, lower dissent, and a less concentrated message. |
| `public_meetings.meetings_tehran` | **PASS** | Reports the visible gathering, mandate, and royal resistance. |
| `public_meetings.meetings_network` | **PASS** | Reports local organizer training and the absence of one dramatic crowd. |
| `credential_petitions.credentials_cases` | **PASS** | Reports evidence discipline and the absence of a guaranteed vote. |
| `credential_petitions.credentials_floor` | **PASS** | Reports coordinated speaking and the unchanged documentary basis. |
| `deputy_outreach.deputies_procedure` | **PASS** | Reports a limited cross-faction procedural commitment. |
| `deputy_outreach.deputies_oil` | **PASS** | Reports a direct nationalization ask and the deputies it may lose. |
| `deputy_outreach.deputies_constituency` | **PASS** | Reports verified local material without claiming a nationwide plebiscite. |
| `electoral_committee.electoral_reports` | **PASS** | Reports observation/hearsay separation and unfinished petition work. |
| `electoral_committee.electoral_case` | **PASS** | Reports precise filings and exclusion of unsupported reports. |
| `electoral_committee.electoral_register` | **PASS** | Reports provisional publication, evidence gaps, scrutiny, and Court response. |
| `oil_committee.oil_terms` | **PASS** | Reports field-by-field comparison and the votes still missing. |
| `oil_committee.oil_coalition` | **PASS** | Reports coalition work and unresolved technical terms. |
| `oil_committee.oil_record` | **PASS** | Reports the uncertainty register and deliberately unfixed final position. |

## Leadership manager

The add/remove controls are provisional interface operations, not substantive
political decisions. They correctly return to the manager without decorative
consequence prose. `confirm_roster` is the substantive act and does provide a
visible result.

| Compiled scene | Result | Finding |
|---|---:|---|
| `leadership_roster.roster_manager` | **PASS** | Displays selected count, current three, all six roles, and a confirmation gate at exactly three. |
| `leadership_roster.add_mossadegh` | **PASS** | Available whenever absent and the draft has room. |
| `leadership_roster.remove_mossadegh` | **PASS** | Mossadegh is removable; the architecture does not force him active. |
| `leadership_roster.add_fatemi` | **PASS** | Role and capacity tradeoff are visible. |
| `leadership_roster.remove_fatemi` | **PASS** | Loss of immediate press specialization is visible. |
| `leadership_roster.add_saleh` | **PASS** | Role and capacity tradeoff are visible. |
| `leadership_roster.remove_saleh` | **PASS** | Loss of electoral/committee access is visible. |
| `leadership_roster.add_maleki` | **PASS** | Role and capacity tradeoff are visible. |
| `leadership_roster.remove_maleki` | **PASS** | Loss of Toilers' organizational access is visible. |
| `leadership_roster.add_makki` | **PASS** | Role and capacity tradeoff are visible. |
| `leadership_roster.remove_makki` | **PASS** | Loss of parliamentary-oil access is visible. |
| `leadership_roster.add_kashani` | **PASS** | Explicitly frames a negotiated independent counterpart, not a subordinate. |
| `leadership_roster.remove_kashani` | **PASS** | Describes removal of the pinned channel, not control over his network. |
| `leadership_roster.confirm_roster` | **PASS** | Applies exactly the draft three and visibly reports the new channels and political boundary. |

The related system record now says “roster selection,” matching arbitrary
three-person selection. The earlier “roster packages” documentation drift is
closed.

## Advisers

All six menus pass. Their person records use authoritative foundations and
clearly distinguish documented role from the simulated consultation. Choice
counts vary between two and three. Every substantive action shares the
six-month timer, has a qualitative subtitle, and displays a result before
returning to the hand.

### Adviser menus

| Compiled scene | Result | Source | Finding |
|---|---:|---:|---|
| `mossadegh` | **PASS** | A | Constitutional coordinator with two bounded interventions and the coalition-difference limit. |
| `fatemi` | **PASS** | A/B | Journalist/political role with three press strategies and no claim of sole editorial control. |
| `saleh` | **PASS** | A | Iran Party/National Front role and exact credential act are separated from three simulated organizational consultations. |
| `maleki` | **PASS** | A/B | Two social-democratic organizational actions and an explicit prohibition on projecting the later Third Force backward. |
| `makki` | **PASS** | A | Three parliamentary/oil actions and an explicit prohibition on projecting the later break backward. |
| `kashani` | **PASS** | A/B | Two negotiated actions; the scene consistently treats him as an independent counterpart with his own constituency. |

### Every adviser result

| Compiled result scene | Result | Consequence check |
|---|---:|---|
| `mossadegh.constitutional_case` | **PASS** | Reports the argument, Majles procedure, shared case, and unresolved differences. |
| `mossadegh.hear_tendencies` | **PASS** | Reports boundaries learned, reduced misunderstanding, and lack of forced agreement. |
| `fatemi.fatemi_message` | **PASS** | Reports message production, editorial adaptation, and displaced arguments. |
| `fatemi.fatemi_network` | **PASS** | Reports verification and coordination while preserving editorial independence. |
| `fatemi.fatemi_dossier` | **PASS** | Reports evidence handling and the immediacy/credibility tradeoff. |
| `saleh.saleh_reports` | **PASS** | Reports observation/hearsay separation and preserves uncertainty. |
| `saleh.saleh_committee` | **PASS** | Reports committee practice and the component-specific capacity effect. |
| `saleh.saleh_credentials` | **PASS** | Reports a reusable model file without claiming it resolves all places. |
| `maleki.maleki_organizers` | **PASS** | Reports concrete training and continued diversity of organizing traditions. |
| `maleki.maleki_program` | **PASS** | Reports an explicit cooperation boundary rather than invented consensus. |
| `makki.makki_floor` | **PASS** | Reports procedural preparation and coordinated division of work. |
| `makki.makki_oil` | **PASS** | Reports limited-issue outreach without treating support as Front membership. |
| `makki.makki_questions` | **PASS** | Reports term-specific examination and avoids supplying unknown answers. |
| `kashani.kashani_bazaar` | **PASS** | Reports negotiated language, wider reach, and ownership of contacts outside Front command. |
| `kashani.kashani_terms` | **PASS** | Reports a bounded agreement, clarified conditions, and continued contingency. |

The “Return to the monthly briefing” option on each adviser menu is navigation
and correctly does not consume the shared timer.

## Internal and container scenes

These compiled scenes are intentionally outside the 94 player-facing count.
They should not be padded with narrative prose:

| Compiled scene | Classification | Finding |
|---|---|---|
| `root` | Internal router | Correctly separates fresh title routing from initialized-campaign routing. |
| `root.start_game` | Internal initializer | Correct home for shared state, proposal records, ledgers, and default adviser state. |
| `post_event` | Internal reducer/router | Correct home for timers, bounds, derived aggregates, event priority, terminal routing, and hand return. |
| `post_event.events_choice` | Internal tagged-event selector | Historical narration remains in the selected event, not the queue. |
| `main.party_affairs` | Deck container | Player-facing title is sufficient; authored content belongs to its four cards. |
| `main.public_campaign` | Gated deck container | Formation gate and title are sufficient; authored content belongs to its four cards. |
| `main.parliamentary_affairs` | Gated deck container | Election/chamber gate and title are sufficient; authored content belongs to its four cards. |
| `prevScene`, `prevTopScene`, `jumpScene`, `backSpecialScene`, `returnScene` | Dendry navigation | Framework routes; no narrative required. |

The four prologue and fourteen historical scenes remain governed by
[`2026-07-29-v01-event-adversarial-audit.md`](2026-07-29-v01-event-adversarial-audit.md)
and are not silently reclassified as internal.

## Post-correction acceptance verdict

The all-scenes content gate passes:

- all seven failed information scenes are corrected;
- exact Senate and Majles claims have precise controlling locators;
- the hosted Event Notes and Coalition/People pages expose usable public
  research routes;
- every important mutable factor is visible qualitatively without debug mode;
- the roster system record matches arbitrary three-person selection;
- `npm test` and `git diff --check` are green; and
- generated public-fragment targets resolve.

The only outstanding validation item is environmental: rerun Playwright after
providing the Chromium and Firefox shared-library dependencies. No content
rewrite is indicated by that launch failure.
