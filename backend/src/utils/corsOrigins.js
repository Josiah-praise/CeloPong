const DEFAULT_DEV_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const ORIGIN_SOURCES = {
  ENV: 'env',
  FALLBACK_ENV: 'fallback-env',
  DEFAULT: 'default',
};

function normalizeUrl(url) {
  return url?.replace(/\/$/, '') || null;
}

function getCorsOrigins(envUrl = process.env.FRONTEND_URL, fallbackUrl = process.env.FRONTEND_URL_FALLBACK) {
  const normalized = normalizeUrl(envUrl);
  if (normalized) {
    return { origins: [normalized], source: ORIGIN_SOURCES.ENV };
  }

  const fallback = normalizeUrl(fallbackUrl);
  if (fallback) {
    return { origins: [fallback], source: ORIGIN_SOURCES.FALLBACK_ENV };
  }

  return { origins: DEFAULT_DEV_ORIGINS, source: ORIGIN_SOURCES.DEFAULT };
}

module.exports = {
  ORIGIN_SOURCES,
  getCorsOrigins,
};
