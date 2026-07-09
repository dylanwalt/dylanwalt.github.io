import { loadConfig, getLodge, resolvePath } from './utils.js';
import { initAnalytics } from './analytics.js';
import { checkGate, isActiveLodge } from './gate.js';
import { renderExperience } from './experience.js';
import { renderBrandPreview } from './brand-preview.js';
import { initEditorAdvice } from './editor-advice.js';
import { initAdminBackdoor } from './admin.js';

const basePath = document.body.dataset.basePath || '';
const slug = document.body.dataset.lodgeSlug;

async function initLodgePage() {
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
    if (lodge.id === 'safari-plains') {
      void initEditorAdvice(lodge, basePath);
    } else {
      renderBrandPreview(lodge, basePath);
    }
  } else {
    showComingSoon(lodge);
  }
}

function showComingSoon(lodge) {
  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = `
    <div class="coming-soon-page">
      <img src="${resolvePath(basePath, lodge.logo)}" alt="${lodge.name}" onerror="this.remove()" />
      <h1>${lodge.name}</h1>
      <p>${lodge.subtitle || lodge.location}</p>
      <p style="margin-top:1rem">Private preview coming soon. Footage for this property is not yet published.</p>
      <a class="btn btn-ghost" href="${basePath ? basePath + '/' : '../'}" style="margin-top:2rem;display:inline-flex">All properties</a>
    </div>`;
}

initLodgePage().catch(console.error);
