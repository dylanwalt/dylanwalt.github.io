import { loadConfig, resolvePath } from './utils.js';
import { initAnalytics, trackPageView } from './analytics.js';
import { initAdminBackdoor } from './admin.js';
import { showGateModal } from './gate.js';
import { enforceDesktopOnly } from './mobile-gate.js';
import { runExperienceLoader } from './experience-loader.js';

const basePath = document.body.dataset.basePath || '';

function lodgeAsset(path) {
  return resolvePath(basePath, path);
}

function lodgeHref(slug) {
  const prefix = basePath ? `${basePath.replace(/\/$/, '')}/` : '';
  return `${prefix}${slug}/`;
}

async function initHome() {
  if (enforceDesktopOnly()) return;

  await runExperienceLoader();

  await initAnalytics();

  const adminHash = document.body.dataset.adminHash;
  if (adminHash) initAdminBackdoor(adminHash);

  const config = await loadConfig();
  trackPageView('home');
  renderAbout(config);
  renderTiles(config);
}

function renderAbout(config) {
  const { brand } = config;
  const aboutEl = document.getElementById('about-section');
  if (!aboutEl || !brand) return;

  aboutEl.innerHTML = `
    <div class="about-grid">
      <div class="about-copy">
        <p class="eyebrow">About</p>
        <h2>${brand.name}</h2>
        <p class="tagline">${brand.tagline}</p>
        <p class="about-short">${brand.aboutShort || brand.about}</p>
      </div>
      <div class="about-contact">
        <h3>Contact</h3>
        <ul class="contact-list">
          <li><a href="mailto:${brand.contact.email}">${brand.contact.email}</a></li>
          <li><a href="tel:+27719290175">${brand.contact.phone}</a></li>
          <li><a href="${brand.contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
    </div>`;
}

function renderTiles(config) {
  const grid = document.getElementById('lodge-grid');
  if (!grid) return;

  grid.innerHTML = config.lodges
    .map((lodge) => {
      const href = lodgeHref(lodge.slug);
      const logo = lodgeAsset(lodge.logo);
      const tileClass = lodge.status === 'completed' ? 'lodge-tile lodge-tile--ready' : 'lodge-tile';

      return `
      <a class="${tileClass}" href="${href}" data-lodge-id="${lodge.id}">
        <div class="tile-logo">
          <span class="tile-region">${lodge.location}</span>
          <img src="${logo}" alt="${lodge.name} logo" loading="lazy" width="160" height="96">
        </div>
        <div class="tile-body">
          <h2>${lodge.name}</h2>
          <p class="tile-location">${lodge.subtitle || lodge.location}</p>
          <span class="tile-enter">Open preview</span>
        </div>
      </a>`;
    })
    .join('');

  grid.querySelectorAll('.lodge-tile').forEach((tile) => {
    tile.addEventListener('click', (e) => {
      e.preventDefault();
      const id = tile.dataset.lodgeId;
      const lodge = config.lodges.find((l) => l.id === id);
      if (!lodge) return;

      const dest = tile.getAttribute('href');

      if (!lodge.passwordHash) {
        window.location.href = dest;
        return;
      }

      showGateModal(lodge, () => {
        window.location.href = dest;
      }, { onCancel: () => {} });
    });
  });
}

initHome().catch(console.error);
