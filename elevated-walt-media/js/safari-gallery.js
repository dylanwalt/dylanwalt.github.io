/**

 * Safari Plains drone gallery - numbered clips + stills across three events.

 */

import { resolvePath } from './utils.js';

import { trackClick } from './analytics.js';



const EVENT_ORDER = ['bush-picnic', 'wine-1', 'wine-2'];



export async function initSafariGallery(lodge, basePath) {

  const root = document.getElementById('safari-gallery-root');

  if (!root) return;



  const droneUrl = resolvePath(

    basePath,

    'assets/media/safari-plains/drone-gallery/drone-gallery-index.json',

  );

  const photoUrl = resolvePath(

    basePath,

    'assets/media/safari-plains/event-photos/event-photos-index.json',

  );



  let data;

  try {

    const res = await fetch(droneUrl);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    data = await res.json();

  } catch {

    root.innerHTML =

      '<p class="gallery-empty">Drone gallery is being prepared. Check back shortly.</p>';

    return;

  }



  let photoData = { photos: [], note: '', count: 0, events: data.events };

  try {

    const res = await fetch(photoUrl);

    if (res.ok) photoData = await res.json();

  } catch {

    /* stills optional */

  }



  const state = { event: EVENT_ORDER[0], active: 0 };



  const shell = document.createElement('div');

  shell.className = 'safari-gallery safari-gallery--drone';

  shell.innerHTML = `

    <div class="sg-toolbar">

      <p class="sg-footage-label">Footage</p>

      <p class="sg-intro">Numbered drone clips and stills - reference by number when giving feedback.</p>

      <div class="sg-tabs" role="tablist" aria-label="Event chapters"></div>

    </div>

    <div class="sg-layout">

      <div class="sg-player-panel">

        <div class="sg-player-wrap">

          <video class="sg-player" controls playsinline preload="metadata" poster=""></video>

        </div>

        <div class="sg-player-meta">

          <h2 class="sg-player-title"></h2>

        </div>

      </div>

      <div class="sg-clip-list" role="listbox" aria-label="Drone clips"></div>

    </div>

    <section class="sg-stills" aria-label="Event stills">

      <header class="sg-stills-head">

        <h2 class="sg-stills-title">Stills</h2>

        <p class="sg-stills-lead"></p>

        <p class="sg-stills-count"></p>

      </header>

      <div class="sg-stills-grid" role="list"></div>

    </section>

    <dialog class="sg-photo-lightbox" aria-label="Photo preview">

      <button type="button" class="sg-photo-close" aria-label="Close">&times;</button>

      <img class="sg-photo-full" alt="">

      <p class="sg-photo-caption"></p>

    </dialog>`;

  root.replaceChildren(shell);



  const tabsEl = shell.querySelector('.sg-tabs');

  const listEl = shell.querySelector('.sg-clip-list');

  const player = shell.querySelector('.sg-player');

  const titleEl = shell.querySelector('.sg-player-title');

  const stillsLead = shell.querySelector('.sg-stills-lead');

  const stillsCount = shell.querySelector('.sg-stills-count');

  const stillsGrid = shell.querySelector('.sg-stills-grid');

  const dialog = shell.querySelector('.sg-photo-lightbox');

  const fullImg = shell.querySelector('.sg-photo-full');

  const caption = shell.querySelector('.sg-photo-caption');



  stillsLead.textContent =

    photoData.note ||

    'Numbered stills for this event. Tell us the photo number if placement should move.';



  const clipsForEvent = (eventKey) =>

    data.clips.filter((c) => c.event === eventKey).sort((a, b) => a.number - b.number);



  const photosForEvent = (eventKey) =>

    (photoData.photos || [])

      .filter((p) => p.event === eventKey)

      .sort((a, b) => a.number - b.number);



  const openPhoto = (photo) => {

    fullImg.src = resolvePath(

      basePath,

      `assets/media/safari-plains/event-photos/${photo.full}`,

    );

    caption.textContent = photo.captured_at

      ? `${photo.label} · ${formatStamp(photo.captured_at)}`

      : photo.label;

    dialog.showModal();

    trackClick(lodge.id, 'event_photo_open', photo.label);

  };



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



    titleEl.textContent = clip.label;



    listEl.querySelectorAll('.sg-clip-btn').forEach((btn, i) => {

      btn.classList.toggle('is-active', i === indexInList);

      btn.setAttribute('aria-selected', i === indexInList ? 'true' : 'false');

    });



    trackClick(lodge.id, 'drone_clip_play', clip.label);

  };



  const renderStills = (eventKey) => {

    const photos = photosForEvent(eventKey);

    stillsGrid.replaceChildren();

    stillsCount.textContent = photos.length

      ? `${photos.length} photo${photos.length === 1 ? '' : 's'} in this event`

      : 'No stills in this event yet';



    if (!photos.length) {

      stillsGrid.innerHTML =

        '<p class="gallery-empty">No stills assigned here yet. Reference a photo number to move one in.</p>';

      return;

    }



    photos.forEach((photo) => {

      const btn = document.createElement('button');

      btn.type = 'button';

      btn.className = 'sg-still-card';

      btn.setAttribute('role', 'listitem');

      btn.id = `photo-${photo.number}`;

      const thumbSrc = resolvePath(

        basePath,

        `assets/media/safari-plains/event-photos/${photo.thumb}`,

      );

      const stamp = photo.captured_at ? formatStamp(photo.captured_at) : '';

      btn.innerHTML = `

        <img src="${thumbSrc}" alt="" loading="lazy">

        <span class="sg-still-num">${photo.label}</span>

        ${stamp ? `<span class="sg-still-time">${stamp}</span>` : ''}`;

      btn.addEventListener('click', () => openPhoto(photo));

      stillsGrid.appendChild(btn);

    });

  };



  const renderEvent = (eventKey) => {

    const clips = clipsForEvent(eventKey);



    listEl.replaceChildren();

    if (!clips.length) {

      listEl.innerHTML =

        '<p class="gallery-empty">No clips assigned yet. Reference a drone number to place it here.</p>';

      player.removeAttribute('poster');

      titleEl.textContent = 'No clip selected';

    } else {

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

          <span class="sg-clip-dur">${formatDur(clip.duration_sec)}</span>`;

        btn.addEventListener('click', () => setActive(clip, index));

        listEl.appendChild(btn);

      });

      setActive(clips[0], 0);

    }



    renderStills(eventKey);

  };



  const refreshTabCounts = () => {

    tabsEl.querySelectorAll('.sg-tab').forEach((btn) => {

      const key = btn.dataset.event;

      const clipCount = clipsForEvent(key).length;

      const photoCount = photosForEvent(key).length;

      const countEl = btn.querySelector('.sg-tab-count');

      if (countEl) {

        countEl.textContent = `${clipCount} · ${photoCount}`;

        countEl.setAttribute(

          'aria-label',

          `${clipCount} clips, ${photoCount} photos`,

        );

      }

    });

  };



  EVENT_ORDER.forEach((key) => {

    const meta = data.events[key] || photoData.events?.[key];

    if (!meta) return;

    const clipCount = clipsForEvent(key).length;

    const photoCount = photosForEvent(key).length;

    const btn = document.createElement('button');

    btn.type = 'button';

    btn.className = `sg-tab${key === state.event ? ' is-active' : ''}`;

    btn.dataset.event = key;

    btn.setAttribute('role', 'tab');

    btn.innerHTML = `<span class="sg-tab-label">${meta.label}</span><span class="sg-tab-count" aria-label="${clipCount} clips, ${photoCount} photos">${clipCount} · ${photoCount}</span>`;

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



  shell.querySelector('.sg-photo-close').addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (e) => {

    if (e.target === dialog) dialog.close();

  });



  refreshTabCounts();

  renderEvent(state.event);

}



function formatDur(sec) {

  if (!sec) return '';

  const s = Math.round(sec);

  const m = Math.floor(s / 60);

  const r = s % 60;

  return m ? `${m}m ${r}s` : `${r}s`;

}



function formatStamp(iso) {

  if (!iso) return '';

  const m = String(iso).match(/T(\d{2}):(\d{2})/);

  if (!m) return iso;

  return `${m[1]}:${m[2]}`;

}

