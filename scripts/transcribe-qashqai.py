#!/usr/bin/env python3
"""Create a resumable, timestamped discovery transcript of SUP-061 audio."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path

from faster_whisper import WhisperModel


ROOT = Path(__file__).resolve().parents[1]
AUDIO_ROOT = (
    ROOT
    / "docs/research/sources/supplemental"
    / "SUP-061-harvard-iranian-oral-history-selected/qashqai/audio"
)
OUTPUT_ROOT = AUDIO_ROOT.parent / "transcription"
MODEL_ROOT = ROOT / ".tools/transcription/models"
MODEL_NAME = "turbo"
MODEL_REPOSITORY = "mobiuslabsgmbh/faster-whisper-large-v3-turbo"
CATALOG_PATH = ROOT / "docs/research/TRANSCRIPTION_DERIVATIVES.json"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def model_revision() -> str:
    reference = (
        MODEL_ROOT
        / "models--mobiuslabsgmbh--faster-whisper-large-v3-turbo"
        / "refs/main"
    )
    return reference.read_text(encoding="utf-8").strip() if reference.exists() else "unknown"


def load_checkpoint(path: Path) -> dict:
    record = json.loads(path.read_text(encoding="utf-8"))
    identity = {
        "modelRepository": MODEL_REPOSITORY,
        "modelRevision": model_revision(),
    }
    if any(record.get(key) != value for key, value in identity.items()):
        record.update(identity)
        path.write_text(
            json.dumps(record, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
    return record


def playlist_segments(stream: Path) -> tuple[list[tuple[Path, float]], float]:
    playlist = stream / "chunks.m3u8"
    lines = playlist.read_text(encoding="utf-8").splitlines()
    segments = []
    pending_duration = None
    for line in lines:
        if match := re.match(r"#EXTINF:([0-9.]+)", line):
            pending_duration = float(match.group(1))
        elif line and not line.startswith("#"):
            if pending_duration is None:
                raise ValueError(f"{playlist}: segment without EXTINF duration")
            segments.append((stream / "segments" / line, pending_duration))
            pending_duration = None
    duration = sum(segment_duration for _, segment_duration in segments)
    missing = [path for path, _ in segments if not path.is_file()]
    if missing:
        raise FileNotFoundError(f"{stream.name}: {len(missing)} HLS segments missing")
    return segments, duration


def ensure_carrier(
    stream: Path,
    part_number: int,
    segments: list[tuple[Path, float]],
) -> tuple[Path, float, int]:
    duration = sum(segment_duration for _, segment_duration in segments)
    carrier_dir = OUTPUT_ROOT / "carriers"
    carrier_dir.mkdir(parents=True, exist_ok=True)
    carrier = carrier_dir / (
        f"{stream.parent.name}-{stream.name}-part-{part_number:02d}.ts"
    )
    expected_size = sum(path.stat().st_size for path, _ in segments)
    if not carrier.exists() or carrier.stat().st_size != expected_size:
        temporary = carrier.with_suffix(".ts.partial")
        with temporary.open("wb") as output:
            for segment, _ in segments:
                with segment.open("rb") as source:
                    for block in iter(lambda: source.read(1024 * 1024), b""):
                        output.write(block)
        temporary.replace(carrier)
    return carrier, duration, len(segments)


def transcribe_part(
    model: WhisperModel,
    stream: Path,
    part_number: int,
    segments: list[tuple[Path, float]],
) -> dict:
    stream_dir = OUTPUT_ROOT / "streams"
    stream_dir.mkdir(parents=True, exist_ok=True)
    output = stream_dir / (
        f"{stream.parent.name}-{stream.name}-part-{part_number:02d}.json"
    )
    if output.exists():
        return load_checkpoint(output)

    carrier, playlist_duration, segment_count = ensure_carrier(
        stream, part_number, segments
    )
    print(
        f"{stream.parent.name}/{stream.name}/part-{part_number:02d}: "
        f"{playlist_duration / 60:.1f} minutes, {segment_count} HLS segments",
        flush=True,
    )
    segments, info = model.transcribe(
        str(carrier),
        language="fa",
        beam_size=5,
        vad_filter=True,
        vad_parameters={"min_silence_duration_ms": 1000},
        word_timestamps=False,
        condition_on_previous_text=True,
        log_progress=True,
    )
    records = []
    for segment in segments:
        records.append(
            {
                "start": round(segment.start, 3),
                "end": round(segment.end, 3),
                "text": segment.text.strip(),
                "avgLogProbability": round(segment.avg_logprob, 6),
                "noSpeechProbability": round(segment.no_speech_prob, 6),
                "compressionRatio": round(segment.compression_ratio, 6),
            }
        )
    record = {
        "tape": stream.parent.name,
        "stream": stream.name,
        "part": part_number,
        "sourcePlaylist": str((stream / "chunks.m3u8").relative_to(ROOT)),
        "carrier": str(carrier.relative_to(ROOT)),
        "carrierSha256": sha256(carrier),
        "playlistDurationSeconds": round(playlist_duration, 3),
        "decodedDurationSeconds": round(info.duration, 3),
        "language": info.language,
        "languageProbability": round(info.language_probability, 6),
        "model": MODEL_NAME,
        "modelRepository": MODEL_REPOSITORY,
        "modelRevision": model_revision(),
        "device": "cpu",
        "computeType": "int8",
        "beamSize": 5,
        "vad": {"enabled": True, "minSilenceDurationMs": 1000},
        "segments": records,
        "completedAt": datetime.now(timezone.utc).isoformat(),
    }
    output.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return record


def transcribe_stream(
    model: WhisperModel,
    stream: Path,
    remaining_parts: list[int] | None,
) -> dict | None:
    stream_dir = OUTPUT_ROOT / "streams"
    stream_dir.mkdir(parents=True, exist_ok=True)
    output = stream_dir / f"{stream.parent.name}-{stream.name}.json"
    if output.exists():
        return load_checkpoint(output)

    segments, playlist_duration = playlist_segments(stream)
    parts = []
    for index, start in enumerate(range(0, len(segments), 30)):
        part_output = stream_dir / (
            f"{stream.parent.name}-{stream.name}-part-{index + 1:02d}.json"
        )
        if not part_output.exists() and remaining_parts is not None:
            if remaining_parts[0] == 0:
                return None
            remaining_parts[0] -= 1
        parts.append(
            transcribe_part(model, stream, index + 1, segments[start : start + 30])
        )
    offset = 0.0
    records = []
    for part in parts:
        for segment in part["segments"]:
            records.append(
                {
                    **segment,
                    "start": round(segment["start"] + offset, 3),
                    "end": round(segment["end"] + offset, 3),
                    "part": part["part"],
                }
            )
        offset += part["playlistDurationSeconds"]
    record = {
        "tape": stream.parent.name,
        "stream": stream.name,
        "sourcePlaylist": str((stream / "chunks.m3u8").relative_to(ROOT)),
        "playlistDurationSeconds": round(playlist_duration, 3),
        "language": "fa",
        "model": MODEL_NAME,
        "modelRepository": MODEL_REPOSITORY,
        "modelRevision": model_revision(),
        "device": "cpu",
        "computeType": "int8",
        "beamSize": 5,
        "vad": {"enabled": True, "minSilenceDurationMs": 1000},
        "parts": len(parts),
        "segments": records,
        "completedAt": datetime.now(timezone.utc).isoformat(),
    }
    output.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return record


def stream_directories(tape: Path) -> list[Path]:
    candidates = []
    for stream in sorted(tape.glob("stream-*")):
        playlist = stream / "chunks.m3u8"
        if not playlist.exists():
            continue
        segments, _ = playlist_segments(stream)
        if len(segments) > 1:
            candidates.append(stream)
    return candidates


def combine_tape(tape: Path, streams: list[dict]) -> dict:
    offset = 0.0
    records = []
    for stream in streams:
        for segment in stream["segments"]:
            records.append(
                {
                    **segment,
                    "start": round(segment["start"] + offset, 3),
                    "end": round(segment["end"] + offset, 3),
                    "stream": stream["stream"],
                }
            )
        offset += stream["playlistDurationSeconds"]
    return {
        "tape": tape.name,
        "durationSeconds": round(offset, 3),
        "streams": [stream["stream"] for stream in streams],
        "segments": records,
    }


def timestamp(seconds: float) -> str:
    total = int(seconds)
    return f"{total // 3600:02d}:{(total % 3600) // 60:02d}:{total % 60:02d}"


def write_combined(tapes: list[dict]) -> None:
    combined_json = OUTPUT_ROOT / "qashqai-discovery-transcript.json"
    combined_text = OUTPUT_ROOT / "qashqai-discovery-transcript.txt"
    combined = {
        "sourceId": "SUP-061",
        "interviewee": "Mohammad Nasser Ghashghaie (Mohammad Nasser Qashqai)",
        "status": "machine-generated discovery transcript; not quotation-ready",
        "language": "fa",
        "model": MODEL_NAME,
        "modelRepository": MODEL_REPOSITORY,
        "modelRevision": model_revision(),
        "tapes": tapes,
    }
    combined_json.write_text(
        json.dumps(combined, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    lines = [
        "# Mohammad Nasser Qashqai — machine discovery transcript",
        "",
        "Not quotation-ready. Verify every passage against the Harvard audio.",
        "",
    ]
    for tape in tapes:
        lines.extend([f"## {tape['tape']}", ""])
        lines.extend(
            f"[{timestamp(segment['start'])}–{timestamp(segment['end'])}] {segment['text']}"
            for segment in tape["segments"]
            if segment["text"]
        )
        lines.append("")
    combined_text.write_text("\n".join(lines), encoding="utf-8")
    metadata = {
        "sourceId": "SUP-061",
        "outputJson": str(combined_json.relative_to(ROOT)),
        "outputText": str(combined_text.relative_to(ROOT)),
        "jsonSha256": sha256(combined_json),
        "textSha256": sha256(combined_text),
        "tapes": len(tapes),
        "durationSeconds": round(sum(tape["durationSeconds"] for tape in tapes), 3),
        "model": MODEL_NAME,
        "modelRepository": MODEL_REPOSITORY,
        "modelRevision": model_revision(),
        "fasterWhisper": __import__("faster_whisper").__version__,
        "completedAt": datetime.now(timezone.utc).isoformat(),
        "evidentiaryStatus": "discovery only; audio verification required",
    }
    (OUTPUT_ROOT / "qashqai-discovery-transcript.processing.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def write_derivative_catalog() -> None:
    processing = json.loads(
        (OUTPUT_ROOT / "qashqai-discovery-transcript.processing.json").read_text(
            encoding="utf-8"
        )
    )
    catalog = {
        "version": 1,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "entries": [
            {
                **processing,
                "sourceCarrier": str(AUDIO_ROOT.relative_to(ROOT)),
                "language": "fa",
                "status": "machine-generated discovery transcript; not quotation-ready",
            }
        ],
    }
    CATALOG_PATH.write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--tapes",
        default="1,2,3,4,5,6,7",
        help="Comma-separated tape numbers; completed stream checkpoints are reused.",
    )
    parser.add_argument(
        "--max-new-parts",
        type=int,
        default=None,
        help="Stop successfully after this many new five-minute checkpoints.",
    )
    parser.add_argument(
        "--cpu-threads",
        type=int,
        default=8,
        help="CPU threads assigned to CTranslate2 (default: 8).",
    )
    args = parser.parse_args()
    tape_names = [f"tape-{int(value):02d}" for value in args.tapes.split(",")]
    if args.max_new_parts is not None and args.max_new_parts < 1:
        parser.error("--max-new-parts must be positive")
    if args.cpu_threads < 1:
        parser.error("--cpu-threads must be positive")
    remaining_parts = (
        None if args.max_new_parts is None else [args.max_new_parts]
    )
    MODEL_ROOT.mkdir(parents=True, exist_ok=True)
    os.environ["OMP_NUM_THREADS"] = str(args.cpu_threads)
    model = WhisperModel(
        MODEL_NAME,
        device="cpu",
        compute_type="int8",
        cpu_threads=args.cpu_threads,
        download_root=str(MODEL_ROOT),
    )
    tapes = []
    for tape_name in tape_names:
        tape = AUDIO_ROOT / tape_name
        streams = []
        for stream in stream_directories(tape):
            record = transcribe_stream(model, stream, remaining_parts)
            if record is None:
                print("bounded transcription checkpoint complete", flush=True)
                return
            streams.append(record)
        tapes.append(combine_tape(tape, streams))
        write_combined(tapes)
        print(f"{tape_name}: checkpointed", flush=True)
    write_combined(tapes)
    if tape_names == [f"tape-{number:02d}" for number in range(1, 8)]:
        write_derivative_catalog()


if __name__ == "__main__":
    main()
