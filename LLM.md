# LLM.md - Hanzo TypeScript SDK

## Overview
TypeScript/JavaScript client for the Hanzo Cloud API (`https://api.hanzo.ai`).
Covers the full unified surface — AI inference plus every `/v1/<service>`
product. npm package: **`hanzoai`**.

On the package name: this repo briefly renamed itself to `@hanzo/sdk` on the
belief that the unscoped `hanzoai` was squatted. It is not — `npm owner ls
hanzoai` is `zeekay`, and the registry's `repository.url` on the published
`0.0.1-alpha.1` already points here. `@hanzo/sdk` belongs to a *different*
package, `hanzo-js/sdk` (v2.0.0, the unified per-service SDK), so publishing
under it would have overwritten someone else's line. The name is `hanzoai` and
that is the name `sdks.yaml`'s `npmName` should say too; it still reads
`@hanzo/sdk`, which is inert only because `package.json` is on the generator's
`drop` list and never reaches this tree.

## The ONE way: generated from the OpenAPI spec

Generated, never hand-written. Source of truth is `hanzoai/openapi`
`hanzo.yaml`. Generator is **openapi-generator 7.14.0** (`typescript-axios`).

```bash
./scripts/generate.sh                    # regenerate src/ from hanzoai/openapi@main
OPENAPI=~/work/hanzo/openapi ./scripts/generate.sh   # use a local spec checkout
./scripts/generate.sh --check            # fail if committed src/ drifted
npm run build                            # tsc -> dist (CJS) + dist/esm (ESM)
npm run examples                         # type-check the six flows
```

Never edit `src/*.ts` by hand — change the spec in `hanzoai/openapi` and
regenerate. CI (`generate.yml`) does this on every spec change via a
`spec-update` repository_dispatch.

### One driver, one call site

`scripts/generate.sh` no longer knows how to generate anything. It clones
`hanzoai/openapi` and runs that repo's `generate.py typescript --repo .`; every
knob (generator name, `apiPackage`, `modelPackage`, `withSeparateModelsAndApi`,
the `drop` list) is data in `sdks.yaml`.

This was previously duplicated here, and the duplicate drifted: `sdks.yaml` said
`take: { .: src/cloud }` + `modelPackage: model` while this script wrote `src/`
with `models`, so running the canonical driver against this repo left an orphan
second copy of all 2143 files. Both sides now agree, and the disagreement cannot
recur because only one side declares it.

```
hanzoai/cloud    emits its router spec   ->  cloud/openapi.yaml
hanzoai/openapi  merges 55 service specs ->  hanzo.yaml   <- the ONE SDK input
this repo        scripts/generate.sh     ->  src/, then owns its bump + release
```

Current `src/` is 1360 files (239 api + 1116 models + 5 root) from **1132 paths /
1519 operations / 779 schemas**.

## Two spec defects fixed upstream — do not re-patch them here

Both were found by regenerating and are gone from `hanzoai/openapi` main. If you
are reading old notes telling you to hand-repair generated files: don't.

1. **35 `/v1/platform` operations had no `responses`.** OAS 3.x requires it and
   openapi-generator aborts the whole document, so `hanzo.yaml` produced no
   client in *any* language. Fixed in `platform/openapi.yaml` (commit
   `fc0c17a`). They carry a `2XX` with no `content`, because cloud's projection
   genuinely does not model those bodies.

2. **`ChatCompletionResponse.choices` was `items: { type: object }`**, so
   `choices[0].message.content` — the first line anyone writes — needed a cast
   in every language. Now an `ai_ChatChoice` schema (commit `07783f5`).

The older note about three dangling re-exports in `src/api.ts` (`./api/ai-api`
-> `./api/ai0-api`, etc., from case-variant duplicate tags `AI`/`Ai`) is also
resolved upstream: the current spec has **0 colliding tag groups**, and a clean
generation now compiles with no hand-repair at all.

## Module formats — what `dist/esm` is and is not

`tsc` does not add extensions, and the generated client imports directories
(`export * from "./api"`) and extensionless paths (`./api/ai0-api`). Node's ESM
loader rejects both, so `dist/esm` is **not loadable by Node** — it exists for
bundlers, reached through the legacy `"module"` field. The `exports` map
therefore points **both** `import` and `require` at the CJS build, which Node's
ESM loader reads named exports from via cjs-module-lexer.

## Auth
```ts
import { Configuration, OpenAICompatibleApi } from "hanzoai";

const config = new Configuration({
  basePath: "https://api.hanzo.ai",
  accessToken: process.env.HANZO_API_KEY,   // IAM JWT or hk- Cloud API key
});
```
Bearer only; the org comes from the token's `owner` claim, so no route in this
SDK takes an org argument.

## Examples — the six canonical flows

`examples/{hello,chat,money,store,agent,tools}`, one directory each, plus
`examples/client.ts` which is the single place a base URL or an env var is
resolved. The same six exist in every Hanzo SDK.

They are a **gate, not decoration**: `npm run examples` type-checks them against
the freshly generated client, and `hanzo.yml` runs it in CI. That gate is what
caught defect #2 above — `npm run build` passed while `choices[0].message` did
not compile, because only calling the client exercises its surface.

`examples/` sits outside the generator's `take` path, so regeneration never
touches it.

## CI
Fleet convention: root `hanzo.yml` (the `test:` gate — build, then examples) and
a 7-line `.github/workflows/cicd.yml` importing `hanzoai/ci`. The old bespoke
`ci.yml` was deleted; two gates is one too many.

Publishing is separate and unchanged: `publish-npm.yml` on a `v*` tag.

## Release
Push a semver tag `vX.Y.Z` → `publish-npm.yml` builds and `npm publish`es.

**The registry, not `package.json`, is the version of record.** Check
`npm view hanzoai version` first and take the patch above **that** — `hanzoai`
currently publishes `0.0.1-alpha.1` while this tree is `2.0.3`, so the tree is
already ahead and a naive bump from the registry would walk backwards.

## Note: `packages/mcp-server`
The Stainless-era MCP server under `packages/mcp-server` targets the old client
surface and is not rebuilt by the root pipeline. It needs its own regeneration
against the new surface before it can be republished (tracked separately).
