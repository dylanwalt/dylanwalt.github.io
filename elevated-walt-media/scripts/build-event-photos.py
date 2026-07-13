#!/usr/bin/env python3
"""Build high-quality numbered stills for Safari Plains event tabs."""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from datetime import datetime
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSIGNMENTS = ROOT / "config" / "safari-photo-assignments.json"
OUT = ROOT / "assets" / "media" / "safari-plains" / "event-photos"
THUMBS = OUT / "thumbs"
FULL = OUT / "full"

# Highest practical web delivery: keep near-native resolution, strong JPEG.
FULL_MAX = 4096
FULL_QUALITY = 95
THUMB_MAX = 1280
THUMB_QUALITY = 90

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".heic", ".webp", ".JPG", ".JPEG", ".PNG"}


def read_captured_at(path: Path) -> str | None:
    try:
        with Image.open(path) as img:
            exif = img.getexif()
            raw = None
            for tag in (36867, 36868, 306):
                if tag in exif:
                    raw = exif.get(tag)
                    break
            try:
                ifd = exif.get_ifd(0x8769)
                for tag in (36867, 36868):
                    if not raw and tag in ifd:
                        raw = ifd.get(tag)
            except Exception:
                pass
            if not raw or not isinstance(raw, str):
                return None
            # EXIF: "YYYY:MM:DD HH:MM:SS"
            try:
                dt = datetime.strptime(raw.strip(), "%Y:%m:%d %H:%M:%S")
                return dt.isoformat(timespec="seconds")
            except ValueError:
                return raw
    except OSError:
        return None


def save_optimized(src: Path, dest: Path, max_side: int, quality: int) -> tuple[int, int]:
    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img)
        img = img.convert("RGB")
        w, h = img.size
        scale = min(1.0, max_side / max(w, h))
        if scale < 1:
            img = img.resize(
                (max(1, int(w * scale)), max(1, int(h * scale))),
                Image.Resampling.LANCZOS,
            )
        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(
            dest,
            "JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
            subsampling=0,
        )
        return img.size


def find_source(export_dir: Path, name: str) -> Path | None:
    direct = export_dir / name
    if direct.exists():
        return direct
    for path in export_dir.rglob("*"):
        if path.is_file() and path.name.lower() == name.lower():
            return path
    return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        type=Path,
        default=Path(r"C:\Users\dylan\Downloads\safari-plains-pics-export"),
        help="Folder containing exported Safari Plains stills",
    )
    args = parser.parse_args()
    export_dir: Path = args.source

    if not ASSIGNMENTS.exists():
        print(f"Missing assignments: {ASSIGNMENTS}", file=sys.stderr)
        return 1
    if not export_dir.exists():
        print(f"Missing source folder: {export_dir}", file=sys.stderr)
        return 1

    data = json.loads(ASSIGNMENTS.read_text(encoding="utf-8"))
    events = data.get("events") or {}
    rows = data.get("photos") or []

    if OUT.exists():
        shutil.rmtree(OUT)
    THUMBS.mkdir(parents=True)
    FULL.mkdir(parents=True)

    prepared: list[dict] = []
    for row in rows:
        src_name = row["source"]
        src = find_source(export_dir, src_name)
        if not src:
            print(f"WARN missing source: {src_name}", file=sys.stderr)
            continue
        if src.suffix not in IMAGE_EXT and src.suffix.lower() not in {e.lower() for e in IMAGE_EXT}:
            print(f"WARN skip non-image: {src.name}", file=sys.stderr)
            continue
        prepared.append(
            {
                **row,
                "_src": src,
                "captured_at": read_captured_at(src),
            }
        )

    # Chronological when EXIF exists; keep no-EXIF rows after dated peers in file order.
    prepared.sort(
        key=lambda r: (
            r["captured_at"] is None,
            r["captured_at"] or "",
            r["source"],
        )
    )

    photos: list[dict] = []
    for i, row in enumerate(prepared, 1):
        num = f"{i:02d}"
        full_name = f"photo-{num}.jpg"
        thumb_name = f"photo-{num}.jpg"
        full_path = FULL / full_name
        thumb_path = THUMBS / thumb_name

        fw, fh = save_optimized(row["_src"], full_path, FULL_MAX, FULL_QUALITY)
        tw, th = save_optimized(row["_src"], thumb_path, THUMB_MAX, THUMB_QUALITY)

        photos.append(
            {
                "number": i,
                "label": f"Photo {num}",
                "event": row["event"],
                "source": row["source"],
                "note": row.get("note"),
                "captured_at": row.get("captured_at"),
                "width": fw,
                "height": fh,
                "thumb": f"thumbs/{thumb_name}",
                "full": f"full/{full_name}",
            }
        )
        print(
            f"Photo {num}: {row['event']}  {row['source']}  "
            f"{fw}x{fh}  {row.get('captured_at') or 'no-exif'}",
            flush=True,
        )

    payload = {
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "count": len(photos),
        "note": (
            "Numbered stills under the same three events as the drone clips. "
            "Sorted by capture time. Tell us the photo number if an event placement should move."
        ),
        "quality": {
            "full_max_side": FULL_MAX,
            "full_jpeg_quality": FULL_QUALITY,
            "thumb_max_side": THUMB_MAX,
            "thumb_jpeg_quality": THUMB_QUALITY,
            "subsampling": "4:4:4",
        },
        "events": events,
        "photos": photos,
    }
    (OUT / "event-photos-index.json").write_text(
        json.dumps(payload, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Done: {len(photos)} photos -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
