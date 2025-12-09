const DEFAULT_PORT = 8080;
const DEFAULT_PROTOCOL = 'http:';

export const BACKEND_URL_SOURCES = {
  ENV: 'env',
  LOCATION: 'location',
  FALLBACK: 'fallback',
  FALLBACK_ENV: 'fallback-env',
};

function deriveFromLocation() {
  if (typeof window === 'undefined' || !window.location) {
    return null;
  }

  const { protocol, hostname } = window.location;
  const safeProtocol = protocol || DEFAULT_PROTOCOL;
  const safeHost = hostname || 'localhost';
  return `${safeProtocol}//${safeHost}:${DEFAULT_PORT}`;
}

function warnDefault(url, source) {
  if (typeof console !== 'undefined') {
    console.warn(`[BACKEND_URL] Falling back via ${source} to`, url);
  }
}

function sanitizeUrl(url) {
  if (!url) {
    return null;
  }

  const trimmed = url.replace(/\/+$/, '');

  if (!isValidUrl(trimmed)) {
    console.warn('[BACKEND_URL] Ignoring invalid URL', trimmed);
    return null;
  }

  return trimmed;
}

function isValidUrl(candidate) {
  try {
    new URL(candidate);
    return true;
  } catch {
    return false;
  }
}

let cachedMeta = null;

function logResolution(meta) {
  if (typeof console !== 'undefined') {
    console.info(`[BACKEND_URL] Using ${meta.source} source: ${meta.url}`);
  }
}

function computeBackendUrlWithSource() {
  const envUrl = sanitizeUrl(process.env.REACT_APP_BACKEND_URL);
  if (envUrl) {
    return { url: envUrl, source: BACKEND_URL_SOURCES.ENV };
  }

  const locationUrl = sanitizeUrl(deriveFromLocation());
  if (locationUrl) {
    warnDefault(locationUrl, BACKEND_URL_SOURCES.LOCATION);
    return { url: locationUrl, source: BACKEND_URL_SOURCES.LOCATION };
  }

  const fallback = sanitizeUrl(`http://localhost:${DEFAULT_PORT}`);
  warnDefault(fallback, BACKEND_URL_SOURCES.FALLBACK);
  return { url: fallback, source: BACKEND_URL_SOURCES.FALLBACK };
}

export function resolveBackendUrlWithSource() {
  if (!cachedMeta) {
    cachedMeta = computeBackendUrlWithSource();
    logResolution(cachedMeta);
  }
  return cachedMeta;
}

export function resolveBackendUrl() {
  return resolveBackendUrlWithSource().url;
}
