# Historical-primer editorial rebalance

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The standalone primer now keeps its bibliography and every source citation
visually neutral. Citations lead to the bibliography on the same page, and the
generated HTML contains no outbound source links. The political overview has
also been rebalanced: full chamber rosters, long lists of deputies, named
caucus membership, and fine-grained alignment disputes have been removed in
favor of the broad factional balance and dated changes in control.

The explanation of elections, credentials, attendance, quorum, and issue
coalitions remains central. A new short passage explains what palace influence
over the War and Interior Ministries meant in practice. Attached offices and
ranks were audited for consistent capitalization.

## Reason

The primer had begun to reproduce the underlying parliamentary research
ledger instead of orienting a reader. That level of detail obscured the more
important lesson: election returns did not produce a stable national party
result, and parliamentary power depended on credential approval, shifting
issue coalitions, attendance, and the ability to make or break quorum.

Source titles and archival labels are bibliographic information rather than
political actors. Applying political colors to words inside them confused that
distinction, while outbound links made the standalone page behave more like a
research index than a self-contained orientation.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/credits.scene.dry`,
  `source/scenes/modinfo.scene.dry`, and `out/html/game.css`.
- **What Dynamic SPD does:** Dynamic SPD keeps books, articles, and asset
  sources in dedicated credits scenes, includes direct external URLs there,
  and uses inline political colors extensively in narrative and explanatory
  prose. Its player-facing political explanations prioritize actionable
  institutional meaning over a member-by-member legislative reference.
- **Decision here:** Retain the separation between narrative and a dedicated
  source section, and retain concise explanation of how institutions change
  political choices. Deliberately diverge by keeping the primer bibliography
  color-neutral and self-contained: citations point down-page and the
  bibliography supplies readable titles and locators without outbound links.
  Compress parliamentary prosopography into general, dated balance because the
  detailed ledgers remain available to research work without burdening the
  orientation.
- **Divergence level:** Local. No core game or runtime architecture changes.

## System fit

`TIMELINE_PRIMER.md` remains the canonical prose. `build-timeline.js` now
propagates a no-highlighting mode through all blocks in the bibliography and
converts external source references into internal bibliography citations.
Both the integrated and standalone generated pages receive the same result.
The underlying parliamentary research files and source registries retain the
detailed member evidence removed from the primer.

## Research and assets

No source or asset was added or removed. The ministry explanation uses Azimi,
*Iran: The Crisis of Democracy*, chapter 19, especially pp. 288–92, together
with Abrahamian, *Oil Crisis in Iran*, chapter 3. The broad chamber summaries
retain the official retrospective rosters and the existing Abrahamian and
official diplomatic-record locators. Compression changes presentation, not
the evidentiary record.

## Validation

- Rebuilt the integrated and standalone timeline pages.
- Confirmed that the generated HTML has no outbound `http` or `https` links.
- Confirmed that citations and the complete bibliography contain no political
  term spans.
- Added regression checks for the internal bibliography, condensed
  parliamentary treatment, ministry explanation, and title capitalization.
- Ran the full project test suite and checked the diff for whitespace errors.
