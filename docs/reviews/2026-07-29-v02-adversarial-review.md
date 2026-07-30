# v0.2 Adversarial Scene Review

Date: 2026-07-29

## Scope

This independent pass reviewed the rebuilt v0.2 scene inventory against
[`docs/SCENE_CONTENT_STANDARD.md`](../SCENE_CONTENT_STANDARD.md), concentrating
on the revised pre-formation campaign language, progressively available
advisers, status and support surfaces, chamber-opening counterfactual prose,
choices that spend common funds, source comments, and the setup → choice →
visible-consequence rhythm used by Dynamic SPD.

## Findings

**PASS — no blocking scene-content defect found in the reviewed build.**

- The revised scenes consistently establish what is happening before asking
  for a decision. Choices use descriptive titles and qualitative subtitles,
  while substantive selections lead to visible consequence prose and require
  acknowledgement.
- Choice counts follow the needs of the scene rather than a universal
  two-choice template. Informational and forced-continuation scenes are treated
  separately from genuine strategy menus.
- Progressive adviser availability is represented through state-gated cards.
  Early play exposes the available Iran Party advisers; later figures are not
  presented as currently available before the political conditions for their
  consultations exist.
- Support and chamber surfaces distinguish qualitative scenario estimates
  from historical records. Chamber-opening prose preserves the difference
  between documented institutional facts and counterfactual player influence.
- Choices involving common funds identify the expenditure in the choice
  framing and make the organizational or political consequence visible after
  selection.

## Dynamic SPD comparison

The corresponding Dynamic SPD patterns were checked in its root, monthly hand,
event-routing, card, adviser, status, and result-scene files under
`/home/phroz/spd/dynamic_social_democracy/source/scenes/`. v0.2 retains the
baseline rhythm: contextual setup, a described decision, a dedicated result,
and an explicit return to the hand. It also retains progressive card gating and
qualitative status presentation. Iran-specific differences—separate
pre-coalition party work, constituency records, credential procedure, and the
Crown relationship—are deliberate historical adaptations rather than a second
turn-loop architecture.

## Pre-formation hint audit

Normal January–September 1949 briefing and sidebar content does not name the
later National Front as an already available organization. Coalition language
describes separate parties, politicians, newspapers, and personal networks;
National Front-specific sidebar fields are gated by `front_formed`. The normal
hand exposes only advisers marked available in the current state. Later
adviser cards and their National Front descriptions remain hidden until their
availability flags are set.

## Source audit

The reviewed historical scene comments rely on the project’s principal
scholarly works and official parliamentary records, including Azimi,
Abrahamian, Elm, Painter and Brew, and identified Majles proceedings. Comments
separate documented claims from counterfactual mechanical effects and provide
page, chapter, session, or record locators where the scene makes a historical
claim. No reviewed v0.2 scene depends on an incidental supplemental paper as
its principal authority.

## Automated inventory result

After `npm run build`, `node scripts/audit-scenes.js` classified and checked
**190 of 190 compiled scenes with zero failures**:

- 5 framework-internal scenes
- 4 engine-internal scenes
- 3 deck containers
- 19 information surfaces
- 42 decision menus
- 2 continuation decisions
- 115 visible consequences

This automated result verifies inventory coverage and structural rules; the
focused reading above supplies the adversarial historical-framing and
Dynamic-SPD-consistency check that automation cannot establish.
