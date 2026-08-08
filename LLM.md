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

Generated, never hand-written. Source of truth is **`hanzoai/cloud`
`openapi.yaml`** — the document cloud's own routers emit, pinned in `.spec-lock`
by (repo, ref, sha256). Generator is **openapi-generator 7.14.0**
(`typescript-axios`).

**THE LINEAGE MOVED, AND THE OLD ONE WAS SHIPPING DEAD ADDRESSES.** Until
`2.0.7` this package was a projection of `hanzoai/openapi` `hanzo.yaml` — the
hand-merged master (`merge.py`, `capabilities.yaml`, document version `8.0.0`).
Measured on the published `2.0.6` tarball: 1699 distinct `/v1` paths, of which
**89 under `/v1/commerce` where the server serves 10**, and four billing
addresses that **404 against api.hanzo.ai** — `gpu-charge`, `gpu-eligibility`,
`payment-config`, `payment-methods` — while the three the server actually serves
(`gpu/charge`, `gpu/eligibility`, `methods`, `settings`) were absent entirely.
Cloud's document carries the live spellings. A smaller true document beats a
larger unverified one.

```bash
./scripts/generate.sh                    # regenerate src/ from the document .spec-lock names
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
hanzoai/cloud    emits its router spec   ->  cloud/openapi.yaml  <- the ONE SDK input
hanzoai/openapi  generate.py + sdks.yaml ->  the invocation, as data
this repo        scripts/generate.sh     ->  src/, then owns its bump + release
```

**The client is a projection of cloud's document DIRECTLY, not of `hanzo.yaml`.**
`.spec-lock` has said `repo=hanzoai/cloud path=openapi.yaml` for a while; what
changed is that it is now also true of how the bytes are fetched. `generate.py`
passes `--skip-validate-spec`, so the 1012 missing-`responses` errors that once
made cloud's emission produce zero files no longer stop it — measured here, the
raw document generates a client that compiles and type-checks with no repair.
`hanzo.yaml` remains the input for the doc site and the skills plane; it is not
in this SDK's path. Regenerate with the document by value:

```bash
OPENAPI=~/work/hanzo/openapi SPEC=~/work/hanzo/cloud/openapi.yaml ./scripts/generate.sh
```

How big `src/` is, and how big the document is, are not written down here. Both
move on every cloud release and a number in prose moves on none of them — this
file carried two pairs that disagreed with each other and with the document.
`.spec-lock` names the release this tree is a projection of, and
hanzoai/cloud's `openapi/floor.json` is the one place in the fleet where a count
of the document lives.

**IAM's types are namespace-qualified now, and that is the fix, not a defect.**
Types declared inside hanzoai/iam arrive as `iam.Role`, `iam.Application`, … and
land as `src/models/iam-role.ts`, `iam-application.ts` — 96 of them. A bare
`Role` used to mean two unrelated shapes (IAM's 14-property role and a
2-property `{role, user}` membership row); both now exist side by side and say
which is which. `src/models/role.ts` and `application.ts` still exist and belong
to the OTHER services. Do not "restore" the bare IAM spellings.

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

## Examples — five flows, and the sixth is waiting on the document

`examples/{hello,money,store,agent,tools}`, one directory each, plus
`examples/client.ts` which is the single place a base URL or an env var is
resolved.

**`chat` was REMOVED in 2.0.7, and it is a measurement rather than a decision.**
Cloud's `openapi.yaml` declares **zero** `/v1/ai*` paths and none of the eleven
inference addresses — `/v1/chat/completions`, `/v1/completions`, `/v1/responses`,
`/v1/embeddings`, `/v1/messages`, `/v1/rerank`, `/v1/models`, … — because the AI
product is mounted behind a `/v1/{wildcard1}` relay that type-erases its router.
The routes are live (POST `/v1/chat/completions` answers 401 from `server:
hanzo`, i.e. routed and gated); they are simply undescribed. A generated client
cannot carry a method for an operation the document does not have, and
hand-rolling the HTTP call inside a generated client is the exact drift these
SDKs exist to prevent — the `tools` flow's own comment says so.

**Restoring it is one step, and the test is one line:** when
`paths['/v1/chat/completions']` appears in cloud's `openapi.yaml`, add
`examples/chat` back as a generated call. Nothing else about this repo changes.

They are a **gate, not decoration**: `npm run examples` type-checks them against
the freshly generated client, and `hanzo.yml` runs it in CI. That gate is what
caught defect #2 above — `npm run build` passed while `choices[0].message` did
not compile, because only calling the client exercises its surface.

`examples/` sits outside the generator's `take` path, so regeneration never
touches it.

### What they do against the live API

Type-checking is not running. The table below is from the run made when these
flows still pointed at the retired master's operation names; `hello` and `tools`
have since been repointed (see the two notes under it) and want re-running
against a live key.

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

**`hello` moved to `GET /v1/iam/oauth/userinfo`.** It used to call
`/v1/bot/auth/me`, which is behind the bot relay and absent from cloud's
document, and which 404s for an ordinary IAM principal because it reads the
**bot** user table. userinfo is the OIDC identity endpoint of the one IAM and it
refuses correctly — 401 `{"error":"invalid_token"}` for a bogus bearer, verified
against api.hanzo.ai. The two routes that look right and are NOT:
`/v1/iam/whoami` answers **200** with `{"status":"error"}` for a bad key, and
`/v1/ai/account` answers 200 `type="anonymous-user"` with no header at all — a
`hello` on either prints a cheerful identity for a key that is refused
everywhere else, which is worse than no check because it reads as proof.

**`tools` moved to `GET /v1/mcp/servers`,** for the second time and for the same
reason it moved the first time. Cloud's document declares `/v1/mcp/servers` and
`/v1/mcp/servers/{id}` but NOT the JSON-RPC door `POST /v1/mcp`, which is live
and answers `tools/list` with 833 tools. When the door is declared, move the
flow back onto it.

**A model default is still a live dependency** for `agent`: a model id is a
string, so the example type-checks perfectly while the gateway refuses the
model. `zen4` is not served; `zen5` is.

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

## There is no MCP server here
`packages/mcp-server` is deleted, not pending. It declared 128 addresses, of
which 7 are in the document and 121 are not; 33 of those were pass-throughs to a
competing AI stack under `/anthropic/`, `/bedrock/`, `/cohere/`, `/langfuse/` and
`/azure/`. It had never been published — `hanzoai-mcp` is a 404 on npm — so
nothing depended on it, and "regenerate it against the new surface" would have
built a second MCP door.

The one door is hanzoai/cloud's, one tool per product, its descriptions taken
from the same handler doc comments the document is. This repo is client-side
only, which is the shape rust-sdk arrived at first.
