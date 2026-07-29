# Economic-map compression

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

The primer's economic map is now a compact four-part explanation of the oil
enclave, the commercial requirements of nationalization, adjustment to the
embargo, and the government's oil-less economic program. Detailed Abadan
headcounts, exchange rates, program examples, and repeated qualifications have
been removed while the causal distinctions remain.

The closing “What remains uncertain” section has also been removed from the
primer and its contents navigation.

## Reason

The economic orientation had become more detailed than the narrative sections
it was meant to support. Its essential function is to explain why oil was
politically decisive, why ownership did not guarantee exports, and why severe
economic pressure did not equal immediate state bankruptcy. The separate
uncertainty section repeated caveats already stated beside contested claims and
extended the page after its bibliography.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/modinfo.scene.dry`,
  `source/scenes/credits.scene.dry`, and `out/html/game.css` in the Dynamic SPD
  checkout.
- **What Dynamic SPD does:** background explanation is compact and tied to the
  political consequence the reader needs; source material is separated from
  the narrative.
- **Decision here:** retain the primer's Iran-specific economic model but
  express each mechanism once. Keep uncertainty attached to the relevant
  claims instead of collecting a second end-of-page qualification catalogue.
- **Divergence level:** local editorial presentation only.

## System fit

The canonical Markdown remains the only source of reader-facing prose. The
normal build automatically removes the deleted uncertainty section from both
navigation and generated pages. No game state, event routing, or economic
mechanic changes.

## Research and assets

No source or asset was added or removed from the project registries. The
abridged map retains its claim-level citations to the existing labor, oil,
macroeconomic, and development sources.

## Validation

- Rebuilt the integrated and standalone timeline pages.
- Added a rendered-length guard for the economic map.
- Added regressions excluding the removed Abadan detail and uncertainty
  section.
- Ran the complete project test suite.
- Ran `git diff --check`.
