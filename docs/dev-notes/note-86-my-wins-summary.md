# Note 86 – My Wins Summary Cards

## Summary
- Shows aggregate claimable/claimed/total ETH so players understand pending rewards.
- Pulls data from the prize helper to avoid duplicating business rules.

## Considerations
- Totals should respect pagination if backend ever limits `/games/my-wins`; for now API returns aggregated totals.
- Banner copy references `PRIZE_MULTIPLIER`; keep that constant updated if payout logic changes.

## Ideas
- Add sparklines for win streaks.
- Export totals to CSV for audits.
