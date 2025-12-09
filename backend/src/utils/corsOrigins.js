const DEFAULT_DEV_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

const ORIGIN_SOURCES = {
  ENV: 'env',
  FALLBACK_ENV: 'fallback-env',
  DEFAULT: 'default',
  WILDCARD: 'wildcard',
};

function normalizeUrl(url) {
  return url?.replace(/\/$/, '') || null;
}

function getCorsOrigins(envUrl = process.env.FRONTEND_URL, fallbackUrl = process.env.FRONTEND_URL_FALLBACK, allowAll = process.env.FRONTEND_URL_ALLOW_ALL === 'true') {
  if (allowAll) {
    return { origins: true, source: ORIGIN_SOURCES.WILDCARD };
  }

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
