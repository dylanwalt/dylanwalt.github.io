#!/usr/bin/env python3
"""Extract review thumbnails from Safari Plains media for visual classification."""

from __future__ import annotations

import json
import random
import subprocess
import sys
from pathlib import Path

from PIL import Image

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
RAW = ROOT / "assets" / "media" / "safari-plains" / "raw"
OUT = ROOT / "assets" / "media" / "safari-plains" / "_review-samples"
FFMPEG = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffmpeg.exe"

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp"}
VIDEO_EXT = {".mov", ".mp4", ".m4v"}
SAMPLES_PER_BUCKET = 8


def to_jpg(src: Path, dest: Path, max_side: int = 1280) -> bool:
    try:
        with Image.open(src) as img:
            img = img.convert("RGB")
            w, h = img.size
            scale = min(1.0, max_side / max(w, h))
            if scale < 1:
                img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
            dest.parent.mkdir(parents=True, exist_ok=True)
            img.save(dest, "JPEG", quality=85)
        return True
    except Exception as exc:
        print(f"  image fail {src.name}: {exc}", file=sys.stderr)
        return False


def video_frame(src: Path, dest: Path, t: str = "00:00:02") -> bool:
    if not FFMPEG.exists():
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        str(FFMPEG),
        "-y",
        "-ss",
        t,
        "-i",
        str(src),
        "-frames:v",
        "1",
        "-q:v",
        "2",
        str(dest),
    ]
    try:
        subprocess.run(cmd, capture_output=True, check=True, timeout=90)
        return dest.exists()
    except Exception as exc:
        print(f"  video fail {src.name}: {exc}", file=sys.stderr)
        return False


def main() -> None:
    if not MANIFEST.exists():
        raise SystemExit("Run catalog-safari-media.py first")

    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    index: list[dict] = []

    if OUT.exists():
        for p in OUT.rglob("*"):
            if p.is_file():
                p.unlink()

    for bucket, files in data["buckets"].items():
        sample = files if len(files) <= SAMPLES_PER_BUCKET else random.sample(files, SAMPLES_PER_BUCKET)
        for item in sample:
            src = RAW / Path(item["rel_path"])
            if not src.exists():
                continue
            safe = Path(item["id"][:40])
            ext = src.suffix.lower()
            out_base = OUT / bucket / safe

            if ext in IMAGE_EXT:
                dest = out_base.with_suffix(".jpg")
                if to_jpg(src, dest):
                    index.append(
                        {
                            "bucket": bucket,
                            "filename": item["filename"],
                            "kind": "photo",
                            "sample": str(dest.relative_to(ROOT)).replace("\\", "/"),
                            "captured_at": item.get("captured_at"),
                            "source_device": item.get("source_device"),
                        }
                    )
            elif ext in VIDEO_EXT:
                dest = out_base.with_suffix(".jpg")
                dur = item.get("duration_sec") or 3
                t_sec = max(1, min(int(dur * 0.35), 15))
                t = f"00:00:{t_sec:02d}"
                if video_frame(src, dest, t):
                    index.append(
                        {
                            "bucket": bucket,
                            "filename": item["filename"],
                            "kind": "video",
                            "sample": str(dest.relative_to(ROOT)).replace("\\", "/"),
                            "captured_at": item.get("captured_at"),
                            "source_device": item.get("source_device"),
                            "duration_sec": dur,
                        }
                    )

    (OUT / "sample-index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    print(f"Generated {len(index)} review samples in {OUT}")


if __name__ == "__main__":
    random.seed(42)
    main()
