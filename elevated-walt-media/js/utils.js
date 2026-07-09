const CONFIG_BASE = document.body.dataset.basePath || '';

function configUrl(path) {
  if (!CONFIG_BASE) return path;
  return `${CONFIG_BASE}/${path}`.replace(/\/+/g, '/').replace(/^\.\//, '');
}

export async function loadConfig() {
  const res = await fetch(configUrl('config/lodges.public.json'));
  if (!res.ok) throw new Error('Failed to load lodge config');
  return res.json();
}

export function getLodge(config, slug) {
  return config.lodges.find((l) => l.slug === slug || l.id === slug);
}

export async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function sessionKey(lodgeId) {
  return `lodge-lens-session-${lodgeId}`;
}

export function getSession(lodgeId) {
  try {
    return JSON.parse(sessionStorage.getItem(sessionKey(lodgeId)) || 'null');
  } catch {
    return null;
  }
}

export function setSession(lodgeId, data) {
  sessionStorage.setItem(sessionKey(lodgeId), JSON.stringify(data));
}

export function getAnalyticsSessionId() {
  let id = sessionStorage.getItem('lodge-lens-analytics-session');
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('lodge-lens-analytics-session', id);
  }
  return id;
}

export function resolvePath(base, assetPath) {
  if (!assetPath) return '';
  if (assetPath.startsWith('http')) return assetPath;
  if (!base) return assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `${base}/${assetPath.replace(/^\//, '')}`.replace(/\/+/g, '/');
}
