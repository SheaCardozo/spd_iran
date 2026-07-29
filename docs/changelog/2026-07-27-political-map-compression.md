# Political-map compression

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

The standalone primer's political map is substantially shorter. All
Westminster, Commons, House of Lords, British-election, and generic
minority-government comparisons have been removed, together with the
“Parliamentary control at a glance” table. The chamber-balance and
institutional discussions have also been condensed. “How Majles elections
worked” is now two paragraphs, the incomplete Seventeenth Majles is an example
inside that explanation rather than its own subsection, and parliamentary
balance is one paragraph.

The Iran-specific explanations of government formation, the Shah's leverage
over the War and Interior Ministries, the Senate's unsettled position,
election administration, credentials, and quorum remain. The five-item list of
bazaar, ulama, press, armed-forces, and street networks remains as the most
scannable treatment of extra-parliamentary power.

## Reason

The comparisons and summary table repeated conclusions already established by
the surrounding Iranian material. They lengthened an orientation dossier that
readers must either traverse or skip before the chronology without adding
enough explanatory value.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/modinfo.scene.dry`,
  `source/scenes/credits.scene.dry`, and `out/html/game.css` in the Dynamic SPD
  checkout.
- **What Dynamic SPD does:** explanatory material is short and
  consequence-first; it does not place a long comparative constitutional essay
  between its framing and political content.
- **Decision here:** retain the concise explanation of what institutional rules
  permit political actors to do, while removing cross-system analogies and a
  second summary format. The primer now relies on Iran's own vocabulary and
  sequence.
- **Divergence level:** local editorial presentation only.

## System fit

The canonical Markdown, generated integrated page, and standalone page remain
structurally unchanged. The renderer no longer needs a Cabinet Manual entry in
the primer bibliography, although that source remains in the project's master
bibliography as a record of earlier comparative work.

## Research and assets

No historical claim or asset was added. Existing citations were consolidated
without changing their evidentiary role. The Cabinet Manual was removed only
from this reader-facing primer.

## Validation

- Rebuilt the integrated and standalone timeline pages.
- Added regressions excluding Westminster comparisons, the parliamentary
  control table, and the Cabinet Manual from the rendered primer; limiting the
  political map's length; keeping the election explanation to two paragraphs;
  and preserving the five-item political-network list.
- Ran the complete project test suite.
- Ran `git diff --check`.
