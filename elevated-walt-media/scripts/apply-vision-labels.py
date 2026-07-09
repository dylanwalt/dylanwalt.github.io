#!/usr/bin/env python3
"""Apply vision session labels to full manifest and reorganize files."""

from __future__ import annotations

import json
import os
import shutil
import sys
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
SUMMARY = ROOT / "assets" / "media" / "safari-plains" / "manifest-summary.json"
PACKS = ROOT / "assets" / "media" / "safari-plains" / "_vision-packs" / "session-packs.json"
LABELS = ROOT / "assets" / "media" / "safari-plains" / "session-labels.json"
RAW = ROOT / "assets" / "media" / "safari-plains" / "raw"
ORG = ROOT / "assets" / "media" / "safari-plains" / "organized"

BUCKET_LABELS = {
    "general": "General (aerial, wildlife, lodge)",
    "events-picnic": "Events - Picnic",
    "events-wine-1": "Events - Wine tasting 1 (deck)",
    "events-wine-2": "Events - Wine tasting 2 (cabana/pool)",
}


def item_session_map(packs: dict) -> dict[str, str]:
    mapping: dict[str, str] = {}
    for sess in packs["sessions"]:
        sid = sess["session_id"]
        for iid in sess["item_ids"]:
            mapping[iid] = sid
    return mapping


def main() -> None:
    reorganize = "--reorganize" in sys.argv

    for path in (MANIFEST, PACKS, LABELS):
        if not path.exists():
            raise SystemExit(f"Missing {path}")

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    packs = json.loads(PACKS.read_text(encoding="utf-8"))
    labels_list = json.loads(LABELS.read_text(encoding="utf-8"))
    labels = {x["session_id"]: x for x in labels_list}

    id_to_session = item_session_map(packs)
    items = []
    for bucket_files in manifest["buckets"].values():
        items.extend(bucket_files)
    by_id = {i["id"]: i for i in items}

    unmapped = 0
    for item in items:
        sid = id_to_session.get(item["id"])
        if item.get("source_device") == "drone" and "drone" in labels:
            sid = "drone"
        if not sid or sid not in labels:
            unmapped += 1
            item["visual_category"] = item.get("visual_category", "unclassified")
            item["bucket"] = item.get("bucket", "unclassified")
            item["bucket_reason"] = "no vision session label"
            continue
        lab = labels[sid]
        item["visual_category"] = lab["visual_category"]
        item["bucket"] = lab["site_bucket"]
        item["bucket_reason"] = f"vision: {lab['description']}"
        item["vision_confidence"] = lab.get("confidence", "medium")
        item["vision_session"] = sid

    # propagate live photo pairs
    for item in items:
        pair = item.get("live_photo_pair")
        if pair and pair in by_id and by_id[pair].get("visual_category"):
            donor = by_id[pair]
            item["visual_category"] = donor["visual_category"]
            item["bucket"] = donor["bucket"]
            item["bucket_reason"] = f"live pair of {donor['filename']}"

    buckets: dict[str, list] = defaultdict(list)
    for item in items:
        buckets[item["bucket"]].append(item)

    summary = {
        "generated_at": datetime.now().isoformat(),
        "catalog_method": "metadata + vision session classification",
        "source_zip": manifest.get("source_zip", "iCloud Photos.zip"),
        "raw_dir": str(RAW.relative_to(ROOT)).replace("\\", "/"),
        "total_files": len(items),
        "by_kind": manifest.get("by_kind", {}),
        "by_device": dict(Counter(i.get("source_device", "unknown") for i in items)),
        "by_visual_category": dict(Counter(i.get("visual_category", "unclassified") for i in items)),
        "by_bucket": {k: len(v) for k, v in sorted(buckets.items())},
        "bucket_labels": BUCKET_LABELS,
        "vision_sessions_labeled": len(labels),
        "unmapped_files": unmapped,
        "with_gps": sum(1 for i in items if i.get("latitude")),
        "with_datetime": sum(1 for i in items if i.get("captured_at")),
        "live_photo_pairs": manifest.get("live_photo_pairs", 0),
        "session_labels": labels_list,
        "notes": [
            "Buckets assigned via visual review of session sample thumbnails.",
            "Wine 1 = deck/savanna tastings. Wine 2 = cabana/pool area.",
            "Wildlife and drone footage placed in general.",
        ],
        "buckets": dict(buckets),
    }

    MANIFEST.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    brief = {k: v for k, v in summary.items() if k != "buckets"}
    SUMMARY.write_text(json.dumps(brief, indent=2), encoding="utf-8")

    if reorganize:
        if ORG.exists():
            shutil.rmtree(ORG)
        ORG.mkdir(parents=True)
        linked = 0
        for item in items:
            src = RAW / Path(item["rel_path"])
            if not src.exists():
                continue
            dest_dir = ORG / item["bucket"]
            dest_dir.mkdir(parents=True, exist_ok=True)
            dest = dest_dir / item["filename"]
            try:
                os.link(src, dest)
            except (OSError, AttributeError):
                shutil.copy2(src, dest)
            linked += 1
        summary["organized_files"] = linked
        brief["organized_files"] = linked
        SUMMARY.write_text(json.dumps(brief, indent=2), encoding="utf-8")

    print(json.dumps(brief, indent=2))


if __name__ == "__main__":
    main()
