import { loadConfig, resolvePath } from './utils.js';
import { initAnalytics } from './analytics.js';
import { initAdminBackdoor } from './admin.js';
import { showGateModal } from './gate.js';

const basePath = document.body.dataset.basePath || '';

function lodgeAsset(path) {
  return resolvePath(basePath, path);
}

function lodgeHref(slug) {
  const prefix = basePath ? `${basePath.replace(/\/$/, '')}/` : '';
  return `${prefix}${slug}/`;
}

async function initHome() {
  await initAnalytics();

  const adminHash = document.body.dataset.adminHash;
  if (adminHash) initAdminBackdoor(adminHash);

  const config = await loadConfig();
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
        <p>${brand.about}</p>
        <div class="about-credentials">
          <span class="credential">Aerial cinematography</span>
          <span class="credential">Hospitality-focused</span>
          <span class="credential">Johannesburg-based</span>
        </div>
      </div>
      <div class="about-contact">
        <h3>Contact</h3>
        <p class="about-contact-lead">Questions about your preview or deliverables? Reach out directly.</p>
        <ul class="contact-list">
          <li><a href="mailto:${brand.contact.email}">${brand.contact.email}</a></li>
          <li><a href="tel:+27719290175">${brand.contact.phone}</a></li>
          <li><a href="${brand.contact.linkedin}" target="_blank" rel="noopener">LinkedIn - Dylan Walt</a></li>
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
      const statusClass = lodge.status === 'active' ? 'active' : 'coming-soon';
      const statusLabel = lodge.status === 'active' ? 'Preview ready' : 'Coming soon';

      return `
      <a class="lodge-tile ${statusClass}" href="${href}" data-lodge-id="${lodge.id}">
        <div class="tile-logo">
          <span class="tile-region">${lodge.location}</span>
          <img src="${logo}" alt="${lodge.name} logo" loading="lazy" width="160" height="96">
        </div>
        <div class="tile-body">
          <span class="tile-status ${statusClass}">${statusLabel}</span>
          <h2>${lodge.name}</h2>
          <p class="tile-location">${lodge.subtitle || lodge.location}</p>
          <span class="tile-enter">Enter preview</span>
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
