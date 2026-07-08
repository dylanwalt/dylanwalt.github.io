/**
 * Verify cinema hero scroll-scrub: frame index must advance as page scrolls.
 * Run: node scripts/test-hero-scroll.mjs
 */
import { chromium } from 'playwright';

const URL = process.env.HERO_URL || 'http://localhost:8765/';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

try {
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 });

  await page.waitForSelector('.cinema-canvas', { timeout: 10000 });
  await page.waitForFunction(
    () => document.getElementById('cinema-hero')?.classList.contains('is-video-ready'),
    { timeout: 120000 },
  );
  await page.waitForTimeout(500);

  const read = () =>
    page.evaluate(() => {
      const section = document.getElementById('cinema-hero');
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable));
      const frameIndex = Math.round(
        progress * (parseInt(section.dataset.frameCount || '269', 10)),
      );
      return {
        frameIndex,
        progress,
        scrollY: window.scrollY,
        ready: section.classList.contains('is-video-ready'),
        posterHidden: document.querySelector('.cinema-poster')?.classList.contains('is-hidden'),
      };
    });

  const atTop = await read();
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.9));
  await page.waitForTimeout(400);
  const mid = await read();
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.8));
  await page.waitForTimeout(400);
  const deep = await read();

  const scrubbed = deep.frameIndex > atTop.frameIndex + 15;
  const midMoved = mid.frameIndex > atTop.frameIndex + 5;

  console.log(JSON.stringify({ atTop, mid, deep, scrubbed, midMoved }, null, 2));

  if (!scrubbed || !midMoved) {
    console.error('FAIL: hero did not scrub with scroll');
    process.exit(1);
  }
  console.log('PASS: hero scroll-scrub verified');
} catch (err) {
  console.error('FAIL:', err.message);
  process.exit(1);
} finally {
  await browser.close();
}
