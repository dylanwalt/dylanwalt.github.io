#!/usr/bin/env python3
"""Extract multi-frame storyboards from DJI clips for agent video review."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from media_utils import LIVE_PHOTO_MAX_SEC, make_thumbnail, safe_id  # noqa: E402

MANIFEST = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
RAW = ROOT / "assets" / "media" / "safari-plains" / "raw"
OUT_DIR = ROOT / "assets" / "media" / "safari-plains" / "_drone-review"
ANALYSIS_PATH = ROOT / "assets" / "media" / "safari-plains" / "drone-analysis.json"
FFMPEG = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffmpeg.exe"
FFPROBE = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffprobe.exe"

INTERVAL_SAMPLES = 8
SCENE_THRESHOLD = 0.25
MAX_SCENE_FRAMES = 12


def probe_duration(path: Path) -> float | None:
    if not FFPROBE.exists():
        return None
    try:
        cmd = [
            str(FFPROBE),
            "-v",
            "quiet",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ]
        out = subprocess.run(cmd, capture_output=True, text=True, check=True, timeout=60)
        return round(float(out.stdout.strip()), 2)
    except Exception:
        return None


def extract_scene_frames(src: Path, dest_dir: Path, prefix: str) -> list[dict]:
    if not FFMPEG.exists():
        return []
    dest_dir.mkdir(parents=True, exist_ok=True)
    pattern = dest_dir / f"{prefix}_scene_%03d.jpg"
    cmd = [
        str(FFMPEG),
        "-y",
        "-i",
        str(src),
        "-vf",
        f"select='gt(scene,{SCENE_THRESHOLD})',scale='min(1280,iw)':-2",
        "-vsync",
        "vfr",
        "-frames:v",
        str(MAX_SCENE_FRAMES),
        "-q:v",
        "3",
        str(pattern),
    ]
    subprocess.run(cmd, capture_output=True, timeout=300)
    frames = sorted(dest_dir.glob(f"{prefix}_scene_*.jpg"))
    return [
        {
            "type": "scene",
            "index": i,
            "path": str(p.relative_to(ROOT)).replace("\\", "/"),
            "time_sec": None,
        }
        for i, p in enumerate(frames)
    ]


def extract_interval_frames(src: Path, dest_dir: Path, prefix: str, duration: float) -> list[dict]:
    if duration <= 0:
        return []
    dest_dir.mkdir(parents=True, exist_ok=True)
    frames: list[dict] = []
    # Skip first/last 5% to avoid takeoff/landing blur when possible
    start = duration * 0.05
    end = max(duration * 0.95, start + 0.5)
    span = end - start
    count = min(INTERVAL_SAMPLES, max(3, int(duration // 2)))
    for i in range(count):
        t = start + (span * i / max(count - 1, 1))
        out = dest_dir / f"{prefix}_t{i:02d}.jpg"
        if out.exists() or make_thumbnail(src, out, video_seek_sec=t):
            frames.append(
                {
                    "type": "interval",
                    "index": i,
                    "path": str(out.relative_to(ROOT)).replace("\\", "/"),
                    "time_sec": round(t, 2),
                }
            )
    return frames


def main() -> None:
    if not MANIFEST.exists():
        raise SystemExit("Run catalog-safari-media.py first")

    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    items = [f for bucket in data["buckets"].values() for f in bucket]
    drones = [
        i
        for i in items
        if i.get("source_device") == "drone"
        and i.get("kind") == "video"
        and (i.get("duration_sec") or 0) > LIVE_PHOTO_MAX_SEC
    ]

    existing = {}
    if ANALYSIS_PATH.exists():
        try:
            existing = {
                c["id"]: c
                for c in json.loads(ANALYSIS_PATH.read_text(encoding="utf-8")).get("clips", [])
            }
        except Exception:
            pass

    clips = []
    for item in sorted(drones, key=lambda x: x.get("captured_at") or ""):
        src = RAW / Path(item["rel_path"])
        if not src.exists():
            continue
        clip_id = item["id"]
        review_dir = OUT_DIR / safe_id(clip_id)
        duration = item.get("duration_sec") or probe_duration(src) or 0
        prefix = safe_id(clip_id)[:40]

        scene_frames = extract_scene_frames(src, review_dir, prefix)
        interval_frames = extract_interval_frames(src, review_dir, prefix, duration)

        prior = existing.get(clip_id, {})
        clips.append(
            {
                "id": clip_id,
                "filename": item["filename"],
                "rel_path": item["rel_path"],
                "duration_sec": duration,
                "captured_at": item.get("captured_at"),
                "frame_count": len(scene_frames) + len(interval_frames),
                "frames": scene_frames + interval_frames,
                "tier": prior.get("tier", "pending"),
                "subject": prior.get("subject", ""),
                "motion": prior.get("motion", ""),
                "summary": prior.get("summary", ""),
                "hero_notes": prior.get("hero_notes", ""),
                "suggested_uses": prior.get("suggested_uses", []),
            }
        )

    payload = {
        "generated_at": datetime.now().isoformat(),
        "method": "scene-detection + interval sampling (see scripts/DRONE_VIDEO_ANALYSIS.md)",
        "clip_count": len(clips),
        "clips": clips,
    }
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ANALYSIS_PATH.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(json.dumps({"clips": len(clips), "output": str(ANALYSIS_PATH)}, indent=2))


if __name__ == "__main__":
    main()
