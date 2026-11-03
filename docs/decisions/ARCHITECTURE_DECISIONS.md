# Architecture Decision Records

Each decision records its context, the options considered, the choice and its consequences.
Status: `Proposed` → `Accepted` / `Rejected` / `Superseded`.

| ID | Decision | Status | Flow |
|---|---|---|---|
| ADR-000 | Monorepo: NestJS API, Next.js web, Expo mobile, shared TS package | Accepted (existing) | — |
| ADR-001 | Session storage on web and mobile | Proposed | 1 |

---

## ADR-000: Monorepo with shared package

**Status:** Accepted (already in place)

pnpm workspaces + Turborepo. `apps/api` (NestJS 11, Prisma 6, PostgreSQL), `apps/web` (Next.js 15), `apps/mobile` (Expo SDK 58, Expo Router), and `packages/shared` (`@runner/shared`). The shared package holds code both clients use: the API client, validation, locale helpers and event types. It must stay free of platform-specific imports.

---

## ADR-001: Session storage on web and mobile

**Status:** Proposed, awaiting approval (Flow 1, Q9)

### Context

The API issues a short-lived JWT access token (15 min) and a long-lived opaque refresh token (30 days, rotated on every use). Neither client stores them today, so users never stay signed in. The API (`:3000`) and the web app (`:3001`) are on different origins.

### Options: web

| Option | Pros | Cons |
|---|---|---|
| **A. BFF**: Next.js route handlers call the API and set httpOnly cookies on the web domain | Tokens unreachable from JS (XSS-safe); server components know the user (no "signed-out" flash); no CORS credentials needed | Extra hop through Next.js; a few route handlers to maintain |
| B. API sets cookies directly | No proxy | Needs a shared parent domain in production, CORS with credentials, and CSRF tokens; doesn't work for mobile, so the API would need two auth modes |
| C. `localStorage` | Simplest | Any XSS steals a 30-day refresh token |

### Options: mobile

| Option | Pros | Cons |
|---|---|---|
| **A. Refresh token in `expo-secure-store`, access token in memory** | OS Keychain / Keystore encryption; recommended Expo module | Requires a development build if not bundled in Expo Go (verify against SDK 58 docs) |
| B. AsyncStorage | Simple | Unencrypted |

### Decision (proposed)

- **Web:** Option A (BFF with httpOnly, Secure, SameSite=Lax cookies).
- **Mobile:** Option A (`expo-secure-store`).
- The API stays **stateless and header-based** (`Authorization: Bearer`), so both clients use one auth mode.

### Consequences

- New web module code: `apps/web/src/modules/auth/session/` plus route handlers under `apps/web/app/api/session/`.
- New mobile module code: `apps/mobile/src/modules/auth/session/` (`AuthProvider`, `useAuth`).
- `packages/shared` gains an authorized client with single-flight refresh, used directly by mobile and by the web BFF on the server.
