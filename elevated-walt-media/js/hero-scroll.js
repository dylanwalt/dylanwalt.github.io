/**
 * Scroll-scrubbed cinematic hero - canvas frame sequence (instant seek, no video buffer).
 */
import { resolvePath } from './utils.js';

const PRELOAD_BATCH = 24;

export function initCinemaHero(options = {}) {
  const { onProgress } = options;
  const section = document.getElementById('cinema-hero');
  const canvas = section?.querySelector('.cinema-canvas');
  const poster = section?.querySelector('.cinema-poster');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return Promise.resolve();
  }

  if (!section || !canvas) {
    return Promise.resolve();
  }

  const basePath = document.body.dataset.basePath || '';
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return Promise.resolve();

  const fallbackDuration = parseFloat(section.dataset.duration || '4.5');
  let frameCount = Math.round(fallbackDuration * 60);
  let frames = [];
  let loaded = 0;
  let ready = false;
  let lastIndex = -1;
  let manifest = null;

  let resolveReady = () => {};
  const readyPromise = new Promise((resolve) => {
    resolveReady = resolve;
  });

  const reportProgress = () => {
    onProgress?.(loaded, frameCount);
  };

  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

  const scrollProgress = () => {
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    return clamp(-section.getBoundingClientRect().top / scrollable, 0, 1);
  };

  const frameIndex = (progress) =>
    clamp(Math.round(progress * Math.max(0, frameCount - 1)), 0, frameCount - 1);

  const drawCover = (img) => {
    if (!img?.complete || !img.naturalWidth) return;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (!cw || !ch) return;
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let sw;
    let sh;
    let sx;
    let sy;
    if (ir > cr) {
      sh = img.naturalHeight;
      sw = sh * cr;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / cr;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  };

  const drawFrame = (index) => {
    if (index === lastIndex) return;
    const img = frames[index];
    if (!img) return;
    lastIndex = index;
    drawCover(img);
    if (poster) poster.classList.add('is-hidden');
  };

  const loadImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load ${url}`));
      img.src = url;
    });

  const loadFrame = async (index, url) => {
    const img = await loadImage(url);
    frames[index] = img;
    loaded += 1;
    reportProgress();
    if (index === 0) drawFrame(0);
    return img;
  };

  const preloadAll = async (urls) => {
    if (urls.length === 0) return;
    frameCount = urls.length;
    reportProgress();
    await loadFrame(0, urls[0]);
    for (let i = 1; i < urls.length; i += PRELOAD_BATCH) {
      const batch = urls.slice(i, i + PRELOAD_BATCH);
      await Promise.all(batch.map((url, j) => loadFrame(i + j, url)));
    }
  };

  const activate = () => {
    if (ready) return;
    ready = true;
    section.classList.add('is-video-ready');
    lastIndex = -1;
    drawFrame(frameIndex(scrollProgress()));
  };

  const tick = () => {
    if (ready) {
      const progress = scrollProgress();
      drawFrame(frameIndex(progress));

      const scale = 1.04 - progress * 0.04;
      canvas.style.transform = `scale(${scale})`;

      section.style.setProperty('--cinema-progress', String(progress));
    }
    requestAnimationFrame(tick);
  };

  const prepare = async () => {
    try {
      const manifestUrl = resolvePath(basePath, 'assets/video/hero-frames/manifest.json');
      const res = await fetch(manifestUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      manifest = await res.json();
      frameCount = manifest.frameCount || frameCount;
      reportProgress();

      const posterPath = resolvePath(
        basePath,
        `assets/video/hero-frames/${manifest.poster || manifest.frames[0]}`,
      );
      if (poster) {
        poster.src = posterPath;
        poster.fetchPriority = 'high';
      }

      const urls = manifest.frames.map((name) =>
        resolvePath(basePath, `assets/video/hero-frames/${name}`),
      );

      await preloadAll(urls);
      activate();
    } catch {
      section.classList.remove('is-video-ready');
      canvas.classList.add('is-hidden');
    } finally {
      resolveReady();
    }
  };

  window.addEventListener('resize', () => {
    if (ready) {
      lastIndex = -1;
      drawFrame(frameIndex(scrollProgress()));
    }
  });

  prepare();
  requestAnimationFrame(tick);
  return readyPromise;
}
