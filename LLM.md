# LLM.md — hanzoai (TypeScript SDK)

Client for the Hanzo API (`https://api.hanzo.ai`). npm package: **`hanzoai`**,
unscoped. `@hanzo/sdk` is a *different* package owned by someone else — do not
publish under it.

## The ONE way: generated from the document

`src/` is openapi-generator 7.14.0 (`typescript-axios`) output. The input is
**`hanzoai/cloud` `openapi.yaml`** — the document cloud's own routers emit —
pinned in `.spec-lock` by (repo, ref, sha256). Never hand-edit `src/`; change
the spec upstream and regenerate.

```bash
export OPENAPI=~/work/hanzo/openapi           # the checkout holding the driver
export SPEC=~/work/hanzo/cloud/openapi.yaml   # the document, by value

./scripts/generate.sh          # rewrite src/
./scripts/generate.sh --check  # diff only; non-zero if src/ drifted
npm run build                  # tsc -> dist (CJS) + dist/esm (bundler ESM)
npm run examples               # type-check the seven flows
```

Read `--check`'s **exit code**, not its tail: in a pipeline `$?` belongs to the
last command, so `… | tail` prints `0` while the check is failing.

`scripts/generate.sh` knows nothing about how generation works. It passes
`typescript` and this checkout to `generate.py`; every knob (generator name,
`take`, `apiPackage`, `modelPackage`, the `drop` list) is data in `sdks.yaml`
next to it. Declaring any of it twice is how the trees diverged before.

```
hanzoai/cloud    routers emit          ->  openapi.yaml   the ONE input
hanzoai/openapi  generate.py+sdks.yaml ->  the invocation, as data
this repo        scripts/generate.sh   ->  src/, then owns its bump and release
```

## Shape, measured

Document: 1814 paths (1782 under `/v1`), 2479 operations, 2436 schemas, and 191
tags in use — the `tags:` array declares 190, and `compat` is used without being
declared there. Client: 192 `*Api` classes — one per tag plus `DefaultApi`,
which collects the 50 operations the document leaves untagged (`/`,
`/.well-known/*`) — 2502 methods (23 operations carry two tags, so they land on
two classes), 2461 models, 2658 files.

891 of the 2479 operations declare a route and no response schema, so callers
cast: 834 of those come out typed `void`, the other 57 `any`. 694 operations
carry a request body.

These move on every cloud release. `.spec-lock` names the release this tree
projects; re-measure rather than trusting the numbers above after a regen.

## Auth is generated now — it lives in `accessToken`

The document declares it, so the client carries it. `components.securitySchemes`
holds one scheme, `bearer` (`type: http`, `scheme: bearer`), and a top-level
`security: [bearer: []]` applies it to everything. The generator answers with
2498 `await setBearerAuthToObject(localVarHeaderParameter, configuration)` call
sites in 191 of the 192 api files — `setBearerAuthToObject` reads
`configuration.accessToken` and writes `object["Authorization"] = "Bearer " + …`.

```ts
new Configuration({ basePath: 'https://api.hanzo.ai', accessToken: token });
```

Four operations opt out with `security: []` and generate no auth call at all:
`GET /v1/models`, `GET /v1/models/providers`, `GET /v1/commands`,
`GET /v1/openapi.json`. 2502 methods − 4 = the 2498 above. `commands-api.ts` is
the one api file with no auth call, because that route is its only operation.

The `baseOptions: { headers: { Authorization } }` workaround this repo used to
document is **gone**. It existed only because the document declared no scheme,
which made `accessToken` inert; hand-setting the header in the SDK was a second
way to do the one thing, and it went away the moment cloud described its own
auth. Do not reintroduce it.

Bearer only; the token is an IAM access token or a cloud API key, and the server
derives the org from its `owner` claim, so no route here takes an org argument.
Mint one the OAuth2 way — `POST /v1/iam/oauth/token`,
`grant_type=client_credentials` — and check it with
`GET /v1/iam/oauth/userinfo`, which answers the identity or `401 invalid_token`.

## Module formats — what `dist/esm` is and is not

`tsc` does not add extensions, and the generated client imports directories
(`export * from "./api"`) and extensionless paths. Node's ESM loader rejects
both, so `dist/esm` is **not loadable by Node** — it exists for bundlers,
reached through the legacy `"module"` field. The `exports` map points **both**
`import` and `require` at the CJS build, which Node's ESM loader reads named
exports from via cjs-module-lexer.

The package self-resolves: `import … from 'hanzoai'` inside this repo goes
through `exports` to `dist/`, not through the tsconfig `paths` alias. So
`npm run build` must have run before `npx tsx examples/…` will start.

## IAM's types are namespace-qualified, and that is the fix

Types declared inside hanzoai/iam arrive as `iam.Role`, `iam.Application`, … and
land as `src/models/iam-role.ts`, `iam-application.ts` — 106 of them. A bare
`Role` used to mean two unrelated shapes (IAM's 14-property role and a
2-property `{role, user}` membership row); both now exist and say which is
which — `iam-role.ts` and `role-assignment.ts`, so nothing is named `role.ts`
any more. `src/models/application.ts` belongs to the OTHER service. Do not
"restore" the bare IAM spellings.

## Examples — seven flows, and they are a gate

`examples/{models,hello,chat,money,store,agent,tools}`, one directory each, plus
`examples/client.ts` — the single place a base URL, a credential or an error
format is resolved (`config()` with the token, `anon()` without). `npm run
examples` type-checks them against the freshly generated client and `hanzo.yml`
runs it in CI.

`models` is the one that needs no credential — `GET /v1/models` is one of the
four `security: []` operations — so `npx tsx examples/models/index.ts` is a
complete end-to-end run of the client against the live API with nothing
exported. Type-checking is not running; keep one flow that a reader can actually
execute.

That gate has teeth. `npm run build` only proves the generated tree is
internally consistent; the examples compile against it the way a consumer does.
`choices[0].message.content` failing here (TS2339 on a bare `object`) is what
produced hanzoai/openapi's `ChatChoice` schema, fixing the same hole in every
language.

`examples/` sits outside the generator's `take` path, so regeneration never
touches it.

Two things type-check while being wrong on the wire, and both have bitten:

- **A model id is a string.** `zen4` compiled fine and answered 400 *not in this
  gateway's catalog*. `zen5` is served; `GET /v1/models` is the only authority.
- **A route can be live and undeclared.** `POST /v1/mcp` is the fleet's JSON-RPC
  MCP door and is not in the document, so `tools` calls `GET /v1/tools` instead.
  Reaching for an undeclared route means hand-rolling HTTP inside a generated
  client, which is the drift these SDKs exist to prevent.

`chat` is back: cloud's document now declares `/v1/chat/completions`,
`/v1/completions`, `/v1/models`, `/v1/embeddings`, `/v1/responses` and
`/v1/messages`, which it did not when the flow was removed. It declares no
bodies for them, so the request rides on axios's `data` and the reply is read
through a local type.

Run against the live API with a deliberately bad key, every flow reaches the
server and is refused on its own terms — `hello` 401 `invalid_token`, `chat` 402
*a billable tenant is required*, `money` 401, and `store`/`agent`/`tools` 403 *a
validated principal is required*. That is the cheapest proof the addresses and
the header are both right.

With a real IAM client-credentials token in `HANZO_API_KEY` and nothing else
changed, the same `accessToken` path answers: `hello` prints
`sub admin/hanzo-cloud in org hanzo`, `money` prints the org's balance and usage
rows (`"user": "hanzo"` — anonymous gets `"account":"anonymous"` on that route,
which is how you tell a credential was actually carried from one that was
dropped). `api.hanzo.ai` 502s in bursts while cloud restarts, so a single
failed call is not evidence about the client; retry before concluding anything.

## CI and release

Root `hanzo.yml` holds the gate (build, then examples). Workflows live in
**`.hanzo/workflows`**, not `.github/workflows` — the forge collects the FIRST
of its workflow directories that exists and ignores the rest, so a file in the
other one is not a job that queues, it is a job that does not exist. Both
`cicd.yml` (calls `hanzoai/ci`) and `publish-npm.yml` are there.

Release: push tag `vX.Y.Z` with `package.json` already holding X.Y.Z.
`publish-npm.yml` builds, packs, and compares the tarball's `dist.integrity`
against what npm serves for that version — equal is a no-op (re-running a tag is
safe), different is a hard failure naming both digests. `npm pack` normalises
mtimes, so that comparison is exact. It ends by reading the version back from
the registry: npm, not `package.json` and not the run's colour, is the version
of record. The npm credential comes from KMS (`hanzo`/`prod`/`js-sdk-publish`),
like every other publish credential in the fleet.

## There is no MCP server here

`packages/mcp-server` is deleted, not pending. It declared 128 addresses, 121 of
them absent from the document, 33 of those pass-throughs to a competing AI
stack. It was never published, so nothing depended on it. The one MCP door is
hanzoai/cloud's. This repo is client-side only.
