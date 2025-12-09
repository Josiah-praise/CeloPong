const DEFAULT_DEV_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function getCorsOrigins() {
  return DEFAULT_DEV_ORIGINS;
}

module.exports = {
  getCorsOrigins,
};
