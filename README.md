<p align="center"><img src=".github/hero.svg" alt="Hanzo TypeScript SDK" width="720"></p>

# hanzoai

The official TypeScript client for the [Hanzo Cloud API](https://api.hanzo.ai) —
AI inference plus every `/v1/<service>` product, in one install.

Generated from [`hanzoai/openapi`](https://github.com/hanzoai/openapi)'s
`hanzo.yaml` — the same document the API serves at
[`/v1/openapi.json`](https://api.hanzo.ai/v1/openapi.json). Never hand-written,
so the client cannot describe a route the server does not serve.

## Install

```bash
npm install hanzoai
```

## Auth

One scheme: a bearer token, as `accessToken`. It is either an IAM JWT or an
`hk-` Cloud API key — the API accepts both and derives your org from the token's
`owner` claim, so there is no org argument anywhere in this SDK.

```ts
import { Configuration } from 'hanzoai';

const config = new Configuration({
  basePath: 'https://api.hanzo.ai',
  accessToken: process.env.HANZO_API_KEY,
});
```

## One runnable snippet

```ts
import { Configuration, OpenAICompatibleApi } from 'hanzoai';

const ai = new OpenAICompatibleApi(
  new Configuration({ basePath: 'https://api.hanzo.ai', accessToken: process.env.HANZO_API_KEY }),
);

const { data } = await ai.aiCreateChatCompletion({
  aiChatCompletionRequest: {
    model: 'zen5',
    messages: [{ role: 'user', content: 'Say hello in exactly five words.' }],
  },
});

console.log(data.choices?.[0]?.message?.content);
```

## Examples

Six flows, one per directory under [`examples/`](examples), each a complete
program. They are the same six in every Hanzo SDK, so a reader who knows one
language's set can find their way around another's.

| flow | what it does | routes |
|---|---|---|
| [`hello`](examples/hello) | identity — prove the key works | `GET /v1/bot/auth/me` |
| [`chat`](examples/chat) | one completion | `POST /v1/chat/completions` |
| [`money`](examples/money) | balance + usage | `GET /v1/billing/balance`, `GET /v1/billing/usage` |
| [`store`](examples/store) | KV round-trip | `POST /v1/kv`, `GET`/`DELETE /v1/kv/{name}` |
| [`agent`](examples/agent) | create + run + read | `POST /v1/agents`, `POST /v1/agents/{ref}/run`, `GET /v1/agents/{ref}/runs` |
| [`tools`](examples/tools) | tool catalog | `GET /v1/tools` |

Every one reads `HANZO_API_KEY` from the environment and talks to
`https://api.hanzo.ai` unless `HANZO_BASE_URL` says otherwise:

```bash
export HANZO_API_KEY=hk-...
npm ci && npm run build
npx tsx examples/hello/index.ts
```

`npm run examples` type-checks all six against the generated client. CI runs it
on every push, which is what keeps them from rotting into pseudocode.

## API surface

Operations are grouped into one class per spec tag — `AuthApi`, `BillingApi`,
`KvApi`, `AgentsApi`, `ToolsApi`, `OpenAICompatibleApi`, and 257 more. Each
takes a `Configuration`, and each method takes a single request object.

```ts
import { BillingApi } from 'hanzoai';
const { data } = await new BillingApi(config).cloudGetV1BillingBalance();
```

## Regenerating

`src/` is generated output — **never hand-edit it**. Fix the per-service spec in
`hanzoai/openapi` and regenerate:

```bash
./scripts/generate.sh          # clone the spec repo, rewrite src/
./scripts/generate.sh --check  # fail if committed src/ drifted from the spec
```

That script is a call site and nothing more. The generator invocation lives once
in `hanzoai/openapi` (`generate.py` + `sdks.yaml`), so no per-language knob is
declared twice.

## License

Apache-2.0
