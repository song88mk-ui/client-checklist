# CLAUDE.md — client-checklist

<!-- song88:standing-rules:begin -->
## Standing rules (every prompt, before anything else)

Shared by every song88 repo. The canonical text is `../song88-claude/standing-rules/STANDING-RULES.md`:
edit it there and run `../song88-claude/standing-rules/sync_standing_rules.py`, never edit this block by hand. A `UserPromptSubmit`
hook in `.claude/settings.json` re-injects these rules on every prompt.

1. **Read this repo's CLAUDE.md and AGENTS.md first.**
2. **Fetch latest before investigating.** Run `git fetch origin` and compare with origin/main for this repo and every sibling repo you read, before citing file contents or repo or deployment state as fact. A local checkout can be hundreds of commits behind. When you cannot or should not pull, read files with `git show origin/main:<path>`, and say so explicitly if you did not check.
3. **Trace in the code, never from memory.** Search the repo and its docs, trace the feature end to end, and cite `file:line`.
4. **Label every claim verified, assumption or unknown.** Never guess.
5. **Explain the plan and wait for approval before any code change.** Then make the smallest change that does the job.
6. **Production is read-only.** Do not run queries, deploy, change schema or invalidate caches unless explicitly instructed.
7. **Update docs and README in the same change** whenever the change affects what they describe.
8. **Every SQL script must be idempotent.** Re-running it is a no-op with the same end state.
9. **Do not modify a sibling repo as a side effect of work here.** Siblings are read-only references unless the user asks for a change in that repo.
10. **Never print, log or commit a secret.** Mask it if it must appear in a log line.
11. **A new project or service ships with tests** in the repo's existing test framework.
12. **Commit, push or open a PR only when explicitly asked.** "Implement it" authorizes local edits only.
13. **Report validation with every change:** build, unit tests, integration tests, manual checks and remaining risks. If something could not be validated, say what and why, name the tests to run before deployment, and mark the work Implementation Complete – Validation Pending, never Completed.
14. **If a workflow step does not apply, say so** instead of skipping it silently.
<!-- song88:standing-rules:end -->

## What this repo is

Client onboarding checklist: a .NET API plus a SvelteKit UI, in one repo. Deployed as
`checklist-api` and `checklist-web` in the `platform` namespace, behind `cl-api.stg.jmj.bet`
and `cl-api.jmj.bet`. It calls `Auth` and `backoffice-final`; nothing calls it. See
`../INTEGRATION-MAP.md`.

```
client-checklist.api/   Client.Checklist.API.sln — Client.Checklist.API + Client.Checklist.Shared
client-checklist.ui/    SvelteKit + Tailwind, built to nginx
```

.NET 10 / C# 14, controller-based MVC (`IntegrationController`, routed at `v1`).

- EF Core 10.0.11 + SQL Server. `ClientChecklistContext` with entities `ClientInformation`,
  `ClientSteps`, `ClientSubtask`.
- `System.IdentityModel.Tokens.Jwt` 8.1.2 for token handling; authorization via
  `client-checklist.api/Client.Checklist.API/ActionFilters/`.
- Serilog, `Infra.Extensions.Telemetry` 0.1.1-5, Swashbuckle 10.2.3,
  `Microsoft.AspNetCore.Diagnostics.HealthChecks` 2.2.0.
- UI: SvelteKit, Tailwind, Vite. `VITE_API_BASE_URL` per environment in `.env.stg` / `.env.prd`.

## Build / test

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

Read this before claiming coverage:

- **The API has no test project at all.** No xUnit, nothing. Any assertion about API behaviour
  has to come from reading the code or running it.
- The UI has exactly two tests: `client-checklist.ui/src/utils/getOverallStatus.test.ts` (vitest) and
  `client-checklist.ui/tests/login.spec.ts` (playwright).
- **CI runs neither.** `.github/workflows/ci-api.yml` and `.github/workflows/ci-web.yml` build and push Docker
  images with no test step. `pnpm run test` and `pnpm run e2e` exist but are never invoked
  automatically.

## Critical rules

- **This repo owns the only EF migrations in the workspace** —
  `client-checklist.api/Client.Checklist.API/Migrations/`, two of them, from January 2025. Every other .NET repo
  gets its schema from Flyway. Keep using EF migrations here; do not migrate this to Flyway
  without a decision.
- **Upstream API keys are shared contracts, not local config.** Both upstreams are called with API
  keys duplicated verbatim from those repos' own `appsettings.json`:

| Service | Config | Wiring |
|---|---|---|
| `Auth` | `client-checklist.api/Client.Checklist.API/appsettings.json:27` (`AuthenticationAPI.Uri`) | `client-checklist.api/Client.Checklist.API/Program.cs:34-38`, typed client with `x-api-key` |
| `backoffice-final` | `client-checklist.api/Client.Checklist.API/appsettings.json:37` (`BackofficeAPI.Uri`) | |

## Conventions

- Adding a test project here is greenfield work — there is no sibling convention in this repo to
  copy. Mirror `Auth.Tests` or `Platform.Shared.Test` instead (xUnit 2.5.3, Arrange/Act/Assert,
  no mocking framework unless one is already present).
- dotnet-claude-kit defaults do not match this repo: **xUnit 2.5.3 rather than v3** (where tests
  exist at all), no central package management, controller-based rather than minimal API.
- **Logging rules** (shared with odds-engine-2):
  - Pass the exception as the first argument: `_logger.LogError(ex, "... {Payload}", payload)`.
    Never put `ex.Message` or `ex.StackTrace` in the message text, and never pass the exception
    as a template argument.
  - Use PascalCase placeholders (`{Message}`, `{Payload}`).
  - Keep operational log lines (start, connecting, connected, progress). Do not remove or merge
    them to satisfy SonarQube S6664.

## See also

`../CLAUDE.md` (workspace, full dotnet-claude-kit override list) · `../INTEGRATION-MAP.md` · `AGENTS.md`
