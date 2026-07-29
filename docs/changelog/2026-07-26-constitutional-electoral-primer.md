# Constitutional and electoral primer expansion

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

The standalone primer now explains the constitutional and electoral machinery
behind the crisis in concrete terms:

- the powers and internal procedures of the Majles;
- the vote of inclination, royal *farman*, vote of confidence, ministerial
  questioning, and no-confidence process;
- the Shah's contested executive and military authority and the 1949
  dissolution amendment;
- the late creation and mixed appointment/election of the Senate;
- territorial, candidate-based, staggered Majles elections;
- local supervisory boards and common mechanisms of interference;
- credential review and the loose relationship between candidates, parties,
  and caucuses; and
- the incomplete Seventeenth Majles and its quorum rules.

The page's browser title, wordmark, and main heading now consistently use
*The Last Majles*.

## Reason

The chronology assumed that readers understood how a prime minister was
selected, why the Shah's decree mattered, how a partially elected chamber
could sit, and why absence from the Majles could be as consequential as a
vote. Those institutional details are necessary to understand the July 1952
crisis, parliamentary obstruction, the 1953 referendum, and the coup's claim
to royal legality.

## Dynamic SPD comparison

- **Reference paths:** `source/scenes/library.scene.dry`, especially the
  `@government` entry, and `out/html/index.html`.
- **What Dynamic SPD does:** its library explains the Reichstag's proportional
  electoral system, selection and removal of the chancellor, presidential
  election, emergency decrees, and federal structure in a short orientation
  before those rules become politically important.
- **Decision here:** retain the principle of explaining institutional
  machinery before narrating the crisis. Iran requires a longer treatment
  because constituency voting, staggered polling, credential review, the
  never-completed Seventeenth Majles, and contested royal conventions do not
  reduce to one stable electoral formula.
- **Divergence level:** local. This expands historical exposition and page
  identity without changing application state, routing, mechanics, or runtime.

## System fit

`docs/research/TIMELINE_PRIMER.md` remains the canonical narrative and the
existing renderer automatically adds the new subsections to page navigation.
The normal and standalone builds remain identical. Title assertions now keep
browser metadata, header identity, and the main heading synchronized.

## Research and assets

The expansion uses sources already in the archive and bibliography:
Fakhreddin Azimi, *Iran: The Crisis of Democracy*, chapters 1–3 and 15–20,
and Ervand Abrahamian, *Oil Crisis in Iran*, chapter 3, especially pp. 79–100
and 112–17. The source-locator table now separates constitutional structure
from electoral procedure. No new source or asset was introduced.

## Validation

- Built the application and both timeline outputs.
- Added assertions for the synchronized title and the new government,
  electoral, and incomplete-Majles subsections.
- Ran the complete Node test suite and `git diff --check`.
