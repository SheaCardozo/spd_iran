# Primer prompt-residue audit

- **Date:** 2026-07-27
- **Status:** Implemented and independently cleared

## Summary

The standalone primer received a focused adversarial audit for prose that
exposed prompts, editorial instructions, research workflow, or defensive
answers to anticipated objections. Ten instances were removed or rewritten,
and a second full audit returned `ALL CLEAR`.

The revision:

- removes the opening declaration of the intended audience, scope, and policy
  for comparisons to other parliamentary systems;
- replaces “How to read this primer” with “The last opening,” beginning inside
  the history rather than with a description of the page;
- removes the explanation of the page title entirely;
- reduces the date and transliteration notes to conventions readers actually
  need under “Dates and names”;
- moves National Front citations from a detached research note into the
  relevant actor entry;
- explains the nine-article implementation law directly instead of describing
  where its text is preserved;
- states the uncertain 1949 palace-protest dating as a conflict among sources;
- replaces self-conscious “bridge” and “paradox” transitions with direct
  historical claims; and
- rewrites two captions to describe the map and Abadan gathering rather than
  their editorial purpose.

## Reason

The removed language was useful while planning and editing the primer but
awkward in the finished public page. Readers need the history, necessary
conventions, source access, and genuine evidentiary limits. They do not need
the assignment that produced those choices or assurances that the text is
following earlier editorial instructions.

## Dynamic SPD comparison

- **Reference path:** `source/scenes/root.scene.dry` in
  `/home/phroz/spd/dynamic_social_democracy`.
- **What Dynamic SPD does:** the root scene presents the work and a direct
  start path. It does not explain an imagined player's background or expose
  instructions governing how political comparisons were selected.
- **Decision here:** follow that directness. Keep the short title, date, and
  spelling conventions because they resolve real ambiguities in the page, but
  remove audience modeling, scope promises, title justification, and
  explanations of editorial policy. Open on the fall of Mossadegh's
  government, then widen directly to the defeat of parliamentary government
  and the authoritarian orders that followed.
- **Divergence level:** editorial presentation only. Game state, event
  routing, deck semantics, persistence, and the build/runtime model are
  unchanged.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the content source. “The last
opening” now appears in the generated contents navigation, while its short
“Dates and names” subsection carries the necessary conventions. The
introduction closes on the historical problem developed by the rest of the
page: how a movement with broad public authority ended in coalition fracture,
parliamentary dissolution, and coup. Citations and historical-color markup
continue to be produced by the same renderer. Regression checks reject the
specific prompt-residue, title-explanation, and external framing phrases
removed by this audit.

## Research and assets

No source or asset files changed. Existing claim locators were retained. The
National Front locators moved into the adjacent actor entry, and the
nationalization-law locator remains attached to the same claim. The map and
Abadan photograph captions retain their rights and attribution language while
describing the historical objects more directly.

## Validation

- Rebuilt the integrated and standalone primer.
- Ran the complete automated test suite and `git diff --check`.
- Added regressions against the removed audience, comparison-policy,
  document-production, research-note, and self-conscious-transition phrases.
- Conducted two independent rendered-page prompt-residue audits. The first
  identified ten actionable instances; the second returned `ALL CLEAR`.
