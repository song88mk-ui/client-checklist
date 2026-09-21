# client-checklist

Client onboarding checklist: a .NET API plus a SvelteKit UI, in one repo. Deployed as
`checklist-api` and `checklist-web` in the `platform` namespace, behind `cl-api.stg.jmj.bet`
and `cl-api.jmj.bet`.

It calls `Auth` and `backoffice-final`; nothing calls it. See `../INTEGRATION-MAP.md`.

## Layout

```
client-checklist.api/   Client.Checklist.API.sln — Client.Checklist.API + Client.Checklist.Shared
client-checklist.ui/    SvelteKit + Tailwind, built to nginx
```

## Commands

```
dotnet build client-checklist.api/Client.Checklist.API.sln
```

UI, from `client-checklist.ui/` (pnpm):

```
pnpm run dev
pnpm run build           # or build:stg / build:prd
pnpm run check           # svelte-check
pnpm run lint
pnpm run test            # vitest, single run
pnpm run e2e             # playwright
```

## Testing — read this before claiming coverage

- **The API has no test project at all.** No xUnit, nothing. Any assertion about API behaviour
  has to come from reading the code or running it.
- The UI has exactly two tests: `client-checklist.ui/src/utils/getOverallStatus.test.ts` (vitest) and
  `client-checklist.ui/tests/login.spec.ts` (playwright).
- **CI runs neither.** `.github/workflows/ci-api.yml` and `.github/workflows/ci-web.yml` build and push Docker
  images with no test step. `pnpm run test` and `pnpm run e2e` exist but are never invoked
  automatically.

Adding a test project here is greenfield work — there is no sibling convention in this repo to
copy. Mirror `Auth.Tests` or `Platform.Shared.Test` instead (xUnit 2.5.3, Arrange/Act/Assert,
no mocking framework unless one is already present).

## Stack

.NET 10 / C# 14, controller-based MVC (`IntegrationController`, routed at `v1`).

- EF Core 10.0.11 + SQL Server. `ClientChecklistContext` with entities `ClientInformation`,
  `ClientSteps`, `ClientSubtask`.
- **This repo owns the only EF migrations in the workspace** —
  `client-checklist.api/Client.Checklist.API/Migrations/`, two of them, from January 2025. Every other .NET repo
  gets its schema from Flyway. Keep using EF migrations here; do not migrate this to Flyway
  without a decision.
- `System.IdentityModel.Tokens.Jwt` 8.1.2 for token handling; authorization via
  `client-checklist.api/Client.Checklist.API/ActionFilters/`.
- Serilog, `Infra.Extensions.Telemetry` 0.0.1-1, Swashbuckle 10.2.3,
  `Microsoft.AspNetCore.Diagnostics.HealthChecks` 2.2.0.
- UI: SvelteKit, Tailwind, Vite. `VITE_API_BASE_URL` per environment in `.env.stg` / `.env.prd`.

## Upstream dependencies

| Service | Config | Wiring |
|---|---|---|
| `Auth` | `client-checklist.api/Client.Checklist.API/appsettings.json:27` (`AuthenticationAPI.Uri`) | `client-checklist.api/Client.Checklist.API/Program.cs:34-38`, typed client with `x-api-key` |
| `backoffice-final` | `client-checklist.api/Client.Checklist.API/appsettings.json:37` (`BackofficeAPI.Uri`) | |

Both are called with API keys that are duplicated verbatim from those repos' own
`appsettings.json`. Treat them as shared contracts, not local config.

## Tooling notes

dotnet-claude-kit defaults do not match this repo: **xUnit 2.5.3 rather than v3** (where tests
exist at all), no central package management, controller-based rather than minimal API. See the
root `../CLAUDE.md` for the full override list.
