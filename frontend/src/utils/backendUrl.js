const DEFAULT_PORT = 8080;
const DEFAULT_PROTOCOL = 'http:';

function deriveFromLocation() {
  if (typeof window === 'undefined' || !window.location) {
    return null;
  }

  const { protocol, hostname } = window.location;
  const safeProtocol = protocol || DEFAULT_PROTOCOL;
  const safeHost = hostname || 'localhost';
  return `${safeProtocol}//${safeHost}:${DEFAULT_PORT}`;
}

function warnDefault(url) {
  if (typeof console !== 'undefined') {
    console.warn('[BACKEND_URL] Falling back to', url);
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

export function resolveBackendUrl() {
  const envUrl = sanitizeUrl(process.env.REACT_APP_BACKEND_URL);
  if (envUrl) {
    return envUrl;
  }

  const locationUrl = sanitizeUrl(deriveFromLocation());
  if (locationUrl) {
    warnDefault(locationUrl);
    return locationUrl;
  }

  const fallback = sanitizeUrl(`http://localhost:${DEFAULT_PORT}`);
  warnDefault(fallback);
  return fallback;
}
