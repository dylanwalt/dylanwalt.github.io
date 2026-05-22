#!/usr/bin/env python3
"""Small first-party website scraper for the rebuild workspace."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import deque
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse, urlunparse
from xml.etree import ElementTree

import requests
from bs4 import BeautifulSoup


URL_PATTERN = re.compile(r"https?://[^\s\"'<>\\)]+", re.IGNORECASE)
STYLE_URL_PATTERN = re.compile(r"url\((['\"]?)(.+?)\1\)", re.IGNORECASE)
IMAGE_SUFFIXES = {
    ".avif",
    ".gif",
    ".jpeg",
    ".jpg",
    ".png",
    ".svg",
    ".webp",
}
ASSET_SUFFIXES = IMAGE_SUFFIXES | {".css", ".js", ".woff", ".woff2", ".ttf", ".ico"}
USER_AGENT = "Website-Rebuild-Pro/1.0 (+local source capture)"


def clean_url(url: str) -> str:
    parsed = urlparse(url)
    return urlunparse(
        (parsed.scheme, parsed.netloc, parsed.path or "/", "", parsed.query, "")
    )


def host(url: str) -> str:
    return urlparse(url).netloc.lower()


def site_page_path(root: Path, url: str) -> Path:
    parsed = urlparse(url)
    parts = [part for part in unquote(parsed.path).strip("/").split("/") if part]
    stem = "__".join(parts) or "index"
    stem = safe_name(stem)[:160] or "page"
    return root / "scraped" / "pages" / f"{stem}.html"


def safe_name(value: str) -> str:
    value = re.sub(r"[^A-Za-z0-9._~-]+", "-", value)
    return value.strip("-._") or "asset"


def asset_path(root: Path, url: str) -> Path:
    parsed = urlparse(url)
    url_parts = [part for part in unquote(parsed.path).split("/") if part]
    leaf = safe_name(url_parts[-1] if url_parts else "asset")
    suffix = Path(leaf).suffix[:12]
    base = leaf[: -len(suffix)] if suffix else leaf
    digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:12]
    leaf = f"{safe_name(base)[:72]}--{digest}{suffix}"
    return root / "scraped" / "assets" / safe_name(parsed.netloc) / leaf


def load_sitemap_urls(
    session: requests.Session, candidate: str, allowed_domains: set[str]
) -> set[str]:
    found: set[str] = set()
    queue = deque([candidate])
    seen: set[str] = set()
    while queue:
        sitemap_url = clean_url(queue.popleft())
        if sitemap_url in seen:
            continue
        seen.add(sitemap_url)
        try:
            response = session.get(sitemap_url, timeout=20)
            if not response.ok or "<" not in response.text[:200]:
                continue
            document = ElementTree.fromstring(response.text)
        except (requests.RequestException, ElementTree.ParseError):
            continue
        for node in document.findall(".//{*}loc"):
            location = (node.text or "").strip()
            if not location:
                continue
            if location.lower().endswith(".xml"):
                queue.append(location)
            elif host(location) in allowed_domains:
                found.add(clean_url(location))
    return found


def sitemap_candidates(session: requests.Session, start_url: str) -> list[str]:
    parsed = urlparse(start_url)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    candidates = [
        f"{origin}/sitemap.xml",
        f"{origin}/wp-sitemap.xml",
        f"{origin}/sitemap_index.xml",
    ]
    try:
        robots = session.get(f"{origin}/robots.txt", timeout=15)
        for line in robots.text.splitlines():
            if line.lower().startswith("sitemap:"):
                candidates.append(line.split(":", 1)[1].strip())
    except requests.RequestException:
        pass
    return list(dict.fromkeys(candidates))


def srcset_urls(value: str) -> list[str]:
    return [entry.strip().split(" ")[0] for entry in value.split(",") if entry.strip()]


def candidate_assets(soup: BeautifulSoup, html: str, page_url: str) -> set[str]:
    assets: set[str] = set()
    for tag in soup.find_all(["img", "source", "video"]):
        for attr in ("src", "data-src", "data-image", "poster"):
            if tag.get(attr):
                assets.add(urljoin(page_url, str(tag[attr])))
        for attr in ("srcset", "data-srcset"):
            if tag.get(attr):
                assets.update(urljoin(page_url, item) for item in srcset_urls(str(tag[attr])))
    for meta in soup.find_all("meta"):
        if meta.get("property") in {"og:image", "twitter:image"} and meta.get("content"):
            assets.add(urljoin(page_url, str(meta["content"])))
    for link in soup.find_all("link", href=True):
        rel = " ".join(link.get("rel", []))
        if "stylesheet" in rel or "icon" in rel:
            assets.add(urljoin(page_url, str(link["href"])))
    for tagged in soup.find_all(style=True):
        assets.update(urljoin(page_url, match[1]) for match in STYLE_URL_PATTERN.findall(str(tagged["style"])))
    for match in URL_PATTERN.findall(html):
        suffix = Path(urlparse(match).path).suffix.lower()
        if suffix in IMAGE_SUFFIXES:
            assets.add(clean_url(match))
    return {clean_url(asset) for asset in assets if urlparse(asset).scheme in {"http", "https"}}


def page_links(soup: BeautifulSoup, page_url: str, allowed_domains: set[str]) -> set[str]:
    links: set[str] = set()
    for anchor in soup.find_all("a", href=True):
        link = clean_url(urljoin(page_url, str(anchor["href"])))
        parsed = urlparse(link)
        suffix = Path(parsed.path).suffix.lower()
        if parsed.scheme in {"http", "https"} and parsed.netloc.lower() in allowed_domains:
            if suffix not in ASSET_SUFFIXES and not parsed.path.startswith("/cdn-cgi/"):
                links.add(link)
    return links


def download_asset(
    session: requests.Session,
    root: Path,
    url: str,
    asset_domains: set[str],
) -> dict[str, str] | None:
    if host(url) not in asset_domains:
        return None
    try:
        response = session.get(url, timeout=12)
        response.raise_for_status()
    except requests.RequestException:
        return None
    content_type = response.headers.get("content-type", "").lower()
    suffix = Path(urlparse(url).path).suffix.lower()
    if suffix not in ASSET_SUFFIXES and not any(
        marker in content_type for marker in ("image/", "font/", "text/css", "javascript")
    ):
        return None
    path = asset_path(root, url)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(response.content)
    return {"url": url, "path": path.as_posix(), "contentType": content_type}


def scrape(root: Path) -> dict[str, object]:
    config = json.loads((root / "site.config.json").read_text(encoding="utf-8"))
    scrape_config = config["scrape"]
    starts = [clean_url(url) for url in scrape_config["startUrls"]]
    allowed_domains = {domain.lower() for domain in scrape_config["allowedDomains"]}
    asset_domains = allowed_domains | {
        domain.lower() for domain in scrape_config.get("assetDomains", [])
    }
    max_pages = int(scrape_config.get("maxPages", 30))
    max_assets = int(scrape_config.get("maxAssets", 300))

    session = requests.Session()
    session.headers["User-Agent"] = USER_AGENT

    queued = deque(starts)
    sitemap_urls: set[str] = set()
    for start in starts:
        for sitemap in sitemap_candidates(session, start):
            sitemap_urls.update(load_sitemap_urls(session, sitemap, allowed_domains))
    queued.extend(sorted(sitemap_urls))

    pages: list[dict[str, str]] = []
    assets: list[dict[str, str]] = []
    visited_pages: set[str] = set()
    pending_assets: deque[str] = deque()
    seen_assets: set[str] = set()

    while queued and len(pages) < max_pages:
        url = clean_url(queued.popleft())
        if url in visited_pages or host(url) not in allowed_domains:
            continue
        visited_pages.add(url)
        try:
            response = session.get(url, timeout=25)
            response.raise_for_status()
        except requests.RequestException:
            continue
        if "html" not in response.headers.get("content-type", "").lower():
            continue
        page_path = site_page_path(root, url)
        page_path.parent.mkdir(parents=True, exist_ok=True)
        page_path.write_text(response.text, encoding="utf-8")
        pages.append({"url": url, "path": page_path.as_posix()})
        soup = BeautifulSoup(response.text, "html.parser")
        queued.extend(sorted(page_links(soup, url, allowed_domains) - visited_pages))
        for asset in sorted(candidate_assets(soup, response.text, url)):
            if asset not in seen_assets:
                pending_assets.append(asset)
                seen_assets.add(asset)

    while pending_assets and len(assets) < max_assets:
        captured = download_asset(session, root, pending_assets.popleft(), asset_domains)
        if captured:
            assets.append(captured)

    manifest = {
        "siteId": config["siteId"],
        "source": config["canonicalUrl"],
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
        "sitemapPagesDiscovered": len(sitemap_urls),
        "pages": pages,
        "assets": assets,
    }
    manifest_path = root / "scraped" / "meta" / "manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return manifest


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("site_root", type=Path)
    args = parser.parse_args()
    manifest = scrape(args.site_root)
    print(
        f"Scraped {manifest['siteId']}: "
        f"{len(manifest['pages'])} pages, {len(manifest['assets'])} assets"
    )


if __name__ == "__main__":
    main()
