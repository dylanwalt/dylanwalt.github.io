import { sha256, getSession, setSession } from './utils.js';
import { sendEvent } from './analytics.js';

const CONTACT = {
  email: 'dylanwalt10@gmail.com',
  phone: '+27 71 929 0175',
};

function contactHtml() {
  return `
    <p class="gate-contact">
      <strong>Notify us:</strong>
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
      <p>Enter your private preview password.</p>
      <form id="gate-form">
        <input id="gate-password" type="password" placeholder="Password" autocomplete="current-password" required>
        <p id="gate-error" class="error" aria-live="polite"></p>
        <button type="submit" class="btn btn-primary">Continue</button>
        ${onCancel ? '<button type="button" class="btn btn-ghost" id="gate-cancel">Cancel</button>' : ''}
      </form>
      <div id="gate-contact-wrap"></div>
    </div>`;

  overlay.classList.remove('hidden');

  const form = overlay.querySelector('#gate-form');
  const input = overlay.querySelector('#gate-password');
  const error = overlay.querySelector('#gate-error');
  const contactWrap = overlay.querySelector('#gate-contact-wrap');

  input?.focus();

  if (onCancel) {
    overlay.querySelector('#gate-cancel')?.addEventListener('click', () => {
      overlay.classList.add('hidden');
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
      overlay.classList.add('hidden');
      sendEvent(lodge.id, 'gate_success', lodge.id);
      onUnlock();
    } else {
      error.textContent = 'Password incorrect. Notify us if you need access.';
      contactWrap.innerHTML = contactHtml();
      input.value = '';
      input.focus();
      sendEvent(lodge.id, 'gate_failed', lodge.id);
    }
  });
}

export function isActiveLodge(lodge) {
  return lodge.status === 'active';
}

export { CONTACT };
