/**
 * Block mobile/tablet visitors - Elevated Walt Media is optimised for desktop review.
 */

export function isMobileDevice() {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPod|Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return true;
  }
  if (/iPad/i.test(ua)) {
    return true;
  }
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return true;
  }
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) {
    return true;
  }
  return false;
}

export function enforceDesktopOnly() {
  if (!isMobileDevice()) {
    return false;
  }

  document.documentElement.classList.add('mobile-gate-active');

  let overlay = document.getElementById('mobile-gate-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobile-gate-overlay';
    overlay.className = 'mobile-gate-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'mobile-gate-title');
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="mobile-gate-card">
      <p class="mobile-gate-eyebrow">Elevated Walt Media</p>
      <h1 id="mobile-gate-title">Desktop only</h1>
      <p>This preview works best on a computer. Open this link on a PC or Mac to review footage.</p>
      <p><a href="mailto:dylanwalt10@gmail.com">dylanwalt10@gmail.com</a></p>
    </div>`;

  document.body.style.overflow = 'hidden';
  return true;
}
