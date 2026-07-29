#!/usr/bin/env python3
"""Split scanned two-page PDF spreads without altering the archived source."""

from __future__ import annotations

import argparse
from pathlib import Path

import pikepdf


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument(
        "--order",
        choices=("right-left", "left-right"),
        default="right-left",
    )
    args = parser.parse_args()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with pikepdf.open(args.source) as source:
        output = pikepdf.Pdf.new()
        for page in source.pages:
            left, bottom, right, top = [float(value) for value in page.mediabox]
            midpoint = left + ((right - left) / 2)
            boxes = (
                [(midpoint, bottom, right, top), (left, bottom, midpoint, top)]
                if args.order == "right-left"
                else [(left, bottom, midpoint, top), (midpoint, bottom, right, top)]
            )
            for box in boxes:
                output.pages.append(page)
                output.pages[-1].mediabox = box
                output.pages[-1].cropbox = box
        output.save(args.output)


if __name__ == "__main__":
    main()
