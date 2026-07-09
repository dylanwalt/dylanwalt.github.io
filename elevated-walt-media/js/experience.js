import {
  trackChapterView,
  trackVideoPlay,
  trackVideoProgress,
  trackVideoComplete,
  startVideoProgressTimer,
  stopVideoProgressTimer,
  trackClick,
} from './analytics.js';
import { resolvePath } from './utils.js';
import { initSafariGallery } from './safari-gallery.js';
import { initImagePortal } from './image-portal.js';

const loadedIframes = new Set();
const videoStates = new Map();

function chapterCategory(ch) {
  if (ch.category) return ch.category;
  return ch.id === 'aerial' ? 'general' : 'events';
}

export function renderExperience(lodge, basePath) {
  document.title = `${lodge.name} - Elevated Walt Media`;
  document.body.dataset.lodgeId = lodge.id;

  const galleryLogo = document.getElementById('gallery-logo');
  const heroTitle = document.getElementById('exp-title');
  const heroLoc = document.getElementById('exp-location');
  const lodgeLogo = resolvePath(basePath, lodge.logo);

  if (galleryLogo) {
    galleryLogo.src = lodgeLogo;
    galleryLogo.alt = `${lodge.name} logo`;
  }
  if (heroTitle) heroTitle.textContent = lodge.name;
  if (heroLoc) heroLoc.textContent = lodge.subtitle || lodge.location;

  renderDownloadAll(lodge);
  if (lodge.id === 'safari-plains') {
    void initSafariGallery(lodge, basePath);
    void initImagePortal(lodge, basePath);
  } else {
    renderGallery(lodge, basePath);
  }
  renderContact(lodge);
  if (lodge.id !== 'safari-plains') {
    setupGalleryTabs(lodge.id);
    setupChapterObserver(lodge);
    setupYouTubeAPI(lodge);
  }
}

function renderDownloadAll(lodge) {
  const btn = document.getElementById('btn-download-all');
  if (!btn) return;

  if (lodge.id === 'safari-plains') {
    btn.textContent = 'Request download';
    btn.href = safariDownloadMailto(lodge);
    btn.removeAttribute('target');
    btn.removeAttribute('rel');
    btn.classList.remove('is-disabled');
    btn.removeAttribute('aria-disabled');
    btn.addEventListener('click', () => trackClick(lodge.id, 'download_request', 'header'));
    return;
  }

  if (lodge.drivePackageUrl && lodge.drivePackageUrl !== 'REPLACE_DRIVE_URL') {
    btn.href = lodge.drivePackageUrl;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.addEventListener('click', () => trackClick(lodge.id, 'download_click', 'drive-package'));
  } else {
    btn.classList.add('is-disabled');
    btn.setAttribute('aria-disabled', 'true');
    btn.addEventListener('click', (e) => e.preventDefault());
  }
}

function renderContact(lodge) {
  const contact = document.getElementById('btn-contact');
  if (!contact) return;
  if (lodge.id === 'safari-plains') {
    contact.textContent = 'Request download';
    contact.href = safariDownloadMailto(lodge);
    contact.addEventListener('click', () => trackClick(lodge.id, 'download_request', 'footer'));
    return;
  }
  contact.href = `mailto:dylanwalt10@gmail.com?subject=${encodeURIComponent(`Footage inquiry - ${lodge.name}`)}`;
  contact.addEventListener('click', () => trackClick(lodge.id, 'cta_click', 'mailto'));
}

function safariDownloadMailto(lodge) {
  const subject = `Download request - ${lodge.name}`;
  const body = [
    'Hi Dylan,',
    '',
    'We would like to request the full-resolution download package for Safari Plains.',
    '',
    'Preferred drone clips (if any):',
    'Preferred photos (if any):',
    'Notes:',
    '',
    'Thank you,',
  ].join('\n');
  return `mailto:dylanwalt10@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function renderGallery(lodge, basePath) {
  const generalPanel = document.getElementById('panel-general');
  const eventsPanel = document.getElementById('panel-events');
  if (!lodge.chapters || !generalPanel || !eventsPanel) return;

  const general = lodge.chapters.filter((ch) => chapterCategory(ch) === 'general');
  const events = lodge.chapters.filter((ch) => chapterCategory(ch) === 'events');

  generalPanel.innerHTML = general.length
    ? general.map((ch) => renderEventBlock(ch, basePath)).join('')
    : '<p class="gallery-empty">No general footage published yet.</p>';

  eventsPanel.innerHTML = events.length
    ? events.map((ch) => renderEventBlock(ch, basePath)).join('')
    : '<p class="gallery-empty">No event footage published yet.</p>';

  void basePath;
}

function renderEventBlock(ch, basePath) {
  const videoHtml =
    ch.youtubeId && ch.youtubeId !== 'REPLACE_ME'
      ? `<div class="gallery-video" data-chapter="${ch.id}">
          <iframe
            id="yt-${ch.id}"
            data-src="https://www.youtube-nocookie.com/embed/${ch.youtubeId}?rel=0&modestbranding=1&enablejsapi=1"
            title="${ch.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"></iframe>
        </div>`
      : `<div class="gallery-video gallery-video--pending" data-chapter="${ch.id}">
          <p>Video preview coming soon</p>
        </div>`;

  const images = ch.images?.length
    ? ch.images
        .map(
          (img) => `
        <figure class="gallery-photo">
          <img src="${img.src?.startsWith('http') ? img.src : resolvePath(basePath, img.src)}" alt="${img.alt || ch.title}" loading="lazy">
          ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ''}
        </figure>`,
        )
        .join('')
    : `<div class="gallery-photo gallery-photo--placeholder" aria-hidden="true">
        <span>Photos coming soon</span>
      </div>`;

  return `
    <article class="gallery-event" id="chapter-${ch.id}" data-chapter="${ch.id}">
      <header class="gallery-event-header">
        <h2>${ch.title}</h2>
        <p>${ch.description || ''}</p>
      </header>
      <div class="gallery-event-media">
        ${videoHtml}
        <div class="gallery-photos">${images}</div>
      </div>
    </article>`;
}

function setupGalleryTabs(lodgeId) {
  const tabs = document.querySelectorAll('.gallery-tabs button');
  const panels = document.querySelectorAll('.gallery-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === target));
      trackClick(lodgeId, 'gallery_tab', target);
    });
  });
}

function setupChapterObserver(lodge) {
  const blocks = document.querySelectorAll('.gallery-event[data-chapter]');
  const seen = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const chapterId = entry.target.dataset.chapter;
        if (seen.has(chapterId)) return;
        seen.add(chapterId);
        trackChapterView(lodge.id, chapterId);
        lazyLoadIframe(chapterId);
      });
    },
    { threshold: 0.2 },
  );

  blocks.forEach((block) => observer.observe(block));
}

function lazyLoadIframe(chapterId) {
  const iframe = document.getElementById(`yt-${chapterId}`);
  if (!iframe || loadedIframes.has(chapterId)) return;
  const src = iframe.dataset.src;
  if (src) {
    iframe.src = src;
    loadedIframes.add(chapterId);
  }
}

function setupYouTubeAPI(lodge) {
  if (!lodge.chapters?.some((c) => c.youtubeId && c.youtubeId !== 'REPLACE_ME')) return;

  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }

  const prevReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    if (prevReady) prevReady();
    initPlayers(lodge);
  };

  if (window.YT?.Player) initPlayers(lodge);
}

function initPlayers(lodge) {
  lodge.chapters.forEach((ch) => {
    if (!ch.youtubeId || ch.youtubeId === 'REPLACE_ME') return;
    const el = document.getElementById(`yt-${ch.id}`);
    if (!el || el.dataset.playerInit) return;

    const checkAndInit = () => {
      if (!el.src) return;
      el.dataset.playerInit = '1';
      const player = new YT.Player(el.id, {
        events: {
          onStateChange: (event) => handlePlayerState(lodge.id, ch.id, ch.youtubeId, event),
        },
      });
      videoStates.set(ch.id, { player, seconds: 0 });
    };

    if (el.src) checkAndInit();
    else {
      const observer = new MutationObserver(() => {
        if (el.src) {
          observer.disconnect();
          checkAndInit();
        }
      });
      observer.observe(el, { attributes: true, attributeFilter: ['src'] });
    }
  });
}

function handlePlayerState(lodgeId, chapterId, youtubeId, event) {
  const YT = window.YT;
  if (event.data === YT.PlayerState.PLAYING) {
    trackVideoPlay(lodgeId, chapterId, youtubeId);
    startVideoProgressTimer(lodgeId, chapterId, () => {
      const state = videoStates.get(chapterId);
      return state?.player?.getCurrentTime?.() ?? 0;
    });
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    stopVideoProgressTimer(chapterId);
    if (event.data === YT.PlayerState.ENDED) {
      trackVideoComplete(lodgeId, chapterId, youtubeId);
    }
  }
}

export { resolvePath };
