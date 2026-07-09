#!/usr/bin/env python3
"""Build scroll-scrub hero as enhanced WebP frame sequence (zero seek latency)."""

from __future__ import annotations

import argparse
import json
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
OUT_DIR = ROOT / "assets" / "video" / "hero-frames"
BUILD_DIR = ROOT / "assets" / "video" / "_hero-build"

OUTPUT_WIDTH = 1920
FPS = 30
WEBP_QUALITY = 86


def run(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or proc.stdout.strip() or "ffmpeg failed")


def extract_raw(source: Path, raw_dir: Path) -> list[Path]:
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
    return frames


def build_webp_sequence(raw_frames: list[Path], out_dir: Path) -> dict:
    out_dir.mkdir(parents=True, exist_ok=True)
    names: list[str] = []
    total_bytes = 0
    width = height = 0

    for i, src in enumerate(raw_frames):
        name = f"frame_{i:05d}.webp"
        dest = out_dir / name
        with Image.open(src) as img:
            enhanced = enhance_frame(img)
            if i == 0:
                width, height = enhanced.size
            enhanced.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
        total_bytes += dest.stat().st_size
        names.append(name)
        if (i + 1) % 30 == 0 or i + 1 == len(raw_frames):
            print(f"  webp {i + 1}/{len(raw_frames)}", flush=True)

    poster = out_dir / "poster.webp"
    shutil.copy2(out_dir / names[0], poster)

    manifest = {
        "version": 1,
        "fps": FPS,
        "duration": round(len(names) / FPS, 3),
        "frameCount": len(names),
        "width": width,
        "height": height,
        "poster": "poster.webp",
        "frames": names,
    }
    (out_dir / "manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )
    print(f"  total size: {total_bytes / (1024 * 1024):.1f} MB ({len(names)} frames)")
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser(description="Build hero WebP frame sequence")
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--out", type=Path, default=OUT_DIR)
    args = parser.parse_args()

    if not FFMPEG.exists():
        print("ffmpeg not found in _tools", file=sys.stderr)
        return 1
    if not args.source.exists():
        print(f"Source not found: {args.source}", file=sys.stderr)
        return 1

    if args.out.exists():
        shutil.rmtree(args.out)
    BUILD_DIR.mkdir(parents=True, exist_ok=True)
    raw_dir = BUILD_DIR / "raw"

    print(f"Source: {args.source}")
    print(f"Extracting {OUTPUT_WIDTH}px @ {FPS}fps...")
    raw_frames = extract_raw(args.source, raw_dir)
    print(f"Enhancing + encoding WebP q{WEBP_QUALITY}...")
    build_webp_sequence(raw_frames, args.out)
    shutil.rmtree(BUILD_DIR, ignore_errors=True)
    print(f"Done: {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
