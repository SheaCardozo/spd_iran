# Afshartus constitutional-government color

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

General Mahmoud Afshartus now uses parliamentary gold through a dedicated
`term-government-loyalist` class. His complete rank and name form one colored
unit under the full-name convention.

## Reason

Afshartus is important enough to the constitutional crisis and the
government's security position to warrant a recurring treatment. Reusing a
party or ideological class would imply evidence the sources do not provide.
The dedicated class makes clear that gold describes his role as a loyal
security official of Mossadegh's government rather than Iran Party membership
or a documented private ideology.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/main.scene.dry`,
  `source/scenes/library.scene.dry`, and `out/html/game.css`.
- **What Dynamic SPD does:** its political figures may inherit party colors;
  unaffiliated establishment figures such as Hindenburg use grey. It has no
  consistent analogue for a military or police commander personally defending
  a constitutional ministry against palace-aligned opposition.
- **Decision here:** retain a recurring semantic color but use the existing
  parliamentary gold under a narrower role class. Grey would obscure
  Afshartus's documented government alignment, while royal blue or National
  Front teal would misstate it.
- **Divergence level:** local. This changes generated text presentation only.

## System fit

The timeline renderer recognizes `General Mahmoud Afshartus`, his unranked full
name, and surname-only references. Both application and timeline stylesheets
map the role to the established gold variable. No gameplay, state, routing, or
persistence system changes.

## Research and assets

Painter and Brew, *The Struggle for Iran*, pp. 138–39 and 155, describe
Afshartus as Mossadegh's own loyalist, police chief, and important supporter.
Rahnema, *Behind the 1953 Coup in Iran*, chapter 4, reconstructs the
kidnapping and murder. The timeline locator and color guide now record these
links. No source or asset status changed.

## Validation

- Built the game and both timeline outputs.
- Added assertions for the complete colored rank and name and for the shared
  gold stylesheet mapping.
- Ran the complete Node test suite and `git diff --check`.
