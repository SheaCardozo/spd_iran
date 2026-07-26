# Full-name political coloring

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Political color now covers a figure's complete identifying phrase when the
full name is written, including a directly attached office, rank, or honorific.
A later surname-only reference remains colored. The timeline renderer
recognizes the full forms of every currently mapped Iranian figure, the opening
scene now wraps `Mohammad Mossadegh` as one semantic term, and the binding guide
and agent instructions use the same rule.

## Reason

Coloring only the surname visually fragmented short Iranian names and made
multi-part forms such as `Mohammad Reza Shah` particularly awkward. Treating a
written personal name as one semantic unit is more legible and easier to apply
consistently.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/main.scene.dry`,
  `source/scenes/library.scene.dry`, and
  `source/scenes/party_affairs/shuffle_leadership.scene.dry`.
- **What Dynamic SPD does:** its inline color markup is inconsistent at the
  person level. Ordinary prose often leaves politicians neutral; colored
  appearances may cover a surname or, less often, a complete name. It does not
  establish a reliable full-name-versus-surname convention.
- **Decision here:** retain semantic ideological coloring but deliberately
  standardize the Iran material on complete written identifying phrases.
  Directly attached offices, ranks, and honorifics share the span so the visual
  treatment does not fragment the reference. Surname-only references remain
  valid.
- **Divergence level:** local. This changes content markup and generated
  presentation only; it does not affect state, routing, action economy,
  persistence, or the runtime model.

## System fit

The timeline's longest-match term renderer now prefers full-name aliases
before surname aliases. This keeps generated prose consistent without
rewriting the canonical research text. Dendry authors apply the same rule
manually with the shared semantic classes. Palette meanings and color values
are unchanged.

## Research and assets

No historical characterization, citation, source status, or asset changed.
This is solely a typography and semantic-markup convention.

## Validation

- Updated generated-timeline assertions for full personal names.
- Updated the compiled opening-scene assertion.
- Ran the complete build and Node test suite.
- Ran `git diff --check`.
