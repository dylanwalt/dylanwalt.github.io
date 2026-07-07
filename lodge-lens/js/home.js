import { loadConfig, resolvePath } from './utils.js';
import { initAnalytics } from './analytics.js';
import { initAdminBackdoor } from './admin.js';
import { showGateModal } from './gate.js';

const basePath = document.body.dataset.basePath || '';

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
      </div>
      <div class="about-contact">
        <h3>Contact</h3>
        <ul class="contact-list">
          <li><a href="mailto:${brand.contact.email}">${brand.contact.email}</a></li>
          <li><a href="tel:+27719290175">${brand.contact.phone}</a></li>
          <li><a href="${brand.contact.linkedin}" target="_blank" rel="noopener">LinkedIn — Dylan Walt</a></li>
        </ul>
      </div>
    </div>`;
}

function renderTiles(config) {
  const grid = document.getElementById('lodge-grid');
  if (!grid) return;

  const prefix = basePath ? `${basePath.replace(/\/$/, '')}/` : '';

  grid.innerHTML = config.lodges
    .map((lodge, i) => {
      const href = `${prefix}${lodge.slug}/`;
      const logo = resolvePath(basePath, lodge.logo);
      const featured = lodge.status === 'active' ? ' is-featured' : '';
      const index = String(i + 1).padStart(2, '0');
      const statusLabel = lodge.status === 'active' ? 'Preview ready' : 'Coming soon';

      return `
      <a class="lodge-tile${featured}" href="${href}" data-lodge-id="${lodge.id}">
        <span class="index">${index}</span>
        <div class="thumb">
          <img src="${logo}" alt="" loading="lazy" onerror="this.style.display='none'"/>
        </div>
        <div class="meta">
          <h2>${lodge.name}</h2>
          <div class="subtitle">${lodge.subtitle || lodge.location}</div>
        </div>
        <div class="tile-end">
          <span class="status ${lodge.status === 'active' ? 'active' : ''}">${statusLabel}</span>
          <span class="enter">Enter preview →</span>
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
