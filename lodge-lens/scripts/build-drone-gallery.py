#!/usr/bin/env python3
"""Build numbered drone-only web gallery for Safari Plains."""

from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from media_utils import safe_id  # noqa: E402

ANALYSIS = ROOT / "assets" / "media" / "safari-plains" / "drone-analysis.json"
MANIFEST = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
ASSIGNMENTS = ROOT / "config" / "safari-drone-assignments.json"
RAW = ROOT / "assets" / "media" / "safari-plains" / "raw"
OUT = ROOT / "assets" / "media" / "safari-plains" / "drone-gallery"
FFMPEG = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffmpeg.exe"


def flatten_manifest(manifest: dict) -> dict[str, dict]:
    by_id: dict[str, dict] = {}
    for files in manifest.get("buckets", {}).values():
        for item in files:
            by_id[item["id"]] = item
    return by_id


def find_source(clip: dict, by_id: dict[str, dict]) -> Path | None:
    item = by_id.get(clip["id"])
    if item:
        candidate = RAW / Path(item["rel_path"])
        if candidate.exists():
            return candidate
    # Filename on disk may use narrow no-break spaces; search by stem prefix.
    stem = Path(clip.get("filename", "")).stem[:24]
    if not stem:
        return None
    for path in RAW.rglob("*.mp4"):
        if stem.lower() in path.name.lower():
            return path
    for path in RAW.rglob("*.MP4"):
        if stem.lower() in path.name.lower():
            return path
    return None


def transcode(src: Path, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        str(FFMPEG),
        "-y",
        "-i",
        str(src),
        "-an",
        "-vf",
        "scale=1280:-2",
        "-c:v",
        "libx264",
        "-profile:v",
        "baseline",
        "-level",
        "3.0",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-preset",
        "fast",
        "-crf",
        "23",
        str(dest),
    ]
    try:
        subprocess.run(cmd, capture_output=True, check=True, timeout=600)
        return dest.exists() and dest.stat().st_size > 0
    except Exception as exc:
        print(f"  transcode fail: {exc}", file=sys.stderr)
        return False


def poster(src: Path, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        str(FFMPEG),
        "-y",
        "-ss",
        "2",
        "-i",
        str(src),
        "-frames:v",
        "1",
        "-q:v",
        "3",
        str(dest),
    ]
    try:
        subprocess.run(cmd, capture_output=True, check=True, timeout=120)
        return dest.exists()
    except Exception:
        return False


def main() -> int:
    if not ANALYSIS.exists() or not RAW.exists() or not FFMPEG.exists():
        print("Missing drone analysis, raw media, or ffmpeg", file=sys.stderr)
        return 1

    analysis = json.loads(ANALYSIS.read_text(encoding="utf-8"))
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    assignments = json.loads(ASSIGNMENTS.read_text(encoding="utf-8"))
    by_id = flatten_manifest(manifest)
    exclude = set(assignments.get("exclude_tiers", ["rough"]))

    clips = [c for c in analysis["clips"] if c.get("tier") not in exclude]
    clips.sort(key=lambda c: c.get("captured_at") or "")

    if OUT.exists():
        import shutil

        shutil.rmtree(OUT)
    (OUT / "videos").mkdir(parents=True)
    (OUT / "posters").mkdir(parents=True)

    numbered: list[dict] = []
    for i, clip in enumerate(clips, 1):
        num = f"{i:02d}"
        src = find_source(clip, by_id)
        if not src:
            print(f"  skip Drone {num}: source not found", flush=True)
            continue

        video_name = f"drone-{num}.mp4"
        poster_name = f"drone-{num}.jpg"
        video_path = OUT / "videos" / video_name
        poster_path = OUT / "posters" / poster_name

        print(f"Drone {num}: {clip.get('subject', 'clip')}...", flush=True)
        if not transcode(src, video_path):
            continue
        if not poster(src, poster_path):
            poster_rel = None
        else:
            poster_rel = f"posters/{poster_name}"

        event = None
        for key, meta in assignments["events"].items():
            if i in meta.get("clips", []):
                event = key
                break

        numbered.append(
            {
                "number": i,
                "label": f"Drone {num}",
                "id": clip["id"],
                "event": event or "unassigned",
                "tier": clip.get("tier"),
                "subject": clip.get("subject"),
                "summary": clip.get("summary"),
                "duration_sec": clip.get("duration_sec"),
                "captured_at": clip.get("captured_at"),
                "video": f"videos/{video_name}",
                "poster": poster_rel,
                "hero_notes": clip.get("hero_notes"),
            }
        )

    events_ui = {
        key: {"label": meta["label"], "description": meta.get("description", "")}
        for key, meta in assignments["events"].items()
    }

    payload = {
        "generated_at": datetime.now().isoformat(),
        "clip_count": len(numbered),
        "events": events_ui,
        "clips": numbered,
    }
    (OUT / "drone-gallery-index.json").write_text(
        json.dumps(payload, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Done: {len(numbered)} drone clips in {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
