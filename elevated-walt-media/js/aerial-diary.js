import { resolvePath } from './utils.js';

function mosaicClass(count) {
  if (count <= 1) return 'mosaic--solo';
  if (count === 2) return 'mosaic--duo';
  if (count === 3) return 'mosaic--trio';
  if (count === 4) return 'mosaic--quad';
  return 'mosaic--grid';
}

function chapterFigure(img, base, featured = false) {
  const src = resolvePath(base, `assets/portfolio/${img.file}`);
  const thumb = resolvePath(base, `assets/portfolio/${img.thumb}`);
  return `
    <figure class="mosaic-item${featured ? ' mosaic-item--lead' : ''}">
      <img src="${thumb}" data-full="${src}" alt="Aerial frame ${img.date}" loading="lazy" decoding="async">
    </figure>`;
}

function renderChapter(chapter, index, base) {
  const { images } = chapter;
  const layout = mosaicClass(images.length);
  const figures = images
    .map((img, i) => chapterFigure(img, base, i === 0))
    .join('');

  return `
    <article class="diary-chapter" data-chapter="${index}" data-date="${chapter.date}">
      <header class="chapter-head">
        <p class="chapter-eyebrow">Shoot day</p>
        <time class="chapter-date">${chapter.label}</time>
        <p class="chapter-meta">${images.length} frame${images.length === 1 ? '' : 's'}</p>
      </header>
      <div class="chapter-mosaic ${layout}">
        ${figures}
      </div>
    </article>`;
}

function renderIndex(chapters) {
  return chapters
    .map(
      (ch, i) => `
    <button type="button" class="diary-index-item${i === 0 ? ' is-active' : ''}" data-goto="${i}" aria-label="Jump to ${ch.label}">
      <span class="diary-index-dot"></span>
      <span class="diary-index-label">${ch.label}</span>
    </button>`,
    )
    .join('');
}

export async function initAerialDiary() {
  const section = document.getElementById('aerial-diary');
  const stage = document.getElementById('aerial-diary-stage');
  if (!section || !stage) return;

  const basePath = document.body.dataset.basePath || '';
  const manifestUrl = resolvePath(basePath, 'assets/portfolio/manifest.json');

  let data;
  try {
    const res = await fetch(manifestUrl);
    if (!res.ok) return;
    data = await res.json();
  } catch {
    section.hidden = true;
    return;
  }

  const chapters = data.chapters || [];
  if (!chapters.length) {
    section.hidden = true;
    return;
  }

  section.style.setProperty('--diary-chapters', String(chapters.length));

  stage.innerHTML = `
    <div class="diary-sticky">
      <div class="diary-bridge">
        <p class="diary-bridge-eyebrow">After the fly-through</p>
        <h2 class="diary-bridge-title">Frames from the field</h2>
        <p class="diary-bridge-lead">Drone stills grouped by shoot day - scroll to move through time.</p>
      </div>
      <nav class="diary-index" aria-label="Shoot dates">${renderIndex(chapters)}</nav>
      <div class="diary-viewport">
        <div class="diary-track">
          ${chapters.map((ch, i) => renderChapter(ch, i, basePath)).join('')}
        </div>
      </div>
      <div class="diary-progress" aria-hidden="true">
        <div class="diary-progress-fill"></div>
      </div>
      <p class="diary-disclosure">Low-resolution previews - final footage is delivered in full quality.</p>
    </div>`;

  const track = stage.querySelector('.diary-track');
  const fill = stage.querySelector('.diary-progress-fill');
  const indexItems = [...stage.querySelectorAll('.diary-index-item')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    section.classList.add('diary-reduced-motion');
    track.style.transform = 'none';
    return;
  }

  let maxShift = 0;

  const measure = () => {
    const viewport = stage.querySelector('.diary-viewport');
    if (!viewport || !track) return;
    maxShift = Math.max(0, track.scrollWidth - viewport.clientWidth);
  };

  const setProgress = (progress) => {
    const p = Math.min(1, Math.max(0, progress));
    track.style.transform = `translate3d(${-p * maxShift}px, 0, 0)`;
    if (fill) fill.style.width = `${p * 100}%`;

    const chapterIdx = Math.min(
      chapters.length - 1,
      Math.floor(p * chapters.length + 0.001),
    );
    indexItems.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === chapterIdx);
    });

    section.classList.toggle('diary-scrolling', p > 0.035);
  };

  const update = () => {
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const top = section.getBoundingClientRect().top;
    const progress = Math.min(1, Math.max(0, -top / scrollable));
    setProgress(progress);
  };

  indexItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.goto);
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const sectionTop = section.offsetTop;
      const target =
        sectionTop + (scrollable * (idx + 0.5)) / chapters.length - window.innerHeight * 0.1;
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
  });

  stage.querySelectorAll('.mosaic-item img').forEach((img) => {
    img.addEventListener('click', () => {
      const full = img.dataset.full;
      if (full) img.src = full;
    });
  });

  measure();
  update();
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', () => {
    measure();
    update();
  });
}
