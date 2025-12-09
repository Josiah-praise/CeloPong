# Note 85 – My Wins Prize Payout

## Context

- `MyWins` reads `stakeAmount` from `/games/my-wins`.
- UI shows `stakeAmount` as “Prize Amount”, but winner actually receives `stakeAmount * 2`.
- Under-reporting rewards confuses players and erodes trust in staked mode.

## Goals

- Display the full payout (2× stake) everywhere the UI references prize totals.
- Introduce a formatter that can safely double numeric strings without floating-point loss.
- Document the logic so future contributors avoid repeating the bug.
