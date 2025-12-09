export function readBooleanEnv(value, defaultValue = true) {
  if (value === undefined) {
    return defaultValue;
  }

  return value !== 'false' && value !== '0';
}
