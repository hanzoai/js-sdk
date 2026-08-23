<p align="center"><img src=".github/hero.svg" alt="Hanzo TypeScript SDK" width="720"></p>

# hanzoai

TypeScript client for the [Hanzo API](https://api.hanzo.ai). Generated from the
API's own OpenAPI document — the one each subsystem's router emits — so it
carries every `/v1` route and cannot name
an address the server does not serve.

## Install

```bash
npm i hanzoai
```

Types are included. `axios` is the only dependency.

## Quickstart

`GET /v1/models` is public, so this runs before you have a key:

```ts
import { Configuration, ModelsApi } from 'hanzoai';

const models = new ModelsApi(new Configuration({ basePath: 'https://api.hanzo.ai' }));

async function main() {
  const { data } = await models.getModels();
  const catalog = (data as unknown as { data: Array<{ id: string }> }).data;

  console.log(`${catalog.length} models`);
  for (const m of catalog.slice(0, 5)) console.log(`  ${m.id}`);
}

main();
```

```
$ npx tsx quickstart.ts
112 models
  all-mini-lm-l6-v2
  anthropic-claude-opus-5
  best
  bge-m3
  claude-4.5-sonnet
```

## Auth

One scheme: a bearer token — an IAM access token or a Cloud API key. The server
derives your org from the token's `owner` claim, so no route takes an org
argument.

**It goes in `accessToken`.** The document declares one `securityScheme`
(`bearer`, http/bearer) and applies it at the top level, so every operation that
does not opt out with `security: []` generates
`await setBearerAuthToObject(header, configuration)` — 2498 call sites across
191 of the 192 api classes — and that helper reads this field and writes
`Authorization: Bearer <token>`.

Four operations opt out and take no credential: `GET /v1/models`,
`GET /v1/models/providers`, `GET /v1/commands`, `GET /v1/openapi.json`. For
those, construct a `Configuration` with no `accessToken` and the client sends no
header at all.

```ts
import { Configuration, ChatApi } from 'hanzoai';

const config = new Configuration({
  basePath: 'https://api.hanzo.ai',
  accessToken: process.env.HANZO_API_KEY,
});

type Completion = { choices?: Array<{ message?: { content?: string } }> };

async function main() {
  const { data } = await new ChatApi(config).postChatCompletions({
    data: { model: 'zen5', messages: [{ role: 'user', content: 'Say hello in five words.' }] },
  });
  const reply = data as unknown as Completion;
  console.log(reply.choices?.[0]?.message?.content);
}

main();
```

The client reads no environment variable of its own — `HANZO_API_KEY` above is
just where the examples keep theirs.

Hanzo IAM mints the token. A service holding client credentials asks for one the
OAuth2 way, and the reply's `access_token` is what goes in `accessToken`:

```bash
curl -s -X POST https://api.hanzo.ai/v1/iam/oauth/token \
  -d grant_type=client_credentials -d client_id=... -d client_secret=...
# {"access_token":"eyJ…","token_type":"Bearer","expires_in":604800}
```

`GET /v1/iam/oauth/userinfo` is how you check one: it answers the token's
identity, or `401 {"error":"invalid_token"}`. That is the `hello` flow below.

## Examples

Seven flows under [`examples/`](examples), one directory each, every one a
complete program:

| flow | what it does | routes |
|---|---|---|
| [`models`](examples/models) | the catalog, **no credential needed** | `GET /v1/models` |
| [`hello`](examples/hello) | identity — prove the key works | `GET /v1/iam/oauth/userinfo` |
| [`chat`](examples/chat) | one completion | `POST /v1/chat/completions` |
| [`money`](examples/money) | balance + usage | `GET /v1/billing/balance`, `GET /v1/billing/usage` |
| [`store`](examples/store) | KV round-trip | `POST /v1/kv`, `GET`/`DELETE /v1/kv/{name}` |
| [`agent`](examples/agent) | create + run + read | `POST /v1/agents`, `POST /v1/agents/{ref}/run`, `GET /v1/agents/{ref}/runs` |
| [`tools`](examples/tools) | tool catalog | `GET /v1/tools` |

`models` runs with nothing exported — one command, against the live API, before
you have any credential:

```bash
npm ci && npm run build && npx tsx examples/models/index.ts
```

(`npm run build` first because the examples import `hanzoai` by name and the
package resolves its own name through `exports`, which points at `dist/`.)

```
112 models from https://api.hanzo.ai
  all-mini-lm-l6-v2  (do-ai)
  anthropic-claude-opus-5  (do-ai)
  best  (hanzo)
  bge-m3  (do-ai)
  claude-4.5-sonnet  (anthropic)
```

The other six read `HANZO_API_KEY`, and all seven talk to `https://api.hanzo.ai`
unless `HANZO_BASE_URL` says otherwise:

```bash
export HANZO_API_KEY=...
npx tsx examples/hello/index.ts
```

```
hello from https://api.hanzo.ai
  sub admin/hanzo-cloud in org hanzo
  (unnamed) <no email>
  issued by https://hanzo.id
```

Hand it a token the server refuses and you get the other half of the proof —
`HTTP 401: {"error":"invalid_token","error_description":"the access token is
invalid or revoked"}` — which is the header being sent and evaluated, not
silently dropped.

`npm run examples` type-checks all seven against the client, and `hanzo.yml`
makes that a CI gate — which is what keeps them from rotting into pseudocode.

## The API surface

One class per product — the first path segment after `/v1/`. 191 of them:
`ChatApi`, `ModelsApi`, `IamApi`, `BillingApi`, `KvApi`, `AgentsApi`,
`ToolsApi`, `McpApi`, `CommerceApi`, `O11yApi`, and one per product. `DefaultApi`
holds the routes the document leaves untagged — `/` and the `/.well-known/*`
family. Each takes a `Configuration`; each method takes one
request object.

```ts
import { Configuration, BillingApi } from 'hanzoai';

const billing = new BillingApi(new Configuration({ basePath: 'https://api.hanzo.ai' }));
billing.getBillingBalance().then(({ data }) => console.log(data));
```

Method names are the document's operation ids in camelCase — `get_billing_balance`
is `getBillingBalance`, and a path parameter reads as `by`:
`GET /v1/kv/{name}` is `getKvByName({ name })`.

Some operations declare a route but not a response shape, so their `data`
arrives untyped and wants a cast. That is a gap in the document, not in the client; it closes as the
subsystems describe their own replies.

Full reference: [docs.hanzo.ai](https://docs.hanzo.ai).

## Regenerating

`src/` is generated — **never hand-edit it**. Fix the spec upstream and rerun:

```bash
export OPENAPI=~/work/hanzo/openapi       # the checkout holding the generator
export SPEC=~/work/hanzo/cloud/openapi.yaml   # the document, by value

./scripts/generate.sh            # rewrite src/
./scripts/generate.sh --check    # diff only; non-zero if src/ drifted
```

Drop `SPEC` and the driver fetches the ref `.spec-lock` names, which needs a
forge token; passing the document by value is the offline route. The script is a
call site and nothing more — every knob lives once, in that repo's `generate.py`
and `sdks.yaml`. `.spec-lock` names the document this tree projects, by repo,
ref and sha256.

Requires java 17+ and [uv](https://docs.astral.sh/uv/).

## License

Apache-2.0
