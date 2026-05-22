#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Fetch and write a shadcn registry-item JSON (like 21st.dev /r/*) into a project folder.

Why this exists:
- `npx shadcn@latest add <url>` is great, but sometimes you want a controlled, auditable write.
- 21st.dev registry items include embedded file contents under `files[].content`.

Safety:
- Prevents directory traversal (no writing outside --project-root).
- Defaults to non-overwrite (use --overwrite intentionally).
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen


def _read_json(path: Path) -> dict[str, Any] | None:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return None


def _normalize_alias_path(value: str) -> str:
    # components.json often uses "@/components" style strings.
    value = value.strip()
    if value.startswith("@/"):
        return value[2:]
    if value.startswith("~/"):
        return value[2:]
    return value.lstrip("./")


def _resolve_target(project_root: Path, file_entry: dict[str, Any]) -> str:
    """
    Resolve a registry file entry to a project-relative path.
    - If `target` exists:
      - "~/" means project root.
      - "@ui/", "@components/", "@lib/", "@hooks/" follow shadcn placeholder conventions
        if components.json exists. If not, fall back to removing the placeholder prefix.
    - Else fall back to `path`.
    """
    target = (file_entry.get("target") or "").strip()
    if not target:
        return str(file_entry["path"])

    if target.startswith("~/") or target.startswith("~\\"):
        return target[2:].replace("\\", "/")

    placeholders = {
        "@components/": "components",
        "@ui/": "ui",
        "@lib/": "lib",
        "@hooks/": "hooks",
    }

    for prefix, alias_key in placeholders.items():
        if target.startswith(prefix):
            aliases = {}
            cfg = _read_json(project_root / "components.json")
            if isinstance(cfg, dict):
                aliases = cfg.get("aliases") or {}

            alias_value = aliases.get(alias_key)
            rest = target[len(prefix) :]
            if isinstance(alias_value, str) and alias_value.strip():
                base = _normalize_alias_path(alias_value)
                return f"{base}/{rest}".replace("\\", "/")

            # No components.json (or no alias) - write into a sane fallback folder.
            # (We *don't* guess "src/" vs repo root. We just de-placeholder.)
            return rest.replace("\\", "/")

    return target.replace("\\", "/")


def _safe_join(root: Path, rel: str) -> Path:
    rel = rel.replace("\\", "/")
    rel_path = Path(rel)

    # Disallow absolute and drive-qualified paths
    if rel_path.is_absolute() or rel_path.drive:
        raise ValueError(f"Refusing absolute path: {rel}")

    # Disallow traversal segments
    parts = [p for p in rel_path.parts if p not in (".", "")]
    if any(p == ".." for p in parts):
        raise ValueError(f"Refusing traversal path: {rel}")

    target = (root / Path(*parts)).resolve()
    root_resolved = root.resolve()

    if target == root_resolved:
        return target

    if not str(target).startswith(str(root_resolved) + os.sep):
        raise ValueError(f"Refusing to write outside project root: {rel}")

    return target


def _http_get_json(url: str) -> dict[str, Any]:
    req = Request(
        url,
        headers={
            "User-Agent": "website-rebuild-pro/1.0 (fetch_21st_registry_item.py)",
            "Accept": "application/json,text/plain,*/*",
        },
        method="GET",
    )
    with urlopen(req, timeout=60) as resp:
        raw = resp.read()
    return json.loads(raw.decode("utf-8"))


def _infer_kind(item: dict[str, Any]) -> str:
    name = str(item.get("name") or "").strip()
    title = str(item.get("title") or "").strip()
    typ = str(item.get("type") or "").strip()
    return f"{title or name} ({typ or 'unknown-type'})".strip()


def _print_list(label: str, values: list[str]) -> None:
    if not values:
        return
    print(f"\n{label}:")
    for v in values:
        print(f"- {v}")


def _rewrite_motion_imports(content: str, mode: str) -> str:
    """
    mode:
      - "none": no changes
      - "motion": convert `from "framer-motion"` -> `from "motion/react"`
      - "motion-client": convert to `from "motion/react-client"` (Next.js App Router friendly)
    """
    if mode == "none":
        return content
    if mode == "motion":
        return re.sub(r'from\s+[\'"]framer-motion[\'"]', 'from "motion/react"', content)
    if mode == "motion-client":
        return re.sub(r'from\s+[\'"]framer-motion[\'"]', 'from "motion/react-client"', content)
    raise ValueError(f"Unknown --rewrite-motion-import: {mode}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True, help="Registry item URL (e.g. https://21st.dev/r/author/component-name)")
    parser.add_argument("--project-root", required=True, help="Root folder to write files into")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing files")
    parser.add_argument(
        "--rewrite-motion-import",
        choices=["none", "motion", "motion-client"],
        default="none",
        help="Optionally rewrite framer-motion imports to motion/* imports",
    )
    parser.add_argument("--dry-run", action="store_true", help="Print actions without writing")
    args = parser.parse_args()

    project_root = Path(args.project_root).expanduser().resolve()
    if not project_root.exists():
        print(f"Error: --project-root does not exist: {project_root}", file=sys.stderr)
        return 2

    item = _http_get_json(args.url)
    kind = _infer_kind(item)
    print(f"Fetched: {kind}")
    print(f"Source: {args.url}")

    dependencies = item.get("dependencies") or []
    dev_dependencies = item.get("devDependencies") or []
    registry_dependencies = item.get("registryDependencies") or []
    env_vars = item.get("envVars") or {}
    files = item.get("files") or []

    if not isinstance(files, list) or not files:
        print("Error: registry item has no files[]", file=sys.stderr)
        return 2

    # Print deps (do not auto-install)
    _print_list("npm dependencies", [str(d) for d in dependencies if str(d).strip()])
    _print_list("npm devDependencies", [str(d) for d in dev_dependencies if str(d).strip()])
    _print_list("registry dependencies", [str(d) for d in registry_dependencies if str(d).strip()])
    if isinstance(env_vars, dict) and env_vars:
        print("\nenvVars (not applied by this script):")
        for k in sorted(env_vars.keys()):
            print(f"- {k}")

    # Write files
    planned = []
    for f in files:
        if not isinstance(f, dict):
            continue
        if "path" not in f:
            continue
        if "content" not in f or not isinstance(f["content"], str):
            raise ValueError(f"File entry missing embedded content for path={f.get('path')}")

        rel_target = _resolve_target(project_root, f)
        out_path = _safe_join(project_root, rel_target)
        content = _rewrite_motion_imports(f["content"], args.rewrite_motion_import)
        planned.append((out_path, content))

    for out_path, content in planned:
        rel = os.path.relpath(out_path, project_root)
        if out_path.exists() and not args.overwrite:
            print(f"SKIP (exists): {rel}")
            continue

        print(f"WRITE: {rel}")
        if args.dry_run:
            continue

        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(content, encoding="utf-8")

    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
