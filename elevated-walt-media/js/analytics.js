import {
  getAnalyticsSessionId,
  getVisitorId,
  isAnalyticsOwner,
  setAnalyticsOwner,
  consumeOwnerMeParam,
} from './utils.js';

let analyticsConfig = null;
let configPromise = null;
let sessionStart = Date.now();
let identityContext = null;
let ownerFlag = false;
const progressTimers = new Map();

function detectDevice() {
  const ua = navigator.userAgent || '';
  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  const shortSide = Math.min(screen.width || 0, screen.height || 0);
  if (/iPad|Tablet/i.test(ua) || (touch && shortSide >= 768)) return 'tablet';
  if (/Mobi|Android.*Mobile|iPhone|iPod/i.test(ua) || (touch && shortSide < 768)) return 'mobile';
  return 'desktop';
}

function collectUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const parts = [];
    for (const [key, value] of params.entries()) {
      if (key.startsWith('utm_') && value) parts.push(`${key}=${value}`);
    }
    return parts.join('&').slice(0, 300);
  } catch {
    return '';
  }
}

function getLandingPath() {
  const key = 'lodge-lens-landing-path';
  try {
    let landing = sessionStorage.getItem(key);
    if (!landing) {
      landing = window.location.pathname || '/';
      sessionStorage.setItem(key, landing);
    }
    return landing;
  } catch {
    return window.location.pathname || '/';
  }
}

async function fetchWithTimeout(url, ms = 4000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Soft-fail IP/geo lookups - never block analytics. */
async function fetchIdentityExtras() {
  const extras = { ip: '', country: '', city: '' };
  try {
    const ipRes = await fetchWithTimeout('https://api.ipify.org?format=json');
    if (ipRes.ok) {
      const data = await ipRes.json();
      extras.ip = data.ip || '';
    }
  } catch {
    /* blocked / offline */
  }
  try {
    const geoRes = await fetchWithTimeout('https://ipapi.co/json/');
    if (geoRes.ok) {
      const data = await geoRes.json();
      if (!extras.ip && data.ip) extras.ip = data.ip;
      extras.country = data.country_name || data.country || '';
      extras.city = data.city || '';
    }
  } catch {
    /* blocked / rate-limited */
  }
  return extras;
}

function buildBaseIdentity() {
  const { id: visitorId, returning } = getVisitorId();
  ownerFlag = isAnalyticsOwner();

  let timezone = '';
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch {
    timezone = '';
  }

  const dpr = window.devicePixelRatio || 1;
  const meta = {
    connection: navigator.connection?.effectiveType || '',
    colorScheme: window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light',
    visibility: document.visibilityState || '',
  };

  return {
    visitor_id: visitorId,
    is_owner: ownerFlag ? 1 : 0,
    ip: '',
    country: '',
    city: '',
    timezone,
    locale: navigator.language || '',
    referrer: (document.referrer || '').slice(0, 300),
    page_path: window.location.pathname || '/',
    landing_path: getLandingPath(),
    utm: collectUtm(),
    device: detectDevice(),
    screen: `${screen.width || 0}x${screen.height || 0}@${dpr}`,
    returning,
    meta_json: JSON.stringify(meta).slice(0, 500),
  };
}

function currentIdentity() {
  if (!identityContext) identityContext = buildBaseIdentity();
  ownerFlag = ownerFlag || isAnalyticsOwner();
  return {
    ...identityContext,
    is_owner: ownerFlag ? 1 : 0,
    page_path: window.location.pathname || identityContext.page_path || '/',
  };
}

export async function initAnalytics() {
  if (configPromise) return configPromise;

  configPromise = (async () => {
    try {
      const base = document.body.dataset.basePath || '';
      const prefix = base ? `${base}/` : '';
      const res = await fetch(`${prefix}config/analytics.public.json`.replace(/\/+/g, '/'));
      if (res.ok) analyticsConfig = await res.json();
    } catch {
      analyticsConfig = null;
    }
  })();

  await configPromise;

  const meMarked =
    Boolean(analyticsConfig?.ownerToken) && consumeOwnerMeParam(analyticsConfig.ownerToken);

  identityContext = buildBaseIdentity();

  // Soft-fail: enrich when ready; events may fire before IP/geo arrives
  fetchIdentityExtras().then((extras) => {
    if (identityContext) Object.assign(identityContext, extras);
  });

  if (meMarked) {
    markAnalyticsOwner('me_link');
  }

  window.addEventListener('beforeunload', () => {
    const lodgeId = document.body.dataset.lodgeId;
    if (lodgeId) {
      sendEvent(lodgeId, 'session_end', lodgeId, String(Math.round((Date.now() - sessionStart) / 1000)), {
        preferBeacon: true,
      });
    }
  });
}

/** Persist owner flag for this browser and emit an audit event. */
export function markAnalyticsOwner(reason = 'manual') {
  setAnalyticsOwner(true);
  ownerFlag = true;
  if (identityContext) identityContext.is_owner = 1;
  const lodgeId = document.body.dataset.lodgeId || 'admin';
  sendEvent(lodgeId, 'owner_marked', reason);
}

export function sendEvent(lodgeId, event, label = '', value = '', options = {}) {
  if (!analyticsConfig?.endpointUrl || !analyticsConfig?.writeKey) return;

  const ctx = currentIdentity();
  const payload = {
    key: analyticsConfig.writeKey,
    lodge_id: lodgeId,
    event,
    label,
    value,
    session_id: getAnalyticsSessionId(),
    user_agent: navigator.userAgent.slice(0, 200),
    visitor_id: ctx.visitor_id,
    is_owner: ctx.is_owner,
    ip: ctx.ip || '',
    country: ctx.country || '',
    city: ctx.city || '',
    timezone: ctx.timezone || '',
    locale: ctx.locale || '',
    referrer: ctx.referrer || '',
    page_path: ctx.page_path || '',
    landing_path: ctx.landing_path || '',
    utm: ctx.utm || '',
    device: ctx.device || '',
    screen: ctx.screen || '',
    returning: ctx.returning ?? 0,
    meta_json: ctx.meta_json || '',
  };

  const body = JSON.stringify(payload);

  if (options.preferBeacon && navigator.sendBeacon) {
    navigator.sendBeacon(
      analyticsConfig.endpointUrl,
      new Blob([body], { type: 'text/plain;charset=utf-8' }),
    );
    return;
  }

  fetch(analyticsConfig.endpointUrl, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body,
    keepalive: true,
  }).catch(() => {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        analyticsConfig.endpointUrl,
        new Blob([body], { type: 'text/plain;charset=utf-8' }),
      );
    }
  });
}

export function trackPageView(lodgeId) {
  sendEvent(lodgeId, 'page_view', lodgeId);
}

export function trackChapterView(lodgeId, chapterId) {
  sendEvent(lodgeId, 'chapter_view', chapterId);
}

export function trackVideoPlay(lodgeId, chapterId, youtubeId) {
  sendEvent(lodgeId, 'video_play', chapterId, youtubeId);
}

export function trackVideoProgress(lodgeId, chapterId, seconds) {
  sendEvent(lodgeId, 'video_progress', chapterId, String(seconds));
}

export function trackVideoComplete(lodgeId, chapterId, youtubeId) {
  sendEvent(lodgeId, 'video_complete', chapterId, youtubeId);
}

export function trackClick(lodgeId, event, label) {
  sendEvent(lodgeId, event, label);
}

export function startVideoProgressTimer(lodgeId, chapterId, getSeconds) {
  stopVideoProgressTimer(chapterId);
  const timer = setInterval(() => {
    trackVideoProgress(lodgeId, chapterId, getSeconds());
  }, 10000);
  progressTimers.set(chapterId, timer);
}

export function stopVideoProgressTimer(chapterId) {
  const timer = progressTimers.get(chapterId);
  if (timer) {
    clearInterval(timer);
    progressTimers.delete(chapterId);
  }
}

export function getAnalyticsConfig() {
  return analyticsConfig;
}
