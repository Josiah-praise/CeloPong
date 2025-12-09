# Note 90 – FRONTEND_URL CORS Fallback

## Context
- `FRONTEND_URL` is mandatory today; when unset, Express and Socket.IO cors `origin` are `undefined`.
- Browsers reject requests because CORS middleware responds with `Access-Control-Allow-Origin: null`.
- Local development without `.env` is painful.

## Goals
- Provide sane defaults (localhost/self origin) when env var missing.
- Warn in logs so prod setups know they are running wide open.
- Keep `FRONTEND_URL` trimming for when it is present.
