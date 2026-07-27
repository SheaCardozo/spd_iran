# Iran-first comparative framing

## Summary

Reframed the constitutional orientation in *The Last Majles* so that Iranian
institutions and political practice determine the explanation's structure.
The standalone Westminster subsection was removed. Short comparisons remain
after the vote of inclination, Senate, election, and quorum mechanisms have
been explained on their own terms.

## Reason

Comparisons can translate an unfamiliar mechanism for a politically literate
reader, but making Westminster the organizing frame risks presenting Iran as
an incomplete British system. The primer should first explain what the
Majles, Shah, cabinet, Senate, credentials, and caucuses actually did. A
comparison is useful only when it makes one of those facts easier to
understand.

## Dynamic SPD comparison

- **Reference:** `/home/phroz/spd/dynamic_social_democracy/source/scenes/library.scene.dry`,
  section `@government`.
- **What Dynamic SPD does:** explains the Reichstag, chancellor, president,
  elections, confidence, and emergency powers directly. It uses ordinary
  parliamentary vocabulary without restructuring the German explanation
  around a foreign constitutional model.
- **Decision here:** follow that institution-first hierarchy. Retain
  comparison as a local explanatory tool, but reject a separate comparative
  framework that precedes or governs the Iranian account.
- **Divergence status:** explanatory prose only; no change to game
  architecture, state, routing, or mechanics.

## System fit

This establishes the expected style for later library, tooltip, and tutorial
content: identify the Iranian rule or practice, explain its political
consequence, and add a familiar analogy only if it materially aids
understanding. The comparison must not replace Iranian terminology or imply a
one-to-one institutional equivalence.

## Research and assets

No Iranian historical claim or asset changed. The UK Cabinet Office's
*Cabinet Manual* remains a narrow source for the British side of the few
comparisons retained; it is not evidence about Iran.

## Validation

- Rebuilt the playable and standalone timeline pages.
- Confirmed that the former Westminster navigation section is absent while
  the limited mechanism-level comparisons remain.
- Ran the complete test suite and `git diff --check`.
