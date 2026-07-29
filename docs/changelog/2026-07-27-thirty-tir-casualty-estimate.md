# Thirty Tir casualty estimate

- **Date:** 2026-07-27
- **Status:** Implemented

## Summary

The primer now gives a source-bounded scale for the violence of 30 Tir: an
estimated 250 or more demonstrators were killed or seriously injured across
Tehran, Hamadan, Ahvaz, Isfahan, and Kermanshah. The adjacent sentence
explicitly identifies this as a combined five-city casualty estimate, not a
death toll, and retains the warning that no agreed death count survives.

The crisis evidence audit now records the verified printed-page locator and
the evidence chain identified in Abrahamian's note.

## Reason

“No agreed casualty count survives” was accurate but gave readers no sense of
scale. A combined estimate can convey the uprising's national and lethal
character without collapsing deaths and injuries into a false exact death
toll.

## Dynamic SPD comparison

- **Reference path:**
  `source/scenes/party_affairs/streetfighting.scene.dry`.
- **What Dynamic SPD does:** the street-fighting scene conveys the scale of
  political violence with the bounded phrase “dozens of people are killed
  each month,” rather than leaving the violence wholly unquantified.
- **Decision here:** retain a concise magnitude in the narrative, but adapt it
  to the Iranian evidence by naming the geographic scope and preserving
  Abrahamian's combined “killed or seriously injured” category. Do not turn
  the combined figure into a death count or imply precision the sources do not
  support.
- **Divergence level:** historical content only. No mechanic or architecture
  changes.

## System fit

The estimate appears in the existing 30 Tir chronology in
`docs/research/TIMELINE_PRIMER.md`. The topic guide adds the exact locator.
`docs/research/CRISIS_EVIDENCE_AUDIT.md` remains the detailed record of
competing categories and the unresolved name-by-name reconstruction.

## Research and assets

The claim was checked directly in Ervand Abrahamian, *Iran Between Two
Revolutions*, printed p. 271 (`MAJ-S2`). Abrahamian describes more than 250
demonstrators as having died or suffered serious injury across the five named
cities. Note 112 directs readers to:

- H. Arsanjani, *Yaddashtha-yi Siyasi*, pp. 1–80;
- “Siyeh-i Tir,” *Salnameh-i Donya* 9 (1953), pp. 176–81;
- Ali Shayegan, “The Uprising of Siyeh-i Tir,” *Yaghma* 5 (September 1952),
  pp. 303–10;
- Qodsi, *Kitab-i Khatirat-i Man*, vol. 2, pp. 733–36; and
- the 17–24 July 1952 issues of *Ittila'at* and *Bakhtar-i Emruz*.

No new asset is involved. Torkamān's documentary reconstruction remains the
priority for distinguishing deaths from serious injuries and reconciling
police, hospital, cemetery, press, and provincial records.

## Validation

- Verified the wording, city coverage, printed page, and note in the local
  `MAJ-S2` EPUB.
- Rebuilt the integrated and standalone primer.
- Added regressions for the estimate and its category warning.
- Ran the complete automated test suite and `git diff --check`.
