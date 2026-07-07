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

const loadedIframes = new Set();
const videoStates = new Map();

export function renderExperience(lodge, basePath) {
  document.title = `${lodge.name} - Lodge Lens`;
  document.body.dataset.lodgeId = lodge.id;

  const heroTitle = document.getElementById('exp-title');
  const heroLoc = document.getElementById('exp-location');
  if (heroTitle) heroTitle.textContent = lodge.name;
  if (heroLoc) heroLoc.textContent = lodge.subtitle || lodge.location;

  renderChapterNav(lodge);
  renderChapters(lodge, basePath);
  renderActions(lodge);
  setupChapterObserver(lodge);
  setupYouTubeAPI(lodge);
}

function renderChapterNav(lodge) {
  const nav = document.getElementById('chapter-nav');
  if (!nav || !lodge.chapters) return;

  nav.innerHTML = lodge.chapters
    .map(
      (ch) =>
        `<a href="#chapter-${ch.id}" data-chapter="${ch.id}">${ch.title}</a>`,
    )
    .join('');
}

function renderChapters(lodge, basePath) {
  const container = document.getElementById('chapters');
  if (!container || !lodge.chapters) return;

  container.innerHTML = lodge.chapters
    .map(
      (ch) => `
    <section class="chapter" id="chapter-${ch.id}" data-chapter="${ch.id}">
      <div class="container">
        <h2>${ch.title}</h2>
        <p class="desc">${ch.description || ''}</p>
        <div class="video-wrap" data-youtube-id="${ch.youtubeId}" data-chapter="${ch.id}">
          ${
            ch.youtubeId && ch.youtubeId !== 'REPLACE_ME'
              ? `<iframe
              id="yt-${ch.id}"
              data-src="https://www.youtube-nocookie.com/embed/${ch.youtubeId}?rel=0&modestbranding=1&enablejsapi=1"
              title="${ch.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"></iframe>`
              : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--muted);padding:2rem;text-align:center;">
              Add YouTube video ID in config (see docs/YOUTUBE_SETUP.md)
            </div>`
          }
        </div>
      </div>
    </section>`,
    )
    .join('');

  void basePath;
}

function renderActions(lodge) {
  const download = document.getElementById('btn-download');
  const contact = document.getElementById('btn-contact');

  if (download && lodge.drivePackageUrl && lodge.drivePackageUrl !== 'REPLACE_DRIVE_URL') {
    download.href = lodge.drivePackageUrl;
    download.target = '_blank';
    download.rel = 'noopener';
    download.addEventListener('click', () => trackClick(lodge.id, 'download_click', 'drive-package'));
  } else if (download) {
    download.style.display = 'none';
  }

  if (contact) {
    contact.href = `mailto:dylanwalt10@gmail.com?subject=${encodeURIComponent(`Footage inquiry - ${lodge.name}`)}`;
    contact.addEventListener('click', () => trackClick(lodge.id, 'cta_click', 'mailto'));
  }
}

function setupChapterObserver(lodge) {
  const chapters = document.querySelectorAll('.chapter[data-chapter]');
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
    { threshold: 0.35 },
  );

  chapters.forEach((ch) => observer.observe(ch));

  const navLinks = document.querySelectorAll('#chapter-nav a');
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.chapter;
          navLinks.forEach((a) => a.classList.toggle('active', a.dataset.chapter === id));
        }
      });
    },
    { rootMargin: '-40% 0px -40% 0px' },
  );
  chapters.forEach((ch) => navObserver.observe(ch));
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
