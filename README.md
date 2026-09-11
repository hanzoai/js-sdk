<p align="center"><img src=".github/hero.svg" alt="Hanzo TypeScript SDK" width="720"></p>

# hanzoai

TypeScript client for the [Hanzo API](https://api.hanzo.ai), generated from the
API's own OpenAPI document, with budget, policy, audit, search, kb and graph
written over it by hand.

## Install

```bash
npm i hanzoai
```

Types are included. `axios` is the only dependency.

`Client` and the six capabilities below are newer than 8.5.157, the latest
release on npm, which has the generated `*Api` classes and not them. Until the
next release, build the package from `main`:

```bash
git clone https://github.com/hanzoai/js-sdk && cd js-sdk
npm ci && npm run build && npm pack    # prints hanzoai-<version>.tgz
```

and install that file in your project with `npm i <path to the .tgz>`.

## Quickstart

`GET /v1/models` needs no credential, so this runs before you have one. Save it
as `quickstart.mjs` and run `node quickstart.mjs`:

```js
import { AiApi, Configuration } from 'hanzoai';

const ai = new AiApi(new Configuration({ basePath: 'https://api.hanzo.ai' }));
const { data } = await ai.getModels();

console.log(`${data.data.length} models`);
for (const m of data.data.slice(0, 5)) console.log(`  ${m.id}`);
```

From CommonJS, `require('hanzoai')` returns the same classes.

Calls without a valid credential are limited per address in 8-hour windows.
Past the limit the answer is `429`, which arrives as an `AxiosError` with
`err.response.status` set.

## Auth

One scheme: a bearer token — an IAM access token or a Cloud API key. The server
derives your org from the token's `owner` claim, so no route takes an org
argument.

**It goes in `accessToken`.** When it is set, every operation sends
`Authorization: Bearer <token>` from that field.

```ts
import { AiApi, Configuration } from 'hanzoai';

const config = new Configuration({
  basePath: 'https://api.hanzo.ai',
  accessToken: process.env.HANZO_API_KEY,
});

type Completion = { choices?: Array<{ message?: { content?: string } }> };

async function main() {
  const { data } = await new AiApi(config).postChatCompletions({
    data: { model: 'zen5', messages: [{ role: 'user', content: 'Say hello in five words.' }] },
  });
  const reply = data as unknown as Completion;
  console.log(reply.choices?.[0]?.message?.content);
}

main();
```

Four operations need no credential: `GET /v1/models`,
`GET /v1/models/providers`, `GET /v1/commands`, `GET /v1/openapi.json`. For
those, construct a `Configuration` with no `accessToken` and the client sends no
`Authorization` header.

A generated call that gets a status outside 2xx throws axios's `AxiosError`,
with the status on `err.response.status`, after one request; nothing is
retried. A 200 whose body is an error object resolves like any other 200, and a
completion's content comes back as the server sent it, `<think>` blocks
included.

A `Configuration` reads no environment variable of its own — `HANZO_API_KEY`
above is just where the examples keep theirs. `Client`, below, does read the
environment, and mints its own token rather than being handed one.

`GET /v1/iam/oauth/userinfo` is how you check a token: it answers the token's
identity, or `401 {"error":"invalid_token"}`. That is the `hello` flow below.

## The six capabilities

Budget, policy, audit, search, kb and graph — the same six words in the Go,
Python and TypeScript SDKs. They hang off `Client`, which holds an IAM client id
and secret and mints its own access token.

```ts
import { Client } from 'hanzoai';

// HANZO_CLIENT_ID and HANZO_CLIENT_SECRET, or pass { id, secret }.
const c = new Client();

const left = await c.budget.left();          // 17 of 20 calls left today
const may = await c.policy.check('usr_7', 'write', 'acme/graph');
const a = await c.search.find('incident runbook', { limit: 5 });
```

**A refusal is an answer, not an exception.** Anything a gate can stop returns
`Answer<T>`, a union with three arms:

```ts
switch (a.status) {
  case 'ok':
    for (const hit of a.value.items) show(hit.title, hit.score);
    if (a.value.partial) warn('a search leg was down');
    break;
  case 'denied':                             // out of credit, or policy said no
    console.log(a.code, a.reason);           // "insufficient_balance", …
    for (const cure of a.cures) offer(cure.kind, cure.url);
    break;
  case 'held':                               // a person was asked
    console.log(`approval ${a.id} on ${a.clause}`);
    break;
}
```

`a.value` does not compile until the union is narrowed, so there is no path that
reads a value the server never sent. All three arms carry `request` — the
`x-request-id` that finds the call in the audit trail:

```ts
for await (const event of c.audit.all({ request: a.request })) {
  console.log(event.actor, event.action, event.result);
}
```

Exceptions are for outcomes with no decision in them: no credential, a transport
failure, a 401, a 5xx. They arrive as `answer.Fault`, carrying `status`,
`code` and `request`. A 401 re-mints the token and replays the call once before
it throws. A 402, or a 403 with a refusal code, is the `denied` arm. Nothing
else is retried, and a 200 is always `ok`.

Everything else:

| capability | methods |
|---|---|
| `c.budget` | `left` `balance` `plan` `spent` |
| `c.policy` | `check` |
| `c.audit` | `list` `all` |
| `c.search` | `find` |
| `c.kb` | `put` `get` `list` `drop` `import` `reindex` `connectors` `connect` `sync` `revoke` `links` `install` |
| `c.graph` | `assert` `read` `find` `resolve` `walk` `extract` `ingest` `vocabulary` |

`c.as('usr_7')` returns a client acting as one of your tenant's subjects — the
minted token carries the scope, so no method takes a user id. `c.configuration`
hands the same identity to any generated `*Api` class.

Types are namespaced by capability: `budget.Allowance`, `search.Hit`,
`audit.Event`, `graph.Fact`, `kb.Doc`, `answer.Answer`.

## Examples

Eight flows under [`examples/`](examples), one directory each, every one a
complete program:

| flow | what it does | routes |
|---|---|---|
| [`models`](examples/models) | the catalog, **no credential needed** | `GET /v1/models` |
| [`hello`](examples/hello) | identity — prove the key works | `GET /v1/iam/oauth/userinfo` |
| [`chat`](examples/chat) | one completion | `POST /v1/chat/completions` |
| [`money`](examples/money) | balance + usage | `GET /v1/billing/balance`, `GET /v1/billing/usage` |
| [`store`](examples/store) | KV round-trip | `POST /v1/provisioning/kv`, `GET`/`DELETE /v1/provisioning/kv/{name}` |
| [`agent`](examples/agent) | create + run + read | `POST /v1/agent`, `POST /v1/agent/{ref}/run`, `GET /v1/agent/{ref}/runs` |
| [`tools`](examples/tools) | tool catalog | `GET /v1/tool` |
| [`six`](examples/six) | budget → policy → search → kb → graph → audit, in one pass | the six capabilities |

`models` runs with nothing exported:

```bash
npm ci && npm run build && npx tsx examples/models/index.ts
```

(`npm run build` first because the examples import `hanzoai` by name and the
package resolves its own name through `exports`, which points at `dist/`.)

Six of the others read `HANZO_API_KEY` and `six` reads
`HANZO_CLIENT_ID`/`HANZO_CLIENT_SECRET`; all eight talk to
`https://api.hanzo.ai` unless `HANZO_BASE_URL` says otherwise:

```bash
export HANZO_API_KEY=...
npx tsx examples/hello/index.ts
```

A token the server refuses answers `HTTP 401:
{"error":"invalid_token","error_description":"the access token is invalid or
revoked"}`.

`npm run examples` type-checks all eight against the client, `npm run wire`
runs the six against a scripted `fetch`, and `hanzo.yml` makes both a CI gate.

## The API surface

One class per product — the first path segment after `/v1/`: `AiApi`, `IamApi`,
`BillingApi`, `GraphApi`, `KnowledgeApi`, `SearchApi`, `AgentApi`, `ToolApi`,
`CommerceApi`, `O11yApi`, and so on. Each takes a `Configuration`; each method
takes one request object.

```ts
import { Configuration, BillingApi } from 'hanzoai';

const billing = new BillingApi(new Configuration({ basePath: 'https://api.hanzo.ai' }));
billing.getBillingBalance().then(({ data }) => console.log(data));
```

Method names are the document's operation ids in camelCase — `get_billing_balance`
is `getBillingBalance`, and a path parameter reads as `by`:
`GET /v1/provisioning/kv/{name}` is `getProvisioningKvByName({ name })`.

Some operations declare a route but not a response shape, so their `data`
arrives untyped and wants a cast.

Full reference: [docs.hanzo.ai](https://docs.hanzo.ai).

## Regenerating

Most of `src/` is generated — **never hand-edit a generated file**. Fix the spec
upstream and rerun:

```bash
export OPENAPI=~/work/hanzo/openapi       # the checkout holding the generator
export SPEC=~/work/hanzo/cloud/openapi.yaml   # the document, by value

./scripts/generate.sh            # rewrite src/
./scripts/generate.sh --check    # diff only; non-zero if src/ drifted
```

Drop `SPEC` and the driver fetches the ref `.spec-lock` names, which needs a
forge token; passing the document by value is the offline route. Every generator
knob lives once, in that repo's `generate.py` and `sdks.yaml`.

`.generated` lists what the driver owns. A file it does not name is this repo's
own and a regeneration never touches it — which is where `hanzo.ts`,
`client.ts`, `answer.ts` and the six capabilities live.

Requires java 17+ and [uv](https://docs.astral.sh/uv/).

## License

Apache-2.0
