const STORAGE_KEY = 'safari-plains-editor-decisions';

let data = null;
let state = {
  source: 'drone',
  groupMode: 'drone_tier',
  activeGroup: 'all',
  search: '',
  kind: 'all',
  hideRemoved: true,
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const DRONE_TIER_LABELS = {
  hero: { title: 'Hero clips', desc: 'Production-ready aerial - full grade and portal hero use.' },
  usable: { title: 'Usable B-roll', desc: 'Good aerial cutaways for chapters and social.' },
  rough: { title: 'Rough / BTS', desc: 'Tests, calibration, not for client-facing use.' },
  pending: { title: 'Pending review', desc: 'Needs multi-frame drone analysis.' },
  photos: { title: 'Drone stills', desc: 'DJI photo captures from flight.' },
  'no-tier': { title: 'Other drone', desc: 'Drone assets without tier label.' },
};

async function init() {
  const res = await fetch('editor-index.json');
  if (!res.ok) throw new Error('Failed to load editor-index.json');
  data = await res.json();
  loadDecisions();
  bindUI();
  render();
}

function loadDecisions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    data.items.forEach((item) => {
      if (saved[item.id]) item.editor_decision = saved[item.id];
    });
  } catch {
    /* ignore */
  }
}

function saveDecisions() {
  const map = {};
  data.items.forEach((i) => {
    map[i.id] = i.editor_decision;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function bindUI() {
  $$('.source-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.source-tab').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.source = btn.dataset.source;
      state.activeGroup = 'all';
      if (state.source === 'drone' && state.groupMode === 'bucket') {
        state.groupMode = 'drone_tier';
        $$('.filter-btn').forEach((b) => b.classList.remove('active'));
        $$('.filter-btn[data-filter="drone_tier"]').forEach((b) => b.classList.add('active'));
      }
      render();
    });
  });

  $$('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.groupMode = btn.dataset.filter;
      state.activeGroup = 'all';
      render();
    });
  });

  $('#search').addEventListener('input', (e) => {
    state.search = e.target.value.toLowerCase();
    renderGrid();
  });

  $('#kind-filter').addEventListener('change', (e) => {
    state.kind = e.target.value;
    renderGrid();
  });

  $('#hide-removed').addEventListener('change', (e) => {
    state.hideRemoved = e.target.checked;
    renderGrid();
  });

  $('#btn-export').addEventListener('click', exportDecisions);
  $('#btn-reset').addEventListener('click', () => {
    if (!confirm('Reset all editor decisions to defaults?')) return;
    localStorage.removeItem(STORAGE_KEY);
    data.items.forEach((i) => {
      i.editor_decision = i.default_decision;
    });
    render();
  });
}

function exportDecisions() {
  const payload = {
    exported_at: new Date().toISOString(),
    property: data.property,
    counts: countDecisions(filteredItems()),
    items: filteredItems().map((i) => ({
      id: i.id,
      filename: i.filename,
      media_family: i.media_family,
      drone_tier: i.drone_tier,
      bucket: i.bucket,
      visual_category: i.visual_category,
      decision: i.editor_decision,
      suggested_uses: i.suggested_uses,
    })),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'safari-plains-editor-decisions.json';
  a.click();
}

function filteredItems() {
  return data.items.filter((item) => {
    if (state.source !== 'all' && item.media_family !== state.source) return false;
    if (state.kind !== 'all') {
      const dk = item.display_kind || item.kind;
      if (state.kind === 'live-photo' && dk !== 'live-photo') return false;
      if (state.kind === 'photo' && item.kind !== 'photo') return false;
      if (state.kind === 'video' && item.kind !== 'video') return false;
    }
    if (state.search) {
      const hay = `${item.filename} ${item.drone_summary || ''} ${item.visual_category}`.toLowerCase();
      if (!hay.includes(state.search)) return false;
    }
    if (state.groupMode !== 'decision' && state.activeGroup !== 'all') {
      if (groupKey(item) !== state.activeGroup) return false;
    }
    if (state.groupMode === 'decision' && state.activeGroup !== 'all') {
      if (item.editor_decision !== state.activeGroup) return false;
    }
    if (state.hideRemoved && item.editor_decision === 'remove') return false;
    return true;
  });
}

function groupKey(item) {
  if (state.groupMode === 'drone_tier') {
    if (item.media_family !== 'drone') return 'phone-other';
    if (item.kind === 'photo' && !item.drone_tier) return 'photos';
    if (item.kind === 'photo') return 'photos';
    return item.drone_tier || 'no-tier';
  }
  if (state.groupMode === 'bucket') return item.bucket;
  if (state.groupMode === 'category') return item.visual_category;
  return item.editor_decision;
}

function countDecisions(items = data.items) {
  return items.reduce(
    (acc, i) => {
      acc[i.editor_decision] = (acc[i.editor_decision] || 0) + 1;
      return acc;
    },
    { keep: 0, review: 0, remove: 0 },
  );
}

function render() {
  renderStats();
  renderFilterList();
  renderGrid();
}

function renderStats() {
  const scope = data.items.filter((i) => state.source === 'all' || i.media_family === state.source);
  const c = countDecisions(scope);
  const fam = data.by_media_family || {};
  $('#stats-panel').innerHTML = `
    <dl>
      <dt>Drone assets</dt><dd>${fam.drone ?? '-'}</dd>
      <dt>Phone assets</dt><dd>${fam.phone ?? '-'}</dd>
      <dt>In view</dt><dd>${scope.length}</dd>
      <dt>Keep</dt><dd>${c.keep}</dd>
      <dt>Review</dt><dd>${c.review}</dd>
      <dt>Remove</dt><dd>${c.remove}</dd>
    </dl>`;
}

function renderFilterList() {
  const items = data.items.filter((i) => state.source === 'all' || i.media_family === state.source);
  const counts = {};
  items.forEach((item) => {
    const k = groupKey(item);
    counts[k] = (counts[k] || 0) + 1;
  });

  const chips = [{ key: 'all', label: 'Show all', count: items.length }];
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([key, count]) => {
      let label = key;
      if (state.groupMode === 'drone_tier' && DRONE_TIER_LABELS[key]) {
        label = DRONE_TIER_LABELS[key].title;
      } else if (state.groupMode === 'bucket' && data.bucket_site_map[key]) {
        label = data.bucket_site_map[key].lodge_lens_tab || key;
      }
      chips.push({ key, label, count });
    });

  const list = $('#filter-list');
  list.innerHTML = chips
    .map(
      (c) => `
    <button type="button" class="filter-chip ${state.activeGroup === c.key ? 'active' : ''}" data-key="${c.key}">
      ${c.label} <span>${c.count}</span>
    </button>`,
    )
    .join('');

  list.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.activeGroup = chip.dataset.key;
      renderFilterList();
      renderGrid();
    });
  });
}

function renderGrid() {
  const items = filteredItems();
  const counts = countDecisions(items);
  $('#visible-count').textContent = `${items.length} visible`;
  $('#keep-count').textContent = `${counts.keep} keep`;
  $('#review-count').textContent = `${counts.review} review`;
  $('#remove-count').textContent = `${counts.remove} remove`;

  const groups = new Map();
  items.forEach((item) => {
    const k = state.groupMode === 'decision' ? item.bucket : groupKey(item);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(item);
  });

  const area = $('#content-area');
  area.innerHTML = '';

  const order = ['hero', 'usable', 'rough', 'photos', 'pending', 'no-tier'];
  const entries = [...groups.entries()].sort((a, b) => {
    if (state.groupMode !== 'drone_tier') return 0;
    return order.indexOf(a[0]) - order.indexOf(b[0]);
  });

  entries.forEach(([groupId, groupItems]) => {
    const block = document.createElement('section');
    block.className = 'section-block';
    block.appendChild(sectionHeader(groupId, groupItems.length));

    const grid = document.createElement('div');
    grid.className = 'media-grid';
    groupItems.forEach((item) => grid.appendChild(renderCard(item)));
    block.appendChild(grid);
    area.appendChild(block);
  });
}

function sectionHeader(groupId, count) {
  const el = document.createElement('header');
  el.className = 'section-header';

  let title = groupId;
  let desc = '';
  let siteMap = '';

  if (state.groupMode === 'drone_tier' && DRONE_TIER_LABELS[groupId]) {
    title = DRONE_TIER_LABELS[groupId].title;
    desc = DRONE_TIER_LABELS[groupId].desc;
  } else if (state.groupMode === 'bucket' && data.bucket_site_map[groupId]) {
    const b = data.bucket_site_map[groupId];
    title = b.lodge_lens_tab;
    desc = b.description;
    siteMap = `Maps to Lodge Lens: ${b.chapters.join(', ')} chapter(s)`;
  } else if (state.groupMode === 'category') {
    title = groupId.replace(/-/g, ' ');
    desc = categoryBlurb(groupId);
  }

  el.innerHTML = `
    <div>
      <h2>${title} <span class="count">(${count})</span></h2>
      ${desc ? `<p class="section-meta">${desc}</p>` : ''}
      ${siteMap ? `<p class="site-map">${siteMap}</p>` : ''}
    </div>
    <div class="bulk-bar">
      <button type="button" data-bulk="keep" data-group="${groupId}">Keep all</button>
      <button type="button" data-bulk="review" data-group="${groupId}">Review all</button>
      <button type="button" data-bulk="remove" data-group="${groupId}">Remove all</button>
    </div>`;

  el.querySelectorAll('[data-bulk]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const decision = btn.dataset.bulk;
      const gid = btn.dataset.group;
      filteredItems()
        .filter((i) => groupKey(i) === gid || state.groupMode === 'decision')
        .forEach((i) => {
          i.editor_decision = decision;
        });
      saveDecisions();
      render();
    });
  });

  return el;
}

function categoryBlurb(cat) {
  const map = {
    'aerial-drone': 'DJI aerial footage for hero and overview chapters.',
    'wildlife-game-drive': 'Game drive sightings.',
    'wine-tasting': 'Wine experience content.',
    'dining-food': 'Restaurant and bush dining.',
    'bush-outdoor-lifestyle': 'Outdoor portraits and sunset bush scenes.',
    'lodge-lifestyle': 'Property, decks, tents, and amenities.',
    'provisioning-travel': 'Roadside stops - usually exclude.',
    'behind-scenes-bts': 'Team and scouting - exclude.',
  };
  return map[cat] || '';
}

function renderCard(item) {
  const card = document.createElement('article');
  card.className = 'media-card';
  card.dataset.decision = item.editor_decision;

  const thumb = item.thumb
    ? `<img src="${item.thumb}" alt="" loading="lazy">`
    : `<div class="thumb-placeholder">${item.display_kind || item.kind}</div>`;

  const badgeLabel = item.display_kind === 'live-photo' ? 'live' : item.kind;
  const tierBadge =
    item.drone_tier && item.kind === 'video'
      ? `<span class="badge badge-tier badge-${item.drone_tier}">${item.drone_tier}</span>`
      : '';

  const uses = item.suggested_uses.length
    ? `<ul class="uses">${item.suggested_uses.slice(0, 3).map((u) => `<li>${u}</li>`).join('')}</ul>`
    : '<p class="editor-note">No client use suggested.</p>';

  card.innerHTML = `
    <div class="media-card-thumb" data-id="${item.id}">
      ${thumb}
      <span class="badge ${item.kind === 'video' ? 'badge-video' : ''}">${badgeLabel}</span>
      ${tierBadge}
    </div>
    <div class="media-card-body">
      <h3 title="${item.filename}">${item.filename}</h3>
      <p class="meta-line">${item.drone_summary || item.visual_category}${item.duration_sec ? ` · ${item.duration_sec}s` : ''}</p>
      ${uses}
      <p class="editor-note">${item.editor_note}</p>
      <div class="decision-row">
        <button type="button" class="decision-btn ${item.editor_decision === 'keep' ? 'active' : ''}" data-v="keep">Keep</button>
        <button type="button" class="decision-btn ${item.editor_decision === 'review' ? 'active' : ''}" data-v="review">Review</button>
        <button type="button" class="decision-btn ${item.editor_decision === 'remove' ? 'active' : ''}" data-v="remove">Remove</button>
      </div>
    </div>`;

  card.querySelector('.media-card-thumb').addEventListener('click', () => openDetail(item));

  card.querySelectorAll('.decision-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      item.editor_decision = btn.dataset.v;
      saveDecisions();
      render();
    });
  });

  return card;
}

function openDetail(item) {
  const dlg = $('#detail-dialog');
  $('#detail-title').textContent = item.filename;
  const uses = item.suggested_uses.map((u) => `<li>${u}</li>`).join('');
  $('#detail-body').innerHTML = `
    <div class="detail-preview">
      ${item.thumb ? `<img src="${item.thumb}" alt="">` : '<p>No thumbnail available</p>'}
    </div>
    <dl>
      <dt>Source</dt><dd>${item.media_family}</dd>
      <dt>Display</dt><dd>${item.display_kind || item.kind}</dd>
      <dt>Drone tier</dt><dd>${item.drone_tier || '-'}</dd>
      <dt>Bucket</dt><dd>${item.bucket}</dd>
      <dt>Category</dt><dd>${item.visual_category}</dd>
      <dt>Captured</dt><dd>${item.captured_at || '-'}</dd>
      <dt>Duration</dt><dd>${item.duration_sec ? `${item.duration_sec}s` : '-'}</dd>
      <dt>Size</dt><dd>${formatBytes(item.size_bytes)}</dd>
    </dl>
    ${item.drone_summary ? `<p class="editor-note"><strong>Scene:</strong> ${item.drone_summary}</p>` : ''}
    <div>
      <strong>Suggested uses</strong>
      <ul>${uses || '<li>None</li>'}</ul>
    </div>
    <p class="editor-note">${item.editor_note}</p>`;
  dlg.showModal();
}

function formatBytes(n) {
  if (!n) return '-';
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

init().catch((err) => {
  document.body.innerHTML = `<pre style="padding:2rem;color:#b85c4a">Failed to load editor: ${err.message}</pre>`;
});
