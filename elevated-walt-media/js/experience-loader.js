/**
 * Landing page splash - preloads scroll-scrub hero frames before revealing content.
 */
import { initCinemaHero } from './hero-scroll.js';

const MAX_WAIT_MS = 10000;
const CONTINUE_AFTER_MS = 6000;
const SCROLL_READY_RATIO = 0.28;

export async function runExperienceLoader() {
  const loader = document.getElementById('experience-loader');
  if (!loader) return;

  const fill = loader.querySelector('.experience-loader-bar-fill');
  const bar = loader.querySelector('.experience-loader-bar');
  const skipBtn = document.getElementById('experience-loader-skip');
  const statusText = loader.querySelector('.experience-loader-text');

  document.body.classList.add('is-loading');

  let dismissed = false;
  let scrollReady = false;

  const setProgress = (pct) => {
    const clamped = Math.min(100, Math.max(0, pct));
    if (fill) fill.style.width = `${clamped}%`;
    if (bar) bar.setAttribute('aria-valuenow', String(Math.round(clamped)));
  };

  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    setProgress(100);
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    loader.setAttribute('aria-busy', 'false');
    loader.classList.add('is-done');
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', dismiss);
    setTimeout(() => {
      if (!dismissed) skipBtn.classList.remove('hidden');
    }, CONTINUE_AFTER_MS);
  }

  const timeout = new Promise((resolve) => {
    setTimeout(resolve, MAX_WAIT_MS);
  });

  const heroReady = initCinemaHero({
    scrollReadyRatio: SCROLL_READY_RATIO,
    onScrollReady: () => {
      scrollReady = true;
      if (statusText) statusText.textContent = 'Ready';
    },
    onProgress: (loaded, _total, readyTarget) => {
      const target = readyTarget || _total;
      if (!target) return;
      setProgress((loaded / target) * 100);
      if (loaded >= target && !dismissed) dismiss();
    },
  });

  let timedOut = false;
  await Promise.race([
    heroReady.then(() => {
      scrollReady = true;
      if (!dismissed) dismiss();
    }),
    timeout.then(() => {
      timedOut = true;
    }),
  ]);

  if (!dismissed) {
    if (timedOut && statusText) {
      statusText.textContent = scrollReady ? 'Ready' : 'Opening preview';
    }
    if (timedOut) setProgress(100);
    await new Promise((resolve) => setTimeout(resolve, timedOut ? 120 : 200));
    dismiss();
  }
}
