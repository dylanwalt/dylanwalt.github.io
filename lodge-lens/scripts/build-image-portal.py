#!/usr/bin/env python3
"""Build numbered image portal for Safari Plains (no-people photos)."""

from __future__ import annotations

import json
import re
import shutil
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from media_utils import make_thumbnail, safe_id  # noqa: E402

MANIFEST = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
SESSIONS = ROOT / "assets" / "media" / "safari-plains" / "session-labels.json"
RAW = ROOT / "assets" / "media" / "safari-plains" / "raw"
VISION = ROOT / "assets" / "media" / "safari-plains" / "_vision-cache"
OUT = ROOT / "assets" / "media" / "safari-plains" / "image-portal"
THUMBS = OUT / "thumbs"
FULL = OUT / "full"

# Sessions known to be landscape, wildlife, or empty property shots.
SAFE_SESSIONS = {
    "session-03-2",
    "session-03-3",
    "session-04",
    "session-05-1",
    "session-05-3",
    "session-05-7",
    "session-05-8",
    "session-06",
    "session-07",
    "session-09-3",
    "session-09-5",
    "session-10",
    "session-11",
    "session-13",
    "session-14",
    "drone",
}

PEOPLE_PATTERN = re.compile(
    r"portrait|guests?|people|lounging|breakfast|brunch|dining room|restaurant|"
    r"wine tasting|tasting with|sundowner|drinks on|buffet.*service|open safari vehicle|"
    r"bush coffee stop|iced coffee|tablecloths overlooking|golden-hour deck dining|"
    r"elephant encounter and sunset",
    re.I,
)

EXCLUDE_CATEGORIES = {
    "provisioning-travel",
    "behind-scenes-bts",
    "wine-tasting",
    "bush-outdoor-lifestyle",
    "dining-food",
    "unclassified",
}


def load_sessions() -> dict[str, dict]:
    if not SESSIONS.exists():
        return {}
    rows = json.loads(SESSIONS.read_text(encoding="utf-8"))
    return {r["session_id"]: r for r in rows}


def find_source(rel_path: str) -> Path | None:
    candidate = RAW / Path(rel_path)
    if candidate.exists():
        return candidate
    stem = Path(rel_path).stem[:16]
    for path in RAW.rglob("*"):
        if path.is_file() and stem.lower() in path.name.lower():
            return path
    return None


def likely_no_people(item: dict, sessions: dict[str, dict]) -> bool:
    if item.get("kind") != "photo" or item.get("is_live_clip"):
        return False
    if item.get("display_kind") not in (None, "photo"):
        return False
    if item.get("media_family") == "drone":
        return False

    cat = item.get("visual_category", "unclassified")
    sid = item.get("vision_session") or ""
    session = sessions.get(sid, {})
    desc = session.get("description", "")

    if cat in EXCLUDE_CATEGORIES and sid not in SAFE_SESSIONS:
        return False
    if cat == "lodge-lifestyle" and sid not in SAFE_SESSIONS:
        return False
    if PEOPLE_PATTERN.search(desc):
        return False

    if cat == "wildlife-game-drive":
        return True
    if cat == "lodge-lifestyle" and sid in SAFE_SESSIONS:
        return True
    if sid in SAFE_SESSIONS:
        return True
    return False


def main() -> int:
    if not MANIFEST.exists() or not RAW.exists():
        print("Missing manifest or raw media", file=sys.stderr)
        return 1

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    sessions = load_sessions()

    if OUT.exists():
        shutil.rmtree(OUT)
    THUMBS.mkdir(parents=True)
    FULL.mkdir(parents=True)

    items: list[dict] = []
    for bucket, files in manifest.get("buckets", {}).items():
        for item in files:
            if not likely_no_people(item, sessions):
                continue
            src = find_source(item.get("rel_path", ""))
            if not src:
                continue
            items.append({**item, "bucket": item.get("bucket", bucket), "_src": src})

    items.sort(key=lambda x: x.get("captured_at") or "")

    numbered: list[dict] = []
    for i, item in enumerate(items, 1):
        num = f"{i:03d}"
        thumb_name = f"photo-{num}.jpg"
        full_name = f"photo-{num}.jpg"
        thumb_path = THUMBS / thumb_name
        full_path = FULL / full_name

        cache = VISION / f"{item['id']}.jpg"
        if cache.exists():
            shutil.copy2(cache, thumb_path)
        elif not make_thumbnail(item["_src"], thumb_path):
            continue

        if not make_thumbnail(item["_src"], full_path):
            shutil.copy2(thumb_path, full_path)

        numbered.append(
            {
                "number": i,
                "label": f"Photo {num}",
                "id": item["id"],
                "bucket": item.get("bucket"),
                "category": item.get("visual_category"),
                "captured_at": item.get("captured_at"),
                "thumb": f"thumbs/{thumb_name}",
                "full": f"full/{full_name}",
            }
        )
        print(f"Photo {num}: {item.get('visual_category')} ({item.get('vision_session')})", flush=True)

    payload = {
        "generated_at": datetime.now().isoformat(),
        "count": len(numbered),
        "note": "Landscape, wildlife and property shots with no visible guests. Tell us photo numbers to remove or add.",
        "images": numbered,
    }
    (OUT / "image-portal-index.json").write_text(
        json.dumps(payload, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Done: {len(numbered)} images in {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
