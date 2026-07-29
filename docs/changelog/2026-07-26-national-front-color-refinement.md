# National Front color-role refinement

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The National Front color family now distinguishes organizational identity,
secular constitutionalism, socialist organizations, and mixed individual
alignments more narrowly:

- the National Front and contextual references to “the Front” remain solid
  teal;
- the Iran Party is parliamentary gold;
- the Third Force and the Toilers' Party use solid social-democratic red;
- Hossein Fatemi and Khalil Maleki use the teal-to-red blend; and
- Mossadegh, Baghai, and Makki retain their existing person-specific blends.

The obsolete teal-to-dark-red Fatemi class was removed from both stylesheets;
Fatemi now shares the teal-to-social-democratic-red class.

## Reason

Applying teal to every organization and figure connected to the coalition
made the color system imply more ideological unity than the National Front
possessed. Solid organizational colors now describe the relevant political
current, while teal blends are reserved for individuals whose role directly
joins National Front leadership, ministry, or advice with another alignment.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/main.scene.dry`,
  `source/scenes/party_affairs/inter_party_relationships.scene.dry`, and
  `out/html/game.css`.
- **What Dynamic SPD does:** it normally gives parties and ideological
  organizations one solid recurring color, while its occasional mixed-word
  or multi-color treatments emphasize genuinely composite concepts. It does
  not provide an analogue for the National Front's heterogeneous coalition.
- **Decision here:** retain Dynamic SPD's solid-color treatment for named
  organizations and reserve gradients for selected people with politically
  meaningful mixed roles. Iran Party gold and the red socialist organizations
  are Iran-specific decisions rather than imported German party mappings.
- **Divergence level:** local. Only semantic markup and visual presentation
  change.

## System fit

The timeline renderer now maps each name to the narrower semantic class.
`web/game.css` and `web/timeline.css` expose the same solid and blended
treatments. The relations sidebar applies gold to the Iran Party and solid red
to the full Toilers' Party label. Tests prevent the organizational names from
drifting back into the Maleki blend. No state, scene routing, action economy,
or persistence changes.

## Research and assets

The organizational distinctions continue to use Abrahamian,
*Iran Between Two Revolutions*, chapter 5, especially printed pp. 250–61 and
275–78, and Azimi, *Iran: The Crisis of Democracy*, chapter 20, especially
printed pp. 304–05. The colors remain editorial reading aids rather than
claims about official historical colors. No source or asset status changed.

## Validation

- Built the game and both timeline outputs.
- Added assertions for National Front shorthand, Iran Party gold, solid-red
  socialist organizations, and the Fatemi and Maleki blends.
- Verified removal of the obsolete Fatemi gradient class.
- Ran the complete Node test suite and `git diff --check`.
