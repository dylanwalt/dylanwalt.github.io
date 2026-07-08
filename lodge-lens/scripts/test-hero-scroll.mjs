/**
 * Verify cinema hero scroll-scrub: currentTime must advance as page scrolls.
 * Run: node scripts/test-hero-scroll.mjs
 */
import { chromium } from 'playwright';

const URL = process.env.HERO_URL || 'http://localhost:8765/';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

try {
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 });

  await page.waitForSelector('.cinema-video', { timeout: 10000 });
  await page.waitForFunction(
    () => {
      const v = document.querySelector('.cinema-video');
      return v && v.readyState >= 2 && document.getElementById('cinema-hero')?.classList.contains('is-video-ready');
    },
    { timeout: 20000 },
  );
  await page.waitForTimeout(500);

  const read = () =>
    page.evaluate(() => {
      const v = document.querySelector('.cinema-video');
      const section = document.getElementById('cinema-hero');
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable));
      return {
        currentTime: v.currentTime,
        duration: v.duration,
        progress,
        scrollY: window.scrollY,
        ready: section.classList.contains('is-video-ready'),
        filter: getComputedStyle(v).filter,
        overlayBg: getComputedStyle(document.querySelector('.cinema-overlay')).backgroundImage,
      };
    });

  const atTop = await read();
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.9));
  await page.waitForTimeout(400);
  const mid = await read();
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.8));
  await page.waitForTimeout(400);
  const deep = await read();

  const scrubbed = deep.currentTime > atTop.currentTime + 0.3;
  const midMoved = mid.currentTime > atTop.currentTime + 0.1;

  console.log(JSON.stringify({ atTop, mid, deep, scrubbed, midMoved }, null, 2));

  if (!scrubbed || !midMoved) {
    console.error('FAIL: video did not scrub with scroll');
    process.exit(1);
  }
  if (atTop.filter !== 'none') {
    console.error('FAIL: video still has CSS filter:', atTop.filter);
    process.exit(1);
  }
  console.log('PASS: hero scroll-scrub verified');
} catch (err) {
  console.error('FAIL:', err.message);
  process.exit(1);
} finally {
  await browser.close();
}
