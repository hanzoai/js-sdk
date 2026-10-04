// Plan usage: the typed refusals, the headers, and the routes that read and set
// a plan's limits.
//
// The generated client is what reaches /v1/ai/limits, /v1/sync, /v1/decisions
// and /v1/models, so these drive it the way a consumer does — `new AiApi(new
// Configuration(...))` — through axios's fetch adapter onto the scripted fetch.
// The refusal bodies are the gateway's own: free_plan_cap is the one api.hanzo.ai
// answered for POST /v1/decisions on 2026-10-04, the other five are what
// hanzoai/ai routers/filter_balance.go limitReached and object/billing_notice.go
// write for their codes.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import test from 'node:test';

import { TOKEN, client, configuration, hanzoai, json, wire } from './wire.mjs';

const axios = createRequire(import.meta.url)('axios');

const REQUEST = 'cd426b48ea073fbc5427a99fb86d2b65';

const freePlanCap = {
  error: {
    message: "Free plan: today's Kai requests are used. Upgrade for more: https://hanzo.ai/pay",
    type: 'rate_limit_error',
    code: 'free_plan_cap',
    class: 'ours',
    resets_at: '2026-10-05T00:00:00Z',
    upgrade_url: 'https://hanzo.ai/pay/cart?plan=dev',
    actions: [
      { kind: 'upgrade', label: 'Upgrade your plan', url: 'https://hanzo.ai/pay/cart?plan=dev', plan: 'dev' },
      { kind: 'topup', label: 'Add prepaid credit', url: 'https://hanzo.ai/pay' },
    ],
  },
};

const planAllowanceUsed = {
  error: {
    message: "Your plan's included premium usage is used. https://hanzo.ai/pay",
    type: 'billing_error',
    code: 'plan_allowance_used',
    class: 'premium',
    resets_at: '2026-11-01T00:00:00Z',
    upgrade_url: 'https://hanzo.ai/pay/cart?plan=max-5x',
    actions: [
      { kind: 'upgrade', label: 'Upgrade your plan', url: 'https://hanzo.ai/pay/cart?plan=max-5x', plan: 'max-5x' },
      { kind: 'credits', label: 'Continue with credits', url: '/v1/ai/limits' },
    ],
  },
};

const paidPlanRequired = {
  error: {
    message: 'This request is outside what your plan includes. https://hanzo.ai/pay',
    type: 'billing_error',
    code: 'paid_plan_required',
    class: 'premium',
    model: 'anthropic/claude-sonnet-4.5',
    upgrade_url: 'https://hanzo.ai/pay/cart?plan=dev',
    actions: [
      { kind: 'upgrade', label: 'Upgrade your plan', url: 'https://hanzo.ai/pay/cart?plan=dev', plan: 'dev' },
      { kind: 'topup', label: 'Add prepaid credit', url: 'https://hanzo.ai/pay' },
    ],
  },
};

const modelCap = {
  error: {
    message: 'Claude Sonnet 4.5 has used its share of your plan. https://hanzo.ai/pay',
    type: 'billing_error',
    code: 'model_cap',
    class: 'premium',
    model: 'anthropic/claude-sonnet-4.5',
    fallback: 'enso',
    resets_at: '2026-11-01T00:00:00Z',
    actions: [
      { kind: 'switch', label: 'Try Enso', model: 'enso' },
      { kind: 'topup', label: 'Add prepaid credit', url: 'https://hanzo.ai/pay' },
    ],
  },
};

const usageCapExceeded = {
  error: {
    message:
      "You've used today's requests on your plan. They reset at 2026-10-05T00:00:00Z. " +
      'Upgrade for more at https://hanzo.ai/pay/cart?plan=max-5x',
    type: 'rate_limit_error',
    code: 'usage_cap_exceeded',
    limit: 'day',
    resets_at: '2026-10-05T00:00:00Z',
    upgrade_url: 'https://hanzo.ai/pay/cart?plan=max-5x',
    actions: [
      { kind: 'upgrade', label: 'Upgrade your plan', url: 'https://hanzo.ai/pay/cart?plan=max-5x', plan: 'max-5x' },
    ],
  },
};

const insufficientBalance = {
  error: {
    message: 'Insufficient balance. Add credits to your wallet at https://hanzo.ai/pay',
    type: 'billing_error',
    code: 'insufficient_balance',
  },
};

const decision = {
  aiDecisionsRequest: {
    model: 'kai',
    state: 'a ticket asks for a refund',
    questions: {
      route: { type: 'choice', criteria: { refund: 'asks for money back', other: 'anything else' } },
    },
  },
};

const refusals = [
  ['PlanAllowanceUsedError', 402, planAllowanceUsed],
  ['PaidPlanRequiredError', 402, paidPlanRequired],
  ['FreePlanCapError', 429, freePlanCap],
  ['ModelCapError', 402, modelCap],
  ['UsageCapExceededError', 429, usageCapExceeded],
  ['InsufficientBalanceError', 402, insufficientBalance],
];

for (const [name, status, body] of refusals) {
  test(`${status} ${body.error.code} throws ${name} from the generated client`, async (t) => {
    const sent = wire([{ status, body, headers: { 'x-request-id': REQUEST, 'x-hanzo-usage': 'limited' } }]);
    t.after(sent.restore);

    const ai = new hanzoai.AiApi(configuration());
    await assert.rejects(() => ai.postDecisions(decision), (err) => {
      assert.ok(err instanceof hanzoai[name]);
      assert.ok(err instanceof hanzoai.UsageLimitError);
      assert.ok(err instanceof Error);
      assert.equal(axios.isAxiosError(err), false);
      assert.equal(err.name, name);
      assert.equal(err.status, status);
      assert.equal(err.code, body.error.code);
      assert.equal(err.message, body.error.message);
      assert.equal(err.type, body.error.type);
      assert.equal(err.usageClass, body.error.class);
      assert.equal(err.model, body.error.model);
      assert.equal(err.fallback, body.error.fallback);
      assert.equal(err.upgradeUrl, body.error.upgrade_url);
      assert.deepEqual(err.resetsAt, body.error.resets_at ? new Date(body.error.resets_at) : undefined);
      assert.deepEqual(err.actions, body.error.actions ?? []);
      assert.equal(err.request, REQUEST);
      // What axios raised is kept, headers and all.
      assert.ok(axios.isAxiosError(err.cause));
      assert.equal(err.cause.response.status, status);
      return true;
    });

    assert.equal(sent[0].method, 'POST');
    assert.equal(sent[0].url, 'https://api.hanzo.ai/v1/decisions');
    assert.equal(sent[0].headers.authorization, 'Bearer tok-1');
    assert.deepEqual(json(sent[0]), decision.aiDecisionsRequest);
  });
}

test('an absent field reads undefined, never ""', async (t) => {
  const sent = wire([{ status: 402, body: insufficientBalance }]);
  t.after(sent.restore);

  await assert.rejects(() => new hanzoai.AiApi(configuration()).postDecisions(decision), (err) => {
    assert.ok(err instanceof hanzoai.InsufficientBalanceError);
    for (const k of ['usageClass', 'model', 'fallback', 'resetsAt', 'upgradeUrl']) {
      assert.equal(err[k], undefined, k);
    }
    assert.deepEqual(err.actions, []);
    return true;
  });
});

test('any other refusal is still the AxiosError it was', async (t) => {
  const sent = wire([
    { status: 400, body: { error: { message: 'unknown model', type: 'invalid_request_error', code: 'model_not_found' } } },
    { status: 503, body: { error: { message: 'Unable to verify your balance right now.', type: 'billing_error', code: 'balance_unavailable' } } },
    { status: 402, body: { type: 'about:blank', status: 402, detail: 'Add credits', code: 'insufficient_balance' } },
    // A usage code outside 402 and 429 is not a usage refusal.
    { status: 401, body: modelCap },
    // Nor is a name every object inherits.
    { status: 402, body: { error: { code: 'constructor' } } },
    { status: 429, body: { error: { code: '__proto__' } } },
    { status: 402, body: { error: { code: 'toString' } } },
  ]);
  t.after(sent.restore);

  const ai = new hanzoai.AiApi(configuration());
  for (const status of [400, 503, 402, 401, 402, 429, 402]) {
    await assert.rejects(() => ai.postDecisions(decision), (err) => {
      assert.ok(axios.isAxiosError(err));
      assert.equal(err instanceof hanzoai.UsageLimitError, false);
      assert.equal(err.response.status, status);
      return true;
    });
  }
});

test('an action with no kind is not offered', async (t) => {
  const body = { error: { ...freePlanCap.error, actions: [{ label: 'no kind' }, 'upgrade', ...freePlanCap.error.actions] } };
  const sent = wire([{ status: 429, body }]);
  t.after(sent.restore);

  await assert.rejects(() => new hanzoai.AiApi(configuration()).postDecisions(decision), (err) => {
    assert.deepEqual(err.actions, freePlanCap.error.actions);
    return true;
  });
});

test('a buffer or a stream body is read, and a stream is left whole for the caller', async (t) => {
  const sent = wire([
    { status: 402, body: modelCap },
    { status: 429, body: freePlanCap },
    { status: 429, body: { error: { message: 'slow down', code: 'rate_limited' } } },
  ]);
  t.after(sent.restore);

  const ai = new hanzoai.AiApi(configuration());
  await assert.rejects(() => ai.postDecisions(decision, { responseType: 'arraybuffer' }), hanzoai.ModelCapError);
  await assert.rejects(() => ai.postDecisions(decision, { responseType: 'stream' }), (err) => {
    assert.ok(err instanceof hanzoai.FreePlanCapError);
    assert.deepEqual(err.resetsAt, new Date('2026-10-05T00:00:00Z'));
    return true;
  });
  const err = await ai.postDecisions(decision, { responseType: 'stream' }).catch((e) => e);
  assert.ok(axios.isAxiosError(err));
  assert.equal(await new Response(err.response.data).text(), JSON.stringify({ error: { message: 'slow down', code: 'rate_limited' } }));
});

test('through the http adapter: a parsed body, a Node stream, and a stream left whole', async (t) => {
  const answers = [
    [402, JSON.stringify(modelCap)],
    [429, JSON.stringify(usageCapExceeded)],
    [429, JSON.stringify({ error: { message: 'slow down', code: 'rate_limited' } })],
  ];
  const server = createServer((req, res) => {
    req.resume();
    const [status, text] = answers.shift();
    res.writeHead(status, { 'content-type': 'application/json', 'x-request-id': REQUEST });
    res.end(text);
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  t.after(() => server.close());

  const ai = new hanzoai.AiApi(new hanzoai.Configuration({ basePath: `http://127.0.0.1:${server.address().port}`, accessToken: 'tok-1' }));
  await assert.rejects(() => ai.postDecisions(decision), (err) => {
    assert.ok(err instanceof hanzoai.ModelCapError);
    assert.equal(err.fallback, 'enso');
    assert.equal(err.request, REQUEST);
    return true;
  });
  await assert.rejects(() => ai.postDecisions(decision, { responseType: 'stream' }), hanzoai.UsageCapExceededError);
  const err = await ai.postDecisions(decision, { responseType: 'stream' }).catch((e) => e);
  assert.ok(axios.isAxiosError(err));
  let text = '';
  for await (const chunk of err.response.data) text += chunk;
  assert.equal(text, JSON.stringify({ error: { message: 'slow down', code: 'rate_limited' } }));
});

test('an adapter of the caller\'s own is left alone, on an instance or set globally later', async (t) => {
  let hits = 0;
  const refuse = async (config) => {
    hits++;
    const err = new axios.AxiosError('402', 'ERR_BAD_REQUEST', config, null, {
      status: 402, statusText: '', headers: {}, config, data: JSON.stringify(modelCap),
    });
    throw err;
  };
  // An instance of the caller's own: its adapter answers, and its own
  // interceptors (none) decide the error's type.
  const own = axios.create({ adapter: refuse });
  await assert.rejects(
    () => new hanzoai.AiApi(configuration({ baseOptions: {} }), undefined, own).postDecisions(decision),
    (err) => axios.isAxiosError(err),
  );
  assert.equal(hits, 1);

  // A global adapter set after the Configuration was built still answers.
  const config = configuration({ baseOptions: {} });
  const before = axios.defaults.adapter;
  axios.defaults.adapter = refuse;
  t.after(() => {
    axios.defaults.adapter = before;
  });
  await assert.rejects(() => new hanzoai.AiApi(config).postDecisions(decision), hanzoai.ModelCapError);
  assert.equal(hits, 2);
});

test('readUsage reads a priced answer off the axios response', async (t) => {
  const sent = wire([
    {
      status: 200,
      headers: {
        'x-hanzo-usage': 'ok',
        'x-hanzo-usage-class': 'premium',
        'x-hanzo-paid-by': 'credits',
        'x-hanzo-served': 'anthropic/claude-sonnet-4.5',
      },
      body: { id: 'chatcmpl-1', model: 'anthropic/claude-sonnet-4.5', choices: [{ message: { role: 'assistant', content: 'hi' } }] },
    },
  ]);
  t.after(sent.restore);

  const res = await new hanzoai.AiApi(configuration()).postChatCompletions({
    openaiChatCompletionRequest: { model: 'anthropic/claude-sonnet-4.5', messages: [{ role: 'user', content: 'hi' }] },
  });
  assert.deepEqual(hanzoai.readUsage(res.headers), {
    usage: 'ok',
    usageClass: 'premium',
    paidBy: 'credits',
    fallback: undefined,
    served: 'anthropic/claude-sonnet-4.5',
    reason: undefined,
  });
});

test('readUsage takes fetch Headers, AxiosHeaders and a plain record alike', () => {
  const limited = {
    usage: 'limited',
    usageClass: 'premium',
    paidBy: undefined,
    fallback: 'enso',
    served: 'enso',
    reason: 'model_cap',
  };
  const wire = {
    'X-Hanzo-Usage': 'limited',
    'X-Hanzo-Usage-Class': 'premium',
    'X-Hanzo-Fallback': 'enso',
    'X-Hanzo-Served': 'enso',
    'X-Hanzo-Usage-Reason': 'model_cap',
  };
  assert.deepEqual(hanzoai.readUsage(new Headers(wire)), limited);
  assert.deepEqual(hanzoai.readUsage(axios.AxiosHeaders.from(wire)), limited);
  assert.deepEqual(hanzoai.readUsage(wire), limited);
  // Node's raw headers: lower-cased, and an array where a name repeats.
  assert.deepEqual(
    hanzoai.readUsage({ 'x-hanzo-usage': ['limited'], 'x-hanzo-usage-class': 'premium', 'x-hanzo-fallback': 'enso', 'x-hanzo-served': 'enso', 'x-hanzo-usage-reason': 'model_cap' }),
    limited,
  );
});

test('readUsage: absent or empty reads undefined, never 0 or ""', () => {
  const none = { usage: undefined, usageClass: undefined, paidBy: undefined, fallback: undefined, served: undefined, reason: undefined };
  assert.deepEqual(hanzoai.readUsage(new Headers()), none);
  assert.deepEqual(hanzoai.readUsage({}), none);
  assert.deepEqual(hanzoai.readUsage(undefined), none);
  assert.deepEqual(hanzoai.readUsage({ 'x-hanzo-usage': '', 'x-hanzo-paid-by': '  ' }), none);
  // A free model answers with only the SKU.
  assert.deepEqual(hanzoai.readUsage(new Headers({ 'x-hanzo-served': 'zen5' })), { ...none, served: 'zen5' });
});

test('GET /v1/ai/limits and PUT /v1/ai/limits', async (t) => {
  const limits = {
    plan: 'free',
    state: 'ok',
    classes: {},
    actions: [
      { kind: 'upgrade', label: 'Upgrade to Pro', url: 'https://hanzo.ai/pay/cart?plan=dev', plan: 'dev' },
      { kind: 'topup', label: 'Add prepaid credit', url: 'https://hanzo.ai/pay' },
    ],
    upgrade: 'dev',
    credits_after_allowance: false,
  };
  const sent = wire([
    { status: 200, body: limits },
    { status: 200, body: { ...limits, credits_after_allowance: true } },
  ]);
  t.after(sent.restore);

  const ai = new hanzoai.AiApi(configuration());
  const read = await ai.aiLimits();
  assert.equal(read.data.plan, 'free');
  assert.equal(read.data.credits_after_allowance, false);
  assert.equal(sent[0].method, 'GET');
  assert.equal(sent[0].url, 'https://api.hanzo.ai/v1/ai/limits');
  assert.equal(sent[0].headers.authorization, 'Bearer tok-1');

  const set = await ai.aiSetLimits({ aiLimitsSet: { creditsAfterAllowance: true } });
  assert.equal(set.data.credits_after_allowance, true);
  assert.equal(sent[1].method, 'PUT');
  assert.equal(sent[1].url, 'https://api.hanzo.ai/v1/ai/limits');
  assert.deepEqual(json(sent[1]), { creditsAfterAllowance: true });
});

test('/v1/sync: list, get, create, and sync now', async (t) => {
  const row = {
    id: 'sync_713c4bb98167c774be9d6d01a35ac69f',
    kind: 'git',
    source: { provider: 'github', locator: 'https://github.com/hanzoai/ui.git' },
    target: { provider: 'hanzo-git', locator: 'ui' },
    direction: 'pull',
    trigger: 'poll',
    createdAt: '2026-07-22T10:42:41Z',
    updatedAt: '2026-10-04T23:06:13Z',
    scope: 'repo',
    native: {
      url: 'https://git.hanzo.ai/hanzoai/hanzoai_ui',
      clone: 'https://git.hanzo.ai/hanzoai/hanzoai_ui.git',
      ssh: 'git@ssh.hanzo.ai:hanzoai/hanzoai_ui.git',
      branch: 'main',
      status: 'synced',
      sizeBytes: 131655680,
      advancedAt: '2026-10-04T23:06:13Z',
    },
  };
  const sent = wire([
    { status: 200, body: { data: [row] } },
    { status: 200, body: row },
    { status: 200, body: row },
    { status: 202, body: { queued: true, id: row.id } },
  ]);
  t.after(sent.restore);

  const sync = new hanzoai.SyncApi(configuration());
  const list = await sync.getSync();
  assert.equal(list.data.data[0].native.status, 'synced');
  const one = await sync.getSyncById({ id: row.id });
  assert.equal(one.data.source.locator, 'https://github.com/hanzoai/ui.git');
  const req = {
    kind: 'git',
    source: { provider: 'github', locator: 'https://github.com/hanzoai/ui.git' },
    target: { provider: 'hanzo-git', locator: 'ui' },
    direction: 'pull',
    trigger: 'poll',
    run: true,
  };
  await sync.postSync({ syncSyncReq: req });
  const now = await sync.postSyncByIdRun({ id: row.id });
  assert.deepEqual(now.data, { queued: true, id: row.id });

  assert.deepEqual(
    sent.map((r) => `${r.method} ${new URL(r.url).pathname}`),
    ['GET /v1/sync', `GET /v1/sync/${row.id}`, 'POST /v1/sync', `POST /v1/sync/${row.id}/run`],
  );
  assert.deepEqual(json(sent[2]), req);
});

test('GET /v1/models carries no credential and types class, family and pricing.variable', async (t) => {
  const sent = wire([
    {
      status: 200,
      body: {
        object: 'list',
        data: [
          { id: 'enso', object: 'model', owned_by: 'hanzo', premium: false, class: 'free', family: 'enso', pricing: { prompt: '0', completion: '0', input_per_million: 0, output_per_million: 0 } },
          { id: 'kai', object: 'model', owned_by: 'hanzo', premium: false, class: 'ours', family: 'kai', pricing: { prompt: '0.000000021', completion: '0', input_per_million: 0.021, output_per_million: 0 } },
          { id: 'openrouter/auto', object: 'model', owned_by: 'openrouter', premium: true, class: 'premium', pricing: { prompt: '0.00018', completion: '0.00072', input_per_million: 180, output_per_million: 720, variable: true } },
        ],
      },
    },
  ]);
  t.after(sent.restore);

  const { data } = await new hanzoai.AiApi(configuration({ accessToken: undefined })).getModels();
  assert.equal(sent[0].headers.authorization, undefined);
  assert.deepEqual(data.data.filter((m) => m.class === 'ours').map((m) => m.id), ['kai']);
  assert.deepEqual(data.data.map((m) => m.family ?? null), ['enso', 'kai', null]);
  assert.deepEqual(data.data.filter((m) => m.pricing?.variable).map((m) => m.id), ['openrouter/auto']);
});

test('Client.configuration is the package Configuration, typed refusals included', async (t) => {
  const c = client();
  assert.ok(c.configuration instanceof hanzoai.Configuration);

  const sent = wire([{ status: 200, body: TOKEN }, { status: 429, body: freePlanCap }]);
  t.after(sent.restore);
  await assert.rejects(
    () => new hanzoai.AiApi(c.configuration).postDecisions(decision, { adapter: 'fetch' }),
    hanzoai.FreePlanCapError,
  );
  assert.equal(sent[1].headers.authorization, 'Bearer tok-1');
});

test('no hand-written name hides a generated one, but Configuration', () => {
  // `.generated` names every file the generator owns; their exports are the
  // names a regeneration can add.
  const generated = new Set();
  const root = new URL('../', import.meta.url);
  for (const f of readFileSync(new URL('.generated', root), 'utf8').split('\n')) {
    if (!f.endsWith('.ts')) continue;
    for (const m of readFileSync(new URL(f, root), 'utf8').matchAll(/^export (?:interface|type|class|const|function|enum) (\w+)/gm)) {
      generated.add(m[1]);
    }
  }
  const entry = readFileSync(new URL('../src/hanzo.ts', import.meta.url), 'utf8');
  const named = [...entry.matchAll(/^export (?:type )?\{([^}]*)\}/gm)].flatMap((m) => m[1].split(',').map((n) => n.trim()).filter(Boolean));
  assert.ok(named.includes('readUsage') && named.includes('Configuration'));
  assert.deepEqual(named.filter((n) => generated.has(n)), ['Configuration']);
});

// The six capabilities' fetch path: what a gated call would throw as a Fault is
// the typed refusal when the body names one; a 402 stays the denied arm.

test('a 429 usage refusal on a gated call throws its type, not a Fault', async (t) => {
  const sent = wire([{ status: 200, body: TOKEN }, { status: 429, body: freePlanCap, headers: { 'x-request-id': REQUEST } }]);
  t.after(sent.restore);

  await assert.rejects(() => client().search.find('runbook'), (err) => {
    assert.ok(err instanceof hanzoai.FreePlanCapError);
    assert.equal(err instanceof hanzoai.answer.Fault, false);
    assert.equal(err.status, 429);
    assert.equal(err.request, REQUEST);
    assert.equal(err.cause, undefined);
    assert.deepEqual(err.resetsAt, new Date('2026-10-05T00:00:00Z'));
    return true;
  });
});

test('an envelope that is no usage refusal is a Fault carrying the code it nests', async (t) => {
  const sent = wire([
    { status: 200, body: TOKEN },
    { status: 400, body: { error: { message: 'unknown model', type: 'invalid_request_error', code: 'model_not_found' } } },
  ]);
  t.after(sent.restore);

  await assert.rejects(() => client().search.find('runbook'), (err) => {
    assert.ok(err instanceof hanzoai.answer.Fault);
    assert.equal(err.code, 'model_not_found');
    assert.equal(err.detail, 'unknown model');
    return true;
  });
});

test('a usage refusal on a read throws its type', async (t) => {
  const sent = wire([{ status: 200, body: TOKEN }, { status: 402, body: insufficientBalance }]);
  t.after(sent.restore);

  await assert.rejects(() => client().budget.balance(), hanzoai.InsufficientBalanceError);
});

test('a 402 in the OpenAI envelope is denied on the code it nests', async (t) => {
  const sent = wire([{ status: 200, body: TOKEN }, { status: 402, body: planAllowanceUsed, headers: { 'x-request-id': REQUEST } }]);
  t.after(sent.restore);

  const a = await client().search.find('runbook');
  assert.equal(a.status, 'denied');
  assert.equal(a.code, 'plan_allowance_used');
  assert.equal(a.reason, planAllowanceUsed.error.message);
  assert.equal(a.request, REQUEST);

  // A 403 refusal code is read from the envelope too.
  const refused = wire([{ status: 200, body: TOKEN }, { status: 403, body: insufficientBalance }]);
  t.after(refused.restore);
  const b = await client().search.find('runbook');
  assert.equal(b.status, 'denied');
  assert.equal(b.code, 'insufficient_balance');
});
