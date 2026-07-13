import { sha256 } from './utils.js';
import { getAnalyticsConfig, markAnalyticsOwner } from './analytics.js';

const TABLE_COLS = 10;
const CSV_HEADERS = [
  'timestamp',
  'lodge_id',
  'event',
  'label',
  'value',
  'session_id',
  'user_agent',
  'visitor_id',
  'is_owner',
  'owner_match',
  'ip',
  'country',
  'city',
  'timezone',
  'locale',
  'referrer',
  'page_path',
  'landing_path',
  'utm',
  'device',
  'screen',
  'returning',
  'meta_json',
];

export function initAdminBackdoor(adminPasswordHash) {
  if (!adminPasswordHash) return;

  document.addEventListener('keydown', (event) => {
    if (!event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowUp' && event.code !== 'ArrowUp') return;

    event.preventDefault();
    showAdminModal(adminPasswordHash);
  });
}

function showAdminModal(adminPasswordHash) {
  let overlay = document.getElementById('admin-login-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-login-overlay';
    overlay.className = 'gate-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="gate-card admin-login-card">
      <p class="eyebrow">Admin</p>
      <h2>Analytics dashboard</h2>
      <p>Enter your admin password to view lodge activity logs.</p>
      <form id="admin-login-form">
        <input id="admin-login-password" type="password" placeholder="Admin password" autocomplete="current-password" required>
        <p id="admin-login-error" class="error" aria-live="polite"></p>
        <button type="submit" class="btn btn-primary">Open dashboard</button>
        <button type="button" class="btn btn-ghost admin-login-cancel" id="admin-login-cancel">Cancel</button>
      </form>
    </div>`;

  overlay.classList.remove('hidden');

  const form = overlay.querySelector('#admin-login-form');
  const input = overlay.querySelector('#admin-login-password');
  const error = overlay.querySelector('#admin-login-error');

  input.focus();

  overlay.querySelector('#admin-login-cancel').addEventListener('click', () => {
    overlay.classList.add('hidden');
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const password = input.value.trim();
    if (!password) return;

    const hash = await sha256(password);
    if (hash !== adminPasswordHash) {
      error.textContent = 'Incorrect admin password.';
      input.value = '';
      input.focus();
      return;
    }

    overlay.classList.add('hidden');
    markAnalyticsOwner('admin_login');
    await openDashboard();
  });
}

async function openDashboard() {
  const config = getAnalyticsConfig();
  if (!config?.endpointUrl || !config?.adminKey) {
    showAdminMessage('Analytics not configured yet. Run setup-analytics.ps1 after deploy, then redeploy with config/analytics.public.json.');
    return;
  }

  let overlay = document.getElementById('admin-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-overlay';
    overlay.className = 'admin-overlay';
    overlay.innerHTML = `
      <div class="admin-panel">
        <h2>Elevated Walt Media - Analytics</h2>
        <p class="admin-panel-sub">Lodge activity from your live preview portal</p>
        <div class="admin-toolbar">
          <select id="admin-filter-lodge"><option value="">All lodges</option></select>
          <input id="admin-filter-event" type="text" placeholder="Filter event..." />
          <label class="admin-hide-owner">
            <input type="checkbox" id="admin-hide-owner" checked />
            Hide my traffic
          </label>
          <button class="btn btn-ghost" id="admin-refresh">Refresh</button>
          <button class="btn btn-ghost" id="admin-export">Export CSV</button>
          <button class="btn btn-ghost" id="admin-close">Close</button>
        </div>
        <div id="admin-stats" class="admin-stats"></div>
        <p id="admin-owner-note" class="admin-owner-note" aria-live="polite"></p>
        <p id="admin-status" class="admin-status" aria-live="polite"></p>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Lodge</th>
                <th>Event</th>
                <th>Label</th>
                <th>Value</th>
                <th>IP</th>
                <th>Geo</th>
                <th>Visitor</th>
                <th>Owner</th>
                <th>Session</th>
              </tr>
            </thead>
            <tbody id="admin-rows"></tbody>
          </table>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector('#admin-close').addEventListener('click', () => {
      overlay.classList.add('hidden');
      document.body.classList.remove('admin-dashboard-open');
    });
    overlay.querySelector('#admin-refresh').addEventListener('click', () => loadRows(config));
    overlay.querySelector('#admin-export').addEventListener('click', exportCsv);
    overlay.querySelector('#admin-filter-lodge').addEventListener('change', filterRows);
    overlay.querySelector('#admin-filter-event').addEventListener('input', filterRows);
    overlay.querySelector('#admin-hide-owner').addEventListener('change', filterRows);
  }

  overlay.classList.remove('hidden');
  document.body.classList.add('admin-dashboard-open');
  await loadRows(config);
}

function showAdminMessage(message) {
  let overlay = document.getElementById('admin-login-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-login-overlay';
    overlay.className = 'gate-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div class="gate-card admin-login-card">
      <h2>Analytics</h2>
      <p>${message}</p>
      <button type="button" class="btn btn-primary" id="admin-msg-close">OK</button>
    </div>`;
  overlay.classList.remove('hidden');
  overlay.querySelector('#admin-msg-close').addEventListener('click', () => overlay.classList.add('hidden'));
}

let allRows = [];

function isOwnerRow(row) {
  const v = row.is_owner;
  return v === 1 || v === '1' || v === true || v === 'true';
}

function getVisibleRows() {
  const lodgeFilter = document.getElementById('admin-filter-lodge')?.value || '';
  const eventFilter = (document.getElementById('admin-filter-event')?.value || '').toLowerCase();
  const hideOwner = document.getElementById('admin-hide-owner')?.checked !== false;

  let rows = allRows;
  if (lodgeFilter) rows = rows.filter((r) => r.lodge_id === lodgeFilter);
  if (eventFilter) rows = rows.filter((r) => (r.event || '').toLowerCase().includes(eventFilter));

  let ownerHidden = 0;
  if (hideOwner) {
    const kept = [];
    for (const row of rows) {
      if (isOwnerRow(row)) ownerHidden += 1;
      else kept.push(row);
    }
    rows = kept;
  }

  return { rows, ownerHidden, hideOwner };
}

async function loadRows(config) {
  const tbody = document.getElementById('admin-rows');
  const stats = document.getElementById('admin-stats');
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="${TABLE_COLS}">Loading...</td></tr>`;
  const statusEl = document.getElementById('admin-status');
  if (statusEl) statusEl.textContent = 'Fetching activity...';
  if (stats) stats.innerHTML = '';

  try {
    const url = `${config.endpointUrl}?adminKey=${encodeURIComponent(config.adminKey)}`;
    const res = await fetch(url);
    const raw = await res.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(
        'Analytics endpoint did not return JSON. Redeploy the Google Apps Script web app (Anyone access) and refresh.',
      );
    }
    if (!data.ok) throw new Error(data.error || 'Failed to load');

    allRows = (data.rows || []).slice().reverse();
    populateLodgeFilter(allRows);
    filterRows();
    if (statusEl) statusEl.textContent = '';
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="${TABLE_COLS}" class="admin-error">Could not load analytics. <button type="button" class="btn btn-ghost admin-retry" id="admin-retry">Retry</button></td></tr>`;
    if (stats) stats.innerHTML = '';
    if (statusEl) statusEl.textContent = `${err.message} Run scripts/authorize-analytics.ps1 once, then Refresh.`;
    document.getElementById('admin-retry')?.addEventListener('click', () => loadRows(config));
  }
}

function populateLodgeFilter(rows) {
  const select = document.getElementById('admin-filter-lodge');
  if (!select) return;
  const lodges = [...new Set(rows.map((r) => r.lodge_id).filter(Boolean))].sort();
  const current = select.value;
  select.innerHTML = '<option value="">All lodges</option>' + lodges.map((l) => `<option value="${l}">${l}</option>`).join('');
  select.value = current;
}

function formatGeo(row) {
  const parts = [row.city, row.country].filter(Boolean);
  return parts.join(', ');
}

function ownerBadge(row) {
  if (!isOwnerRow(row)) return '';
  const reason = row.owner_match ? ` (${escapeHtml(String(row.owner_match))})` : '';
  return `<span class="admin-owner-badge">You${reason}</span>`;
}

function filterRows() {
  const tbody = document.getElementById('admin-rows');
  const stats = document.getElementById('admin-stats');
  const note = document.getElementById('admin-owner-note');
  const { rows, ownerHidden, hideOwner } = getVisibleRows();

  if (note) {
    note.textContent =
      hideOwner && ownerHidden > 0 ? `Owner events hidden: ${ownerHidden}` : '';
  }

  if (stats) {
    const sessions = new Set(rows.map((r) => r.session_id)).size;
    const lodges = new Set(rows.map((r) => r.lodge_id).filter(Boolean)).size;
    stats.innerHTML = `
      <div class="admin-stat"><span class="admin-stat-val">${rows.length}</span><span class="admin-stat-label">Events</span></div>
      <div class="admin-stat"><span class="admin-stat-val">${sessions}</span><span class="admin-stat-label">Sessions</span></div>
      <div class="admin-stat"><span class="admin-stat-val">${lodges}</span><span class="admin-stat-label">Lodges</span></div>`;
  }

  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="${TABLE_COLS}" class="admin-empty">No events yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .slice(0, 500)
    .map(
      (r) => `
    <tr>
      <td>${formatTime(r.timestamp)}</td>
      <td>${escapeHtml(r.lodge_id)}</td>
      <td>${escapeHtml(r.event)}</td>
      <td>${escapeHtml(r.label)}</td>
      <td>${escapeHtml(r.value)}</td>
      <td class="session-cell">${escapeHtml(r.ip)}</td>
      <td>${escapeHtml(formatGeo(r))}</td>
      <td class="session-cell">${escapeHtml(String(r.visitor_id || '').slice(0, 12))}</td>
      <td>${ownerBadge(r)}</td>
      <td class="session-cell">${escapeHtml(String(r.session_id || '').slice(0, 12))}</td>
    </tr>`,
    )
    .join('');
}

function exportCsv() {
  const { rows } = getVisibleRows();

  const csv = [CSV_HEADERS.join(',')]
    .concat(
      rows.map((r) =>
        CSV_HEADERS.map((h) => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(','),
      ),
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `elevated-walt-media-analytics-${Date.now()}.csv`;
  a.click();
}

function formatTime(ts) {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
