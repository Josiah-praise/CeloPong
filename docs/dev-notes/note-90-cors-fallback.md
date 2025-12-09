# Note 90 – FRONTEND_URL CORS Fallback

## Context
- `FRONTEND_URL` is mandatory today; when unset, Express and Socket.IO cors `origin` are `undefined`.
- Browsers reject requests because CORS middleware responds with `Access-Control-Allow-Origin: null`.
- Local development without `.env` is painful.

## Goals
- Provide sane defaults (localhost/self origin) when env var missing.
- Warn in logs so prod setups know they are running wide open.
- Keep `FRONTEND_URL` trimming for when it is present.

## Proposed Steps
1. Add a helper that returns `{ origins, source }` based on env + defaults.
2. Update Express and Socket.IO to use the helper outputs.
3. Enhance health endpoint/logs to show active CORS policy.
