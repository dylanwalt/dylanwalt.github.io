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

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

  const profileSrc = brand.profileImage ? lodgeAsset(brand.profileImage) : '';
  const owner = brand.owner || brand.name;
  const credentials = (brand.credentials || [])
    .map((item) => `<span class="credential">${escapeHtml(item)}</span>`)
    .join('');

  aboutEl.innerHTML = `
    <div class="about-feature-inner container">
      <div class="about-portrait">
        <div class="about-portrait-frame">
          ${
            profileSrc
              ? `<img src="${profileSrc}" alt="${escapeHtml(owner)}" width="320" height="400" decoding="async">`
              : `<div class="about-portrait-placeholder" aria-hidden="true">${escapeHtml(owner.charAt(0))}</div>`
          }
        </div>
        <p class="about-portrait-caption">${escapeHtml(brand.name)}</p>
      </div>
      <div class="about-copy">
        <p class="eyebrow about-eyebrow">Your aerial partner</p>
        <h2>${escapeHtml(owner)}</h2>
        <p class="about-brand-line"><strong>${escapeHtml(brand.name)}</strong> · ${escapeHtml(brand.tagline)}</p>
        <p class="about-bio">${escapeHtml(brand.about || brand.aboutShort || '')}</p>
        ${credentials ? `<div class="about-credentials">${credentials}</div>` : ''}
      </div>
      <aside class="about-contact">
        <h3>Get in touch</h3>
        <p class="about-contact-lead">Questions about your preview, feedback on clips, or full-res downloads for your internal team.</p>
        <ul class="contact-list">
          <li><a href="mailto:${escapeHtml(brand.contact.email)}">${escapeHtml(brand.contact.email)}</a></li>
          <li><a href="tel:+27719290175">${escapeHtml(brand.contact.phone)}</a></li>
          <li><a href="${escapeHtml(brand.contact.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </aside>
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
