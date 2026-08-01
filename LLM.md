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
under it would have overwritten someone else's line. The name is `hanzoai`, and
`sdks.yaml`'s `npmName` now says `hanzoai` too — that row has been corrected, so
the two no longer disagree.

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

Current `src/` is 2364 files (265 api + 2094 models + 5 root) from **1742 paths /
2462 operations / 1832 schemas**.

`hanzo.yaml` moves under you: this tree drifted +9 −6 ~22 in the hour between
one regeneration and the next. Run `./scripts/generate.sh --check` immediately
before releasing, and read its **exit code** — in a pipeline `$?` is the last
command's, so `... | tail` reports `0` while the check is failing.

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

### What they do against the live API

Type-checking is not running. All six were **executed** against `api.hanzo.ai`
with an IAM JWT, and the result is worth writing down because three of them fail
for reasons that are not the SDK's:

| flow | result | why |
|---|---|---|
| `chat` | works | `zen5`, 200 + typed `choices[0].message.content` |
| `store` | works | full KV round-trip: provision → read back → delete |
| `tools` | works | `mcp_rpc` → 833 tools |
| `agent` | partial | agent **creates** on `zen5`; the run returns 402 *Insufficient balance* |
| `money` | blocked | `/v1/billing/balance` → 502 *billing upstream unreachable*, same from `curl` |
| `hello` | blocked | `bot_authMe` → 404 for an IAM principal with no **bot** profile |

Two traps this table encodes:

**A model default is a live dependency.** `chat` and `agent` both defaulted to
`zen4`, which the gateway no longer serves — 403 *limited preview* on
`/v1/chat/completions`, 400 *not in this gateway's catalog* on `/v1/agents`. The
examples type-checked perfectly the entire time, because a model id is a string.
The default is `zen5` now; the served Zen family is `enso*` and `zen5*`, and
`GET /v1/models` is the only authority on it.

**`hello` is mounted and gating correctly** — 403 *no validated principal* with
no key or a bogus one — and still 404s with a *valid* one, because
`/v1/bot/auth/me` reads the **bot** user table and an ordinary IAM principal has
no row there. 403-vs-404 is the discriminator `flows.yaml` documents, and here
it says "route is fine, this credential is the wrong kind", not "route is
broken". Do not repoint the flow on the strength of that 404; it wants a bot
key. `flows.yaml`'s note to print `data.owner`/`data.name` is also loose —
`BotUser` carries `id`/`handle`/`displayName`/`email`/`role`, which is what the
example prints.

## CI
Fleet convention: root `hanzo.yml` (the `test:` gate — build, then examples) and
a 7-line `.github/workflows/cicd.yml` importing `hanzoai/ci`. The old bespoke
`ci.yml` was deleted; two gates is one too many.

Publishing is separate and unchanged: `publish-npm.yml` on a `v*` tag.

## Release
Push a semver tag `vX.Y.Z`. `publish-npm.yml` refuses if `package.json` says a
different version, `npm ci && npm run build`, packs, publishes, and then **proves
the version against registry.npmjs.org before it goes green**. The registry —
not `package.json`, not the tag list, not the run's colour — is the version of
record, so the workflow ends by reading it.

**A tag was not a release, and the cause was one word.** For thirteen months
`hanzoai` published only `0.0.1-alpha.1` while this tree said `2.0.x` and tags
`v1.0.0` … `v2.0.4` all existed, so every doc that read the tree described a
client npm could not install. `publish-npm.yml` was `runs-on:
hanzo-build-linux-amd64`, a self-hosted label; when no runner carries it the job
**queues instead of failing** — v2.0.4 sat 24h and was cancelled, v2.0.3 the
same, and GitHub showed both as pending, never red. That is why `2.0.5` reached
npm by hand.

It is now `ubuntu-latest`. A publish packs a tarball; it is not an image build,
and it must be schedulable on a runner that always exists. (Measured the same
day: this repo's `cicd.yml` gate, which inherits hanzoai/ci's arc-pool default,
was still queued after 11 minutes while the publish lane on `ubuntu-latest`
started in 11 seconds.)

**Re-running a tag is safe, and out-of-band publishing is loud.** The workflow
compares the packed tarball's `dist.integrity` against what npm serves for that
version: equal → the publish already happened, no-op; different → hard failure,
naming both digests. `npm pack` normalises mtimes, so the tarball is
byte-reproducible and that comparison is exact — verified here by packing the
same tree twice for the same sha512.

That check has already earned its place. npm serves `2.0.5` at
`sha512-X3V17E…` while this tree packs `sha512-q7Rbz1…`: the published 2.0.5
corresponds to no commit in this repo, which is what publishing by hand from an
uncommitted tree looks like from the outside. `2.0.6` is the first version whose
bytes are reproducible from its tag.

## Note: `packages/mcp-server`
The Stainless-era MCP server under `packages/mcp-server` targets the old client
surface and is not rebuilt by the root pipeline. It needs its own regeneration
against the new surface before it can be republished (tracked separately).
