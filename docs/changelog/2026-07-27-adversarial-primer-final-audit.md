# Adversarial historical-primer final audit

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

The historical primer received another independent adversarial review and the
resulting defects were corrected. The revision:

- defines 30 Tir at its first historical use and uses that form consistently;
- explains the period map's British use of “Persia” for Iran;
- adds the constitutional dispute and evidentiary ambiguity that produced the
  9 Esfand crisis;
- supplies an adjacent source for the surviving British-linked networks after
  the October 1952 embassy closure; and
- raises every light- and dark-mode political or country-gradient component to
  WCAG AA contrast, with an automated regression test.

The completed page was rebuilt before being returned for another adversarial
pass. That pass identified a second, narrower set of defects: an apparent
parliamentary-count contradiction, missing adjacent citations in three early
history blocks, ambiguous reference to Azerbaijan, two colors that failed only
on the outer paper background, and one inconsistent Majles hyphenation. These
were corrected before the next repeat review. A third pass found one remaining
ambiguous shorthand for the 1946 Iranian Azerbaijan crisis in the actor
summary; it too was corrected before the fourth pass.
The fourth independent pass returned an explicit all-clear.

## Reason

A primer can be factually dense and still fail a reader who does not already
know which calendar names, cartographic labels, and constitutional conflicts
need explanation. The extra pass was requested specifically to expose those
failures and to repeat review after correction until no material defect
remained.

## Dynamic SPD comparison

- **Reference paths:** `out/html/game.css`;
  `source/scenes/modinfo.scene.dry`;
  `source/scenes/ending_slides.scene.dry`; and
  `source/scenes/government_affairs/military_policy.scene.dry`.
- **What Dynamic SPD does:** recurrent ideological and national associations
  are encoded by inline colors in prose, including social-democratic red,
  communist dark red, fascist brown, establishment grey, and individual
  flag-color segments. Its browser stylesheet supplies the surrounding light
  and dark surfaces but does not provide a centralized semantic palette or
  per-stripe contrast guarantees.
- **Decision here:** retain the established associations and flag ordering,
  but adapt them through shared variables with separate accessible values for
  light and dark surfaces. The primer's historical explanations remain
  Iran-specific and source-led.
- **Divergence level:** local. This changes prose clarity and presentation,
  not the runtime model or game architecture.

## System fit

The Markdown primer remains the canonical prose source. The normal build
regenerates the integrated and standalone HTML copies. The same accessible
palette variables are present in `web/game.css` and `web/timeline.css`, so the
game and primer retain one semantic color system. The UI test now evaluates
each solid and gradient-component color rather than relying only on exact
hexadecimal snapshots.

## Research and assets

The 9 Esfand setup and its disputed interpretations use `MAJ-S5`, pp. 49–59,
and `MAJ-S14`, chapter 5, “9 Esfand.” The October 1952 network statement now
cites `MAJ-S14`, chapter 6, “Approaching the Shah.” Both works were already
registered and archived. The new early-history citations use `MAJ-S14`,
chapter 1, pp. 10–15 and 36–38, and `MAJ-S2`, chapter 3, pp. 135–76.

The existing public-domain British War Office map is unchanged. Its caption
now explains that the sheet's “Persia” label refers to Iran; there is no new
asset or rights implication.

## Validation

- Compared the palette approach with the Dynamic SPD paths above.
- Rebuilt the game and both historical-primer outputs with `npm test`.
- Passed all four Node test suites, including the new WCAG AA checks for every
  semantic solid color and every country-gradient stripe in both modes.
- Repeated independent adversarial review after each correction set. The
  fourth pass returned `ALL CLEAR`.
