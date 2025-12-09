# Note 89 – My Wins Pagination Overwrite

## Context
- My Wins fetches `/games/my-wins` with pagination params but replaces `wins` state on every request.
- The existing issue notes that “Load more” discards previous results, which we can now fix similar to Game History.
