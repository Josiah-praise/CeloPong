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

export function resolveBackendUrl() {
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  if (envUrl) {
    return envUrl;
  }

  const locationUrl = deriveFromLocation();
  if (locationUrl) {
    warnDefault(locationUrl);
    return locationUrl;
  }

  const fallback = `http://localhost:${DEFAULT_PORT}`;
  warnDefault(fallback);
  return fallback;
}
