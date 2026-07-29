# Mossadegh court-record acquisition

- **Date:** 2026-07-26
- **Status:** Implemented

## Summary

Acquired and verified all four target Jalil Bozorgmehr court-record volumes:
the two-volume first-instance trial, military appeal, and Court of Cassation
review. They are cataloged together as `SUP-025`, replacing the former
all-or-nothing court-record gap with a complete proceeding-specific local set.

## Reason

Trial-focused content needs the actual edited proceeding records, not isolated
quotations or partisan web transcriptions. Distinguishing the first-instance,
military-appeal, and cassation stages prevents an available later proceeding
from being mistaken for evidence of an earlier courtroom exchange.

## Dynamic SPD comparison

- **Reference paths:** no corresponding archival source-ingestion system was
  found in the Dynamic SPD checkout.
- **What Dynamic SPD does:** its runtime content architecture does not encode
  edition provenance, document checksums, or claim-level historical gates.
- **Decision here:** preserve the existing game architecture and strengthen
  only the Iran project's research metadata and local ignored archive.
- **Divergence level:** local; no runtime, UI, event, or mechanical behavior
  changed.

## System fit

`AVAILABLE_SOURCES.md` and `BIBLIOGRAPHY.md` now define `SUP-025`, its editions,
editor standing, evidentiary value, and limitations. `UNAVAILABLE_SOURCES.md`
retains the completed `IR-P6` acquisition history but no longer carries a
first-instance transfer gate. `SOURCE_AUDIT.md` now allows precisely sourced
work across the first-instance, appeal, and cassation stages.

## Research and assets

- Jalil Bozorgmehr, ed., *Mohammad Mossadegh dar Mahkameh-ye Nezami*,
  ketab-e avval, 2 vols. (Nashr-e Tarikh-e Iran, 1363 SH / 1984–85), complete
  504- and 483-page local scans with continuous printed pagination pp. 1–802.
- Jalil Bozorgmehr, ed., *Doktor Mohammad Mossadegh dar Dadgah-e Tajdid-e
  Nazar-e Nezami* (Sherkat-e Sahami-ye Enteshar, first ed., 1365 SH / 1986),
  611-page local scan.
- Jalil Bozorgmehr, ed., *Doktor Mohammad Mossadegh va Residegi-ye Farjami dar
  Divan-e Keshvar* (Sherkat-e Sahami-ye Enteshar, second ed./printing, 1367 SH
  / 1988), 378-page local scan.
- Iran Archive catalog and direct-file records, treated as carrier metadata
  rather than historical authority.
- Open Library work `OL44643921W` and CiNii Books record `BA7701115X`, used as
  independent catalog checks.
- Public Telegram posts `@sheikhesmaeili/708` and `/709`, from which the user
  supplied the first-instance attachments.
- Ketabnak volume records, Kafe Ketab, Mashruteh, and the archived Che Bayad
  Kard navigation were checked as acquisition or discovery leads only.

No visual game asset was added or changed.

## Validation

- Confirmed all four acquired files are readable PDFs and counted 504, 483,
  611, and 378 PDF pages.
- Computed and recorded SHA-256 checksums for all four unchanged scans.
- Visually inspected covers and title matter; for the first-instance pair,
  also checked the contents, p. 398/399 handoff, p. 802 conclusion, plate
  transitions, and final leaves.
- Confirmed that the appeal scan lacks a useful text layer and that the
  cassation scan's sparse layer is malformed; neither was presented as
  searchable.
- Recorded the cassation edition statement from the page image where it
  conflicts with external catalog metadata.
- Confirmed the supplied first-instance files match the previously located
  Telegram attachment names and sizes. CiNii independently corroborates the
  editor, publisher, date, series, and 802-page printed extent.
- Queried the Wayback Machine inventory for the dead page-image mirror and
  confirmed that its HTML navigation survived but its JPEG corpus did not.
