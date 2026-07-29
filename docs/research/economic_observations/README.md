# Structured economic observations

These files contain image-checked transcriptions of narrow, high-priority
tables. They preserve the source's report vintage, units, date basis, missing
values, and printed-page locator. They are observations, not a continuous
model-ready series: definitions and revisions must be reconciled before
mechanical use.

## SUP-057, December 1951 IFS

- [`SUP-057-1951-12-iran-monthly.csv`](SUP-057-1951-12-iran-monthly.csv)
  transcribes selected monthly rows from June 1950 through November 1951 from
  printed p. 63.

This vintage captures the oil shutdown as it appeared in a report issued
during the crisis. Its crude-petroleum series uses `1937 = 100`, unlike the
later sheets' `1948 = 100`, and must not be joined without rebasing. Several
rows stop before November; `NA` preserves the printed blank.

## SUP-057, August 1953 IFS

- [`SUP-057-1953-08-iran-annual.csv`](SUP-057-1953-08-iran-annual.csv)
  transcribes selected annual rows for 1948–52 from printed p. 100.
- [`SUP-057-1953-08-iran-monthly.csv`](SUP-057-1953-08-iran-monthly.csv)
  transcribes selected monthly rows from January 1952 through June 1953 from
  printed p. 101.

Both tables were keyed against the 300-dpi page image, then checked a second
time row-by-row. `NA` means that the source prints no observation; it is not
zero. The series codes are the IMF sheet's own row numbers. Units and date
bases differ between rows and are therefore explicit columns.

The August 1953 issue is a contemporary IMF compilation of data chiefly
supplied through Bank Melli. It is not an original Bank Melli bulletin. Values
may be provisional, revised in later vintages, affected by official-rate
valuation, or defined differently from later Iranian statistics. The page
image remains controlling for every number.

### Important table notes

- Annual trade values use years beginning 21 March.
- Annual National Bank dollar assets and banking values use 20 March of the
  following year.
- Annual price and petroleum indices use calendar years ending in December,
  with 1948 = 100.
- Monthly National Bank assets are observations at about the twentieth of the
  month; banking foreign assets use the same approximate date.
- Monthly price and petroleum indices retain the sheet's `1948 = 100`
  convention.
- The dramatic petroleum index fall is production, not revenue, employment,
  household welfare, or total national output.

## SUP-057, December 1954 IFS

- [`SUP-057-1954-12-iran-annual.csv`](SUP-057-1954-12-iran-annual.csv)
  transcribes selected annual rows for 1948–53 from printed p. 108.
- [`SUP-057-1954-12-iran-monthly.csv`](SUP-057-1954-12-iran-monthly.csv)
  transcribes selected monthly rows from May 1953 through October 1954, where
  printed, from printed p. 109.

This later vintage extends the observations into the first post-coup year and
shows that the IMF revised some values already printed in August 1953. For
example, annual 1951 total exports are `11.27` billion rials in the August
1953 sheet and `11.23` in December 1954; annual 1951 imports move from `7.37`
to `7.23`. Both values remain in their original vintage. The tables are not
silently merged into a single “corrected” series.

The annual sheet's trade rows use years beginning 21 March, most banking rows
use 20 March of the following year, oil-company payments use years ending
31 December, and price and production indexes use calendar years. Monthly
series end at different dates. Those differences are part of the evidence.

## Validation boundary

These transcriptions support discovery, comparison, and reproducible
calculation. Any published claim or game mechanic must still cite `SUP-057`,
the printed page and row, explain the unit and date basis, and compare later
revision vintages where the exact level matters.

The reading and image-check record is
[`SUBSTANTIVE_SOURCE_REVIEW_2026-07-29.md`](../SUBSTANTIVE_SOURCE_REVIEW_2026-07-29.md).
