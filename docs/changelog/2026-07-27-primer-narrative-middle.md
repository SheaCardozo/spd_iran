# Historical-primer narrative middle

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

A follow-up adversarial review of *The Last Majles* produced a focused repair
of the primer's narrative middle and reference framing. The revision:

- explains that the title names the last Majles of the comparatively open
  post-1941 constitutional struggle, not Iran's final parliament;
- gives Mossadegh's older constitutional record enough weight to explain his
  public authority in 1949;
- replaces the compressed list of oil mediators with a chronological account
  of the Harriman–Stokes, McGhee, and World Bank phases;
- distinguishes the failure of those negotiations from the Truman
  administration's continued refusal to support a coup;
- narrates the National Front coalition's fracture from the settlement after
  30 Tir through appointments, reform conflicts, delegated powers, 9 Esfand,
  and parliamentary quorum warfare;
- connects the uneven oil shock to the coalition's distributive and
  constitutional arguments without making hardship a mechanical cause of
  political defection;
- standardizes the transliteration *firman*;
- labels the final HTML sections “Interpretation” and “Sources”; and
- contracts the topic guide from sixteen narrowly divided rows to nine
  reader-oriented research routes.

The principal-actors section also clarifies that Kashani did not represent a
unified clergy.

## Reason

The primer's opening orientation and late coup sequence had become much
clearer than its 1951–53 middle. A reader could see that negotiations failed
and that allies defected, but not how the proposals changed or how a coalition
victorious on 30 Tir became a parliamentary opposition within months. The
revision supplies those missing causal sequences while retaining the page's
primer-level scale.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/modinfo.scene.dry`,
  `source/scenes/credits.scene.dry`, and `out/html/game.css` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** explanatory prose is concise and
  consequence-first, political terminology is marked semantically, and source
  material is kept out of the main action text. It has no equivalent
  standalone historical essay.
- **Decision here:** retain consequence-first explanation and shared semantic
  coloring, but adapt them to a longer research-facing chronology. The
  negotiation and coalition sequences are long enough to establish changing
  choices and constraints, then stop before becoming archival
  reconstructions. The bibliography remains color-neutral and separate from
  the narrative.
- **Divergence level:** local content and presentation only. No game state,
  turn loop, event routing, persistence, deck, or runtime architecture
  changes.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the sole narrative source for both
timeline builds. `scripts/build-timeline.js` now supplies semantic kickers for
the conclusion and source appendix and recognizes `SUP-026` as a named source.
The integrated and standalone outputs therefore remain identical. Regression
tests protect the new sequence, title explanation, transliteration, section
labels, and citation target.

## Research and assets

The negotiation sequence uses Painter and Brew, *The Struggle for Iran*,
chapters 2–5; Abrahamian, *Oil Crisis in Iran*, pp. 56–58; Elm, *Oil, Power,
and Principle*, the negotiation chapters; Katouzian, *Musaddiq and the
Struggle for Power in Iran*, chapters 8–9; and the World Bank's contemporary
Press Release No. 285 and attached review, PDF pp. 3–9 (`SUP-026`).

The coalition sequence uses Abrahamian, *Iran Between Two Revolutions*,
pp. 271–78; Abrahamian, *Oil Crisis in Iran*, pp. 103–15; Katouzian,
*Musaddiq and the Struggle for Power in Iran*, pp. 164–75; Azimi,
*Iran: The Crisis of Democracy*, chapter 20; and Behrooz's chapter in
*Mohammad Mosaddeq and the 1953 Coup in Iran*, pp. 102–25. The economic bridge
uses Brew, *Petroleum and Progress in Iran*, pp. 120–44, and Clawson and
Sassanpour, pp. 2–18.

No new historical asset was introduced. The existing prose geography already
orients Tehran, Abadan, Azerbaijan, and the western frontier; adding a map
would require a separate sourced asset and rights record.

## Validation

- Rebuilt the integrated and standalone timeline pages.
- Ran the complete project test suite.
- Confirmed that `farman` no longer appears and that `firman` is used
  consistently.
- Confirmed that every generated source citation resolves to a bibliography
  target and that internal source IDs do not leak into the page.
- Confirmed that the bibliography remains free of political term coloring and
  outbound links.
- Ran `git diff --check`.
