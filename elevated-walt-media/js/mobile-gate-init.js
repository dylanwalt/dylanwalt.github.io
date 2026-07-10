/**
 * Runs synchronously before page paint to block mobile/tablet visitors.
 */
(function () {
  function isMobileDevice() {
    var ua = navigator.userAgent || '';
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
    var narrow = window.matchMedia('(max-width: 820px)').matches;
    var touch =
      navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    if (narrow && touch) {
      return true;
    }
    return false;
  }

  function renderOverlay() {
    var overlay = document.getElementById('mobile-gate-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'mobile-gate-overlay';
      overlay.className = 'mobile-gate-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-labelledby', 'mobile-gate-title');
      document.body.appendChild(overlay);
    }

    overlay.innerHTML =
      '<div class="mobile-gate-card">' +
      '<p class="mobile-gate-eyebrow">Elevated Walt Media</p>' +
      '<h1 id="mobile-gate-title">Please return on a computer</h1>' +
      '<p>This preview is built for desktop review. Open this link on a <strong>PC or Mac</strong> to watch footage and leave feedback.</p>' +
      '<p class="mobile-gate-hint">Bookmark this page and open it again from your computer.</p>' +
      '<p><a href="mailto:dylanwalt10@gmail.com">dylanwalt10@gmail.com</a></p>' +
      '</div>';

    document.documentElement.classList.add('mobile-gate-active');
    document.body.classList.remove('is-loading');
    document.body.style.overflow = 'hidden';

    var loader = document.getElementById('experience-loader');
    if (loader) loader.hidden = true;
  }

  function enforce() {
    if (!isMobileDevice()) return false;
    if (document.body) {
      renderOverlay();
    } else {
      document.addEventListener('DOMContentLoaded', renderOverlay, { once: true });
    }
    return true;
  }

  window.LodgeLensMobileGate = {
    isMobileDevice: isMobileDevice,
    enforce: enforce,
  };

  enforce();
})();
