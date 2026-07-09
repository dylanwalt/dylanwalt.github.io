/**
 * Safari Plains image portal - numbered stills for client review.
 */
import { resolvePath } from './utils.js';
import { trackClick } from './analytics.js';

export async function initImagePortal(lodge, basePath) {
  const root = document.getElementById('image-portal-root');
  if (!root) return;

  const indexUrl = resolvePath(
    basePath,
    'assets/media/safari-plains/image-portal/image-portal-index.json',
  );

  let data;
  try {
    const res = await fetch(indexUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch {
    root.innerHTML =
      '<p class="gallery-empty">Image portal is being prepared.</p>';
    return;
  }

  const shell = document.createElement('section');
  shell.className = 'image-portal';
  shell.innerHTML = `
    <header class="image-portal-head">
      <h2>Stills</h2>
      <p class="image-portal-lead">${data.note || 'Reference photos by number.'}</p>
      <div class="image-portal-tools">
        <label class="image-portal-jump">
          <span>Jump to</span>
          <input type="number" min="1" max="${data.count}" placeholder="#" aria-label="Photo number">
        </label>
        <p class="image-portal-count">${data.count} photos</p>
      </div>
    </header>
    <div class="image-portal-grid" role="list"></div>
    <dialog class="image-portal-lightbox" aria-label="Photo preview">
      <button type="button" class="image-portal-close" aria-label="Close">&times;</button>
      <img class="image-portal-full" alt="">
      <p class="image-portal-caption"></p>
    </dialog>`;

  const grid = shell.querySelector('.image-portal-grid');
  const dialog = shell.querySelector('.image-portal-lightbox');
  const fullImg = shell.querySelector('.image-portal-full');
  const caption = shell.querySelector('.image-portal-caption');
  const jumpInput = shell.querySelector('.image-portal-jump input');

  const cards = [];

  data.images.forEach((img) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'image-portal-card';
    btn.setAttribute('role', 'listitem');
    btn.id = `photo-${img.number}`;
    const thumbSrc = resolvePath(
      basePath,
      `assets/media/safari-plains/image-portal/${img.thumb}`,
    );
    btn.innerHTML = `
      <img src="${thumbSrc}" alt="" loading="lazy">
      <span class="image-portal-num">${img.label}</span>`;
    btn.addEventListener('click', () => openPhoto(img));
    grid.appendChild(btn);
    cards.push({ btn, img });
  });

  function openPhoto(img) {
    fullImg.src = resolvePath(
      basePath,
      `assets/media/safari-plains/image-portal/${img.full}`,
    );
    caption.textContent = img.label;
    dialog.showModal();
    trackClick(lodge.id, 'image_portal_open', img.label);
  }

  jumpInput?.addEventListener('change', () => {
    const num = Number(jumpInput.value);
    if (!num) return;
    const target = document.getElementById(`photo-${num}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.focus({ preventScroll: true });
    }
  });

  shell.querySelector('.image-portal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  root.replaceChildren(shell);
}
