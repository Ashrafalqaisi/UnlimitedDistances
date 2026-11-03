# Flow Index

Central tracker for every functional flow of the Unlimited Distances runner platform.
Each flow is analysed, diagrammed, documented and approved **before** it is implemented.

**Status values:** `Pending` · `In progress` · `Draft` (written, awaiting review) · `Done` · `Approved` · `Partial` (some of it is built)

| # | Flow | Analysis | Diagram | Documentation | Approval | Implementation | Document |
|---|---|---|---|---|---|---|---|
| 1 | Authentication & Session | Draft | Draft | Draft | Pending | Partial | [AUTHENTICATION_SESSION.md](authentication/AUTHENTICATION_SESSION.md) |
| 2 | Runner Profile | Pending | Pending | Pending | Pending | Pending | — |
| 3 | Event Discovery | Pending | Pending | Pending | Pending | Partial (static data) | — |
| 4 | Event Registration | Pending | Pending | Pending | Pending | Pending | — |
| 5 | Payments | Pending | Pending | Pending | Pending | Pending | — |
| 6 | My Registrations | Pending | Pending | Pending | Pending | Pending | — |
| 7 | Results | Pending | Pending | Pending | Pending | Pending | — |
| 8 | Admin Back-office | Pending | Pending | Pending | Pending | Pending | — |

## Cross-cutting concerns

These aren't flows of their own. Each one is documented inside the flows that need it.

| Concern | Where it's handled |
|---|---|
| Localization (en / ar, RTL) | Every flow: shared `Locale` type, web URL locale, mobile `LanguageProvider` |
| Shared API client | `packages/shared/src/api.ts`, extended in Flow 1 (authorized requests, refresh) |
| Transactional email | `apps/api/src/mail`, first used in Flow 1 |
| Rate limiting | Introduced in Flow 1 |

## Change log

| Date | Change |
|---|---|
| 2026-11-03 | Index created. Flow 1 analysis, diagrams and documentation drafted for review. |
