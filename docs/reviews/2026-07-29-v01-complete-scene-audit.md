# The Last Majles v0.1 complete compiled-scene audit

**Review date:** 29 July 2026  
**Reviewed build:** current `source/` and rebuilt `out/game.json` after adviser-roster
removal, perfect-information cleanup, Library redesign, and the Common
Resolution card  
**Standard:** [SCENE_CONTENT_STANDARD.md](../SCENE_CONTENT_STANDARD.md)  
**Automated inventory:** [audit-scenes.js](../../scripts/audit-scenes.js)  
**Review posture:** independent, exhaustive, adversarial; no game-source edits by
this reviewer

## Verdict

All **166 compiled scene IDs** are inventoried below. The current build has
**166 passes and 0 failures**. The seven current review-class totals reconcile
exactly to the automated inventory:

| Review class | Script total | PASS | FAIL |
|---|---:|---:|---:|
| `framework_internal` | 5 | 5 | 0 |
| `information_surface` | 18 | 18 | 0 |
| `visible_consequence` | 98 | 98 | 0 |
| `deck_container` | 3 | 3 | 0 |
| `engine_internal` | 4 | 4 | 0 |
| `decision_menu` | 36 | 36 | 0 |
| `continuation_decision` | 2 | 2 | 0 |
| **Total** | **166** | **166** | **0** |

The three former manual prose failures in
`campaign_spine.nationalization_cross_chamber`,
`campaign_spine.senate_approval`, and `campaign_spine.finish_campaign` are
closed. Their revised text states the political action and endpoint directly
without narrating source policy or the scorecard.

`root.about` also removes its former developer jargon, and its replacement
sentence now wraps `Shah` with the required `term-royalist` class. The compiled
field has no unwrapped, incomplete, or incorrectly classified semantic term.
`node scripts/audit-scenes.js` reports no failures.

## Method

This audit rebuilt its inventory from the current `out/game.json`; it did not
edit the previous 177-row table or use earlier reviews as a substitute for
enumeration. Every compiled ID was assigned one of the seven current classes
and reviewed against that class's responsibility.

The review checked:

- every historical and recurring decision for sufficient setup, a choice count
  justified by the decision, qualitative tradeoffs, distinct effects, and a
  visible consequence;
- every consequence for concrete action and reaction, unresolved limits,
  acknowledgement, and the separation of historical fact from plausible
  organizational response;
- every information surface for direct useful content, clear navigation, and
  the absence of unnecessary tutorial or design commentary;
- every event source block for a nearby human-readable `# Source:` or
  `# Sources:` comment with an author/title or official-record identity and a
  locator;
- every compiled visible field for internal `MAJ-*`/`SUP-*` tags,
  `Research:` labels, footnote-like source markers, obsolete
  political-intelligence language, run-seed language, and adviser-roster
  instructions;
- semantic political spans, correct semantic classes, citation-link exemption,
  and complete multi-line wrappers; and
- deck, engine, and framework scenes for their narrower ownership boundaries.

## Requested regression probes

### Perfect information and tutorial prose

No compiled player-facing scene contains `political_intelligence`, “political
intelligence,” the removed fragmentary-report line, run-seed language, or a
hidden report-reliability mechanic. Choice subtitles consistently disclose
qualitative direction, costs, and risks.

### Research Library and source comments

The redesigned Library presents institutions, chronology, coalition figures,
chambers, oil terms, historical notes, uncertainty, and principal works
directly. It exposes no internal bibliography IDs. Author/title
recommendations and neutral links to the public primer comply with the
Library exception in the standard.

Historical scenes and monthly briefings have human-readable source comments.
The prologue's file-level comment explicitly covers the attempt, martial law,
the `Tudeh Party` ban, constitutional revision, and First-Senate composition.
Each event in the campaign spine has its own adjacent comment. Exact
parliamentary acts use official proceedings and rosters; interpretation relies
on the strongest reviewed scholarly works. Disputed responsibility and unknown
oil terms remain bounded.

The two former late-campaign source-policy failures now state their
institutional consequences directly and pass.

### Six pinned advisers

The compiled game contains exactly six pinned adviser menus:
`mossadegh`, `fatemi`, `saleh`, `maleki`, `makki`, and `kashani`.
None has an activation `view-if`; all six are continuously present, and all
substantive consultations share the six-month adviser timer. The deleted
leadership-roster manager and its twelve configuration steps are absent.
Kashani remains an independent counterpart rather than a subordinate staff
member. Adviser menus distinguish historical role from counterfactual
consultation and provide visible outcomes.

### Common Resolution

`common_resolution` is a complete recurring decision: two setup paragraphs
establish the coalition problem; three strategies distinguish constitutional
minimum, oil concentration, and published component amendments; every option
has a qualitative tradeoff and mechanically distinct component effects; and
all three results provide visible operational and political consequences. Its
four-month cooldown and monthly-action cost follow the recurring-card
responsibility boundary.

### Semantic coloring

The compiled semantic scan reports no unwrapped term, incorrect class, or
partial complete-name wrapper. The independent pass rechecked `Shah` in
`root.about` and multi-line instances of **Mohammad Reza Shah**, **Tudeh
Party**, **Prime Minister Haj Ali Razmara**, **National Front**, and all six
advisers. Citation-link labels remain neutral as required. No inline color
value substitutes for a semantic class, and the prose remains intelligible
without color.

## Dynamic SPD comparison

The corresponding Dynamic SPD patterns inspected were:

- `source/scenes/events/black_thursday.scene.dry`;
- `source/scenes/events/hindenburg_explode_referendum_campaign.scene.dry`;
- `source/scenes/party_affairs/media.scene.dry`;
- `source/scenes/party_affairs/fundraising.scene.dry`;
- `source/scenes/party_affairs/party_organizations.scene.dry`;
- `source/scenes/advisors/wels.scene.dry`;
- `source/scenes/advisors/stampfer.scene.dry`;
- `source/scenes/library.scene.dry`;
- `source/scenes/status.scene.dry`; and
- `source/scenes/ending_slides.scene.dry`.

Those paths are relative to
`/home/phroz/spd/dynamic_social_democracy`. The Last Majles retains the
visible setup → choice → consequence rhythm, described adviser consultations,
pinned adviser presentation, contextual Library return, direct status
surfaces, and causal ending. It deliberately diverges from SPD's
leadership-selection pattern: all six researched advisers remain pinned and
share one consultation cooldown, with no roster-management action. The
campaign also retains Iranian coalition components, chamber evidence, and a
fixed nationalization anchor rather than importing German historical or
electoral assumptions.

## Complete compiled inventory

| Compiled scene ID | Review class | Verdict | Concise finding |
|---|---|---:|---|
| `backSpecialScene` | `framework_internal` | **PASS** | Generated Dendry navigation helper; framework-only responsibility is correct. |
| `bazaar_outreach` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `bazaar_outreach.bazaar_autonomy` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `bazaar_outreach.bazaar_constitution` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `bazaar_outreach.bazaar_oil` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_ending` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `campaign_spine` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.assassination_bounded` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.assassination_condemn` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.assassination_verify` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.chambers_open` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.committee_bridge` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.committee_claim` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.committee_joint` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.committee_majority` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.committee_public_brief` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.committee_rejection` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.committee_rejection_response` | `continuation_decision` | **PASS** | Described follow-on strategy menu; every target has a title and tradeoff. |
| `campaign_spine.committee_terms` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.credential_campaign` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.credentials_combined` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.credentials_internal` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.credentials_public` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.finish_campaign` | `visible_consequence` | **PASS** | Revised transition states what the Front carries forward without narrating scorecard policy. |
| `campaign_spine.hazhir_bounded` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.hazhir_condemn` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.hazhir_verify` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.majles_approval_beat` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.majles_coalition` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.majles_movement` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.majles_record` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.majles_rejection` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.majles_rejection_response` | `continuation_decision` | **PASS** | Described follow-on strategy menu; every target has a title and tradeoff. |
| `campaign_spine.nationalization_approval` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.nationalization_cross_chamber` | `visible_consequence` | **PASS** | Revised consequence describes the constitutional case and political tradeoff without authorial source-policy prose. |
| `campaign_spine.nationalization_institution` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.nationalization_public` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.oil_committee_formation` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.opening_coalition` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.opening_liaison` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.opening_procedure` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.razmara_assassination` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.razmara_confrontation` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.razmara_joint` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.razmara_public` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.razmara_terms` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.rerun_balanced` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.rerun_monitor` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.rerun_slate` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.senate_approval` | `decision_menu` | **PASS** | Revised event directly states the chamber act, unfinished implementation, and resulting political stakes. |
| `campaign_spine.supplemental_campaign` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `campaign_spine.supplemental_deputies` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.supplemental_explain` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.supplemental_mandate` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `campaign_spine.tehran_rerun` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `coalition_meeting` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `coalition_meeting.meeting_constitution` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `coalition_meeting.meeting_dissent` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `coalition_meeting.meeting_oil` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `common_resolution` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `common_resolution.resolution_amendments` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `common_resolution.resolution_constitution` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `common_resolution.resolution_oil` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `credential_petitions` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `credential_petitions.credentials_cases` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `credential_petitions.credentials_floor` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `deputy_outreach` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `deputy_outreach.deputies_constituency` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `deputy_outreach.deputies_oil` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `deputy_outreach.deputies_procedure` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `electoral_committee` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `electoral_committee.electoral_case` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `electoral_committee.electoral_register` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `electoral_committee.electoral_reports` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `fatemi` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `fatemi.fatemi_dossier` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `fatemi.fatemi_message` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `fatemi.fatemi_network` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `front_formation` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `front_formation.coordination_committee` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `front_formation.membership_front` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `front_formation.narrow_program` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `fundraising` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `fundraising.fund_notables` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `fundraising.fund_small` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `fundraising.fund_subscription` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `jumpScene` | `framework_internal` | **PASS** | Generated Dendry navigation helper; framework-only responsibility is correct. |
| `kashani` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `kashani.kashani_bazaar` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `kashani.kashani_terms` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `legal_defense` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `legal_defense.defense_cases` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `legal_defense.defense_record` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `main` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `main.parliamentary_affairs` | `deck_container` | **PASS** | Deck wrapper only; authored setup and results remain in its cards. |
| `main.party_affairs` | `deck_container` | **PASS** | Deck wrapper only; authored setup and results remain in its cards. |
| `main.public_campaign` | `deck_container` | **PASS** | Deck wrapper only; authored setup and results remain in its cards. |
| `makki` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `makki.makki_floor` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `makki.makki_oil` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `makki.makki_questions` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `maleki` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `maleki.maleki_organizers` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `maleki.maleki_program` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `membership_committees` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `membership_committees.committees_autonomy` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `membership_committees.committees_shared` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `mossadegh` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `mossadegh.constitutional_case` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `mossadegh.hear_tendencies` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `oil_committee` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `oil_committee.oil_coalition` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `oil_committee.oil_record` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `oil_committee.oil_terms` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `palace_protest` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `palace_protest.begin_organizing` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `post_event` | `engine_internal` | **PASS** | Initializer/reducer/router only; no visible decision or historical narration is assigned. |
| `post_event.events_choice` | `engine_internal` | **PASS** | Initializer/reducer/router only; no visible decision or historical narration is assigned. |
| `press` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `press.press_constitution` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `press.press_oil` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `press.press_plural` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prevScene` | `framework_internal` | **PASS** | Generated Dendry navigation helper; framework-only responsibility is correct. |
| `prevTopScene` | `framework_internal` | **PASS** | Generated Dendry navigation helper; framework-only responsibility is correct. |
| `prologue_attempt` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `prologue_attempt.assembly_organize` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.assembly_procedure` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.assembly_risk` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.attempt_caution` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.attempt_joint` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.attempt_quiet` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.ban_contacts` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.ban_legal_record` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.ban_public_defense` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.prologue_ban` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `prologue_attempt.prologue_constituent` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `prologue_attempt.prologue_senate` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `prologue_attempt.senate_committee` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.senate_constitution` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `prologue_attempt.senate_correspondents` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `public_meetings` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `public_meetings.meetings_network` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `public_meetings.meetings_tehran` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `research_library` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `research_library.bibliography` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `research_library.chambers` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `research_library.coalition_people` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `research_library.events` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `research_library.government` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `research_library.oil` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `research_library.timeline` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `research_library.uncertainty` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `returnScene` | `framework_internal` | **PASS** | Generated Dendry navigation helper; framework-only responsibility is correct. |
| `root` | `engine_internal` | **PASS** | Initializer/reducer/router only; no visible decision or historical narration is assigned. |
| `root.about` | `information_surface` | **PASS** | Revised release history removes developer jargon and wraps `Shah` with the required `term-royalist` class. |
| `root.historical_primer` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `root.start_game` | `engine_internal` | **PASS** | Initializer/reducer/router only; no visible decision or historical narration is assigned. |
| `root.start_menu` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `saleh` | `decision_menu` | **PASS** | Setup, choice count, tradeoffs, source boundary, and visible result routing pass. |
| `saleh.saleh_committee` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `saleh.saleh_credentials` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `saleh.saleh_reports` | `visible_consequence` | **PASS** | Visible result, acknowledgement route, and historical/counterfactual boundary pass. |
| `status` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `status.coalition` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `status.crown` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
| `status.majles` | `information_surface` | **PASS** | Direct useful content, source boundary where applicable, and navigation pass. |
