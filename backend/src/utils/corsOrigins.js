const DEFAULT_DEV_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function normalizeUrl(url) {
  return url?.replace(/\/$/, '') || null;
}

function getCorsOrigins(envUrl = process.env.FRONTEND_URL) {
  const normalized = normalizeUrl(envUrl);
  if (normalized) {
    return [normalized];
  }

  return DEFAULT_DEV_ORIGINS;
}

module.exports = {
  getCorsOrigins,
};
