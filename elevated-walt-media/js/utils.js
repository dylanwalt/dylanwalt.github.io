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

const VISITOR_KEY = 'lodge-lens-visitor-id';
const OWNER_KEY = 'lodge-lens-analytics-owner';

/** Stable visitor id across tabs; `returning` is 1 if the id already existed. */
export function getVisitorId() {
  let existing = null;
  try {
    existing = localStorage.getItem(VISITOR_KEY);
  } catch {
    existing = null;
  }
  if (existing) return { id: existing, returning: 1 };

  const id =
    (typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`);
  try {
    localStorage.setItem(VISITOR_KEY, id);
  } catch {
    /* private mode */
  }
  return { id, returning: 0 };
}

export function isAnalyticsOwner() {
  try {
    return localStorage.getItem(OWNER_KEY) === '1';
  } catch {
    return false;
  }
}

export function setAnalyticsOwner(flag = true) {
  try {
    if (flag) localStorage.setItem(OWNER_KEY, '1');
    else localStorage.removeItem(OWNER_KEY);
  } catch {
    /* private mode */
  }
}

/**
 * If `?me=` matches token, mark this browser as owner, strip the param from the URL.
 * @returns {boolean} true when the param was consumed
 */
export function consumeOwnerMeParam(token) {
  if (!token) return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const me = params.get('me');
    if (!me || me !== token) return false;

    setAnalyticsOwner(true);
    params.delete('me');
    const qs = params.toString();
    const next = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash || ''}`;
    window.history.replaceState({}, '', next);
    return true;
  } catch {
    return false;
  }
}

export function resolvePath(base, assetPath) {
  if (!assetPath) return '';
  if (assetPath.startsWith('http')) return assetPath;
  if (!base) return assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `${base}/${assetPath.replace(/^\//, '')}`.replace(/\/+/g, '/');
}
