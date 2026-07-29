#!/usr/bin/env python3
"""Prepare a large scan for fast OCR while preserving the archived image."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--max-height", type=int, default=2600)
    args = parser.parse_args()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(args.source) as image:
        target_width = round(image.width * args.max_height / image.height)
        image.draft("L", (target_width, args.max_height))
        prepared = ImageOps.autocontrast(ImageOps.grayscale(image))
        if prepared.height > args.max_height:
            width = round(prepared.width * args.max_height / prepared.height)
            prepared = prepared.resize((width, args.max_height), Image.Resampling.BILINEAR)
        prepared.save(args.output, format="JPEG", quality=88)


if __name__ == "__main__":
    main()
