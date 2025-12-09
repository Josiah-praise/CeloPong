# Note 53: Environment Variables

## Summary
Clearly documenting environment variables prevents fragile deployments.

## Implementation Notes
- Maintain a `.env.example` file listing required vars for each service (frontend API URLs, backend secrets, player service ports).
- Document default values and acceptable ranges inside `STARTUP_GUIDE.md` with links to this note.
- Use a config loader that validates presence/types at startup and throws descriptive errors when missing.
- Avoid leaking secrets to the frontend by prefixing only safe variables with the framework-specific `REACT_APP_` or equivalent.

## Observability
- Log which optional vars are using defaults (without printing actual secret values) for easier debugging.

## Next Steps
- Provide scripts to sync env vars with deployment platforms (Fly.io secrets, Kubernetes secrets) automatically.
- Document rotation procedures for credentials touching blockchain integrations.
