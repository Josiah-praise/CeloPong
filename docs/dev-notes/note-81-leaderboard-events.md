# Note 81 – Leaderboard Event Contract

## Context

- The Welcome screen subscribes to `rankingsUpdate` for live leaderboard pushes.
- The reworked multiplayer handler emits `leaderboardUpdate`, so sockets never deliver data.
- Both handlers currently run side-by-side which makes the mismatch inconsistent.

## Goals

- Declare a canonical socket event name for leaderboard pushes.
- Provide a compatibility layer long enough to migrate every client.
- Document the wire contract so future handlers emit/listen consistently.
