import { sha256 } from './utils.js';
import { getAnalyticsConfig } from './analytics.js';

let clickCount = 0;
let clickTimer = null;

export function initAdminBackdoor(adminPasswordHash) {
  const logo = document.querySelector('[data-admin-trigger]');
  if (!logo) return;

  logo.addEventListener('click', () => {
    clickCount += 1;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 1500);

    if (clickCount >= 3) {
      clickCount = 0;
      promptAdmin(adminPasswordHash);
    }
  });
}

async function promptAdmin(adminPasswordHash) {
  const password = window.prompt('Admin password:');
  if (!password) return;

  const hash = await sha256(password);
  if (hash !== adminPasswordHash) {
    window.alert('Incorrect admin password.');
    return;
  }

  await openDashboard();
}

async function openDashboard() {
  const config = getAnalyticsConfig();
  if (!config?.endpointUrl || !config?.adminKey) {
    window.alert('Analytics not configured. Add config/analytics.public.json (see docs/ANALYTICS_SETUP.md).');
    return;
  }

  let overlay = document.getElementById('admin-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-overlay';
    overlay.className = 'admin-overlay';
    overlay.innerHTML = `
      <div class="admin-panel">
        <h2>Lodge Lens — Analytics</h2>
        <div class="admin-toolbar">
          <select id="admin-filter-lodge"><option value="">All lodges</option></select>
          <input id="admin-filter-event" type="text" placeholder="Filter event..." />
          <button class="btn btn-ghost" id="admin-refresh">Refresh</button>
          <button class="btn btn-ghost" id="admin-export">Export CSV</button>
          <button class="btn btn-ghost" id="admin-close">Close</button>
        </div>
        <div id="admin-stats" style="color:var(--muted);font-size:0.875rem;margin-bottom:1rem"></div>
        <div style="overflow-x:auto">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Lodge</th>
                <th>Event</th>
                <th>Label</th>
                <th>Value</th>
                <th>Session</th>
              </tr>
            </thead>
            <tbody id="admin-rows"></tbody>
          </table>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector('#admin-close').addEventListener('click', () => overlay.classList.add('hidden'));
    overlay.querySelector('#admin-refresh').addEventListener('click', () => loadRows(config));
    overlay.querySelector('#admin-export').addEventListener('click', exportCsv);
    overlay.querySelector('#admin-filter-lodge').addEventListener('change', filterRows);
    overlay.querySelector('#admin-filter-event').addEventListener('input', filterRows);
  }

  overlay.classList.remove('hidden');
  await loadRows(config);
}

let allRows = [];

async function loadRows(config) {
  const tbody = document.getElementById('admin-rows');
  const stats = document.getElementById('admin-stats');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="6">Loading…</td></tr>';
  stats.textContent = 'Fetching from Google Sheet…';

  try {
    const url = `${config.endpointUrl}?adminKey=${encodeURIComponent(config.adminKey)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Failed to load');

    allRows = (data.rows || []).slice().reverse();
    populateLodgeFilter(allRows);
    filterRows();
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6">Error: ${err.message}</td></tr>`;
    stats.textContent = '';
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

function filterRows() {
  const tbody = document.getElementById('admin-rows');
  const stats = document.getElementById('admin-stats');
  const lodgeFilter = document.getElementById('admin-filter-lodge')?.value || '';
  const eventFilter = (document.getElementById('admin-filter-event')?.value || '').toLowerCase();

  let rows = allRows;
  if (lodgeFilter) rows = rows.filter((r) => r.lodge_id === lodgeFilter);
  if (eventFilter) rows = rows.filter((r) => (r.event || '').toLowerCase().includes(eventFilter));

  if (stats) {
    const sessions = new Set(rows.map((r) => r.session_id)).size;
    stats.textContent = `${rows.length} events · ${sessions} sessions`;
  }

  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="6">No events yet.</td></tr>';
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
      <td style="font-size:0.75rem;color:var(--muted)">${escapeHtml(String(r.session_id || '').slice(0, 12))}</td>
    </tr>`,
    )
    .join('');
}

function exportCsv() {
  const lodgeFilter = document.getElementById('admin-filter-lodge')?.value || '';
  const eventFilter = (document.getElementById('admin-filter-event')?.value || '').toLowerCase();
  let rows = allRows;
  if (lodgeFilter) rows = rows.filter((r) => r.lodge_id === lodgeFilter);
  if (eventFilter) rows = rows.filter((r) => (r.event || '').toLowerCase().includes(eventFilter));

  const header = ['timestamp', 'lodge_id', 'event', 'label', 'value', 'session_id'];
  const csv = [header.join(',')]
    .concat(
      rows.map((r) =>
        header.map((h) => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(','),
      ),
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `lodge-lens-analytics-${Date.now()}.csv`;
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
