# Note 87 – Game History Pagination Overwrite

## Context
- `GameHistory` fetches `/games/player/:name/history` with `offset/limit`.
- State setter replaces `games` with the new page each time, so Load More never accumulates results.
- Users can’t view older matches, matching the issue description.
