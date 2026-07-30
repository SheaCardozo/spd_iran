# Opposition and adviser adversarial review

- **Date:** 2026-07-30
- **Scope:** the v0.2 player-viewpoint and chronological-adviser revision
- **Result:** Pass after correction

## Review questions

The independent pass tested whether:

1. the opposition was clearly a political position rather than a fictitious
   January 1949 organization;
2. only the original six pinned advisers remained;
3. initial and later adviser availability matched the authoritative source
   record;
4. visible adviser choices avoided advertising institutions and campaigns
   that did not yet exist;
5. changed scenes met `docs/SCENE_CONTENT_STANDARD.md`; and
6. the result retained Dynamic SPD's pinned-card and event-owned availability
   patterns without recreating its leadership-roster system.

## Findings and corrections

The first pass found two blocking classes of defect.

- Five adviser source comments attached Ervand Abrahamian's chapter and page
  locators to Fakhreddin Azimi. The comments now identify Abrahamian correctly.
  A proposed Maleki supplement was also removed after review showed that its
  title and authors did not match the tracked source registry.
- Saleh's pre-formation results referred to a coalition register and
  secretariat before either existed. They now use Iran Party records, contacts,
  and the party office.

The pass also found three non-blocking consistency problems. Saleh and Kashani
advertised later election, chamber, and oil actions before those subjects were
current; those choices now use `view-if` gates. The opening sections of
`docs/GAME_DESIGN.md` still described the player globally as National Front
leadership; they now distinguish the current opposition opening from the
post-formation and expanded-campaign role. Allahyar Saleh's January availability
is now explicitly labeled a viewpoint abstraction grounded in the Iran Party's
documented 1947–1949 movement toward Mossadegh and Saleh's party role.

The second pass confirmed all findings resolved.

## Opposition-terminology follow-up

A further independent pass reviewed the user-directed change from a
personally named opening viewpoint to the generic **Opposition** label. It
checked game source, browser files, generated output, README, design and
implementation documents, research notes, changelogs, and tests.

The first terminology pass found one stale formulation in
`docs/GAME_DESIGN.md` §1.1. It was replaced with “the opposition” and an
explicit statement that this is a political position rather than a formal
organization or common command. The final pass found no retired label and
confirmed that formation still changes the persisted label to **National
Front** and the sidebar tab to **Coalition**.

## Dynamic SPD comparison

Dynamic SPD uses state-controlled visibility on pinned adviser cards, as in
`source/scenes/advisors/wels.scene.dry`, and renders the shared adviser-action
affordance in `source/scenes/main.scene.dry`. Its historical events directly
remove advisers in files including
`source/scenes/events/centrist_leaders_resign.scene.dry` and
`source/scenes/events/death_of_muller.scene.dry`.

The Last Majles retains figure-specific visibility flags, event-owned
availability changes, and one shared cooldown. It adapts the pattern by making
the historical availability changes automatic and omitting an appointable
leadership roster. Kashani remains an independent counterpart rather than a
party officer.

## Final result

Exactly six adviser files remain. Mossadegh and Saleh are available in
January; the October palace protest adds Fatemi and Makki; Front formation adds
Kashani; Maleki remains unavailable through the March 1951 endpoint. Adviser
visibility remains independent of the shared cooldown.

The automated standards audit covers **184/184 compiled scenes** and reports
**zero failures**. The targeted engine tests cover the initial hand, documented
availability milestones, pre-formation Mossadegh consultation, shared
cooldown, and the unchanged historical route.
