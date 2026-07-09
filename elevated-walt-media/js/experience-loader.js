/**
 * Landing page splash - waits for hero frames (max 15s) before revealing content.
 */
import { initCinemaHero } from './hero-scroll.js';

const MAX_WAIT_MS = 15000;

export async function runExperienceLoader() {
  const loader = document.getElementById('experience-loader');
  if (!loader) return;

  const fill = loader.querySelector('.experience-loader-bar-fill');
  const bar = loader.querySelector('.experience-loader-bar');

  document.body.classList.add('is-loading');

  const setProgress = (pct) => {
    const clamped = Math.min(100, Math.max(0, pct));
    if (fill) fill.style.width = `${clamped}%`;
    if (bar) bar.setAttribute('aria-valuenow', String(Math.round(clamped)));
  };

  const dismiss = () => {
    setProgress(100);
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    loader.setAttribute('aria-busy', 'false');
  };

  const timeout = new Promise((resolve) => {
    setTimeout(resolve, MAX_WAIT_MS);
  });

  const heroReady = initCinemaHero({
    onProgress: (loaded, total) => {
      if (!total) return;
      setProgress((loaded / total) * 100);
    },
  });

  let timedOut = false;
  await Promise.race([
    heroReady,
    timeout.then(() => {
      timedOut = true;
    }),
  ]);

  if (timedOut) setProgress(100);
  await new Promise((resolve) => setTimeout(resolve, timedOut ? 120 : 280));
  dismiss();
}
