#!/usr/bin/env python3
"""Build lightweight JSON index for the Safari Plains media editor mockup."""

from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from media_utils import safe_id

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assets" / "media" / "safari-plains" / "manifest.json"
DRONE_ANALYSIS = ROOT / "assets" / "media" / "safari-plains" / "drone-analysis.json"
CACHE = ROOT / "assets" / "media" / "safari-plains" / "_vision-cache"
OUT = ROOT / "assets" / "media" / "safari-plains" / "editor" / "editor-index.json"

USAGE = {
    "aerial-drone": {
        "suggested": ["Lodge Lens aerial chapter", "Homepage hero B-roll", "Client sizzle reel", "Website hero mockup"],
        "default_decision": "keep",
        "note": "Primary deliverable - export to YouTube or MP4 for web.",
    },
    "wildlife-game-drive": {
        "suggested": ["General gallery", "Social - wildlife posts", "Game drive highlight reel"],
        "default_decision": "keep",
        "note": "Strong safari storytelling. Avoid mixing into wine tasting sections.",
    },
    "wine-tasting": {
        "suggested": ["Wine tasting chapter (deck or cabana)", "Instagram carousel", "Brand mockup - reel frame"],
        "default_decision": "keep",
        "note": "Split wine-1 (deck) vs wine-2 (cabana) when uploading.",
    },
    "dining-food": {
        "suggested": ["Picnic / dining chapter", "Lodge amenities page", "Breakfast social post"],
        "default_decision": "review",
        "note": "Keep best 5-10. Remove duplicate buffet shots.",
    },
    "bush-outdoor-lifestyle": {
        "suggested": ["Picnic chapter", "Sunset social content", "Guest experience montage"],
        "default_decision": "review",
        "note": "Curate portraits - client may prefer fewer people shots.",
    },
    "lodge-lifestyle": {
        "suggested": ["Lodge overview", "Amenities section", "Deck and pool marketing"],
        "default_decision": "keep",
        "note": "Shows property quality for GM review.",
    },
    "provisioning-travel": {
        "suggested": [],
        "default_decision": "remove",
        "note": "BTS only - roadside stops, not for client portal.",
    },
    "behind-scenes-bts": {
        "suggested": [],
        "default_decision": "remove",
        "note": "Archive or delete from deliverable package.",
    },
    "unclassified": {
        "suggested": ["Manual review required"],
        "default_decision": "review",
        "note": "No vision label - check before publishing.",
    },
}

DRONE_TIER_USAGE = {
    "hero": {
        "suggested": ["Homepage hero", "Cinema scroll B-roll", "Client sizzle opener", "YouTube hero export"],
        "default_decision": "keep",
        "note": "Hero-tier drone clip - full grade, sound design, portal flagship.",
    },
    "usable": {
        "suggested": ["Aerial chapter B-roll", "General gallery cutaway", "Social reel insert"],
        "default_decision": "keep",
        "note": "Solid aerial - keep but not primary hero.",
    },
    "rough": {
        "suggested": [],
        "default_decision": "remove",
        "note": "Rough / BTS drone - not for client-facing deliverables.",
    },
    "pending": {
        "suggested": ["Run drone video analysis"],
        "default_decision": "review",
        "note": "Awaiting multi-frame drone review.",
    },
}

BUCKET_SITE_MAP = {
    "general": {
        "lodge_lens_tab": "General",
        "chapters": ["aerial"],
        "description": "Aerial drone footage, wildlife, lodge overview, game drives.",
    },
    "events-picnic": {
        "lodge_lens_tab": "Events > Picnic",
        "chapters": ["picnic"],
        "description": "Bush dining, sundowners, breakfast, outdoor lifestyle.",
    },
    "events-wine-1": {
        "lodge_lens_tab": "Events > Wine tasting 1",
        "chapters": ["wine-1"],
        "description": "Deck and savanna-view wine tastings.",
    },
    "events-wine-2": {
        "lodge_lens_tab": "Events > Wine tasting 2",
        "chapters": ["wine-2"],
        "description": "Cabana and pool-area wine experience.",
    },
}


def thumb_for(item_id: str) -> str | None:
    path = CACHE / f"{safe_id(item_id)}.jpg"
    if path.exists():
        return f"../_vision-cache/{safe_id(item_id)}.jpg"
    return None


def load_drone_analysis() -> dict[str, dict]:
    if not DRONE_ANALYSIS.exists():
        return {}
    try:
        data = json.loads(DRONE_ANALYSIS.read_text(encoding="utf-8"))
        return {c["id"]: c for c in data.get("clips", [])}
    except Exception:
        return {}


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    drone_by_id = load_drone_analysis()
    items = []
    for bucket, files in manifest.get("buckets", {}).items():
        for f in files:
            cat = f.get("visual_category", "unclassified")
            family = f.get("media_family") or (
                "drone" if f.get("source_device") == "drone" else "phone"
            )
            usage = USAGE.get(cat, USAGE["unclassified"])
            drone_tier = None
            drone_summary = None
            if family == "drone" and f.get("kind") == "video":
                da = drone_by_id.get(f["id"], {})
                drone_tier = da.get("tier", "pending")
                drone_summary = da.get("summary") or da.get("subject")
                tier_usage = DRONE_TIER_USAGE.get(drone_tier, DRONE_TIER_USAGE["pending"])
                usage = tier_usage
                if da.get("suggested_uses"):
                    usage = {**usage, "suggested": da["suggested_uses"]}
            items.append(
                {
                    "id": f["id"],
                    "filename": f["filename"],
                    "kind": f["kind"],
                    "display_kind": f.get("display_kind", f["kind"]),
                    "media_family": family,
                    "drone_tier": drone_tier,
                    "drone_summary": drone_summary,
                    "bucket": f.get("bucket", bucket),
                    "visual_category": cat,
                    "captured_at": f.get("captured_at"),
                    "duration_sec": f.get("duration_sec"),
                    "source_device": f.get("source_device"),
                    "vision_session": f.get("vision_session"),
                    "vision_confidence": f.get("vision_confidence"),
                    "size_bytes": f.get("size_bytes"),
                    "is_live_clip": f.get("is_live_clip", False),
                    "thumb": thumb_for(f["id"]),
                    "suggested_uses": usage["suggested"],
                    "editor_note": usage["note"],
                    "default_decision": usage["default_decision"],
                    "editor_decision": usage["default_decision"],
                }
            )

    drone_items = [i for i in items if i["media_family"] == "drone"]
    phone_items = [i for i in items if i["media_family"] == "phone"]

    payload = {
        "generated_at": datetime.now().isoformat(),
        "property": "Safari Plains",
        "total": len(items),
        "by_media_family": {
            "drone": len(drone_items),
            "phone": len(phone_items),
            "other": len(items) - len(drone_items) - len(phone_items),
        },
        "drone_tiers": {
            tier: sum(1 for i in drone_items if i.get("drone_tier") == tier)
            for tier in ("hero", "usable", "rough", "pending", None)
        },
        "bucket_site_map": BUCKET_SITE_MAP,
        "session_labels": manifest.get("session_labels", []),
        "summary": {
            "by_bucket": manifest.get("by_bucket", {}),
            "by_visual_category": manifest.get("by_visual_category", {}),
            "by_kind": manifest.get("by_kind", {}),
        },
        "items": items,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    with_thumb = sum(1 for i in items if i["thumb"])
    print(f"Wrote {OUT} ({len(items)} items, {with_thumb} thumbs, {len(drone_items)} drone)")


if __name__ == "__main__":
    main()
