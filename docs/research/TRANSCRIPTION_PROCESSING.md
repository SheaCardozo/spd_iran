# Local audio transcription

The project has a resumable Persian discovery-transcription path for the
seven-tape Mohammad Nasser Qashqai interview in `SUP-061`. It never changes or
transcodes the preserved Harvard HLS delivery. Five-minute MPEG transport
stream carriers, timestamped text, JSON, and processing metadata are generated
beside the ignored local source archive.

## Toolchain and command

[`scripts/bootstrap-transcription.sh`](../../scripts/bootstrap-transcription.sh)
installs `faster-whisper` 1.2.1 and its maintained dependencies in the ignored
`.tools/transcription/` environment. The transcription uses the multilingual
Whisper `turbo` model with an explicitly fixed Persian language, CPU `int8`
inference, beam size 5, and voice-activity filtering.

```sh
scripts/bootstrap-transcription.sh
npm run research:transcribe:qashqai
.tools/transcription/venv/bin/python scripts/transcribe-qashqai.py \
  --max-new-parts=1
```

The bounded form advances one durable five-minute checkpoint and exits. It is
safe to repeat after a crash or remote-executor timeout. `--tapes` can limit a
diagnostic run, and `--cpu-threads` permits two disjoint tape workers to share
an eight-core machine.

## Outputs and catalog

The ignored local outputs are:

- one timestamped JSON record per five-minute part and combined stream;
- a combined seven-tape JSON transcript;
- a human-searchable timestamped Persian text transcript;
- exact carrier and output checksums plus engine settings; and
- the temporary concatenated carriers assembled from unchanged HLS segments.

After all seven tapes complete,
[`TRANSCRIPTION_DERIVATIVES.json`](TRANSCRIPTION_DERIVATIVES.json) preserves
the output paths, checksums, duration, engine version, language, model, and
evidentiary status in Git.

## Completion state

The seven-tape run completed on 2026-07-29: 22,321.452 seconds (6.20 hours)
became 8,113 timestamped machine segments. The local archive contains 82
bounded part records plus the earlier whole record for the short third
tape. The aggregate JSON and text checksums, exact model repository and
40-character snapshot revision, and faster-whisper version are recorded in
the tracked derivative catalog.

## Evidentiary boundary

This is a machine-generated discovery transcript, not an official Harvard
transcript and not quotation-ready. Persian names, dates, institutional terms,
dialectal speech, and every proposed quotation must be checked by listening
against the Harvard recording. Machine text can help locate a passage; it
cannot silently become the wording of the historical record.

One campaign-relevant passage has been matched to official Harvard tape 2 at
`00:56:23–00:57:33`; the discovery texts agree on the remembered episode but
not its exact words. The passage is therefore timecode-verified but not
quotation-cleared. No repository claim currently quotes it. Its evidence
boundary and the required human Persian listening check are recorded in
[`SUBSTANTIVE_SOURCE_REVIEW_2026-07-29.md`](SUBSTANTIVE_SOURCE_REVIEW_2026-07-29.md).
