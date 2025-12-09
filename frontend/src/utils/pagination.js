export function mergePages(existingItems, newItems, key = '_id') {
  // Accept partial data and avoid mutating original arrays
  const merged = Array.isArray(existingItems) ? [...existingItems] : [];
  if (!Array.isArray(newItems) || newItems.length === 0) {
    return merged;
  }

  const seen = new Set(merged.map(item => item?.[key]));

  for (const item of newItems) {
    const itemKey = item?.[key];
    if (itemKey && seen.has(itemKey)) {
      continue;
    }
    merged.push(item);
    if (itemKey) {
      seen.add(itemKey);
    }
  }

  return merged;
}
