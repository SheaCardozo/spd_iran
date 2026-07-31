# v0.3 rendered adversarial repair review

## Scope

Four independent rendered-browser playthroughs reviewed the generated game as
a player would see it. The reviewers were denied Status, Research Library,
Save/Load, Options, source access through the browser gateway, selectors,
script evaluation, and direct access to shared game state. They were asked to
finish the campaign, challenge unclear or contradictory controls, and report
confusion as well as hard failures.

The four completed paths reached a Majles defeat, a Senate defeat, A Fragile
Nationalization, and A Parliamentary Vanguard. None deadlocked, and the
gateway's private integrity oracle reported no hidden-state violations.

## Blocking and structural findings

- Before campaign start, the sidebar exposed uninitialized campaign values.
  Opening Parliament could throw because its chamber arrays did not yet
  exist.
- Several chamber-place controls focused a different dossier from the place
  announced by the control. The SVG exposed 136 generic controls without
  enough semantic information, did not provide a dependable keyboard
  activation path, and disclosed exact scenario pressure values in normal
  play.
- Adviser reconciliation could be postponed through the ordinary return
  control even when more than three advisers were eligible. Consecutive
  historical entries could demand repeated reconciliations, an unchanged
  roster could restart the cooldown, and the sidebar did not reflect the
  in-progress selection.
- A Majles defeat could end with the action counter still reading 26/27.
- The final March hand could contain Credential Petitions after the Majles
  vote had already settled the lower chamber.

## Clarity and feedback findings

- The four-card hand could present fewer than four cards, occasionally only
  one, without explaining that deck cooldowns had constrained the draw.
  Repeatedly selecting a deck that could not supply another card produced no
  visible feedback.
- The chamber resolution exposed the majority threshold but did not explain
  how attending places divided among support, conditional support, and
  opposition. A player could therefore see a large attending chamber and a
  very small support count without understanding the result.
- Place dossiers used generic accessible names and did not communicate the
  place's current institutional or oil-vote category before activation.
- The first palace transition introduced the National Front label too
  abruptly, before the following formation scene had established it.
- The May 1950 monthly briefing disclosed the coming June credential decision.
  Other monthly briefings were generic enough to feel stale rather than
  politically situated.

## Writing and simulation findings

- Recurring projects repeated identical prose and identical rewards. This
  allowed high-frequency choices to be farmed without a later stage, changing
  cost, interruption, or diminishing return; one path pushed constitutional
  legitimacy to its ceiling.
- Money rarely constrained an effective campaign. One successful path
  operated at zero resources from October onward, while repeated fundraising
  remained a reliable free recovery action.
- Several public labels exposed authorial or implementation vocabulary:
  “uncertainty register,” “term matrix,” “scenario records,” “usable records,”
  “Slate with selective monitoring,” and similar project-state names.
- Political Correspondence implied that the player had incomplete political
  intelligence, contrary to the perfect-intelligence design rule.
- Vote and ending prose described resolver concepts rather than deputies,
  credentials, attendance, commitments, and chamber procedure.
- A zero-cost fundraising choice was titled “Fund each component,” and several
  status/adviser strings had punctuation, pluralization, or compressed-label
  defects.

## Behaviors to preserve

- All four terminal families were reachable.
- Zero-resource paths and cancellation-heavy paths did not deadlock.
- Returning a card before commitment restored the hand and monthly action.
- Adviser consultation and roster cooldowns remained separate.
- The strongest event chains visibly consumed earlier decisions, especially
  the assembly strategy, election preparation, credentials, and the sequence
  from Hazhir to Razmara.
- Player-only utilities remained outside the adversarial surface.
- Ordinary scene navigation was keyboard operable, and every recurring action
  retained a free fallback.

## Repair acceptance

Every blocking or structural finding above requires a focused regression test.
The remaining findings require either a focused assertion or coverage by the
scene-content audit. After the deterministic, browser, and rendered-policy
suites pass, four new qualitative rendered-browser playthroughs must be run.
Any new blocker, state contradiction, inaccessible control, or deadlock found
by those playthroughs reopens this review.

## Repair-rerun findings

The first two repair-rerun paths completed without deadlock or oracle failure,
but correctly reopened the review:

- the lower-chamber vote was recalculated after it had been resolved, allowing
  the later Senate strategy to turn conditional Majles votes into support;
- the ending used two obsolete attendance field names and therefore printed
  zero attending members beside a nonzero vote partition;
- paid choices disclosed their exact cost only after the player could no
  longer afford them;
- the October adviser entries and the immediately following Front-formation
  entry could force two roster reconciliations in one uninterrupted event
  sequence;
- Hazhir's assassination response could resolve before the scene that formed
  the National Front;
- annual income arrived without a briefing notice; and
- the dense chamber SVG provided sound keyboard names but impractically small
  pointer targets.

The reopened pass now freezes each chamber's scenario positions once its vote
is resolved, uses the live chamber attendance counters throughout the ending,
states every one- or two-resource cost in the available choice subtitle,
automatically establishes the first three-person October slate before the
single Front-formation reconciliation, orders formation before Hazhir, reports
annual subscriptions before the first January anchor, and supplies a 44-pixel
place-dossier selector alongside the diagram. On compact touch layouts the
dense eight-pixel marks are visual-only; the selector is the sole interactive
dossier control rather than leaving 136 undersized touch targets in the
accessibility tree. Terminal routing also replaces the obsolete credential
phase with the actual Majles or Senate result, and the ending distinguishes
all recorded returns from the much smaller Front cohort. Focused tests cover resolved-vote
immutability, cost disclosure, attendance-field names, the dossier selector,
and the existing chamber partition invariant.

The mobile rerun also found two smaller terminal-state leaks: an underfilled
hand still invited the player to draw after every remaining card was already
held or cooling down, and the ending sidebar advertised adviser actions after
the campaign was complete. The hand now explains the actual cooldown state,
and terminal status suppresses both adviser-action and roster availability.

The final qualitative routes included a Majles defeat at 26 support, 44
conditional, and 50 opposed among 120 attending members (61 required), plus
passage paths with 107/13/0 and 120/0/0 lower-chamber partitions. Every
partition reconciled with attendance after the freeze repair. The four
reviewers reported zero private-oracle failures. Their last feedback loop
identified render order after card cancellation and the timing of the annual
income notice; the former now performs a final availability refresh after the
hand renders, while the latter appears before the first January anchor choice
rather than only after that event resolves.
