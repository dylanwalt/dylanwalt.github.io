import { trackClick } from './analytics.js';
import { resolvePath } from './utils.js';

export function renderBrandPreview(lodge, basePath) {
  if (!lodge.brand) return;

  const section = document.getElementById('brand-preview');
  if (!section) return;

  const { brand } = lodge;
  const logoSrc = resolvePath(basePath, brand.logo);

  section.style.setProperty('--brand-primary', brand.primaryColor || '#333');
  section.style.setProperty('--brand-accent', brand.accentColor || '#c9a227');

  const heroLogo = document.getElementById('mockup-hero-logo');
  const reelLogo = document.getElementById('mockup-reel-logo');
  if (heroLogo) heroLogo.src = logoSrc;
  if (reelLogo) reelLogo.src = logoSrc;

  const heroBar = document.getElementById('mockup-hero-name');
  if (heroBar) heroBar.textContent = lodge.name;

  const heroVid = document.getElementById('mockup-hero-video');
  const aerial = lodge.chapters?.find((c) => c.id === 'aerial');
  if (heroVid && aerial?.youtubeId && aerial.youtubeId !== 'REPLACE_ME') {
    heroVid.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${aerial.youtubeId}?rel=0&modestbranding=1&autoplay=0&mute=1" title="Hero preview" allowfullscreen style="width:100%;height:100%;border:0"></iframe>`;
  }

  const reelVid = document.getElementById('mockup-reel-video');
  if (reelVid && aerial?.youtubeId && aerial.youtubeId !== 'REPLACE_ME') {
    reelVid.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${aerial.youtubeId}?rel=0&modestbranding=1" title="Reel preview" allowfullscreen style="width:100%;height:100%;border:0"></iframe>`;
  }

  setupTabs(lodge.id);
}

function setupTabs(lodgeId) {
  const tabs = document.querySelectorAll('.mockup-tabs button');
  const panels = document.querySelectorAll('.mockup-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.mockup;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => p.classList.toggle('active', p.dataset.mockup === target));
      trackClick(lodgeId, 'mockup_open', target);
    });
  });
}
