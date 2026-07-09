/**
 * Safari Plains interactive media gallery - loads local web gallery assets.
 */
import { resolvePath } from './utils.js';
import { trackClick } from './analytics.js';

const BUCKET_ORDER = ['general', 'events-picnic', 'events-wine-1', 'events-wine-2', 'unclassified'];

export async function initSafariGallery(lodge, basePath) {
  const root = document.getElementById('safari-gallery-root');
  if (!root) return;

  const indexUrl = resolvePath(
    basePath,
    'assets/media/safari-plains/gallery/gallery-index.json',
  );

  let data;
  try {
    const res = await fetch(indexUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch {
    root.innerHTML = '<p class="gallery-empty">Media gallery is being prepared. Check back shortly.</p>';
    return;
  }

  const assetBase = resolvePath(basePath, 'assets/media/safari-plains/gallery/');

  const state = {
    bucket: 'general',
    family: 'all',
    kind: 'all',
    query: '',
    lightbox: -1,
    filtered: [],
  };

  const shell = document.createElement('div');
  shell.className = 'safari-gallery';
  shell.innerHTML = `
    <div class="sg-toolbar">
      <div class="sg-tabs" role="tablist" aria-label="Footage categories"></div>
      <div class="sg-controls">
        <input type="search" class="sg-search" placeholder="Search filenames, sessions..." aria-label="Search media">
        <div class="sg-filters" role="group" aria-label="Media filters"></div>
      </div>
      <p class="sg-summary" aria-live="polite"></p>
    </div>
    <div class="sg-stage"></div>
    <div class="sg-lightbox" hidden aria-hidden="true">
      <button type="button" class="sg-lightbox-close" aria-label="Close preview">&times;</button>
      <button type="button" class="sg-lightbox-prev" aria-label="Previous">&#8249;</button>
      <button type="button" class="sg-lightbox-next" aria-label="Next">&#8250;</button>
      <div class="sg-lightbox-body"></div>
      <p class="sg-lightbox-caption"></p>
    </div>`;
  root.replaceChildren(shell);

  const tabsEl = shell.querySelector('.sg-tabs');
  const filtersEl = shell.querySelector('.sg-filters');
  const stageEl = shell.querySelector('.sg-stage');
  const summaryEl = shell.querySelector('.sg-summary');
  const searchEl = shell.querySelector('.sg-search');
  const lightboxEl = shell.querySelector('.sg-lightbox');
  const lightboxBody = shell.querySelector('.sg-lightbox-body');
  const lightboxCaption = shell.querySelector('.sg-lightbox-caption');

  const bucketCounts = data.items.reduce((acc, item) => {
    acc[item.bucket] = (acc[item.bucket] || 0) + 1;
    return acc;
  }, {});

  BUCKET_ORDER.filter((b) => bucketCounts[b]).forEach((bucket) => {
    const meta = data.buckets[bucket] || { tab: bucket };
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `sg-tab${bucket === state.bucket ? ' is-active' : ''}`;
    btn.dataset.bucket = bucket;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', bucket === state.bucket ? 'true' : 'false');
    btn.innerHTML = `${meta.tab} <span>${bucketCounts[bucket]}</span>`;
    btn.addEventListener('click', () => {
      state.bucket = bucket;
      tabsEl.querySelectorAll('.sg-tab').forEach((t) => {
        const active = t.dataset.bucket === bucket;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      trackClick(lodge.id, 'gallery_tab', bucket);
      render();
    });
    tabsEl.appendChild(btn);
  });

  const filterDefs = [
    { id: 'all', label: 'All' },
    { id: 'drone', label: 'Drone' },
    { id: 'phone', label: 'Phone' },
    { id: 'photo', label: 'Photos' },
    { id: 'video', label: 'Videos' },
    { id: 'live-photo', label: 'Live' },
  ];

  filterDefs.forEach((f) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sg-filter';
    btn.dataset.filter = f.id;
    btn.textContent = f.label;
    btn.addEventListener('click', () => {
      if (f.id === 'drone' || f.id === 'phone') {
        state.family = f.id;
        state.kind = 'all';
      } else if (f.id === 'all') {
        state.family = 'all';
        state.kind = 'all';
      } else {
        state.family = 'all';
        state.kind = f.id;
      }
      filtersEl.querySelectorAll('.sg-filter').forEach((b) => {
        const id = b.dataset.filter;
        let active = false;
        if (id === 'all') active = state.family === 'all' && state.kind === 'all';
        else if (id === 'drone' || id === 'phone') active = state.family === id && state.kind === 'all';
        else active = state.kind === id && state.family === 'all';
        b.classList.toggle('is-active', active);
      });
      trackClick(lodge.id, 'gallery_filter', f.id);
      render();
    });
    if (f.id === 'all') btn.classList.add('is-active');
    filtersEl.appendChild(btn);
  });

  searchEl.addEventListener('input', () => {
    state.query = searchEl.value.trim().toLowerCase();
    render();
  });

  const applyFilters = () => {
    state.filtered = data.items.filter((item) => {
      if (item.bucket !== state.bucket) return false;
      if (state.family !== 'all' && item.media_family !== state.family) return false;
      if (state.kind !== 'all') {
        const dk = item.display_kind || item.kind;
        if (state.kind === 'photo' && dk !== 'photo') return false;
        if (state.kind === 'video' && dk !== 'video') return false;
        if (state.kind === 'live-photo' && dk !== 'live-photo') return false;
      }
      if (state.query) {
        const hay = `${item.filename} ${item.session_label} ${item.visual_category}`.toLowerCase();
        if (!hay.includes(state.query)) return false;
      }
      return item.thumb;
    });
  };

  const groupBySession = (items) => {
    const groups = new Map();
    items.forEach((item) => {
      const key = item.session_id || 'ungrouped';
      if (!groups.has(key)) {
        groups.set(key, {
          id: key,
          label: item.session_label || 'Additional frames',
          items: [],
        });
      }
      groups.get(key).items.push(item);
    });
    return [...groups.values()];
  };

  const badgeFor = (item) => {
    if (item.display_kind === 'live-photo') return 'Live';
    if (item.kind === 'video') return 'Video';
    if (item.media_family === 'drone') return 'Drone';
    return '';
  };

  const openLightbox = (index) => {
    state.lightbox = index;
    const item = state.filtered[index];
    if (!item) return;

    lightboxBody.replaceChildren();
    const previewUrl = item.preview ? assetBase + item.preview : null;
    const thumbUrl = assetBase + item.thumb;

    if (previewUrl) {
      const vid = document.createElement('video');
      vid.src = previewUrl;
      vid.controls = true;
      vid.playsInline = true;
      vid.autoplay = true;
      vid.loop = item.display_kind === 'live-photo';
      vid.poster = thumbUrl;
      lightboxBody.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = thumbUrl;
      img.alt = item.filename || 'Safari Plains media';
      lightboxBody.appendChild(img);
    }

    lightboxCaption.textContent = item.session_label
      ? `${item.filename} - ${item.session_label}`
      : item.filename || '';
    lightboxEl.hidden = false;
    lightboxEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sg-lightbox-open');
    trackClick(lodge.id, 'gallery_lightbox', item.id);
  };

  const closeLightbox = () => {
    lightboxEl.hidden = true;
    lightboxEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sg-lightbox-open');
    lightboxBody.replaceChildren();
    state.lightbox = -1;
  };

  shell.querySelector('.sg-lightbox-close').addEventListener('click', closeLightbox);
  shell.querySelector('.sg-lightbox-prev').addEventListener('click', () => {
    if (state.lightbox > 0) openLightbox(state.lightbox - 1);
  });
  shell.querySelector('.sg-lightbox-next').addEventListener('click', () => {
    if (state.lightbox < state.filtered.length - 1) openLightbox(state.lightbox + 1);
  });
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightboxEl.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && state.lightbox > 0) openLightbox(state.lightbox - 1);
    if (e.key === 'ArrowRight' && state.lightbox < state.filtered.length - 1) {
      openLightbox(state.lightbox + 1);
    }
  });

  const render = () => {
    applyFilters();
    const meta = data.buckets[state.bucket] || {};
    const photos = state.filtered.filter((i) => (i.display_kind || i.kind) === 'photo').length;
    const videos = state.filtered.filter((i) => i.kind === 'video' || i.display_kind === 'live-photo').length;
    summaryEl.textContent = `${state.filtered.length} items in ${meta.tab || state.bucket} - ${photos} photos, ${videos} clips. ${meta.description || ''}`;

    stageEl.replaceChildren();
    if (!state.filtered.length) {
      stageEl.innerHTML = '<p class="gallery-empty">No media matches these filters.</p>';
      return;
    }

    groupBySession(state.filtered).forEach((group) => {
      const section = document.createElement('section');
      section.className = 'sg-session';
      section.innerHTML = `
        <header class="sg-session-head">
          <h2>${group.label}</h2>
          <span>${group.items.length} items</span>
        </header>`;
      const grid = document.createElement('div');
      grid.className = 'sg-grid';

      group.items.forEach((item) => {
        const globalIndex = state.filtered.indexOf(item);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'sg-card';
        const badge = badgeFor(item);
        card.innerHTML = `
          <img src="${assetBase}${item.thumb}" alt="" loading="lazy" decoding="async">
          ${badge ? `<span class="sg-badge">${badge}</span>` : ''}`;
        card.addEventListener('click', () => openLightbox(globalIndex));
        grid.appendChild(card);
      });

      section.appendChild(grid);
      stageEl.appendChild(section);
    });
  };

  render();
}
