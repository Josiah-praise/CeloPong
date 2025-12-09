export function mergePages(existingItems, newItems, key = '_id') {
  const merged = Array.isArray(existingItems) ? [...existingItems] : [];
  if (!Array.isArray(newItems) || newItems.length === 0) {
    return merged;
  }
  return merged;
}
