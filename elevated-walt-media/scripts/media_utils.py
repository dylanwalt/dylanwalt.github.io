#!/usr/bin/env python3
"""Shared media helpers: thumbnails with correct orientation, live-photo rules."""

from __future__ import annotations

import re
import subprocess
from pathlib import Path

from PIL import Image, ImageOps

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parents[1]
FFMPEG = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffmpeg.exe"

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp"}
VIDEO_EXT = {".mov", ".mp4", ".m4v"}
THUMB_MAX = 960
LIVE_PHOTO_MAX_SEC = 4.0


def safe_id(item_id: str) -> str:
    return re.sub(r"[^a-zA-Z0-9_-]+", "-", item_id)[:80]


def is_video_file(ext: str) -> bool:
    return ext.lower() in VIDEO_EXT


def classify_display_kind(ext: str, duration_sec: float | None) -> tuple[str, str]:
    """Return (kind, display_kind) for catalog/editor.

    kind: photo | video (counts and filters)
    display_kind: photo | video | live-photo
    """
    if is_video_file(ext):
        if duration_sec is not None and duration_sec <= LIVE_PHOTO_MAX_SEC:
            return "photo", "live-photo"
        return "video", "video"
    return "photo", "photo"


def media_family(source_device: str) -> str:
    if source_device == "drone":
        return "drone"
    if source_device == "iphone":
        return "phone"
    return "other"


def make_thumbnail(src: Path, dest: Path, video_seek_sec: float = 2.0) -> bool:
    ext = src.suffix.lower()
    try:
        if ext in IMAGE_EXT:
            with Image.open(src) as img:
                img = ImageOps.exif_transpose(img)
                img = img.convert("RGB")
                w, h = img.size
                scale = min(1.0, THUMB_MAX / max(w, h))
                if scale < 1:
                    img = img.resize(
                        (int(w * scale), int(h * scale)), Image.Resampling.LANCZOS
                    )
                dest.parent.mkdir(parents=True, exist_ok=True)
                img.save(dest, "JPEG", quality=82)
            return True

        if ext in VIDEO_EXT and FFMPEG.exists():
            dest.parent.mkdir(parents=True, exist_ok=True)
            # FFmpeg applies display-matrix rotation when re-encoding to JPEG.
            vf = f"scale='min({THUMB_MAX},iw)':-2"
            cmd = [
                str(FFMPEG),
                "-y",
                "-ss",
                str(video_seek_sec),
                "-i",
                str(src),
                "-vf",
                vf,
                "-frames:v",
                "1",
                "-q:v",
                "3",
                str(dest),
            ]
            subprocess.run(cmd, capture_output=True, check=True, timeout=120)
            return dest.exists()
    except Exception:
        return False
    return False
