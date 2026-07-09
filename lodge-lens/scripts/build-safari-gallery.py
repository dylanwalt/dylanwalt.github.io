#!/usr/bin/env python3
"""Build web gallery assets for Safari Plains lodge page."""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from PIL import Image

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from media_utils import make_thumbnail, safe_id  # noqa: E402

MANIFEST = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
DRONE_ANALYSIS = ROOT / "assets" / "media" / "safari-plains" / "drone-analysis.json"
RAW = ROOT / "assets" / "media" / "safari-plains" / "raw"
VISION = ROOT / "assets" / "media" / "safari-plains" / "_vision-cache"
OUT = ROOT / "assets" / "media" / "safari-plains" / "gallery"
THUMBS = OUT / "thumbs"
PREVIEWS = OUT / "previews"
FFMPEG = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffmpeg.exe"

EXCLUDE_CATEGORIES = {"provisioning-travel", "behind-scenes-bts"}
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp"}
VIDEO_EXT = {".mov", ".mp4", ".m4v"}

BUCKET_UI = {
    "general": {
        "tab": "Aerial & Wildlife",
        "description": "Drone overviews, game drives, lodge and reserve footage.",
    },
    "events-picnic": {
        "tab": "Picnic & Bush dining",
        "description": "Outdoor dining, sundowners, breakfast and bush experiences.",
    },
    "events-wine-1": {
        "tab": "Wine tasting - Deck",
        "description": "Savanna-view deck tastings and wine service.",
    },
    "events-wine-2": {
        "tab": "Wine tasting - Cabana",
        "description": "Cabana and pool-area wine experience.",
    },
    "unclassified": {
        "tab": "Review",
        "description": "Items awaiting manual classification.",
    },
}


def load_drone_tiers() -> dict[str, str]:
    if not DRONE_ANALYSIS.exists():
        return {}
    data = json.loads(DRONE_ANALYSIS.read_text(encoding="utf-8"))
    return {c["id"]: c.get("tier") for c in data.get("clips", [])}


def session_map(manifest: dict) -> dict[str, str]:
    return {s["session_id"]: s.get("description", "") for s in manifest.get("session_labels", [])}


def is_playable(item: dict) -> bool:
    dk = item.get("display_kind") or item.get("kind")
    return item.get("kind") == "video" or dk == "live-photo" or item.get("is_live_clip")


def thumb_path(item_id: str) -> Path:
    return THUMBS / f"{safe_id(item_id)}.jpg"


def preview_path(item_id: str) -> Path:
    return PREVIEWS / f"{safe_id(item_id)}.mp4"


def copy_or_make_thumb(src: Path, dest: Path, item: dict) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    cache = VISION / f"{item['id']}.jpg"
    if cache.exists():
        shutil.copy2(cache, dest)
        return True
    if not src.exists():
        return False
    return make_thumbnail(src, dest)


def make_preview(src: Path, dest: Path, item: dict) -> bool:
    if not FFMPEG.exists() or not src.exists():
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    dur = item.get("duration_sec") or 4
    scale = "960:-2" if item.get("kind") == "video" else "720:-2"
    crf = "26" if item.get("kind") == "video" else "28"
    cmd = [
        str(FFMPEG),
        "-y",
        "-i",
        str(src),
        "-an",
        "-vf",
        f"scale={scale}",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        crf,
        "-movflags",
        "+faststart",
        "-t",
        str(min(float(dur), 30)),
        str(dest),
    ]
    try:
        subprocess.run(cmd, capture_output=True, check=True, timeout=180)
        return dest.exists() and dest.stat().st_size > 0
    except Exception:
        return False


def main() -> int:
    if not MANIFEST.exists():
        print("manifest.json missing", file=sys.stderr)
        return 1
    if not RAW.exists():
        print("raw media missing", file=sys.stderr)
        return 1

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    tiers = load_drone_tiers()
    sessions = session_map(manifest)

    if OUT.exists():
        shutil.rmtree(OUT)
    THUMBS.mkdir(parents=True)
    PREVIEWS.mkdir(parents=True)

    items_out: list[dict] = []
    thumb_ok = preview_ok = 0
    total = 0

    for bucket, files in manifest.get("buckets", {}).items():
        for item in files:
            cat = item.get("visual_category", "unclassified")
            if cat in EXCLUDE_CATEGORIES:
                continue
            total += 1
            src = RAW / Path(item["rel_path"])
            tid = item["id"]
            tdest = thumb_path(tid)

            if copy_or_make_thumb(src, tdest, item):
                thumb_ok += 1

            preview_rel = None
            if is_playable(item):
                pdest = preview_path(tid)
                if make_preview(src, pdest, item):
                    preview_ok += 1
                    preview_rel = f"previews/{pdest.name}"

            dk = item.get("display_kind") or item.get("kind")
            sid = item.get("vision_session")
            items_out.append(
                {
                    "id": tid,
                    "filename": item.get("filename"),
                    "bucket": item.get("bucket", bucket),
                    "kind": item.get("kind"),
                    "display_kind": dk,
                    "media_family": item.get("media_family", "other"),
                    "visual_category": cat,
                    "session_id": sid,
                    "session_label": sessions.get(sid, "") if sid else "",
                    "captured_at": item.get("captured_at"),
                    "duration_sec": item.get("duration_sec"),
                    "drone_tier": tiers.get(tid),
                    "thumb": f"thumbs/{tdest.name}" if tdest.exists() else None,
                    "preview": preview_rel,
                }
            )
            if total % 40 == 0:
                print(f"  processed {total}...", flush=True)

    payload = {
        "generated_at": datetime.now().isoformat(),
        "total": len(items_out),
        "buckets": BUCKET_UI,
        "items": items_out,
    }
    (OUT / "gallery-index.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Gallery: {len(items_out)} items, {thumb_ok} thumbs, {preview_ok} previews")
    print(f"Wrote {OUT / 'gallery-index.json'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
