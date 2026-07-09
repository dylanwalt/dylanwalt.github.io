/**
 * Landing page splash - waits for hero frames (max 15s) before revealing content.
 */
import { initCinemaHero } from './hero-scroll.js';

const MAX_WAIT_MS = 15000;
const SKIP_AFTER_MS = 3000;

export async function runExperienceLoader() {
  const loader = document.getElementById('experience-loader');
  if (!loader) return;

  const fill = loader.querySelector('.experience-loader-bar-fill');
  const bar = loader.querySelector('.experience-loader-bar');
  const skipBtn = document.getElementById('experience-loader-skip');

  document.body.classList.add('is-loading');

  let dismissed = false;

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
    skipBtn.classList.remove('hidden');
    skipBtn.addEventListener('click', dismiss);
    setTimeout(() => skipBtn.classList.remove('hidden'), SKIP_AFTER_MS);
  }

  const timeout = new Promise((resolve) => {
    setTimeout(resolve, MAX_WAIT_MS);
  });

  const heroReady = initCinemaHero({
    onProgress: (loaded, total) => {
      if (!total) return;
      setProgress((loaded / total) * 100);
      if (loaded >= total) dismiss();
    },
  });

  let timedOut = false;
  await Promise.race([
    heroReady.then(() => {
      if (!dismissed) dismiss();
    }),
    timeout.then(() => {
      timedOut = true;
    }),
  ]);

  if (!dismissed) {
    if (timedOut) setProgress(100);
    await new Promise((resolve) => setTimeout(resolve, timedOut ? 120 : 280));
    dismiss();
  }
}
