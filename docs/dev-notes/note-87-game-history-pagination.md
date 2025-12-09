# Note 87 – Game History Pagination Overwrite

## Context
- `GameHistory` fetches `/games/player/:name/history` with `offset/limit`.
- State setter replaces `games` with the new page each time, so Load More never accumulates results.
- Users can’t view older matches, matching the issue description.

## Goals
- Append results while keeping ordering consistent (newest first).
- Avoid duplicate cards when backend returns overlapping items.
- Preserve stats/pagination metadata without corrupting totals.
