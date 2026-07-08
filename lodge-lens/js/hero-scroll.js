/**
 * Scroll-scrubbed cinematic hero - video currentTime tracks scroll position.
 * Fetches the clip as a blob so seeking works without HTTP range support (python -m http.server).
 */
export function initCinemaHero() {
  const section = document.getElementById('cinema-hero');
  const video = section?.querySelector('.cinema-video');
  const header = document.querySelector('.site-header--hero');
  if (!section || !video) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const src =
    video.getAttribute('src') ||
    video.querySelector('source')?.getAttribute('src') ||
    '';
  if (!src) return;

  const fallbackDuration = parseFloat(section.dataset.duration || video.dataset.duration || '4.5');
  let duration = fallbackDuration;
  let ready = false;
  let lastSeek = -1;
  let blobUrl = null;

  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

  const scrollProgress = () => {
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    return clamp(-section.getBoundingClientRect().top / scrollable, 0, 1);
  };

  const seekTo = (time) => {
    const t = clamp(time, 0, Math.max(0, duration - 0.033));
    if (Math.abs(lastSeek - t) < 0.008) return;
    lastSeek = t;
    video.pause();
    if (typeof video.fastSeek === 'function') {
      video.fastSeek(t);
    } else {
      video.currentTime = t;
    }
  };

  const tick = () => {
    if (ready) {
      const progress = scrollProgress();
      seekTo(progress * duration);

      const scale = 1.04 - progress * 0.04;
      video.style.transform = `scale(${scale})`;
      section.style.setProperty('--cinema-progress', String(progress));

      if (header) {
        header.classList.toggle('is-solid', progress > 0.75 || window.scrollY > window.innerHeight * 0.45);
      }
    }
    requestAnimationFrame(tick);
  };

  const activate = () => {
    if (ready) return;
    duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) duration = fallbackDuration;
    ready = true;
    video.pause();
    section.classList.add('is-video-ready');
    lastSeek = -1;
    seekTo(scrollProgress() * duration);
  };

  const bindVideo = () => {
    video.addEventListener('loadeddata', activate, { once: true });
    video.addEventListener('canplaythrough', activate, { once: true });
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) activate();
    else video.load();
  };

  const prepare = async () => {
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      blobUrl = URL.createObjectURL(blob);
      video.src = blobUrl;
      bindVideo();
    } catch {
      video.src = src;
      bindVideo();
    }
  };

  video.addEventListener('error', () => {
    section.classList.remove('is-video-ready');
    video.classList.add('is-hidden');
  });

  window.addEventListener('pagehide', () => {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  });

  prepare();
  requestAnimationFrame(tick);
}
