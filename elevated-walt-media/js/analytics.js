import { getAnalyticsSessionId } from './utils.js';

let analyticsConfig = null;
let configPromise = null;
let sessionStart = Date.now();
const progressTimers = new Map();

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

  window.addEventListener('beforeunload', () => {
    const lodgeId = document.body.dataset.lodgeId;
    if (lodgeId) {
      sendEvent(lodgeId, 'session_end', lodgeId, String(Math.round((Date.now() - sessionStart) / 1000)), {
        preferBeacon: true,
      });
    }
  });
}

export function sendEvent(lodgeId, event, label = '', value = '', options = {}) {
  if (!analyticsConfig?.endpointUrl || !analyticsConfig?.writeKey) return;

  const payload = {
    key: analyticsConfig.writeKey,
    lodge_id: lodgeId,
    event,
    label,
    value,
    session_id: getAnalyticsSessionId(),
    user_agent: navigator.userAgent.slice(0, 200),
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
