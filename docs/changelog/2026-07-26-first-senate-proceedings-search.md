# First Senate proceedings search

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Replaced the vague First-Senate acquisition note with an exact partial holding,
coverage analysis, two rounds of repository checks, a Royal Official Gazette
carrier lead, an access-controlled digital holding, corrected target dates, a
session-and-file-ID reproduction plan, and three ranked JSTOR leads that were
subsequently acquired in the
[JSTOR source intake](2026-07-26-jstor-source-intake.md). A later vote-count
pass verified that the Majles recorded only an unnumbered standing majority
and located a provisional contemporary aggregate for the Senate: 26–4.

## Reason

Precise Senate debate and procedure scenes require the official proceedings.
The former note described an inaccessible 1953 volume but did not distinguish
the complete 1950–53 term from the session ranges actually held by libraries.

## Dynamic SPD comparison

- **Reference paths:** no corresponding research-source catalog was found in
  the Dynamic SPD checkout.
- **What Dynamic SPD does:** its runtime and content architecture do not encode
  an archival acquisition workflow.
- **Decision here:** retain the existing game architecture and strengthen only
  the Iran project's historical release gate and research metadata.
- **Divergence level:** local; no runtime, UI, or mechanical behavior changed.

## System fit

`UNAVAILABLE_SOURCES.md` now identifies the First Senate term, the University
of Chicago's session coverage, SDIL's access-controlled scans, missing ranges,
and priority dates.
`BIBLIOGRAPHY.md` records the proceedings' authority and limits, while
`SOURCE_AUDIT.md` records how the access conclusion was reached. This prevents
a future event author from treating “First Senate proceedings” as either
wholly lost, publicly reviewed, or only physically available. The catalogs also
identified two major scholarly books and one supplemental article that are now
local as `MAJ-S13`, `MAJ-S14`, and `SUP-048`.

## Research and assets

- University of Chicago Library, *Muzakirat-i Majlis-i Sina*, First Senate
  sessions 38–126, `microfm K13.U84`, catalog bib `4867019`.
- University of Washington Libraries, *Middle East in Microform*, entry for
  *Muzakarat-i Majlis-i Sina* (Chicago holding).
- Shahr-e Danesh Institute for Law Research and Study (SDIL), anonymous
  library catalog database 13 and digital-library registration page. Exact
  scan records were located for First-Senate sessions 84, 91–92, 95, 125, and
  190–193. The scan files remain access-controlled and were not treated as
  reviewed.
- Ervand Abrahamian, *Oil Crisis in Iran* (Cambridge University Press, 2021),
  citations to First-Senate debates of 11 May and 4 September 1951.
- Fakhreddin Azimi, *Iran: The Crisis of Democracy, 1941–1953* (St. Martin's
  Press, 1989), bibliography p. 406 (local PDF p. 422), identifying the
  Senate-proceedings carrier as *Ruznamih-yi Rasmi-yi Kishvar-i Shahanshahi*,
  1950–52.
- Fakhreddin Azimi, *The Quest for Democracy in Iran* (Harvard University
  Press, 2008), JSTOR stable item `j.ctv1kz4h36`, subsequently acquired as
  `MAJ-S13`.
- David S. Painter and Gregory Brew, *The Struggle for Iran* (University of
  North Carolina Press, 2023), JSTOR stable item
  `10.5149/9781469671680_painter`, subsequently acquired as `MAJ-S14`.
- N. Marbury Efimenco, “An Experiment with Civilian Dictatorship in Iran,”
  *The Journal of Politics* 17, no. 3 (1955), JSTOR stable item `2127013`;
  subsequently acquired as `SUP-048` and retained as a dated interpretive and
  bibliographic lead only.
- Mashruteh, Iran Archive, Internet Archive, Wikimedia Commons, and Nezamat
  were checked as discovery or carrier leads only. No historical claim was
  approved from their editorial text.
- Seventeenth Majles, session 23, 12 Mordad 1331, printed p. 13
  (`SUP-007`, session-scan PDF p. 7), records the emergency-powers bill's
  final lower-house standing vote only as “the majority rose; passed.”
- *Le Monde*, “Le Sénat vote les pleins pouvoirs à M. Mossadegh,” 12 August
  1952, a Tehran report attributed to AFP, United Press, and AP, reports the
  Senate division as 26 votes for and 4 against. The current article could not
  be archived unchanged because its public URL returned a client challenge;
  it remains a provisional contemporary corroboration and acquisition lead,
  not a replacement for First-Senate session 192.

No visual asset was added or changed.

## Validation

- Confirmed the Chicago call number, session range, Persian dates, and
  three-reel set description against the library page and a separate microform
  union list.
- Corrected the library webpage's erroneous Gregorian conversion: 15 Mehr 1329
  is 7 October 1950, not 1951.
- Enumerated Mashruteh's Senate transcript title prefix through its MediaWiki
  API and found only seventh-term pages.
- Queried Iran Archive's site search and Internet Archive's public metadata
  API; neither returned the First-Senate proceedings.
- Repeated the Iran Archive search under the Royal Official Gazette title,
  exact Persian dates, and alternate spellings. The returned self-published
  chronicle was classified as discovery-only; no official Gazette run was
  found.
- Checked `SUP-006`, printed pp. 15–16 (PDF pp. 27–28), and corrected the
  acquisition target: the Majles-side date is 8 Ordibehesht 1330 and the
  Senate approval is 9 Ordibehesht 1330.
- Inspected Wikimedia Commons' First-Senate category and found a membership
  booklet, not debates.
- Queried SDIL's anonymous catalog in the dedicated parliamentary-proceedings
  database; confirmed individually dated First-Senate records and “complete
  work” links for the target sessions, then recorded their stable file GUIDs.
- Verified that anonymous scan requests return HTTP `401` with Basic realm
  `lib.sdil.ac.ir`, while the guest thumbnail endpoint returns a generic PDF
  icon rather than a proceeding page.
- Inspected SDIL's current registration form and recorded its download tier,
  identity requirements, and institutional contact routes. No account,
  identity, payment, or external request was submitted.
- Mapped the 1952 sequence: session 190 was 13 Mordad, 191 was 18 Mordad, 192
  was 20 Mordad, and 193 was 26 Shahrivar. This rules out a First-Senate
  sitting on 30 Mordad and makes session 192 the exact acquisition target for
  testing the Senate's recorded treatment of the six-month powers measure.
- Inspected the local official scan of Seventeenth-Majles session 23 and
  checked the final vote formula against the host transcription. The scan
  confirms a standing majority but contains no numerical Majles tally.
- Confirmed the Senate's approval date from the enacted-law colophon and the
  Senate communication entered in Seventeenth-Majles session 26.
- Located the 26–4 Senate count in a dated contemporary report attributed to
  three wire services. A direct HTML request returned only a client-challenge
  page, so no false local archive entry or checksum was created.
- Downloaded the generically titled Commons “session 190” file and visually
  inspected its title page. It is Second-Senate session 190, 28 Mehr 1335, not
  the First-Senate session; the false lead was removed and not cataloged.
- No source file was acquired, so no available-source entry was created.
- `git diff --check` passed. The catalog cross-reference and multi-file
  collection tests passed when run directly. A concurrent `SUP-009` expansion
  briefly made the full source-integrity test fail because its manifest and
  fixture landed in different workstreams; the integrated fixture now expects
  manifest
  `11942a548c739d2e1364c498b0df4f181852cab4e389415cb8aac5afdc388949`,
  and the reconciled suite passes.
