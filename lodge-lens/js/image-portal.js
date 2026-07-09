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
      '<p class="gallery-empty">Image portal is being prepared. Check back shortly.</p>';
    return;
  }

  const shell = document.createElement('section');
  shell.className = 'image-portal';
  shell.innerHTML = `
    <header class="image-portal-head">
      <h2>Image portal</h2>
      <p class="image-portal-lead">${data.note || 'Numbered stills for review.'}</p>
      <p class="image-portal-count">${data.count} photo${data.count === 1 ? '' : 's'}</p>
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

  data.images.forEach((img) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'image-portal-card';
    btn.setAttribute('role', 'listitem');
    const thumbSrc = resolvePath(
      basePath,
      `assets/media/safari-plains/image-portal/${img.thumb}`,
    );
    btn.innerHTML = `
      <img src="${thumbSrc}" alt="" loading="lazy">
      <span class="image-portal-num">${img.label}</span>`;
    btn.addEventListener('click', () => {
      fullImg.src = resolvePath(
        basePath,
        `assets/media/safari-plains/image-portal/${img.full}`,
      );
      caption.textContent = `${img.label} - ${(img.category || '').replace(/-/g, ' ')}`;
      dialog.showModal();
      trackClick(lodge.id, 'image_portal_open', img.label);
    });
    grid.appendChild(btn);
  });

  shell.querySelector('.image-portal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  root.replaceChildren(shell);
}
