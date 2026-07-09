#!/usr/bin/env python3
"""Catalog Safari Plains media: metadata extraction, smart bucketing, organize."""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from datetime import datetime, timedelta
from pathlib import Path

try:
    from PIL import Image
    from PIL.ExifTags import TAGS, GPSTAGS
except ImportError:
    print("Install Pillow: pip install pillow pillow-heif", file=sys.stderr)
    raise

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from media_utils import LIVE_PHOTO_MAX_SEC, classify_display_kind, media_family  # noqa: E402

RAW_DIR = ROOT / "assets" / "media" / "safari-plains" / "raw"
ORG_DIR = ROOT / "assets" / "media" / "safari-plains" / "organized"
MANIFEST_PATH = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
SUMMARY_PATH = ROOT / "assets" / "media" / "safari-plains" / "manifest-summary.json"
FFPROBE = ROOT / "_tools" / "ffmpeg" / "ffmpeg-7.1.1-essentials_build" / "bin" / "ffprobe.exe"

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp"}
VIDEO_EXT = {".mov", ".mp4", ".m4v"}

BUCKET_LABELS = {
    "general": "General (aerial and overview)",
    "events-picnic": "Events - Picnic",
    "events-wine-1": "Events - Wine tasting 1",
    "events-wine-2": "Events - Wine tasting 2",
    "unclassified": "Unclassified (needs manual review)",
}


@dataclass
class MediaItem:
    id: str
    filename: str
    rel_path: str
    ext: str
    kind: str
    size_bytes: int
    display_kind: str = "photo"
    media_family: str = "other"
    is_live_clip: bool = False
    captured_at: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    width: int | None = None
    height: int | None = None
    duration_sec: float | None = None
    live_photo_pair: str | None = None
    source_device: str = "unknown"
    bucket: str = "unclassified"
    bucket_reason: str = ""
    exif_camera: str | None = None
    exif_model: str | None = None


def parse_exif_datetime(value) -> datetime | None:
    if not value:
        return None
    if isinstance(value, bytes):
        value = value.decode("utf-8", errors="ignore")
    for fmt in ("%Y:%m:%d %H:%M:%S", "%Y-%m-%d %H:%M:%S"):
        try:
            return datetime.strptime(str(value), fmt)
        except ValueError:
            continue
    return None


def dms_to_decimal(dms, ref) -> float | None:
    try:
        degrees, minutes, seconds = dms
        decimal = float(degrees) + float(minutes) / 60 + float(seconds) / 3600
        if ref in ("S", "W"):
            decimal = -decimal
        return round(decimal, 6)
    except Exception:
        return None


def read_image_meta(path: Path) -> dict:
    meta: dict = {}
    try:
        with Image.open(path) as img:
            meta["width"], meta["height"] = img.size
            exif = img.getexif()
            if not exif:
                return meta
            decoded = {TAGS.get(k, k): v for k, v in exif.items()}
            meta["captured_at"] = parse_exif_datetime(
                decoded.get("DateTimeOriginal") or decoded.get("DateTime")
            )
            meta["exif_model"] = decoded.get("Model")
            meta["exif_camera"] = decoded.get("Make")
            gps = decoded.get("GPSInfo")
            if gps:
                gps_decoded = {GPSTAGS.get(k, k): v for k, v in gps.items()}
                lat = dms_to_decimal(
                    gps_decoded.get("GPSLatitude"),
                    gps_decoded.get("GPSLatitudeRef", "N"),
                )
                lon = dms_to_decimal(
                    gps_decoded.get("GPSLongitude"),
                    gps_decoded.get("GPSLongitudeRef", "E"),
                )
                if lat is not None:
                    meta["latitude"] = lat
                if lon is not None:
                    meta["longitude"] = lon
    except Exception as exc:
        meta["error"] = str(exc)
    return meta


def read_video_meta(path: Path) -> dict:
    meta: dict = {"tags": {}}
    name_lower = path.name.lower()
    if name_lower.startswith("dji_fly") or "dji" in name_lower:
        meta["source_device"] = "drone"
    if not FFPROBE.exists():
        return meta
    try:
        cmd = [
            str(FFPROBE),
            "-v",
            "quiet",
            "-print_format",
            "json",
            "-show_format",
            "-show_streams",
            str(path),
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True, timeout=60)
        data = json.loads(result.stdout)
        fmt = data.get("format", {})
        if "duration" in fmt:
            meta["duration_sec"] = round(float(fmt["duration"]), 2)
        tags = fmt.get("tags", {})
        meta["tags"] = tags
        for key in ("creation_time", "com.apple.quicktime.creationdate"):
            if key in tags:
                raw = tags[key]
                try:
                    meta["captured_at"] = datetime.fromisoformat(
                        raw.replace("Z", "+00:00").split("+")[0]
                    )
                except ValueError:
                    pass
                break
        for stream in data.get("streams", []):
            if stream.get("codec_type") != "video":
                continue
            meta["width"] = stream.get("width")
            meta["height"] = stream.get("height")
            handler = (stream.get("tags") or {}).get("handler_name", "")
            if "CAM" in handler or stream.get("codec_name") == "hevc":
                if meta.get("source_device") != "drone":
                    meta["source_device"] = "drone"
            if "Core Media" in handler:
                meta["source_device"] = "iphone"
            break
    except Exception as exc:
        meta["error"] = str(exc)
    if "captured_at" not in meta:
        meta["captured_at"] = datetime.fromtimestamp(path.stat().st_mtime)
    if meta.get("source_device") == "unknown" and path.suffix.lower() == ".mov":
        meta["source_device"] = "iphone"
    return meta


def img_stem(name: str) -> str | None:
    m = re.match(r"(IMG_\d+)", name, re.I)
    return m.group(1).upper() if m else None


def detect_device(path: Path, kind: str, meta: dict) -> str:
    if meta.get("source_device"):
        return meta["source_device"]
    model = (meta.get("exif_model") or "").upper()
    if "FC" in model or "DJI" in model:
        return "drone"
    if meta.get("exif_camera") == "Apple" or path.suffix.lower() in {".heic", ".mov"}:
        return "iphone"
    if path.name.lower().startswith("dji"):
        return "drone"
    if kind == "video" and (meta.get("width") or 0) >= 3840:
        return "drone"
    return "unknown"


def cluster_iphone_sessions(items: list[MediaItem], gap_minutes: int = 75) -> list[list[MediaItem]]:
    iphone = [i for i in items if i.source_device == "iphone" and i.captured_at]
    iphone.sort(key=lambda x: x.captured_at)
    if not iphone:
        return []
    sessions: list[list[MediaItem]] = []
    current = [iphone[0]]
    for item in iphone[1:]:
        prev = datetime.fromisoformat(current[-1].captured_at)
        cur = datetime.fromisoformat(item.captured_at)
        if cur - prev > timedelta(minutes=gap_minutes):
            sessions.append(current)
            current = [item]
        else:
            current.append(item)
    sessions.append(current)
    return sessions


def assign_buckets(items: list[MediaItem]) -> None:
    by_id = {i.id: i for i in items}

    for item in items:
        if item.source_device == "drone":
            item.bucket = "general"
            item.bucket_reason = "DJI drone footage (dji_fly or 4K aerial)"

    sessions = cluster_iphone_sessions(items)
    sessions.sort(key=len, reverse=True)
    event_map = ["events-picnic", "events-wine-1", "events-wine-2"]

    assigned = 0
    for session in sessions:
        if assigned >= len(event_map):
            break
        if len(session) < 8:
            continue
        label = event_map[assigned]
        start = session[0].captured_at
        for item in session:
            if item.bucket == "unclassified":
                item.bucket = label
                item.bucket_reason = f"iPhone session {assigned + 1} ({len(session)} files) from {start}"
        assigned += 1

    for item in items:
        if item.live_photo_pair and item.live_photo_pair in by_id:
            partner = by_id[item.live_photo_pair]
            if partner.bucket != "unclassified":
                item.bucket = partner.bucket
                item.bucket_reason = f"live photo pair with {partner.filename}"

    for item in items:
        if item.bucket != "unclassified":
            continue
        if item.source_device == "iphone":
            item.bucket = "general"
            item.bucket_reason = "iPhone B-roll not in top event sessions"
        elif item.kind == "photo":
            item.bucket = "general"
            item.bucket_reason = "photo default general"


def organize_files(items: list[MediaItem]) -> int:
    """Link or copy files into organized/<bucket>/ (hardlink when possible)."""
    linked = 0
    for item in items:
        src = RAW_DIR / Path(item.rel_path)
        if not src.exists():
            continue
        dest_dir = ORG_DIR / item.bucket
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / item.filename
        if dest.exists():
            continue
        try:
            os.link(src, dest)
        except (AttributeError, OSError):
            shutil.copy2(src, dest)
        linked += 1
    return linked


def catalog(organize: bool = False) -> dict:
    if not RAW_DIR.exists():
        raise SystemExit(f"Raw media not found: {RAW_DIR}")

    files = [p for p in RAW_DIR.rglob("*") if p.is_file()]
    live_index: dict[str, list[Path]] = defaultdict(list)

    for path in files:
        ext = path.suffix.lower()
        if ext not in IMAGE_EXT | VIDEO_EXT:
            continue
        stem = img_stem(path.name)
        if stem:
            live_index[stem].append(path)

    pair_map: dict[str, str] = {}
    for stem, paths in live_index.items():
        imgs = [p for p in paths if p.suffix.lower() in IMAGE_EXT]
        vids = [p for p in paths if p.suffix.lower() in VIDEO_EXT]
        if len(imgs) == 1 and len(vids) == 1:
            pair_map[imgs[0].name] = vids[0].name
            pair_map[vids[0].name] = imgs[0].name

    items: list[MediaItem] = []
    for path in sorted(files):
        ext = path.suffix.lower()
        if ext not in IMAGE_EXT | VIDEO_EXT:
            continue
        rel = path.relative_to(RAW_DIR).as_posix()
        raw_kind = "video" if ext in VIDEO_EXT else "photo"
        item_id = re.sub(r"[^a-zA-Z0-9]+", "-", path.stem).lower()

        meta = read_video_meta(path) if raw_kind == "video" else read_image_meta(path)
        captured = meta.get("captured_at")
        captured_iso = captured.isoformat() if isinstance(captured, datetime) else None
        pair_name = pair_map.get(path.name)
        pair_id = (
            re.sub(r"[^a-zA-Z0-9]+", "-", Path(pair_name).stem).lower() if pair_name else None
        )

        device = detect_device(path, raw_kind, meta)
        kind, display_kind = classify_display_kind(ext, meta.get("duration_sec"))
        is_live = display_kind == "live-photo"
        items.append(
            MediaItem(
                id=item_id,
                filename=path.name,
                rel_path=rel,
                ext=ext.lstrip("."),
                kind=kind,
                display_kind=display_kind,
                media_family=media_family(device),
                is_live_clip=is_live,
                size_bytes=path.stat().st_size,
                captured_at=captured_iso,
                latitude=meta.get("latitude"),
                longitude=meta.get("longitude"),
                width=meta.get("width"),
                height=meta.get("height"),
                duration_sec=meta.get("duration_sec"),
                live_photo_pair=pair_id,
                source_device=device,
                exif_camera=meta.get("exif_camera"),
                exif_model=meta.get("exif_model"),
            )
        )

    assign_buckets(items)

    buckets: dict[str, list] = defaultdict(list)
    for item in items:
        buckets[item.bucket].append(asdict(item))

    session_info = []
    for idx, session in enumerate(cluster_iphone_sessions(items)):
        if not session:
            continue
        session_info.append(
            {
                "session": idx + 1,
                "files": len(session),
                "start": session[0].captured_at,
                "end": session[-1].captured_at,
                "bucket": session[0].bucket,
            }
        )

    summary = {
        "generated_at": datetime.now().isoformat(),
        "source_zip": "iCloud Photos.zip",
        "raw_dir": str(RAW_DIR.relative_to(ROOT)).replace("\\", "/"),
        "total_files": len(items),
        "by_kind": {
            "photo": sum(1 for i in items if i.kind == "photo"),
            "video": sum(1 for i in items if i.kind == "video"),
            "live-photo": sum(1 for i in items if i.display_kind == "live-photo"),
        },
        "by_media_family": dict(Counter(i.media_family for i in items)),
        "by_device": dict(Counter(i.source_device for i in items)),
        "live_photo_max_sec": LIVE_PHOTO_MAX_SEC,
        "by_bucket": {k: len(v) for k, v in sorted(buckets.items())},
        "bucket_labels": BUCKET_LABELS,
        "with_gps": sum(1 for i in items if i.latitude is not None),
        "with_datetime": sum(1 for i in items if i.captured_at),
        "live_photo_pairs": len(pair_map) // 2,
        "iphone_sessions": session_info[:12],
        "notes": [
            "Drone files detected via dji_fly filename or DJI/CAM video handler (4K HEVC).",
            f"Clips at or below {LIVE_PHOTO_MAX_SEC}s are treated as live photos, not videos.",
            "iPhone live photos paired by IMG_#### stem.",
            "Event buckets assigned to the 3 largest iPhone time sessions.",
            "GPS was stripped from iCloud export (0 files with coordinates).",
        ],
        "buckets": dict(buckets),
    }

    if organize:
        copied = organize_files(items)
        summary["organized_copies"] = copied
        summary["organized_dir"] = str(ORG_DIR.relative_to(ROOT)).replace("\\", "/")

    return summary


def main() -> None:
    organize = "--organize" in sys.argv
    summary = catalog(organize=organize)

    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(summary, indent=2), encoding="utf-8")

    brief = {k: v for k, v in summary.items() if k != "buckets"}
    SUMMARY_PATH.write_text(json.dumps(brief, indent=2), encoding="utf-8")

    print(json.dumps(brief, indent=2))
    print(f"\nWrote {MANIFEST_PATH}")
    print(f"Wrote {SUMMARY_PATH}")


if __name__ == "__main__":
    main()
