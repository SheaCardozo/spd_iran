# Westminster comparisons in the constitutional primer

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Recalibrated *The Last Majles* for a politically literate reader who may be new
to Iran. The constitutional orientation now uses Westminster comparisons to
explain:

- responsible government under a monarch;
- the vote of inclination, royal *farman*, and confidence vote;
- the Majles and House of Commons;
- the Senate and House of Lords;
- candidate-centered, multi-member, staggered Iranian elections versus a
  British general election; and
- quorum denial versus ordinary minority-government and
  confidence-and-supply arithmetic.

Each analogy immediately identifies the point where it fails. The source guide
adds the UK Cabinet Office's *Cabinet Manual*, archived locally as `SUP-050`,
for the British side of the comparison.

## Reason

The earlier primer assumed almost no political background and explained the
Iranian order entirely on its own terms. The intended reader can profit from a
more compact comparative vocabulary. Westminster is the most useful starting
point because both systems combined formal monarchical appointment with
parliamentary confidence; the differences then make the Shah's independent
military power, fluid caucuses, new Senate, and quorum conflict more legible.

## Dynamic SPD comparison

Dynamic SPD begins its institutional orientation in
`source/scenes/library.scene.dry`, section `@government`, with a compact
description of the Reichstag, cabinet, president, confidence, election
system, and emergency powers. It assumes a reader who understands ordinary
parliamentary concepts and concentrates explanation on the constitutional
features that drive play.

This project retains that concise institutional-first pattern. It adapts it by
using an explicit comparative method because the Iranian system is less
familiar to the likely audience. It rejects a one-to-one analogy: every
Westminster shorthand is paired with an Iranian divergence rather than used
to translate the Majles into a British party parliament.

## System fit

The change affects explanatory prose and future content expectations, not game
state or mechanics. It reinforces the planned separation among constituency
returns, credentials, caucuses, attendance, votes, and quorum. The new
constitutional subsection is included in the generated page, and the
standalone page retains an external official source link rather than requiring
repository access.

## Research and assets

The Iranian side continues to rely principally on `MAJ-S1`, chapters 1–3 and
15–20, and `MAJ-S3`, chapter 3, especially pp. 79–103. The comparative side
uses the UK Cabinet Office, *The Cabinet Manual* (first ed., October 2011),
especially chapters 2–3, archived as `SUP-050`. The manual is treated as an
official statement of modern British conventions, not as evidence about Iran
or proof that British practice never changed.

No historical asset was added or changed.

## Validation

- Rebuilt the playable and standalone timeline pages.
- Confirmed that the new section appears in navigation and no internal archive
  identifier appears in the standalone page.
- Ran the complete test suite and `git diff --check`.
