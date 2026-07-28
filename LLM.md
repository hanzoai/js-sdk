# LLM.md - Hanzo TypeScript SDK

## Overview
TypeScript/JavaScript client for the Hanzo Cloud API
(`https://api.hanzo.ai/v1`). Covers the full unified surface — AI inference
plus every `/v1/<service>` product. npm package: **`@hanzo/sdk`** (the
unscoped `hanzoai` name is squatted; `scripts/generate.sh` still passes
`npmName=hanzoai`, which is harmless only because the generated
`package.json` is discarded — the repo root owns it).

## The ONE way: generated from the OpenAPI spec

Generated, never hand-written. Source of truth is `hanzoai/openapi`
`hanzo.yaml`. Generator is **openapi-generator** (`typescript-axios`) — no
Stainless.

```bash
./scripts/generate.sh                    # regenerate src/ from hanzoai/openapi@main
SPEC=/path/to/hanzo.yaml ./scripts/generate.sh
npm run build                            # tsc -> dist (CJS) + dist/esm (ESM)
```

Never edit `src/*.ts` by hand — change the spec in `hanzoai/openapi` and
regenerate. CI (`generate.yml`) does this on every spec change via a
`spec-update` repository_dispatch.

### The pipeline above this repo

```
hanzoai/cloud    emits its router spec  ->  cloud/openapi.yaml + generated/hanzo.json
hanzoai/openapi  merges 69 service specs ->  hanzo.yaml   <- the ONE SDK input
this repo        scripts/generate.sh     ->  src/, then owns its bump + release
```

SHAs behind the currently committed `src/`: `hanzoai/openapi` **2861089**
(its `hanzo.yaml` last changed at **3300cda**), `hanzoai/cloud` **b87a38df**.

Two lags to know about, neither fixable from this repo:

- `hanzo.yaml` still carries 28 `/v1/paas` paths that cloud `b87a38df`
  already folded into `/v1/platform`. `merge.py` has not re-run since the
  fold, so the SDK cannot see it yet.
- There is a second, competing projection: `hanzoai/openapi`'s `sdks.yaml`
  maps typescript to `take: { .: src/cloud }` with `modelPackage: model`,
  and `generate.py typescript` writes `src/cloud/` — a layout this repo does
  not use and does not build. `scripts/generate.sh` (writing `src/`, with
  `modelPackage: models`) is the one that is real here. Running `generate.py`
  against this repo leaves an orphan `src/cloud/` tree; don't.

### Known generator defect — `src/api.ts`, three lines, every regen

`hanzo.yaml` carries case-variant duplicate tags: `AI`/`Ai`, `API Keys`/`Api
Keys`, `MCP`/`Mcp`. openapi-generator emits a distinct class per tag
(`AIApi` *and* `AiApi`), deduplicates the colliding filenames to
`ai0-api.ts`, then writes the barrel using the **pre-dedup** name
`./api/ai-api`. Three dangling re-exports; `tsc` fails and the client does
not compile as generated:

```
./api/ai-api        -> ./api/ai0-api
./api/api-keys-api  -> ./api/api-keys0-api
./api/mcp-api       -> ./api/mcp0-api
```

Repair those three lines after every regeneration until the tags are
normalized upstream in `hanzoai/openapi`'s `merge.py` — that is where the
fix belongs, not here. This is new: the previously committed client (493 api
files) was clean; the tag collapse that took it to 354 introduced it. It
means `generate.yml`'s "Verify it builds" step fails on an untouched
auto-regen PR.

## Module formats — what `dist/esm` is and is not

`tsc` does not add extensions, and the generated client imports
directories (`export * from "./api"`) and extensionless paths
(`./api/ai0-api`). Node's ESM loader rejects both, so `dist/esm` is **not
loadable by Node** — it exists for bundlers, reached through the legacy
`"module"` field. The `exports` map therefore points **both** `import` and
`require` at the CJS build, which Node's ESM loader reads named exports
from via cjs-module-lexer (verified: `import { AdminApi } from '@hanzo/sdk'`
works). Making `dist/esm` genuinely Node-loadable means rewriting every
relative specifier to a real file path — that belongs in
`scripts/generate.sh`, which this repo owns, not in the generated files.

## Auth
```ts
import { Configuration, ChatCompletionsApi } from "@hanzo/sdk";

const config = new Configuration({
  basePath: "https://api.hanzo.ai",
  accessToken: process.env.HANZO_API_KEY,   // IAM JWT or hk- Cloud API key
});
```

## Release
Push a semver tag `vX.Y.Z` → `publish-npm.yml` builds and `npm publish`es.
Semver only, never a sha pin.

**The registry, not `package.json`, is the version of record.** npm had
`2.0.0` published while `package.json` still read `1.0.1` — 2.0.0 shipped
from a since-reverted lineage and was never tagged. Bumping `1.0.1 -> 1.0.2`
would have published *below* the current `latest` and walked consumers
backwards. Always `npm view @hanzo/sdk version` first and take the patch
above **that**; this release is `2.0.1`.

## Note: `packages/mcp-server`
The Stainless-era MCP server under `packages/mcp-server` targets the old
client surface and is not rebuilt by the root pipeline. It needs its own
regeneration against the new surface before it can be republished (tracked
separately).
