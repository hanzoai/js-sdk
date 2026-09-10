# LLM.md — hanzoai (TypeScript SDK)

Client for the Hanzo API (`https://api.hanzo.ai`). npm package: **`hanzoai`**,
unscoped. `@hanzo/sdk` is a *different* package owned by someone else — do not
publish under it.

## The ONE way: generated from the document

Most of `src/` is openapi-generator 7.14.0 (`typescript-axios`) output. The
input is **`hanzoai/cloud` `openapi.yaml`** — the document cloud's own routers
emit — pinned in `.spec-lock` by (repo, ref, sha256). Never hand-edit a
generated file; change the spec upstream and regenerate.

**`.generated` says which files those are.** The driver owns the SET of paths it
last wrote, not the directory: a file the manifest does not name is this repo's
own, is never compared by `--check`, and is never removed by a regeneration —
whatever directory it sits in. The ten hand-written files (`hanzo.ts`,
`client.ts`, `answer.ts`, `read.ts` and the six capabilities) therefore live in
`src/` beside the generated tree, the way `hanzo.go` sits beside the generated
Go and `client.py` beside the generated Python. `src/index.ts` IS generated, so
the package entry is `src/hanzo.ts`, which re-exports it.

```bash
export OPENAPI=~/work/hanzo/openapi           # the checkout holding the driver
export SPEC=~/work/hanzo/cloud/openapi.yaml   # the document, by value

./scripts/generate.sh          # rewrite src/
./scripts/generate.sh --check  # diff only; non-zero if src/ drifted
npm run build                  # tsc -> dist (CJS) + dist/esm (bundler ESM)
npm run wire                   # node --test: the six against a scripted fetch
npm run examples               # type-check the eight flows
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
declared there. Client, measured at the current `.spec-lock`: 120 `*Api`
classes, 2573 models, 2698 generated files. The tag names singularized somewhere
between two documents (`AgentsApi` became `AgentApi`, `postAgents` became
`postAgent`), which is what a rename in cloud looks like from here and why the
examples gate exists.

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

Bearer only; the token is an IAM access token, and the server derives the org
from its `owner` claim, so no route here takes an org argument. Where that token
comes from is `Client`'s business, not the caller's — see the six capabilities
below. `accessToken` accepts a function, which is how `c.configuration` gives a
generated `*Api` the same minted, cached, self-renewing credential the six use.
Check one with `GET /v1/iam/oauth/userinfo`, which answers the identity or
`401 invalid_token`.

## The six capabilities — hand-written, over the generated client

Every Hanzo SDK offers the same six in the same six words: **budget · policy ·
audit · search · kb · graph**. In Go and Python they hang off a client that
already existed; TypeScript had none, so it gained one — `src/client.ts`, the
only new type the contract adds to this language.

```ts
import { Client } from 'hanzoai';

const c = new Client();                       // id/secret from the environment
const a = await c.search.find('runbook');
switch (a.status) {
  case 'ok':     use(a.value); break;
  case 'denied': offer(a.code, a.cures); break;
  case 'held':   wait(a.id, a.clause); break;
}
```

**`Answer<T>` is the spine.** `ok{value}` | `denied{code, reason, product?,
cures[]}` | `held{id, clause, reason}`, all three carrying `request` — the
`x-request-id` that joins a call to its audit row. A refused budget and a
refused policy are ANSWERS, never exceptions: the union is discriminated on the
literal `status`, so `a.value` does not typecheck until it is narrowed and a
`switch` that forgets an arm fails to compile (`examples/six` asserts that with
a `never`). Exceptions (`answer.Problem`) are for outcomes with no decision in
them — no credential, a transport failure, 401, 403 forbidden, any 5xx.

The mapping from HTTP to arm lives in exactly one function, `answer.arm`, so no
capability can grow a rule of its own:

| answer | arm |
|---|---|
| 2xx, body is not a hold | `ok` |
| 2xx, body says `"status":"held"` | `held` — the BODY decides, never the code |
| 402, any code | `denied` |
| 403 with `policy_denied`/`entitlement_required`/`spend_cap_exceeded`/`insufficient_balance` | `denied` |
| everything else | throws `Problem` |

That fourth row is a workaround for one cloud defect: cloud spells "no validated
principal" as 403 forbidden. The day it answers 401 for that, the code list in
`answer.ts` goes and the rule collapses to `402 or 403 ⇒ denied`.

**Auth is IAM and only IAM.** The client takes a clientId and clientSecret, not
a bearer: it performs the client_credentials exchange at
`POST {issuer}/v1/iam/oauth/token` (client_secret_basic, RFC 8707 `resource`,
HIP-0111), holds the token until 60s before expiry, and re-mints once on a 401
before replaying. `c.as("usr_7")` mints a subject-bound token from IAM's act
grant (`POST {issuer}/v1/iam/tokens/issue?id=`) and the operator credential
leaves with the scope — two credentials on one request are two answers to who
is calling. There is no `apiKey` option and no `HANZO_API_KEY`. Five options,
each with an environment fallback: `id`, `secret`, `base`, `issuer`, `resource`.

`c.configuration` hands the same identity to any generated `*Api` class, so the
other 2400 operations are reachable from the same credential.

**Names.** Types are namespaced by capability — `budget.Allowance`,
`search.Hit`, `audit.Event`, `graph.Fact`, `kb.Doc`, `answer.Answer` — because
the generated tree already owns 4599 root names and thirteen of the contract's
collide with it (`Answer`, `Page`, `Hit`, `Allowance`, `Charge`, `Wrote`,
`Install`, `Request`, `Link`, `Backend`, `Policy`, `Audit`, `Graph`). `Client`
and `Options` are free and stay bare.

**Where a word differs from the wire.** Six audit fields are renamed
(`sub`→`actor`, `time`→`at`, `resourceId`→`id`, `requestId`→`request`,
`sourceIp`→`ip`, `userAgent`→`agent`); `at` is this client's one word for an
instant and graph's routes spell it `as_of`; `kind` is its one word for what a
thing is and search spells it `doctype`, kb's link graph spells it `type`, and
search's request spells the plural `doctypes`; `since`/`until` is its one word
for a window and the usage ledger spells it `start`/`end`. Each of those is
spelled once, in the capability that owns the route.

**Two routes are modelled rather than generated**, because the document states
an address and not a shape. `/v1/billing/balance` and `/v1/billing/usage`
declare no response, so `Balance` and `Charge` are read from what cloud's own
handlers write (`{balance,holds,available,account}` and
`{user,count,usage[]}`, USD cents). `/v1/authz/check` declares neither a body
nor a response — see the divergence below.

`npm run wire` is the gate: `node --test` against a scripted `fetch`, asserting
the exact request each capability sends and decoding a realistic answer
including `denied` (both of cloud's 402 bodies), `held` and `Problem`.

## Where this client and cloud disagree, measured

- **`POST /v1/authz/check` reads `{subject, verb, path}`, not `{sub, obj, act}`.**
  The route's own `openapi.Describe` prose in `hanzoai/cloud`
  `plugin/authz/main.go` says `{sub, obj, act}`; the handler that serves it —
  `hanzoai/authz@v1.10.37` `serve/use.go`, the version cloud pins — reads
  `{subject, verb, path, grants}` and answers `{allow, subject, verb, path}`.
  `policy.check(sub, act, obj)` takes the words a person says and sends the ones
  the handler reads. The prose and the handler are one fact and should be made
  to agree upstream.
- **`GET /v1/framework/kb.page|kb.memory|kb.source` answer 404**, unauthenticated,
  where every other doctype answers 403 `valid principal required` — so
  `kb.put`/`get`/`list`/`drop` address a path the deployment does not currently
  resolve. Measured 2026-09-10 against `x-api-version: v8.5.178`.
- **`GET /v1/audit` has no `requestId` filter** although every row carries one,
  so `audit.Filter.request` is applied to what a page returned rather than to
  the query.
- **`POST /v1/graph/ingest` validates before it authenticates**: an
  unauthenticated `POST {}` answers 400 `timestamp "" is not RFC 3339`, not 403.

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

## Examples — eight flows, and they are a gate

`examples/{models,hello,chat,money,store,agent,tools,six}`, one directory each, plus
`examples/client.ts` — the single place a base URL, a credential or an error
format is resolved (`config()` with the token, `anon()` without). `npm run
examples` type-checks them against the freshly generated client and `hanzo.yml`
runs it in CI.

`six` is the odd one: it does not use `examples/client.ts`, because it does not
resolve a credential at all — `new Client()` mints its own from
`HANZO_CLIENT_ID`/`HANZO_CLIENT_SECRET`. It exercises all six capabilities in
one pass the way a real caller does: check the budget, ask policy, search the
corpus, write to the graph, and read back the audit trail of what it just did.

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
  MCP endpoint and is not in the document, so `tools` calls `GET /v1/tools` instead.
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

Root `hanzo.yml` holds the gate (build, wire, smoke, examples). The workflows
that call it are **`.github/workflows/{cicd,publish}.yml`** — moved there from
`.hanzo/workflows`, and this repo is not served at `git.hanzo.ai` (HTTPS answers
404, SSH :22 does not answer at all), so GitHub is where it lives and where its
runners are. A workflow in one directory is not also a job in the other; keep
them in one place.

Release: `publish.yml` runs on a push to main, reads what the registry already
serves for `package.json`'s version and stops when it is current. It builds,
packs, and compares the tarball's `dist.integrity`
against what npm serves for that version — equal is a no-op, so re-running the
job is safe; different is a hard failure naming both digests. `npm pack` normalises
mtimes, so that comparison is exact. It ends by reading the version back from
the registry: npm, not `package.json` and not the run's colour, is the version
of record.

The npm credential comes from KMS, like every other publish credential in the
fleet, and the address is `GET /v1/kms/secrets/NPM_TOKEN?env=prod`, answering
`{name, env, value}`. The org is the token's OWNER CLAIM, not a path segment —
the forge identity is organization `hanzo`, so that read lands on the `hanzo`
root, where NPM_TOKEN is. `/v1/kms/orgs/<org>/secrets/<path>/<name>` is not a
route this KMS has: it answers 404 for every name, including names that are
there, which reads as an unseeded secret and is a wrong address. Only the KMS
machine identity (`KMS_CLIENT_ID`/`KMS_CLIENT_SECRET`) is a forge secret.

## The declarations name `globalAxios` as a namespace, and it is not one

`dist/**/*.d.ts` reference `globalAxios.AxiosResponse<...>` in 192 files. Axios
declares `const axios: AxiosStatic`, never a namespace, so a consumer compiling
with `skipLibCheck: false` gets 2502 × TS2503 `Cannot find namespace
'globalAxios'`. With `skipLibCheck: true` — what `tsc --init`, Next.js and Vite
all set — the SDK is clean and the quickstart typechecks. Present identically in
2.2.9 and 2.2.10; it is not a regression, and it is not hand-fixable here.

The cause is declaration emit, not the source. The Factory annotates its return
(`AxiosPromise<Receipt>`, imported, prints fine); the `Api` CLASS method carries
no return annotation, so tsc infers `Promise<AxiosResponse<Receipt, any, {}>>`
and must name `AxiosResponse`. The file does not import it, so the emitter
reaches for the only axios binding in scope — the default import `globalAxios` —
and qualifies the type with a value.

The fix is one import in the `typescript-axios` template, so it belongs in
hanzoai/openapi, not here: a vendored template via a `flags: {template-dir: …}`
row in `sdks.yaml`, which is exactly what that escape hatch is for ("how one
language's generator has to be corrected to emit code that compiles").
`generate.py` has no post-generation step by design — `emit` → `prune` → copy —
so patching the emitted tree is not available and should not be invented.

## There is no MCP server here

`packages/mcp-server` is deleted, not pending. It declared 128 addresses, 121 of
them absent from the document, 33 of those pass-throughs to a competing AI
stack. It was never published, so nothing depended on it. The one MCP server is
hanzoai/cloud's. This repo is client-side only.
