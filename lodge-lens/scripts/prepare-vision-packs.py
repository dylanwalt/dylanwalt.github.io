#!/usr/bin/env python3
"""Generate vision thumbnails and session sample packs for Safari Plains media."""

from __future__ import annotations

import json
import sys
from datetime import datetime, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from media_utils import make_thumbnail, safe_id

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
RAW = ROOT / "assets" / "media" / "safari-plains" / "raw"
CACHE = ROOT / "assets" / "media" / "safari-plains" / "_vision-cache"
PACKS = ROOT / "assets" / "media" / "safari-plains" / "_vision-packs"
FFMPEG = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffmpeg.exe"

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp"}
VIDEO_EXT = {".mov", ".mp4", ".m4v"}


def thumb_path(item_id: str) -> Path:
    return CACHE / f"{safe_id(item_id)}.jpg"


def parse_dt(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        return None


def cluster_sessions(items: list[dict], gap_minutes: int = 75) -> list[dict]:
    iphone = [i for i in items if i.get("source_device") == "iphone" and i.get("captured_at")]
    iphone.sort(key=lambda x: x["captured_at"])
    sessions: list[dict] = []
    if not iphone:
        return sessions

    current = [iphone[0]]
    for item in iphone[1:]:
        prev = parse_dt(current[-1]["captured_at"])
        cur = parse_dt(item["captured_at"])
        if prev and cur and cur - prev > timedelta(minutes=gap_minutes):
            sessions.append(build_session(len(sessions) + 1, current))
            current = [item]
        else:
            current.append(item)
    sessions.append(build_session(len(sessions) + 1, current))

    drone = [i for i in items if i.get("source_device") == "drone"]
    if drone:
        sessions.append(
            {
                "session_id": "drone",
                "label": "DJI drone clips",
                "start": min((d["captured_at"] for d in drone if d.get("captured_at")), default=None),
                "end": max((d["captured_at"] for d in drone if d.get("captured_at")), default=None),
                "file_count": len(drone),
                "item_ids": [d["id"] for d in drone],
            }
        )

    other = [i for i in items if i.get("source_device") not in ("iphone", "drone")]
    if other:
        sessions.append(
            {
                "session_id": "other",
                "label": "Other / unknown device",
                "start": None,
                "end": None,
                "file_count": len(other),
                "item_ids": [d["id"] for d in other],
            }
        )
    return sessions


def build_session(num: int, files: list[dict]) -> dict:
    return {
        "session_id": f"session-{num:02d}",
        "label": f"iPhone session {num}",
        "start": files[0].get("captured_at"),
        "end": files[-1].get("captured_at"),
        "file_count": len(files),
        "item_ids": [f["id"] for f in files],
    }


def pick_samples(session_items: list[dict], max_samples: int = 6) -> list[dict]:
    if len(session_items) <= max_samples:
        return session_items
    step = max(1, len(session_items) // max_samples)
    picks = session_items[::step][:max_samples]
    # always include first and last
    by_id = {i["id"]: i for i in session_items}
    ordered_ids = [i["id"] for i in session_items]
    for idx in (0, -1):
        fid = ordered_ids[idx]
        if fid not in {p["id"] for p in picks}:
            picks.append(by_id[fid])
    return picks[: max_samples + 2]


def main() -> None:
    if not MANIFEST.exists():
        raise SystemExit("Run catalog-safari-media.py first")

    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    items = [f for bucket in data["buckets"].values() for f in bucket]
    by_id = {i["id"]: i for i in items}

    rebuild = "--rebuild-thumbs" in sys.argv
    CACHE.mkdir(parents=True, exist_ok=True)
    PACKS.mkdir(parents=True, exist_ok=True)

    made = 0
    for item in items:
        src = RAW / Path(item["rel_path"])
        dest = thumb_path(item["id"])
        if rebuild and dest.exists():
            dest.unlink()
        if dest.exists() or not src.exists():
            if dest.exists():
                item["thumb"] = str(dest.relative_to(ROOT)).replace("\\", "/")
            continue
        if make_thumbnail(src, dest):
            item["thumb"] = str(dest.relative_to(ROOT)).replace("\\", "/")
            made += 1

    sessions = cluster_sessions(items)

    # large sessions -> sub-sessions (30 min gap)
    expanded: list[dict] = []
    for sess in sessions:
        if not sess["session_id"].startswith("session-"):
            expanded.append(sess)
            continue
        sess_items = [by_id[i] for i in sess["item_ids"] if i in by_id]
        if len(sess_items) < 40:
            expanded.append(sess)
            continue
        sub = cluster_subsessions(sess, sess_items, gap_minutes=30)
        expanded.extend(sub)

    pack_manifest = []
    for sess in expanded:
        sess_items = [by_id[i] for i in sess["item_ids"] if i in by_id]
        samples = pick_samples(sess_items)
        pack_dir = PACKS / sess["session_id"]
        pack_dir.mkdir(parents=True, exist_ok=True)
        sample_entries = []
        for s in samples:
            thumb = thumb_path(s["id"])
            if not thumb.exists():
                src = RAW / Path(s["rel_path"])
                make_thumbnail(src, thumb)
            pack_thumb = pack_dir / f"{s['id'][:48]}.jpg"
            if thumb.exists() and not pack_thumb.exists():
                pack_thumb.write_bytes(thumb.read_bytes())
            sample_entries.append(
                {
                    "id": s["id"],
                    "filename": s["filename"],
                    "kind": s["kind"],
                    "captured_at": s.get("captured_at"),
                    "thumb": str(pack_thumb.relative_to(ROOT)).replace("\\", "/"),
                }
            )
        pack_manifest.append({**sess, "samples": sample_entries})

    out = {
        "generated_at": datetime.now().isoformat(),
        "thumbnails_created": made,
        "sessions": pack_manifest,
    }
    (PACKS / "session-packs.json").write_text(json.dumps(out, indent=2), encoding="utf-8")
    print(json.dumps({"sessions": len(pack_manifest), "thumbnails_created": made}, indent=2))


def cluster_subsessions(parent: dict, items: list[dict], gap_minutes: int) -> list[dict]:
    items.sort(key=lambda x: x.get("captured_at") or "")
    groups: list[list[dict]] = []
    current: list[dict] = []
    for item in items:
        if not current:
            current = [item]
            continue
        prev = parse_dt(current[-1].get("captured_at"))
        cur = parse_dt(item.get("captured_at"))
        if prev and cur and cur - prev > timedelta(minutes=gap_minutes):
            groups.append(current)
            current = [item]
        else:
            current.append(item)
    if current:
        groups.append(current)

    if len(groups) <= 1:
        return [parent]

    result = []
    base = parent["session_id"]
    for idx, group in enumerate(groups, 1):
        result.append(
            {
                "session_id": f"{base}-{idx}",
                "label": f"{parent['label']} part {idx}",
                "start": group[0].get("captured_at"),
                "end": group[-1].get("captured_at"),
                "file_count": len(group),
                "item_ids": [g["id"] for g in group],
            }
        )
    return result


if __name__ == "__main__":
    main()
