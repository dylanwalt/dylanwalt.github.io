import { loadConfig, getLodge, resolvePath } from './utils.js';
import { initAnalytics, trackPageView } from './analytics.js';
import { checkGate, isActiveLodge } from './gate.js';
import { renderExperience } from './experience.js';
import { initAdminBackdoor } from './admin.js';
import { enforceDesktopOnly } from './mobile-gate.js';

const basePath = document.body.dataset.basePath || '';
const slug = document.body.dataset.lodgeSlug;

async function initLodgePage() {
  if (enforceDesktopOnly()) return;

  await initAnalytics();

  const adminHash = document.body.dataset.adminHash;
  if (adminHash) initAdminBackdoor(adminHash);

  const config = await loadConfig();
  const lodge = getLodge(config, slug);

  if (!lodge) {
    document.body.innerHTML = '<main class="coming-soon-page container"><h1>Property not found</h1></main>';
    return;
  }

  if (!lodge.passwordHash) {
    renderAfterUnlock(lodge);
    return;
  }

  await checkGate(lodge, () => renderAfterUnlock(lodge));
}

function renderAfterUnlock(lodge) {
  if (isActiveLodge(lodge)) {
    document.getElementById('experience')?.classList.remove('hidden');
    renderExperience(lodge, basePath);
    trackPageView(lodge.id);
  } else {
    showInProgress(lodge);
  }
}

function showInProgress(lodge) {
  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = `
    <div class="coming-soon-page">
      <img src="${resolvePath(basePath, lodge.logo)}" alt="${lodge.name}" onerror="this.remove()" />
      <h1>${lodge.name}</h1>
      <p>${lodge.subtitle || lodge.location}</p>
      <p class="in-progress-note">Your preview is being prepared. We will notify your team when it is ready.</p>
      <a class="btn btn-ghost" href="${basePath ? basePath + '/' : '../'}">All properties</a>
    </div>`;
}

initLodgePage().catch(console.error);
