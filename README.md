<p align="center"><img src=".github/hero.svg" alt="Hanzo TypeScript SDK" width="720"></p>

# hanzoai

TypeScript client for the [Hanzo API](https://api.hanzo.ai). Generated from the
API's own OpenAPI document — the one each subsystem's router emits — so it
carries every `/v1` route, 2479 operations across 192 products, and cannot name
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

One scheme: a bearer token — an IAM JWT or an `hk-` Cloud API key. The server
derives your org from the token's `owner` claim, so no route takes an org
argument.

**Pass it as `baseOptions`, not as `accessToken`.** The API document declares no
`securityScheme`, so the generator emitted no auth code: `accessToken`
type-checks, sends no `Authorization` header, and every call comes back 401 or
403. `baseOptions` is spread into every request by every operation, so the
header set once below reaches all 2502 methods.

```ts
import { Configuration, ChatApi } from 'hanzoai';

const config = new Configuration({
  basePath: 'https://api.hanzo.ai',
  baseOptions: { headers: { Authorization: `Bearer ${process.env.HANZO_API_KEY}` } },
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

## Examples

Six flows under [`examples/`](examples), one directory each, every one a
complete program:

| flow | what it does | routes |
|---|---|---|
| [`hello`](examples/hello) | identity — prove the key works | `GET /v1/iam/oauth/userinfo` |
| [`chat`](examples/chat) | one completion | `POST /v1/chat/completions` |
| [`money`](examples/money) | balance + usage | `GET /v1/billing/balance`, `GET /v1/billing/usage` |
| [`store`](examples/store) | KV round-trip | `POST /v1/kv`, `GET`/`DELETE /v1/kv/{name}` |
| [`agent`](examples/agent) | create + run + read | `POST /v1/agents`, `POST /v1/agents/{ref}/run`, `GET /v1/agents/{ref}/runs` |
| [`tools`](examples/tools) | tool catalog | `GET /v1/tools` |

All six read `HANZO_API_KEY` and talk to `https://api.hanzo.ai` unless
`HANZO_BASE_URL` says otherwise:

```bash
export HANZO_API_KEY=hk-...
npm ci && npm run build
npx tsx examples/hello/index.ts
```

`npm run examples` type-checks all six against the client. CI runs it on every
push, which is what keeps them from rotting into pseudocode.

## The API surface

One class per product — the first path segment after `/v1/`. 192 of them:
`ChatApi`, `ModelsApi`, `IamApi`, `BillingApi`, `KvApi`, `AgentsApi`,
`ToolsApi`, `McpApi`, `CommerceApi`, `O11yApi`, and 182 more. Each takes a
`Configuration`; each method takes one request object.

```ts
import { BillingApi } from 'hanzoai';
const { data } = await new BillingApi(config).getBillingBalance();
```

Method names are the document's operation ids in camelCase — `get_billing_balance`
is `getBillingBalance`, and a path parameter reads as `by`:
`GET /v1/kv/{name}` is `getKvByName({ name })`.

834 of the 2479 operations declare a route but not a response shape, so their
`data` arrives typed `void` and wants a cast. That is a gap in the document, not
in the client; it closes as the subsystems describe their own replies.

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
