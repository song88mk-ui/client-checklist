# AGENTS.md — client-checklist

Client onboarding checklist: a .NET API (`checklist-api`) plus a SvelteKit UI (`checklist-web`).
Read [CLAUDE.md](CLAUDE.md) first: it holds the standing rules every agent follows and the full
operating manual. This file is the short version for agents.

## Mission boundaries
- Subject = client-checklist (API in `client-checklist.api/`, UI in `client-checklist.ui/`). It
  calls `Auth` and `backoffice-final`; nothing calls it.
- Only modify files inside this repo; siblings (`Auth`, `backoffice-final`, `argocd`) are read-only
  references.
- UI commands run with pnpm from `client-checklist.ui/` (CLAUDE.md § Build / test).

## Hard rules
- This repo owns the only EF migrations in the workspace (`Client.Checklist.API/Migrations/`); keep
  using them and do not move to Flyway without a decision (CLAUDE.md § Critical rules).
- Upstream API keys for `Auth` and `backoffice-final` are copied from those repos; treat them as
  shared contracts, not local config (CLAUDE.md § Critical rules).
- The API has no test project; claims about API behaviour come from reading or running the code
  (CLAUDE.md § Build / test).
- CI runs no tests: the vitest and playwright suites exist but are never invoked automatically
  (CLAUDE.md § Build / test).
- A new API test project mirrors `Auth.Tests` or `Platform.Shared.Test`: xUnit 2.5.3, not v3, no new
  mocking framework (CLAUDE.md § Conventions).

## See also
[CLAUDE.md](CLAUDE.md) · [README.md](README.md)
