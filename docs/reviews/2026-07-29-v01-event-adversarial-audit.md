# The Last Majles v0.1 event adversarial audit

**Review date:** 29 July 2026  
**Scope:** the four prologue scenes and fourteen fixed/tagged campaign events
from February 1949 through 20 March 1951  
**Review posture:** adversarial content and source review; no game-source
changes were made

## Release verdict

The event spine is mechanically complete but not yet written to a
public-demo standard. It reliably carries the player between the required
historical anchors, preserves important responsibility boundaries, and avoids
inventing votes or dialogue. It does not yet provide the dramatic and
explanatory experience established by Dynamic SPD.

The principal release-blocking content defects are systemic:

1. **No choice produces a durable on-screen consequence passage.** Almost
   every choice applies state and immediately executes `go-to: post_event`.
   The few branches that do contain prose (`attempt_caution`,
   `attempt_quiet`, `narrow_program`, and `coordination_committee`) also
   immediately route to a `new-page` scene, so the engine clears that prose
   before the player can read it. This follows directly from
   `DendryEngine.__changeScene`: it displays a branch, evaluates its `goTo`,
   and then enters the next `new-page` scene.
2. **Sixteen of eighteen scenes are rigid binaries.** The only exceptions are
   the single-continuation palace opening and Senate finale. The uniformity is
   a design artifact, not a finding about the underlying decisions.
3. **Choice presentation is mechanically opaque.** No v0.1 event choice has a
   `subtitle`; the player therefore cannot see costs, likely institutional
   direction, availability logic, or the political constituency implicated by
   the action. Several labels describe attitudes rather than concrete acts.
4. **Setup passages are usually summaries, not scenes.** Most campaign setups
   run to one short paragraph. They rarely identify the institution acting,
   what has just changed, why the Front has standing to respond, who inside the
   coalition disagrees, or what is at risk this month.
5. **Source authority is usually good, but claim-level locators are not.**
   Azimi, Abrahamian, Painter and Brew, official Majles proceedings, and the
   official law compilation are appropriate foundations. Many adjacent notes
   cite entire chapters or broad page ranges, however, and some institutional
   events omit the controlling official record. The palace scene uniquely
   prints a supplemental journal article as its visible research note even
   though Azimi, pp. 207–08, is already the stronger book-length foundation.
6. **Two citation/date boundaries need correction before prose expansion.**
   The oil-committee rejection is documented in its adjacent note as
   25 November 1950 but displayed as December 1950. The March-nationalization
   note cites the later nine-article implementation law (`SUP-006`, printed
   pp. 15–16) alongside the March principle even though the release explicitly
   defers that implementation law.

The right response is a researched rewrite pass, not additional unsourced
flavor. Historical orientation and observed outcomes should come from the
best available scholarship and controlling institutional records.
Counterfactual action and consequence prose should be plainly marked as the
player's intervention or a mechanical abstraction.

## Severity scale

- **S1 — release blocker:** the scene fails the requested event standard,
  exposes a material historical/citation problem, or hides the result of a
  player decision.
- **S2 — major:** the scene is playable but substantially underwritten,
  mechanically opaque, or framed around an artificial choice count.
- **S3 — moderate:** the core framing works but needs more precise orientation,
  choice explanation, consequence, or sourcing.
- **S4 — polish:** clarity or pacing improvement that does not alter the
  scene's basic adequacy.

Every decision-bearing scene currently inherits the systemic **S1 consequence
display defect**, even where the per-event finding below concentrates on
another issue.

## What Dynamic SPD does

Representative comparison paths are relative to
`/home/phroz/spd/dynamic_social_democracy/`.

- [`source/scenes/events/panzerkreuzer.scene.dry`](../../../spd/dynamic_social_democracy/source/scenes/events/panzerkreuzer.scene.dry)
  establishes the cabinet, coalition partners, party base, earlier campaign
  promise, and institutional vote before presenting three materially distinct
  acts: vote yes, vote no, or abstain. Every branch then narrates how allies,
  members, and the Reichstag respond.
- [`source/scenes/events/all_quiet.scene.dry`](../../../spd/dynamic_social_democracy/source/scenes/events/all_quiet.scene.dry)
  uses four choices because the decision actually permits four postures:
  prohibition, passive permission, police protection, and active public
  promotion. Conditional choices explain why they are unavailable, and each
  branch reports a concrete outcome.
- [`source/scenes/events/wittorf_affair.scene.dry`](../../../spd/dynamic_social_democracy/source/scenes/events/wittorf_affair.scene.dry)
  gives a compact but sufficient two-paragraph setup, asks a direct operational
  question, and offers three acts: publicize, abstain, or suppress publication.
  The consequence prose names both the immediate gain and the relational or
  ethical cost.
- [`source/scenes/events/bruning_vonc.scene.dry`](../../../spd/dynamic_social_democracy/source/scenes/events/bruning_vonc.scene.dry)
  uses choice `subtitle` text to disclose whether a government falls, an
  election follows, or toleration results. Outcome branches then adapt to
  actual parliamentary conditions.
- [`source/scenes/events/young_plan_referendum.scene.dry`](../../../spd/dynamic_social_democracy/source/scenes/events/young_plan_referendum.scene.dry)
  correctly offers only one continuation because the player is receiving a
  result rather than being asked to manufacture a decision.
- [`source/scenes/events/austrian_civil_war.scene.dry`](../../../spd/dynamic_social_democracy/source/scenes/events/austrian_civil_war.scene.dry)
  shows the useful limit of the comparison: its branching counterfactual war
  outcomes are much broader than this project's Iran-specific historical
  responsibility boundaries permit. The Last Majles should copy its layered
  pacing, visible costs, and consequence reporting, not its freedom to rewrite
  fixed historical anchors.

Dynamic SPD is uneven and is not a prose or historical authority. The useful
baseline is structural:

> orient the player to the event and the institution; present the actual
> decision in concrete verbs; disclose salient costs or constraints; then
> narrate what the chosen action did before returning to the monthly loop.

The Last Majles should retain its stricter boundaries: nationalization still
passes, assassination responsibility is not assigned without evidence, a
scenario choice never overwrites historical chamber evidence, and an
institutional event does not become a free-floating popularity roll.

## Cross-event source-authority findings

### Approved foundations already present

- `MAJ-S1`, Fakhreddin Azimi, *Iran: The Crisis of Democracy,
  1941–1953*, is the preferred political baseline and has stable print pages.
- `MAJ-S2`, Ervand Abrahamian, *Iran Between Two Revolutions*, is a strong
  social, party, and Sixteenth-Majles foundation.
- `MAJ-S3`, Ervand Abrahamian, *Oil Crisis in Iran*, is a recent specialist
  foundation for the oil dispute, ownership, and control.
- `MAJ-S13`, Azimi, *The Quest for Democracy in Iran*, is a strong
  institutional synthesis; the reviewed material at printed pp. 118–53 is
  useful orientation but remains too broad for exact event claims.
- `MAJ-S14`, Painter and Brew, *The Struggle for Iran*, is a recent
  university-press oil-crisis synthesis. Its chapter/section structure can be
  a precise locator when the named stable section is recorded.
- `SUP-007`, the official Majles proceedings, controls recorded motions,
  credential approvals, speeches, and lower-house procedure.
- `SUP-059`, the official Oil Commission record, should control commission
  proceedings after claim-level extraction. The source audit currently says
  that extraction is pending.
- `SUP-006`, the official Sixteenth-Majles law compilation, controls enacted
  law. It does **not** by itself explain motives and its verified printed
  pp. 15–16 concern the later nine-article implementation law.

### Source flags used below

- **A — authority and locator adequate:** the adjacent record identifies a
  strong source and a sufficiently precise locator for the implemented claim.
- **B — authority adequate, locator weak:** appropriate sources exist, but an
  entire chapter, a 15–20-page range, or a secondary registry is cited instead
  of the exact supporting page/section/session passage.
- **C — controlling source not yet extracted:** a stronger local official
  record exists or is identified, but its relevant passage has not been
  checked and recorded.
- **D — citation mismatch:** the displayed claim/date and the cited evidence
  do not align, or the citation belongs to a deferred event.

No recommendation below supplies a page number or quotation that has not
already been verified in the repository.

## Per-event audit

### P1. 4 February 1949 attempt on the Shah

**Files:** `source/scenes/prologue_attempt.scene.dry`;
`docs/research/events/1949-02-attempt-and-emergency.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The setup correctly distinguishes the known shooting from
uncertain responsibility, which is the most important responsibility boundary.
It does not orient the player to the assailant's setting, the immediate
political actors, what information the opposition actually has, or why a
constitutional opposition network can act before the government response.
Both choices are legitimate and concrete enough, but they are a very narrow
binary between two forms of caution. Neither label previews its political cost
or its constituency. Both branches contain a one-sentence consequence, but
`go-to: prologue_ban` clears it immediately.

The adjacent note cites `MAJ-S3`, chapter 3, and `MAJ-S1`, chapter 15. Those
are appropriate books, but exact date, setting, injury, and subsequent measures
need claim-level locators. Do not add the assailant's affiliation, motive, or
backers until the sources support each proposition at the required level.

**Rewrite recommendation.**

- Expand the setup to separate verified facts, immediate rumors, and the
  opposition's limited information.
- Consider three actions if research supports the distinction: an immediate
  evidentiary statement, a private cross-faction fact-finding effort, and a
  deliberately silent monitoring posture. If research does not support a
  meaningful third posture, keep two.
- Give each choice a subtitle that states the concrete channel used and likely
  direction of legitimacy, intelligence, or Crown relations without exposing
  raw numbers.
- Hold on a readable result page explaining what the statement or inquiry
  establishes and what remains unknown.

### P2. Martial law and the Tudeh ban

**Files:** `source/scenes/prologue_attempt.scene.dry`;
`docs/research/events/1949-02-attempt-and-emergency.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The scene compresses martial law, outlawing the Tudeh Party,
arrests, press restrictions, and opposition activity into two sentences. It
does not explain who imposed the measures, the difference between recording
abuse and preserving contacts, or the risks to constitutionalists of being
associated with a banned party. “Build a legal record” and “Preserve discreet
organizational contacts” are meaningfully distinct acts, so two choices may
fit. They need visible risks and consequences. At present both branches are
empty and route directly onward.

`MAJ-S15`, pp. 161–75, is already described elsewhere in the registry as
reviewed for the Tudeh ban and Sixteenth-Majles context, but the adjacent event
note does not cite it. The current chapter-only references need precise
locators before the setup is expanded.

**Rewrite recommendation.**

- Orient the player to the emergency legal order, repression, and the Front's
  still-unformed organizational position.
- Explain that preserving contacts is not an endorsement of, or control over,
  the Tudeh Party.
- Keep two choices only if the scene is explicitly about prioritizing a public
  legal record versus protected communication; otherwise add a third public
  civil-liberties coalition response if an authoritative source supports that
  as a plausible counterfactual channel.
- Write separate results: what evidence is preserved, who is exposed or
  reassured, and what access is lost.

### P3. The 1949 constituent assembly

**Files:** `source/scenes/prologue_attempt.scene.dry`;
`docs/research/events/1949-constituent-assembly-and-senate.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The setup identifies revised Article 48 and royal dissolution
power, but not how the assembly was constituted, what other constitutional
changes matter to the campaign, or why an objection has political rather than
legal force. “Challenge the procedure” and “concentrate on practical risk”
are framings, not sufficiently concrete actions. They also conceal an odd
mechanical distinction: one raises legitimacy and Crown resistance, while the
other raises intelligence. Neither branch has consequence prose.

The source authorities are appropriate. `MAJ-S13`, chapter 3, printed
pp. 118–53, is too broad a range for revised Article 48. A precise source page
or stable section must be extracted before adding procedural detail.

**Rewrite recommendation.**

- Explain the constitutional stakes in plain language: the text changes, the
  balance among Crown, cabinet, and Majles, and what the opposition cannot
  reverse in this prologue.
- Replace abstract labels with acts such as issuing a signed constitutional
  objection, preparing a legal memorandum for future deputies, or organizing
  against use of dissolution power. Only include actions justified as plausible
  counterfactual channels.
- If all available evidence supports only two distinct channels, retain two;
  otherwise a three-way legal/public/organizational decision would better fit
  the problem.
- Show the immediate reception and the institutional record the player carries
  forward.

### P4. Senate and Sixteenth-Majles election preparation

**Files:** `source/scenes/prologue_attempt.scene.dry`;
`docs/research/events/1949-constituent-assembly-and-senate.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The scene makes a useful transition into electoral organization
but does not explain the First Senate's elected/appointed routes, why that
matters to Crown capacity, how the Sixteenth-Majles contest differs, or who the
“opposition politicians” are. The two choices—monitoring committee or public
constitutional appeal—are credible different actions. Neither receives
flavor, visible tradeoffs, or consequence prose.

The combined adjacent record is too broad for the separate institutional
claims. It needs claim-level locators for revised Article 48, Senate routes,
and election preparation rather than treating those as a single sourced
bundle.

**Rewrite recommendation.**

- Give the player a compact institutional orientation to both chambers.
- State which task the opposition can actually perform before the Front exists.
- Add choice subtitles identifying organizational reach versus public mandate,
  with a Crown-response risk where appropriate.
- End with a result that brings the chosen preparation into the October palace
  protest rather than silently adding one point and moving on.

### E1. October 1949 palace protest

**Files:** `source/scenes/events/1949/palace_protest.scene.dry`;
`docs/research/events/1949-10-palace-protest.md`  
**Severity:** S1  
**Source flag:** D

**Finding.** The scene is a sound historical anchor but not a playable event.
It tells the player that reports of manipulation brought Mossadegh and others
together, then offers only “Begin organizing.” A one-choice transition is
appropriate if the protest's occurrence is fixed, as Dynamic SPD does for
results events. It still needs a consequence passage: what the protest does
and does not accomplish, what common purpose emerges, and what remains loose.

The visible research note cites Mari Nukii's supplemental article at p. 10 and
spends more words qualifying its date than the scene spends dramatizing the
event. The adjacent record already establishes Azimi, pp. 207–08, as the
preferred book-length political foundation. The supplemental article may
remain as corroboration in the research record, but it should not be the
scene's lead authority. The date and participant count should remain withheld
until the contemporary sequence is resolved, as the record correctly states.

**Rewrite recommendation.**

- Expand the setup using Azimi, pp. 207–08, without inventing speeches, crowd
  size, or an exact day.
- Keep one continuation if the player is witnessing a fixed organizing act.
  Rename it to the concrete act the coalition takes, not “Begin organizing.”
- Follow with a result page that establishes the shared electoral purpose,
  palace response if documented, and the difference between cooperation and a
  formed Front.
- Move bibliographic detail to the Research Library or use the major work as
  the visible lead citation with a stable anchor.

### E2. Hazhir assassination and the Front's response

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1949-11-hazhir-assassination.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The responsibility boundary is correct and should be preserved.
The event supplies no account of Hazhir's office or role in the election
crisis, the political atmosphere after the killing, the relevant religious
network, or what audiences will read into the Front's statement. Both choices
condemn the killing; the difference between “insist on constitutional methods”
and “document the wider crisis” is too subtle for a full binary decision
without subtitles. There are no consequences.

Azimi, pp. 207–08, is an adequate precise political foundation. Abrahamian,
pp. 250–67, is too broad as an “especially” range for the exact assassination
and response context. No statement should imply Front knowledge,
responsibility, or a direct causal mechanism for the rerun.

**Rewrite recommendation.**

- Explain Hazhir's documented place in the election crisis and distinguish
  assassination fact, attributed responsibility, and political inference.
- Use three choices only if each is a real action: immediate unconditional
  condemnation; a joint constitutional statement that also documents the
  election crisis; or withholding comment pending verified information. That
  third option must be presented as caution, not insinuation.
- Preview Crown, legitimacy, religious-network, and intelligence directions in
  plain-language subtitles.
- Narrate how newspapers, palace circles, and coalition partners receive the
  statement only where authoritative evidence or clearly marked
  counterfactual abstraction permits it.

### E3. National Front structure

**Files:** `source/scenes/events/1949/front_formation.scene.dry`;
`docs/research/events/1949-11-front-structure.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** This is the strongest decision concept in the v0.1 spine:
documented coalition limits become a bounded counterfactual choice about
organization. The setup still lacks the constituent groups, reasons for
remaining autonomous, and practical difference between a common program and
a coordination committee. “Narrow program” and “coordination committee” can
coexist institutionally, so the choice risks being a false binary unless it is
explicitly framed as which element receives binding priority. The two branches
have concise consequences, but immediate routing makes them unreadable.

Azimi, pp. 207–08, is precise enough for formation and coalition character.
Abrahamian, “chapter 5,” and Painter/Brew, chapter 1, need exact stable
sections if they support additional claims. A later international oil
synthesis should not displace the core political histories for the Front's
1949 organization.

**Rewrite recommendation.**

- Name the major kinds of participants without claiming a definitive founding
  roster.
- Reframe the decision as a concrete organizational proposal: adopt a signed
  minimum program, establish an empowered coordinating secretariat, or retain
  an ad hoc committee. Three choices may better represent degree of
  institutionalization if the mechanics and sources support them.
- Give every option a subtitle identifying autonomy, coordination, legitimacy,
  and dissent tradeoffs.
- Preserve the current branch ideas but expand each into a consequence showing
  what members agree to, what they refuse, and what institution now exists.

### E4. Tehran election cancellation and rerun

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1950-tehran-rerun.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The setup states the cancellation and asks between a common slate
and monitoring network, but does not explain why the vote was cancelled, what
is at stake in Tehran, what electoral machinery the court can influence, or
how slate discipline and evidence gathering compete for finite people and
money. The options are concrete but their hidden effects are not predictable.
No consequences follow.

Abrahamian, pp. 250–67, is an authoritative but overly broad range. The
Sixteenth-Majles ledger is a research synthesis and denominator control, not a
substitute for a claim-level historical source. Exact cancellation, rerun,
returns, and the eventual eight-person cohort need precise locators to the
major history and/or official return and credential records.

**Rewrite recommendation.**

- Add the institutional sequence and the Front's limited capacity.
- A third balanced strategy may fit—smaller common slate plus selective
  monitors—but should cost more resources or produce weaker gains in both
  directions, avoiding a costless “best of both” choice.
- Add subtitles stating resource needs and likely organizational/procedural
  effects.
- Show the chosen apparatus at work and carry its result into later credential
  events without changing the documented eventual cohort.

### E5. Sixteenth Majles and First Senate open

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1950-chambers-open.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The scene correctly insists that return, credential, usability,
alignment, and attendance are separate. That reads like a data-model note
rather than historical orientation. It does not tell the player what opening
the chambers changes, why 98 approved credentials matter, how the Senate's
mixed route changes Crown leverage, or what the National Front can do with a
small delegation. The two choices—procedure first or group coordination—are
reasonable priorities, but they need concrete acts and visible consequences.

Official Majles session 2, 18 February 1950, printed pp. 1–15 is the right
controlling record for the cited opening credential aggregate, though the
actual passage should be narrowed. `MAJ-S13`, pp. 118–53, is far too broad for
exact opening procedure. The First-Senate opening needs its own precise
authority; the repository has an official roster but not local proceedings.
Do not infer named Senate behavior from the roster.

**Rewrite recommendation.**

- Translate the ledger distinction into a political scene: seats exist on
  paper, but a deputy cannot act until the chamber accepts the credential and
  attendance makes the seat usable.
- Consider three strategies: lead case-by-case objections, create a disciplined
  parliamentary group, or negotiate a procedural compact with non-Front
  deputies. The third requires evidence as a plausible counterfactual and
  should not invent a party coalition.
- Show the first procedural result and the new limits on the Front's action.
- Keep chamber initialization in the reducer/data layer; do not expose code
  logic as narrative explanation.

### E6. National Front credential campaign

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1950-credential-campaign.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The scene correctly treats credentials as waves and prevents
ideology from being inferred from timing. It does not explain what a
credential challenge is, which documented decisions have just occurred, why
publicizing a case might imperil relationships, or how an internal strategy
works. “Publish strongest cases” and “preserve relationships” are plausible
but the second is not a concrete enough action. No consequence passage reports
which cases or relationships matter.

Sessions 25 (18 May) and 30 (1 June) are controlling official records, but the
adjacent note omits printed pages and the exact credential passages. Those
locators should be added before the scene names procedure or statements.

**Rewrite recommendation.**

- Explain credentials in player-facing language and identify the Saleh and
  Tehran waves only to the degree the verified proceedings permit.
- Replace the internal option with a specific parliamentary act such as
  negotiating scheduling/support or preparing petitions privately.
- A third mixed litigation-and-publicity option could fit if it has real
  resource and relationship costs.
- Report what became usable, what remains disputed, and how the chosen tactic
  changes future oil outreach. Historical credential facts must remain
  separate from player influence.

### E7. Oil committee formation

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1950-oil-committee.md`  
**Severity:** S1  
**Source flag:** C

**Finding.** The scene omits the adjacent record's most useful orientation:
an eighteen-member committee including five National Front deputies gives a
small delegation a platform. It also does not explain the supplemental
agreement's status, the committee's remit, or why a term-by-term record and
coalition-building might compete. The two options are a defensible binary only
if framed as the committee's first priority; in practice scrutiny and outreach
are complementary. There are no consequences.

The current sources are strong secondary works but imprecise (`MAJ-S2`,
pp. 250–67; `MAJ-S14`, chapter 1). The source audit identifies official Oil
Commission record `SUP-059` as controlling for attendance, motions,
interventions, reports, and decisions, with claim-level extraction still
pending. That extraction should precede detailed scene writing.

**Rewrite recommendation.**

- Pause substantive expansion until the relevant `SUP-059` passages are
  extracted and checked.
- Orient the player to committee composition and jurisdiction only after the
  precise official locator is recorded.
- Consider three committee strategies: build a documented term matrix, recruit
  named categories of non-Front deputies without inventing alignments, or
  coordinate public evidence outside the chamber. Each must state a concrete
  product and cost.
- Consequences should show a report, witness/evidence plan, or coalition
  commitment—not an unexplained support increase.

### E8. Supplemental-agreement campaign

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1950-supplemental-agreement.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The scene names Gass–Golshayan and the Saudi-Aramco comparison
but does not explain any of the structured terms already modeled by the game:
ownership recognition, operational control, marketing, compensation, interim
finance, personnel authority, or review. The player therefore cannot know what
“explain the disputed terms precisely” means. “Turn the issue into a public
mandate” is an objective, not an action. Two choices again falsely separate
parliamentary explanation from public mobilization.

`MAJ-S14` and `MAJ-S3` are the right class of oil authorities, but the adjacent
record should name the stable section or source-page anchors supporting each
implemented term and date. The Saudi comparison needs its own exact source
locator and explicit limits before expanded use.

**Rewrite recommendation.**

- Put a short, sourced term comparison in the setup and preserve `null` for
  unknowns.
- Use concrete channels: publish a term-by-term press dossier, organize public
  meetings around sovereignty/control, or brief wavering deputies using the
  comparison with explicit caveats.
- Provide subtitles identifying press, mandate, parliamentary, and Crown-risk
  directions.
- Show how the argument is received and which misconception is corrected;
  never imply that Saudi-Aramco and AIOC contracts are mechanically identical.

### E9. Oil committee rejects Gass–Golshayan

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1950-supplemental-agreement.md`  
**Severity:** S1  
**Source flag:** D

**Finding.** The game displays “December 1950,” while the adjacent research
record states that the committee rejected the agreement on 25 November 1950.
Even if the monthly engine resolves the event on the December hand, the
historical heading must not silently move the decision. The scene's only
orientation is a design admonition that the decision is “not a free-floating
popularity bonus.” That is useful documentation, not event prose. Claiming a
procedural victory or widening the coalition can be two post-result strategies,
but both need actual actions and consequences.

The official Oil Commission record should control the committee decision once
its passage is extracted. The current chapter-level secondary citations are
not enough for precise committee procedure.

**Rewrite recommendation.**

- Correct the displayed date to the verified date or explicitly label the
  monthly briefing as arriving in December while stating that the decision
  occurred on 25 November.
- Make the rejection itself a one-choice result beat, then present a second
  decision beat about the Front's response. This follows Dynamic SPD's
  result-then-action pacing without making the historical vote optional.
- Offer concrete acts: publish the committee reasoning, negotiate a successor
  nationalization motion, or stage a joint parliamentary/public declaration.
- Report the resulting parliamentary and public response on a readable page.

### E10. Majles rejects the supplemental agreement

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1950-supplemental-agreement.md`  
**Severity:** S1  
**Source flag:** C

**Finding.** The exact date is supplied, but the entire setup is one sentence.
It does not explain how the issue moved from committee to chamber, what the
Majles rejected, what remained open after rejection, or why this is distinct
from nationalization. “Emphasize the record” and “emphasize the public
coalition” are messaging attitudes rather than concrete actions. No
consequences follow.

The oil monographs are appropriate for interpretation, but an exact chamber
decision should cite the controlling `SUP-007` session passage. The adjacent
record currently supplies no session number or printed page for 11 January.
Do not infer a numerical division.

**Rewrite recommendation.**

- Stage the recorded vote/result first and explain the legal/political status
  it leaves behind.
- Follow with one to three actual response choices: issue a constitutional
  report, convene a cross-faction parliamentary meeting, or organize a public
  explanation of why rejection is not yet nationalization.
- Add explicit subtitles and separate consequences.
- Extract and record the exact Majles session and printed page before adding
  procedural detail.

### E11. Confrontation with Razmara

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1951-razmara-confrontation.md`  
**Severity:** S1  
**Source flag:** B

**Finding.** The scene responsibly avoids reducing Razmara's position to a
single motive or invented quotation. It consequently says too little: “serious
administrative and economic dangers” are not identified, the setting and
institutional audience are absent, and the structured oil case remains
offstage. Parliament-versus-public is again an artificial binary; a political
campaign can do both, so the decision needs to be about sequencing, messenger,
or scarce capacity. No result passage follows.

The two recent specialist monographs are suitable, but citations to entire
chapters do not support a particular confrontation. The event needs a dated
speech, parliamentary record, or precise scholarly passage before it describes
Razmara's particular arguments.

**Rewrite recommendation.**

- Use the best precise source to summarize Razmara's documented argument in
  neutral terms, separating administrative capacity, revenue, and control.
- Ask who answers and through what institution: a documented committee
  rebuttal, a floor intervention, a public dossier, or a deliberately joint
  response. Choice count should follow the supported channels.
- State likely strengths and costs in subtitles.
- Consequences should say which claim was answered, which concern remains, and
  how the reply changes coalition confidence without inventing dialogue.

### E12. Razmara assassination

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1951-03-razmara-assassination.md`  
**Severity:** S1  
**Source flag:** A

**Finding.** The scene's factual boundary is good: the killing is fixed,
collective responsibility is not assigned, and the player controls only the
Front's response. It should name Khalil Tahmasabi and Fada'iyan-e Islam because
the adjacent record treats those as documented, while carefully keeping prior
knowledge and encouragement unresolved. The two current choices are barely
distinct because both condemn the killing; one adds the oil case. There is no
consequence.

Painter and Brew, pp. 36–38, is a strong, precise source for the bounded
anchor. Any expansion into encouragement, prior knowledge, or causal claims
must be explicitly disputed and multi-sourced.

**Rewrite recommendation.**

- Expand the setup to identify the documented assailant and the unresolved
  responsibility questions.
- Consider three actions: immediate unqualified condemnation; condemnation
  plus a constitutional restatement of the oil case; or suspension of public
  comment while facts are verified. Present silence as politically costly
  caution, not complicity.
- Explain which coalition relationship and audience each choice risks.
- Write results that distinguish the Front's statement from the independent
  actions of religious actors and from the subsequent parliamentary opening.

### E13. Oil committee and Majles approve nationalization

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1951-03-nationalization.md`  
**Severity:** S1  
**Source flag:** D

**Finding.** Combining committee recommendation (8 March) and Majles approval
(15 March) into one short paragraph erases a crucial institutional sequence.
The scene does correctly state that passage is fixed and that later terms are
not yet settled. “Protect the institutional record” versus “consolidate the
public mandate” is again an artificial communications binary. No consequence
describes either approval or the work remaining before Senate consideration.

`MAJ-S14`, pp. 36–38, and `SUP-007`, session 128, are appropriate. The
official-session citation still needs the exact printed page for the report
and standing approval. `SUP-006`, printed pp. 15–16, is the later
nine-article implementation law and should not be presented as support for the
March nationalization-principle scene. The official Oil Commission record
should control the committee recommendation after extraction.

**Rewrite recommendation.**

- Split this into two result beats inside one event or two events: committee
  report on 8 March, then Majles approval on 15 March. Neither is a player
  choice.
- After the fixed results, offer concrete preparation for the Senate:
  circulate the committee report, coordinate a cross-chamber constitutional
  case, or organize a public vigil/briefing only if authoritative evidence and
  bounded counterfactual design support those channels.
- Make explicit that the principle does not settle implementation, personnel,
  marketing, compensation, or interim finance.
- Remove the implementation-law locator from this event record or label it
  solely as a boundary source demonstrating what comes later.

### E14. Senate approves nationalization and campaign ends

**Files:** `source/scenes/events/campaign_spine.scene.dry`;
`docs/research/events/1951-03-nationalization.md`;
`docs/research/FIRST_SENATE_SOURCE_ACQUISITION.md`  
**Severity:** S1  
**Source flag:** C

**Finding.** A single continuation is exactly right for a fixed terminal
result. The event still needs a proper result passage before the score screen:
what the Senate approved, what the approval did not yet implement, and why the
campaign evaluates the coalition at this point. “The historical anchor is
complete” is developer language rather than historical narration.

The acquisition record identifies First-Senate session 84, 29 Esfand 1329, as
the controlling proceeding and states that no local session scan is
accessible. It permits chamber-level outcome and date from available enacted
outcomes, scholarship, and institutional evidence, but prohibits attendance,
named divisions, speeches, amendments, or reconstructed dialogue. The adjacent
event note should link that explicit evidence boundary. It currently does not
give a distinct source for Senate approval.

**Rewrite recommendation.**

- Retain one continuation.
- Write a terminal historical passage at chamber scale only, with no invented
  Senate procedure or speakers.
- State that later implementation remains outside v0.1.
- Then move to the causal evaluation, which should echo the player's six or
  seven decisive choices in prose rather than only list scores and state
  labels.

## Recommended rewrite order

1. **Fix the consequence route once.** Establish an event-result pattern that
   displays branch prose and requires player acknowledgement before
   `post_event`. Add an automated browser assertion that the chosen result text
   is visible before the monthly hand returns.
2. **Correct source/date boundaries.** Resolve the committee rejection's
   November/December display, remove or relabel the implementation-law
   citation from the March principle, and attach the First-Senate evidence
   limitation.
3. **Extract controlling records.** Prioritize `SUP-059` for committee
   formation/rejection/recommendation and the exact `SUP-007` passages for
   credential waves, 11 January rejection, and 15 March approval.
4. **Rewrite event setups from strongest sources.** Start with Azimi for the
   election/Front spine, Abrahamian and official records for Majles
   organization, and the recent oil monographs plus institutional records for
   oil terms and approvals.
5. **Redesign choice counts event by event.** Fixed results may have one
   continuation; true strategic forks may have two; institutionally distinct
   channels may have three or more. Do not add choices merely for symmetry.
6. **Add visible choice subtitles.** Every substantive choice should state
   concrete action, likely direction of mechanical impact, cost or
   prerequisite, and one line of political flavor.
7. **Write conditional consequences.** At minimum, each branch should name
   the action taken, the immediate response, the institutional or coalition
   consequence, and any uncertainty that remains. Where prior decisions
   matter, use conditional text as Dynamic SPD does.

## Acceptance checklist for the rewrite

An event should not pass review unless:

- its setup explains what happened, who or which institution is acting, why
  the player has a decision, and what is at stake;
- every historical assertion has an adjacent authoritative source and precise
  locator;
- a supplemental article is used only where its narrow expertise adds
  something the major source does not, and never displaces an available
  controlling record or book-length foundation;
- every choice is a concrete action, not merely a desired outcome or tone;
- every choice exposes salient costs, constraints, and likely mechanical
  direction in player-facing language;
- the number of choices follows the decision rather than a template;
- every selected choice leads to a readable consequence passage before the
  monthly loop resumes;
- fixed facts, dates, responsibility limits, historical chamber evidence, and
  nationalization passage remain fixed;
- counterfactual reaction prose is clearly bounded and does not masquerade as
  a documented historical outcome; and
- the scene has been compared against at least one relevant Dynamic SPD path
  for pacing and interface, with any Iran-specific divergence recorded.

---

## Post-rewrite verification appendix

**Verification date:** 29 July 2026  
**Draft reviewed:** the complete rewrite in
`source/scenes/prologue_attempt.scene.dry`,
`source/scenes/events/1949/palace_protest.scene.dry`,
`source/scenes/events/1949/front_formation.scene.dry`, and
`source/scenes/events/campaign_spine.scene.dry`  
**Standard applied:** `docs/SCENE_CONTENT_STANDARD.md`  
**Disposition:** 14 pass; 4 fail pending narrow corrections

### System-wide verification

The rewrite resolves the largest defects identified in the original audit:

- Every substantive branch now holds on a readable consequence scene with an
  explicit continuation. It no longer uses an immediate `go-to` that allows
  Dendry to clear the result.
- Setups now normally provide two to four compact paragraphs explaining the
  fixed anchor, institution, stakes, uncertainty, and the part of the response
  the player controls.
- Substantive choices have active titles, qualitative subtitles, and distinct
  mechanics. Resource-gated combined strategies explain both their cost and
  why they may be unavailable.
- Fixed results use a single continuation or a result beat before the
  strategic response. The palace protest, committee rejection, Majles
  rejection, two nationalization approvals, and Senate ending no longer imply
  that the player can cancel the historical anchor.
- The 25 November committee-rejection date now agrees with the adjacent
  record. The March scene separates the 8 March committee recommendation from
  the 15 March Majles approval. The later implementation law is now identified
  only as a boundary source.
- The palace scene now relies on Azimi, pp. 207–08, rather than printing the
  narrower Nukii article as its visible authority.

This now matches the useful Dynamic SPD rhythm represented by
`black_thursday.scene.dry`,
`hindenburg_explode_referendum_campaign.scene.dry`,
`panzerkreuzer.scene.dry`, and `young_plan_referendum.scene.dry`: orient,
choose or acknowledge, read the result, then return to play. The rewrite
correctly preserves the tighter Iran-specific limits on assassinations,
chamber evidence, fixed dates, and passage of nationalization.

The structural regression in `test/v01-data-integrity.test.js` and the full
non-browser `npm test` run pass. A targeted Chromium verification could not be
completed in this environment because the installed browser binary cannot
load `libnspr4.so`; this is an environment dependency failure, not an observed
content or routing failure. Source structure and the engine regression do
establish that result scenes wait for acknowledgement, while the existing
Playwright assertion is correctly written to check the first visible
consequence when browser dependencies are available.

### Remaining cross-cutting caution

Choice context usually makes the consequence passages legible as simulation,
but several branches state a projected reaction in the unqualified present
tense—for example, “The Court reads…” or “Court circles receive…”. That
phrasing is acceptable only because it follows an explicitly counterfactual
player action. Future edits should prefer “In this campaign,” “the choice
leads,” “may,” or state-conditioned text whenever a reaction could otherwise
be mistaken for a documented historical response. This is not marked as a
failure for every scene below, but it is a binding editorial caution under the
standard's historical/counterfactual boundary.

### Scene-by-scene result

| Scene | Result | Verification |
| --- | --- | --- |
| P1. Attempt on the Shah | **PASS** | Three defensible methods—immediate evidentiary standard, quiet fact gathering, and a joint press statement—replace the old binary. The setup preserves uncertainty about a wider conspiracy, all options preview their tradeoffs, and every result remains visible. `MAJ-S3`, chapter 3, and `MAJ-S1`, chapter 15, are authoritative book-length locators; no assailant affiliation or directing conspiracy is invented. |
| P2. Martial law and Tudeh ban | **PASS** | Legal documentation, discreet contacts, and public civil-liberties defense are distinct uses of scarce attention. The fixed ban and repression cannot be cancelled. Each branch reports both capacity gained and what it fails to do. The adjacent major-book record remains the authority; the scene does not claim organizational control over the Tudeh Party. |
| P3. Constituent assembly | **FAIL** | Setup, source boundary, subtitles, and visible consequences are substantially improved, and `MAJ-S3`, pp. 82–86, now precisely supports Article 48. The remaining two options are not a genuine binary: preserving a formal objection and preparing for practical dissolution risk can both be done, and the scene states no resource, time, or organizational constraint that makes one exclude the other. The regression should not require the campaign to contain a two-choice scene merely to demonstrate numerical variety. Reframe the decision as a binding priority under a stated constraint, add a distinct third strategy, or make the fixed revision a one-choice result followed by a properly bounded allocation decision. |
| P4. Senate and election preparation | **PASS** | The setup distinguishes the Senate's appointed/elected routes from the disputed Majles election and accurately states that no Front yet commands the opposition. A monitoring committee, public constitutional appeal, and distributed correspondent network are meaningfully different preparations. `MAJ-S3`, pp. 82–86, and the official `SUP-053` route tables provide appropriate bounded authority. |
| E1. Palace protest | **PASS** | A single continuation fits a fixed founding protest. The setup explains why acting together matters, explicitly denies electoral control, and leads to a visible result establishing shared purpose without pretending that a disciplined party already exists. Azimi, pp. 207–08, is the controlling source and the disputed exact date/count remain omitted. |
| E2. Hazhir assassination response | **FAIL** | Three response strategies, subtitles, responsibility limits, and readable consequences now work. Two problems remain. First, the setup asserts unsourced stakeholder positions as historical facts: “The Court wants an unambiguous rejection,” “Some religious allies do not want…,” and “Editors and lawyers want…”. The adjacent record supports the killing and responsibility boundary, not those particular reactions. Convert them into explicitly projected political risks or add precise authoritative locators. Second, the complete personal name “Abdolhossein Hazhir” is uncolored, contrary to `COLOR_STYLE_GUIDE.md` and the review gate. |
| E3. National Front structure | **PASS** | The scene clearly marks all three structures as counterfactual emphases within the fixed historical boundary that the Front remains a coalition. Programmatic alliance, organization-to-organization committee, and common membership machinery are distinct structures with legible autonomy costs. Azimi, pp. 207–08, and Abrahamian, printed pp. 250–61, are suitable political foundations. |
| E4. Tehran cancellation and rerun | **PASS** | The cancellation, rerun, and eventual eight-person cohort stay fixed. Slate concentration, full monitoring, and a resource-costed mixed approach are distinct and mechanically coherent. Each consequence states both the apparatus created and the capacity sacrificed. The adjacent record uses the appropriate major political history and does not infer a nationwide vote-to-seat mechanism. |
| E5. Majles and Senate opening | **PASS** | The data-model distinctions are now translated into player-facing institutional stakes. Case preparation, internal group coordination, and external liaison are distinct first priorities and none invent a stable party chart. The official session-2 record controls the 98-credential statement; the scene avoids named Senate behavior beyond the sourced route structure. |
| E6. Credential campaign | **PASS** | The setup identifies the two documented credential waves without assigning ideology from timing. Public cases, internal scheduling/support, and a resource-costed legal brief are distinct methods, and scenario influence remains separate from historical place evidence. Official sessions 25 and 30 are precise institutional locators under the standard. |
| E7. Oil committee formation | **PASS** | The scene now explains why five Front members on an eighteen-member committee create a forum rather than control. Term record, colleague recruitment, and a verified public brief produce different products. The adjacent note now points to official `SUP-059` by print order, period, meeting, and date, with scholarly interpretation supplied by the major books. The prose avoids inventing a committee-wide party chart or vote. |
| E8. Supplemental-agreement campaign | **FAIL** | The three channels and term-by-term presentation are strong, and the scene correctly preserves unknowns and warns that Saudi and Iranian contracts are unlike. The dated setup nevertheless says in **August 1950** that “reports of the emerging arrangement” between Saudi Arabia and Aramco sharpen the comparison. The adjacent note provides no claim-level locator for that August timing or for what was then publicly knowable. Because the eventual Saudi fifty-fifty arrangement is date-sensitive, this sentence must be supported by a precise authoritative passage establishing contemporary August reports/negotiations, moved to the month supported by the evidence, or narrowed to omit the comparison at this point. |
| E9. Oil committee rejection | **PASS** | The heading is corrected to 25 November 1950. A one-choice fixed-result beat precedes three real response strategies, so the player cannot manufacture or cancel rejection. The official `SUP-059` meeting and report locators now support the commission act, while the prose keeps rejection distinct from nationalization and later implementation. |
| E10. Majles rejection | **FAIL** | Fixed-result pacing, three response channels, and the no-numerical-division boundary all pass. The source record does not yet use the strongest available evidence for the exact chamber act and 11 January date: it cites only the oil monographs even though the complete official Sixteenth-Majles proceedings are locally archived as `SUP-007`. Identify the controlling session and precise passage/page, with the monographs retained for interpretation. Until then, the scene fails the standard's strongest-suitable-source requirement for an exact parliamentary act. |
| E11. Razmara confrontation | **PASS** | The rewrite avoids invented dialogue and personal motive, identifies administrative/economic danger as the documented argument, and asks who should answer through which institution. The sentence about operation, personnel, markets, and finance is framed as the practical questions raised by that general case rather than as a reconstructed quotation. Parliamentary brief, public dossier, and resource-costed joint group are distinct. The two specialist monograph chapters are authoritative stable locators, though a future edition should map any more detailed attribution claim by claim. |
| E12. Razmara assassination | **PASS** | Painter and Brew, pp. 36–38, precisely support the assailant, organization, date, and bounded uncertainty. The scene explicitly separates opposition on oil from responsibility for murder. Unqualified condemnation, condemnation plus the constitutional oil case, and limited comment pending verification are distinct responses with visible costs and consequences. No wider encouragement or knowledge is assigned. |
| E13. Committee and Majles nationalization approvals | **PASS** | The 8 and 15 March institutional steps are now separate fixed beats. The scene repeatedly distinguishes principle from implementation and keeps unknown terms unresolved. The official Oil Commission record, Majles session 128, and Painter/Brew pp. 36–38 are the right authority stack. `SUP-006` is correctly labeled only as the later-law boundary. Senate preparation choices avoid named commitments or invented divisions. |
| E14. Senate approval and ending | **PASS** | One continuation is correct for the fixed terminal outcome. The scene states only the chamber-level decision and date that the evidence permits, expressly withholds attendance, named division, speeches, and private commitments, and identifies later implementation as out of scope. The adjacent record links the unavailable-session acquisition boundary instead of filling it from memory. |

### Remaining blockers

The rewrite should not be described as fully passing its own adversarial gate
until these four corrections are made:

1. justify or redesign the constituent-assembly binary;
2. reframe or source the asserted Hazhir stakeholder reactions and color
   Hazhir's full name;
3. verify or remove the August Saudi-Aramco timing claim; and
4. attach the official `SUP-007` session/page locator for the 11 January Majles
   rejection.

After those changes, rerun the structural suite and the Playwright consequence
check in an environment with the browser libraries installed. The full event
spine otherwise meets the requested Dynamic SPD setup → choice → consequence
standard without importing Dynamic SPD's German historical assumptions.

### Final disposition after blocker corrections

**Final verification date:** 29 July 2026  
**Supersedes:** the 14-pass / 4-fail disposition immediately above  
**Final event-content gate:** **18/18 PASS**

The four remaining blockers were corrected and narrowly rechecked:

1. **P3 — constituent assembly: PASS.** The setup now states the actual
   capacity constraint: before the election, the loose opposition has enough
   shared lawyers and organizers to make only one response a common priority.
   The scene offers three distinct uses of that capacity—a signed
   constitutional objection, a procedural memorandum for future deputies, or
   a dissolution-response network. Their titles, subtitles, mechanics, and
   consequences distinguish public legitimacy, institutional intelligence,
   and organization. The structural regression no longer requires a
   two-choice scene merely to prove numerical variety.
2. **E2 — Hazhir response: PASS.** The setup now presents Court, ally, press,
   and official responses as projected risks using “may,” “can,” and
   “leaving … to interpret,” rather than as documented stakeholder demands.
   The full name
   `{!<span class="term term-royalist">!}Abdolhossein Hazhir{!</span>!}` is
   semantically colored. The adjacent record identifies Azimi,
   pp. 207–08, as the basis for Hazhir's Court alignment and explains that the
   royalist treatment is institutional, not a permanent party label.
3. **E8 — supplemental-agreement campaign: PASS.** The August setup no longer
   claims that reports of an emerging Saudi-Aramco arrangement were already
   shaping the campaign. It makes only a general warning about unlike oil
   comparisons and explicitly defers Saudi-Aramco to the December monthly
   briefing. The deputy option now works from the sourced term matrix rather
   than the premature comparison. The adjacent event record preserves the
   same chronology and boundary.
4. **E10 — Majles rejection: PASS.** The adjacent record now cites the
   controlling official proceeding:
   `SUP-007`, Sixteenth Majles session 102, 21 Dey 1329 /
   11 January 1951, carrier p. 2, agenda item 5 and the resolution approving
   the commission report. The specialist monographs remain interpretive
   authorities; the official proceeding controls the chamber act and date.
   The local session-102 carrier is present in the archived `SUP-007` corpus.

All eighteen scenes therefore pass `docs/SCENE_CONTENT_STANDARD.md` for setup
depth, decision-shaped choice count, active and qualitatively explained
options, visible consequence routing, historical/counterfactual boundaries,
strongest-available source use, uncertainty preservation, and the applicable
semantic-color rule.

The final `npm test` run after these corrections passed all seven suites,
including event structure, all 81 prologue paths, the monthly historical
route, source integrity, UI synchronization, and data integrity.
`git diff --check` reports no whitespace errors. After the review, the root
validation run supplied the required browser-library path and completed the
full Playwright matrix: Chromium and Firefox playthroughs passed at 1440,
768, and 390 pixels, including the visible-consequence assertion. The
event-content gate therefore remains **18/18 PASS** with browser confirmation.
