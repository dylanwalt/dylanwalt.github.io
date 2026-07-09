/**
 * Safari Plains drone gallery - numbered clips across three events.
 */
import { resolvePath } from './utils.js';
import { trackClick } from './analytics.js';

const EVENT_ORDER = ['bush-picnic', 'wine-1', 'wine-2'];

export async function initSafariGallery(lodge, basePath) {
  const root = document.getElementById('safari-gallery-root');
  if (!root) return;

  const indexUrl = resolvePath(
    basePath,
    'assets/media/safari-plains/drone-gallery/drone-gallery-index.json',
  );

  let data;
  try {
    const res = await fetch(indexUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch {
    root.innerHTML =
      '<p class="gallery-empty">Drone gallery is being prepared. Check back shortly.</p>';
    return;
  }

  const state = { event: EVENT_ORDER[0], active: 0 };

  const shell = document.createElement('div');
  shell.className = 'safari-gallery safari-gallery--drone';
  shell.innerHTML = `
    <div class="sg-toolbar">
      <p class="sg-intro">Numbered drone clips - tell us which to move between events, e.g. "move Drone 07 to Wine Event 2".</p>
      <div class="sg-tabs" role="tablist" aria-label="Event chapters"></div>
      <p class="sg-summary" aria-live="polite"></p>
    </div>
    <div class="sg-layout">
      <div class="sg-player-panel">
        <div class="sg-player-wrap">
          <video class="sg-player" controls playsinline preload="metadata" poster=""></video>
        </div>
        <div class="sg-player-meta">
          <h2 class="sg-player-title"></h2>
          <p class="sg-player-desc"></p>
          <p class="sg-player-note"></p>
        </div>
      </div>
      <div class="sg-clip-list" role="listbox" aria-label="Drone clips"></div>
    </div>`;
  root.replaceChildren(shell);

  const tabsEl = shell.querySelector('.sg-tabs');
  const summaryEl = shell.querySelector('.sg-summary');
  const listEl = shell.querySelector('.sg-clip-list');
  const player = shell.querySelector('.sg-player');
  const titleEl = shell.querySelector('.sg-player-title');
  const descEl = shell.querySelector('.sg-player-desc');
  const noteEl = shell.querySelector('.sg-player-note');

  const clipsForEvent = (eventKey) =>
    data.clips.filter((c) => c.event === eventKey).sort((a, b) => a.number - b.number);

  const setActive = (clip, indexInList) => {
    state.active = indexInList;
    const videoUrl = resolvePath(basePath, `assets/media/safari-plains/drone-gallery/${clip.video}`);
    const posterUrl = clip.poster
      ? resolvePath(basePath, `assets/media/safari-plains/drone-gallery/${clip.poster}`)
      : '';

    player.pause();
    player.removeAttribute('src');
    player.innerHTML = '';
    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = 'video/mp4';
    player.appendChild(source);
    if (posterUrl) player.poster = posterUrl;
    player.load();

    titleEl.textContent = `${clip.label} - ${clip.subject || 'Aerial clip'}`;
    descEl.textContent = clip.summary || '';
    noteEl.textContent = clip.hero_notes ? `Editor note: ${clip.hero_notes}` : '';
    noteEl.hidden = !clip.hero_notes;

    listEl.querySelectorAll('.sg-clip-btn').forEach((btn, i) => {
      btn.classList.toggle('is-active', i === indexInList);
      btn.setAttribute('aria-selected', i === indexInList ? 'true' : 'false');
    });

    trackClick(lodge.id, 'drone_clip_play', clip.label);
  };

  const renderEvent = (eventKey) => {
    const clips = clipsForEvent(eventKey);
    const meta = data.events[eventKey] || {};
    summaryEl.textContent = `${clips.length} drone clip${clips.length === 1 ? '' : 's'} - ${meta.description || ''}`;

    listEl.replaceChildren();
    if (!clips.length) {
      listEl.innerHTML = '<p class="gallery-empty">No clips assigned yet. Reference a drone number to place it here.</p>';
      player.removeAttribute('poster');
      titleEl.textContent = 'No clip selected';
      descEl.textContent = '';
      noteEl.hidden = true;
      return;
    }

    clips.forEach((clip, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sg-clip-btn';
      btn.setAttribute('role', 'option');
      const posterSrc = clip.poster
        ? resolvePath(basePath, `assets/media/safari-plains/drone-gallery/${clip.poster}`)
        : '';
      btn.innerHTML = `
        ${posterSrc ? `<img src="${posterSrc}" alt="" loading="lazy">` : ''}
        <span class="sg-clip-num">${clip.label}</span>
        <span class="sg-clip-sub">${clip.subject || ''}</span>
        <span class="sg-clip-dur">${formatDur(clip.duration_sec)}</span>`;
      btn.addEventListener('click', () => setActive(clip, index));
      listEl.appendChild(btn);
    });

    setActive(clips[0], 0);
  };

  EVENT_ORDER.forEach((key) => {
    const meta = data.events[key];
    if (!meta) return;
    const count = clipsForEvent(key).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `sg-tab${key === state.event ? ' is-active' : ''}`;
    btn.dataset.event = key;
    btn.setAttribute('role', 'tab');
    btn.innerHTML = `${meta.label} <span>${count}</span>`;
    btn.addEventListener('click', () => {
      state.event = key;
      tabsEl.querySelectorAll('.sg-tab').forEach((t) => {
        t.classList.toggle('is-active', t.dataset.event === key);
      });
      trackClick(lodge.id, 'gallery_tab', key);
      renderEvent(key);
    });
    tabsEl.appendChild(btn);
  });

  renderEvent(state.event);
}

function formatDur(sec) {
  if (!sec) return '';
  const s = Math.round(sec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m ? `${m}m ${r}s` : `${r}s`;
}
