#!/usr/bin/env python3
"""Remove invalid optional PDF page boxes from a temporary processing copy."""

from __future__ import annotations

import argparse
from pathlib import Path

import pikepdf


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with pikepdf.open(args.source) as document:
        for page in document.pages:
            media_box = page.obj.MediaBox
            page.obj.CropBox = media_box
            for name in ("/ArtBox", "/BleedBox", "/TrimBox"):
                if name in page.obj:
                    del page.obj[name]
        document.save(args.output)


if __name__ == "__main__":
    main()
