export function resolveBackendUrl() {
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  if (envUrl) {
    return envUrl;
  }

  return undefined;
}
