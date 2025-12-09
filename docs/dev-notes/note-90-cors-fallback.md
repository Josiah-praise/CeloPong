# Note 90 – FRONTEND_URL CORS Fallback

## Context
- `FRONTEND_URL` is mandatory today; when unset, Express and Socket.IO cors `origin` are `undefined`.
- Browsers reject requests because CORS middleware responds with `Access-Control-Allow-Origin: null`.
- Local development without `.env` is painful.
