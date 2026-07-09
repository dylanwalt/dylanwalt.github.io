import { sha256, getSession, setSession } from './utils.js';
import { sendEvent } from './analytics.js';

const CONTACT = {
  email: 'dylanwalt10@gmail.com',
  phone: '+27 71 929 0175',
};

function contactHtml() {
  return `
    <p class="gate-contact">
      <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
      · <a href="tel:+27719290175">${CONTACT.phone}</a>
    </p>`;
}

export async function checkGate(lodge, onUnlock) {
  const existing = getSession(lodge.id);
  if (existing?.unlocked) {
    onUnlock();
    return;
  }

  showGateModal(lodge, onUnlock);
}

export function showGateModal(lodge, onUnlock, { onCancel } = {}) {
  let overlay = document.getElementById('gate-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'gate-overlay';
    overlay.className = 'gate-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="gate-card">
      <h2>${lodge.name}</h2>
      <p>Enter your preview password.</p>
      <form id="gate-form">
        <input id="gate-password" type="password" placeholder="Password" autocomplete="current-password" required>
        <p id="gate-error" class="error" aria-live="polite"></p>
        <button type="submit" class="btn btn-primary">Continue</button>
        ${onCancel ? '<button type="button" class="btn btn-ghost" id="gate-cancel">Cancel</button>' : ''}
      </form>
      <div id="gate-contact-wrap"></div>
    </div>`;

  overlay.classList.remove('hidden');
  overlay.removeAttribute('aria-hidden');
  overlay.removeAttribute('inert');

  const form = overlay.querySelector('#gate-form');
  const input = overlay.querySelector('#gate-password');
  const error = overlay.querySelector('#gate-error');
  const contactWrap = overlay.querySelector('#gate-contact-wrap');

  input?.focus();

  if (onCancel) {
    overlay.querySelector('#gate-cancel')?.addEventListener('click', () => {
      hideGateOverlay(overlay);
      onCancel();
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = input.value.trim();
    if (!password) return;

    const hash = await sha256(password);
    if (hash === lodge.passwordHash) {
      setSession(lodge.id, { unlocked: true, at: Date.now() });
      hideGateOverlay(overlay);
      sendEvent(lodge.id, 'gate_success', lodge.id);
      onUnlock();
    } else {
      error.textContent = 'Incorrect password.';
      contactWrap.innerHTML = contactHtml();
      input.value = '';
      input.focus();
      sendEvent(lodge.id, 'gate_failed', lodge.id);
    }
  });
}

function hideGateOverlay(overlay) {
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('inert', '');
  overlay.innerHTML = '';
}

export function isActiveLodge(lodge) {
  return lodge.status === 'completed';
}

export { CONTACT };
