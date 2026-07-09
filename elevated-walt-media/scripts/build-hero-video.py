#!/usr/bin/env python3
"""Extract hero clip frames, enhance each, restitch for landing page."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from hero_enhance import enhance_frame  # noqa: E402
FFMPEG = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffmpeg.exe"
DEFAULT_SOURCE = Path.home() / "Downloads" / "1735057741252.MOV"
DEFAULT_OUT = ROOT / "assets" / "video" / "hero-aerial.mp4"
BUILD_DIR = ROOT / "assets" / "video" / "_hero-build"

# 2560-wide keeps detail on retina without an oversized Pages payload.
OUTPUT_WIDTH = 2560
FPS = 60
CRF = 15


def run(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or proc.stdout.strip() or "ffmpeg failed")


def extract_frames(source: Path, raw_dir: Path) -> int:
    raw_dir.mkdir(parents=True, exist_ok=True)
    pattern = str(raw_dir / "frame_%05d.png")
    vf = f"scale={OUTPUT_WIDTH}:-2:flags=lanczos,fps={FPS}"
    run(
        [
            str(FFMPEG),
            "-y",
            "-i",
            str(source),
            "-an",
            "-vf",
            vf,
            "-pix_fmt",
            "rgb24",
            pattern,
        ]
    )
    frames = sorted(raw_dir.glob("frame_*.png"))
    if not frames:
        raise RuntimeError("No frames extracted")
    return len(frames)


def enhance_frames(raw_dir: Path, enhanced_dir: Path) -> int:
    enhanced_dir.mkdir(parents=True, exist_ok=True)
    frames = sorted(raw_dir.glob("frame_*.png"))
    total = len(frames)
    for i, src in enumerate(frames, 1):
        dest = enhanced_dir / src.name
        with Image.open(src) as img:
            enhance_frame(img).save(dest, "PNG", compress_level=1)
        if i % 30 == 0 or i == total:
            print(f"  enhanced {i}/{total}", flush=True)
    return total


def stitch(enhanced_dir: Path, out_path: Path, frame_count: int) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pattern = str(enhanced_dir / "frame_%05d.png")
    run(
        [
            str(FFMPEG),
            "-y",
            "-framerate",
            str(FPS),
            "-i",
            pattern,
            "-frames:v",
            str(frame_count),
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "slow",
            "-crf",
            str(CRF),
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            "-g",
            "10",
            "-keyint_min",
            "10",
            "-sc_threshold",
            "0",
            str(out_path),
        ]
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Build enhanced hero aerial video")
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    parser.add_argument("--keep-temp", action="store_true")
    args = parser.parse_args()

    if not FFMPEG.exists():
        print("ffmpeg not found in _tools", file=sys.stderr)
        return 1
    if not args.source.exists():
        print(f"Source not found: {args.source}", file=sys.stderr)
        return 1

    raw_dir = BUILD_DIR / "raw"
    enhanced_dir = BUILD_DIR / "enhanced"

    if BUILD_DIR.exists():
        shutil.rmtree(BUILD_DIR)
    BUILD_DIR.mkdir(parents=True)

    print(f"Source: {args.source}")
    print(f"Extracting {OUTPUT_WIDTH}px frames @ {FPS}fps...")
    count = extract_frames(args.source, raw_dir)
    print(f"Enhancing {count} frames...")
    enhance_frames(raw_dir, enhanced_dir)
    print("Encoding hero-aerial.mp4...")
    stitch(enhanced_dir, args.out, count)

    size_mb = args.out.stat().st_size / (1024 * 1024)
    print(f"Done: {args.out} ({size_mb:.1f} MB)")

    if not args.keep_temp:
        shutil.rmtree(raw_dir, ignore_errors=True)
        shutil.rmtree(enhanced_dir, ignore_errors=True)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
