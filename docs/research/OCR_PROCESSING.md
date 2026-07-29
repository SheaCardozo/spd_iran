# Local OCR processing

The project has a resumable, source-aware OCR queue for the ignored local
archive. It never modifies an acquired source file. Searchable PDFs, plain-text
sidecars, work chunks, logs, and processing metadata remain beside the source
inside `docs/research/sources/`, which is excluded from Git.

The tracked queue is [`OCR_QUEUE.json`](OCR_QUEUE.json). It records processing
priority, language, input carrier, treatment of existing text, representative
benchmark pages, and any source-specific caution. It is an operations record,
not evidence that a source has been read or that machine text is accurate.

## Toolchain

The reproducible local stack is:

- OCRmyPDF 17.8.1 for searchable-PDF assembly and resumable PDF work;
- Tesseract 5.5 with the maintained `fas`, `eng`, and `osd` models;
- qpdf 12.3 for page counting, chunk extraction, and lossless reassembly;
- pikepdf for splitting photographed two-page spreads; and
- a pikepdf preprocessing copy for scans with invalid trim, bleed, or art
  boxes, leaving the acquired PDF unchanged; and
- grayscale, approximately 300-dpi processing copies for exceptionally large
  oral-history JPEGs, followed by direct concurrent `fas` Tesseract jobs using
  automatic page segmentation (`PSM 3`).

Run `scripts/bootstrap-ocr.sh` once on an Ubuntu system. It downloads official
Ubuntu packages and a managed Python environment under ignored `.tools/`;
it does not require root or alter the system Python.

## Commands

```sh
npm run research:ocr:doctor
npm run research:ocr:status
node scripts/research-ocr.js benchmark --id=MAJ-S10
node scripts/research-ocr.js run --id=MAJ-S10
node scripts/research-ocr.js run --id=SUP-071 --max-chunks=1
node scripts/research-ocr.js run --id=SUP-061 --max-images=250
node scripts/research-ocr.js run --id=SUP-007 --max-files=50 --max-chunks=1
node scripts/research-ocr.js metadata --priority=1
node scripts/research-ocr.js verify --priority=2
node scripts/research-ocr.js catalog
node scripts/research-ocr.js run --priority=1
```

Large PDFs are split into 75-page chunks. Completed chunks are retained under
an ignored `.ocr-work/` directory, so an interrupted run resumes at the first
missing chunk. Directory concurrency and per-file OCR workers are queue
settings: book-length court volumes use two files with three OCR workers each,
while the many short Majles files use five files with one worker each.
Page-image transcripts run six Tesseract jobs concurrently. Each Tesseract
process is limited to one OpenMP thread so those workers do not oversubscribe
the current eight-core, 8 GB workstation.

Use `--max-chunks=1` when a terminal, remote executor, or CI job imposes a
short runtime limit. Repeating the command advances one durable chunk at a
time; the final invocation merges automatically when every chunk exists.
`--max-images` and `--max-files` provide the equivalent boundary for transcript
page images and directories of PDFs.

The first benchmark on representative body pages produced:

| Source | Treatment | Throughput |
| --- | --- | ---: |
| `MAJ-S10`, Movahed volume II | replace defective OCR, preserve page images | 36.74 pages/min |
| `SUP-078`, Ebtehaj memoirs | add OCR to image pages | 71.12 pages/min |
| `SUP-071`, Zirakzadeh | split right page then left page and OCR | 106.33 split pages/min |

These are local measurements, not promised corpus-wide rates. Covers,
photographs, damaged pages, and complex newspaper layouts vary substantially.

## Current completion state

The first wave completed on 2026-07-29:

| Queue job | OCR output pages | Result |
| --- | ---: | --- |
| `MAJ-S10` | 584 | defective Persian layer replaced |
| `SUP-078` | 931 | searchable PDF and text |
| `SUP-059-A` and `SUP-059-B` | 367 | both official print orders searchable |
| `SUP-064` | 432 | watermark/form layer bypassed by force OCR |
| `SUP-071` | 558 | 279 spreads split right-to-left and made searchable |

All six merged PDFs passed `qpdf --check`. Together they add 2,872 searchable
output pages while preserving every archived source carrier. Processing
metadata records the original and processing carriers, engine versions, mode,
completion time, and SHA-256 checksums for both PDF and text.

The second wave also completed on 2026-07-29:

| Queue job | OCR output pages | Result |
| --- | ---: | --- |
| `SUP-061-transcripts` | 1,745 | four Harvard transcript facsimiles combined into searchable Persian text |
| `SUP-007` | 1,936 | all 297 Sixteenth- and Seventeenth-Majles session PDFs searchable |
| `SUP-025` | 1,976 | all four trial, appeal, and cassation volumes searchable |
| `SUP-079` | 532 | Makki volume V searchable |

All 306 second-wave derivatives passed page-count, checksum, text-checksum,
and—where applicable—`qpdf --check` validation. The tracked
[`OCR_DERIVATIVES.json`](OCR_DERIVATIVES.json) preserves the derivative
records even though the generated files remain in the ignored local archive.
For the Majles collection, clean Persian-only recognition and 1,800-pixel
OCR processing copies reduced runtime while preserving the original scan image
in every output. Thirteen early derivatives retain the initial `fas+eng`
recognition layer.

The lower-priority mixed documents and focused newspaper windows completed on
2026-07-29:

| Queue job | OCR output pages | Result |
| --- | ---: | --- |
| `SUP-063` | 58 | oil-negotiation documentary booklet searchable |
| `SUP-046` | 27 | 1332 SH budget scan searchable |
| `SUP-072` | 18 | Sadighi interview pamphlet searchable |
| `SUP-027` | 82 | 37 late-1331/1332 *Mardom* files searchable |
| `SUP-028` | 180 | 34 Third Force crisis-window files searchable |
| `SUP-029` | 42 | 18 *Mardom-e Iran* crisis-window files searchable |
| `SUP-030` | 44 | 13 *Apadana* crisis-window files searchable |
| `SUP-031` | 256 | 32 *Bakhtar-e Emruz* Thirty Tir and coup-window files searchable |

These 137 derivatives add 707 pages. Every one passed the same page-count,
checksum, text-checksum, and PDF-integrity verification used for the earlier
waves. At the end of that wave, the catalog recorded 449 derivatives and
9,768 searchable pages.
The newspaper results are deliberately bounded event windows, not a claim
that every acquired issue has been processed.

The final corpus-coverage audit added a fifth wave on 2026-07-29:

| Queue job | OCR output pages | Result |
| --- | ---: | --- |
| `SUP-080` | 509 | all available pages of Makki's incomplete coup volume searchable; missing printed pp. 425–440 remain absent |
| `SUP-008` | 208 | all 21 deliberately selected *Ettela'at* issues searchable |
| `SUP-009` | 92 | all 17 selected coup-week press PDFs searchable |
| `SUP-051`–`SUP-053` | 31 | three official parliamentary rosters searchable |
| `SUP-076`–`SUP-077` | 24 | two short declassified CIA scans searchable |

These 44 derivatives add 864 pages. All passed page-count, checksum,
text-checksum, and strict final-PDF verification. Four malformed *Bakhtar-e
Emruz* inputs required warning-tolerant QPDF extraction into temporary
processing copies; final derivatives passed strict validation and the archived
carriers remain unchanged. The catalog now records **493 derivatives and
10,632 searchable pages**.

Seven accepted derivatives predate this queue: `MAJ-S6`, `MAJ-S9`, and
`SUP-002`–`SUP-006`. Their source sidecars and `AVAILABLE_SOURCES.md` retain
their checksums, engine notes, and verification. They are not silently counted
inside the 493 queue-managed entries. `MAJ-S6` has no standalone text sidecar:
its older embedded OCR font encoding does not round-trip cleanly through the
current text extractor, so use the searchable PDF for discovery and the page
image for citation.

## Processing order

1. Core books and documentary compilations: `MAJ-S10`, `SUP-078`, `SUP-059`,
   `SUP-064`, and `SUP-071`.
2. Harvard transcript facsimiles, Majles session scans, court records, and
   Makki volume V.
3. Mixed carriers and numerical documents, with visual or manual verification
   where recognition cannot preserve structure.
4. Newspaper date windows relevant to Thirty Tir and the August coup, rather
   than indiscriminate full-corpus OCR.
5. Complete selected high-value press sets, incomplete-but-usable participant
   works, roster finding layers, and short official scans identified by the
   final coverage audit.

## Deliberate residual queue

`SUP-011-legacy-scans` remains at priority six: four Chaqueri legacy
facsimiles totaling 930 pages. Volume 3 duplicates a searchable retypesetting,
while volumes 8, 19, and 20 are less direct for 1949–53 than the still-missing
volumes 12 and 17. This is a lawful and reproducible future job, not a current
research blocker.

The unprocessed portions of `SUP-027`–`SUP-030` are also deliberate. Their
completed date windows cover the immediate campaign questions; extending OCR
to every acquired issue should follow a defined scene, claim, or newspaper
research question rather than raw corpus size. `SUP-031` is nearly complete,
with six issues outside its selected Thirty-Tir and coup windows.

Remaining work elsewhere is not OCR. A substantive reading pass is now
complete for the campaign-relevant chapter and notes in `MAJ-S13`, the full
`SUP-048` article, and selected claim-bearing passages in the Harvard Amini,
Azar, Baghai, and Sanjabi interviews. The exact locators and use limits are in
[`SUBSTANTIVE_SOURCE_REVIEW_2026-07-29.md`](SUBSTANTIVE_SOURCE_REVIEW_2026-07-29.md);
the focused Harvard pass does not mean that all 1,745 transcript pages have
been read.

The Qashqai candidate passage has been matched to official Harvard tape 2 at
`00:56:23–00:57:33`, but exact wording still requires a Persian-speaking human
listener. It is timecode-verified, not quotation-cleared. Five selected
`SUP-057` tables have now been transcribed from and checked against page
images. Additional economic transcription should be claim-driven and retain
the same image-check, vintage, unit, date-basis, and missing-value controls.

The Qashqai HLS audio in `SUP-061` is a transcription task, not OCR, and remains
separate from this queue. Persian speech recognition creates only a discovery
draft; exact quotations and decisions require listening against the recording.
Economic tables likewise require structured, image-checked transcription:
five selected `SUP-057` Iran tables are recorded under
[`economic_observations/`](economic_observations/README.md), with units,
printed-page locators, vintage, and missing-value conventions preserved.

## Evidentiary boundary

OCR output is a discovery aid. Persian names, dates, quotations, vote counts,
numerical tables, and text recovered from marginal or damaged scans must be
checked against the page image before use. A completed OCR job does not change
the source's scholarly standing, and it does not promote an unread source to
“reviewed.” Once a derivative is accepted, its checksum and review state belong
in `AVAILABLE_SOURCES.md`; historical use still needs a precise page or
document locator.
