# Note 88 – Pagination Utilities

## Summary
- `frontend/src/utils/pagination.js` now houses helpers for merging pages and resetting offsets.
- Designed to keep My Wins / Game History logic consistent without duplicating array merges.

## Usage Tips
- Always pass `_id` or a stable key to prevent duplicates.
- Provide a comparator when historical ordering matters (e.g., `endedAt`).
- Utilities are re-exported via `frontend/src/utils/index.js` for convenience.

## Next Steps
- Extract a shared `usePaginatedList` hook that wraps loading state and offsets.
