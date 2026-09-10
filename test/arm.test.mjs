// The one rule that turns an HTTP answer into an arm.
//
// A refusal is a value here. If any of these started throwing instead, a caller
// would have to catch to learn it had been told no — which is the thing this
// client exists not to do.

import assert from 'node:assert/strict';
import test from 'node:test';

import { TOKEN, client, hanzoai, wire } from './wire.mjs';

const REQUEST = 'a3916248cabccf13';
const stamped = { headers: { 'x-request-id': REQUEST } };

const found = {
  status: 'ok',
  mode: 'hybrid',
  took_ms: 41,
  hits: [
    {
      id: 'kb.page:runbook',
      corpus: 'kb',
      doctype: 'kb.page',
      title: 'Q3 incident runbook',
      url: '/kb/runbook',
      project: 'ops',
      score: 0.031,
      matched: [{ backend: 'vector', rank: 1, score: 0.82 }],
    },
  ],
  backends: [
    { name: 'index', status: 'ok', hits: 4, took_ms: 9 },
    { name: 'vector', status: 'ok', hits: 3, took_ms: 22 },
  ],
};

test('2xx is the ok arm, and it carries the request id', async (t) => {
  const sent = wire([{ status: 200, body: TOKEN }, { status: 200, body: found, ...stamped }]);
  t.after(sent.restore);

  const a = await client().search.find('q3 incident postmortems');
  assert.equal(a.status, 'ok');
  assert.equal(a.request, REQUEST);
  assert.equal(a.value.partial, false);
  assert.equal(a.value.mode, 'hybrid');
  assert.equal(a.value.took, 41);
  // `kb.page` is the address the route reports; `page` is the word this client
  // uses for a knowledge kind, in search and in kb alike.
  assert.equal(a.value.items[0].kind, 'page');
  assert.deepEqual(a.value.items[0].matched, [{ backend: 'vector', rank: 1, score: 0.82 }]);
});

test('a degraded leg is a field, never an error or an empty result', async (t) => {
  const partial = {
    ...found,
    status: 'partial',
    backends: [
      { name: 'index', status: 'ok', hits: 4, took_ms: 9 },
      { name: 'vector', status: 'degraded', hits: 0, took_ms: 0, error: 'qdrant: connection refused' },
    ],
  };
  const sent = wire([{ status: 200, body: TOKEN }, { status: 200, body: partial, ...stamped }]);
  t.after(sent.restore);

  const a = await client().search.find('runbook');
  assert.equal(a.status, 'ok');
  assert.equal(a.value.partial, true);
  assert.equal(a.value.items.length, 1);
  assert.equal(a.value.backends[1].error, 'qdrant: connection refused');
});

test('402 with the spend gate body is denied, with the way out', async (t) => {
  const sent = wire([
    { status: 200, body: TOKEN },
    {
      status: 402,
      ...stamped,
      body: {
        error: 'payment_required',
        product: 'search',
        reason: 'unpaid',
        message: 'no active subscription for search and no prepaid credit',
        cure: [
          { kind: 'subscribe', url: '/v1/plan' },
          { kind: 'credit', url: '/v1/billing' },
        ],
      },
    },
  ]);
  t.after(sent.restore);

  const a = await client().search.find('runbook');
  assert.equal(a.status, 'denied');
  assert.equal(a.code, 'payment_required');
  assert.equal(a.product, 'search');
  assert.equal(a.reason, 'no active subscription for search and no prepaid credit');
  assert.deepEqual(a.cures, [
    { kind: 'subscribe', url: '/v1/plan' },
    { kind: 'credit', url: '/v1/billing' },
  ]);
  assert.equal(a.request, REQUEST);
});

test('402 with the RFC 9457 envelope is denied on its own code', async (t) => {
  const sent = wire([
    { status: 200, body: TOKEN },
    {
      status: 402,
      ...stamped,
      body: {
        type: 'about:blank',
        title: 'Payment Required',
        status: 402,
        detail: 'Add credits at console.hanzo.ai',
        code: 'insufficient_balance',
      },
    },
  ]);
  t.after(sent.restore);

  const a = await client().search.find('runbook');
  assert.equal(a.status, 'denied');
  assert.equal(a.code, 'insufficient_balance');
  assert.equal(a.reason, 'Add credits at console.hanzo.ai');
  assert.deepEqual(a.cures, []);
  assert.equal(a.product, undefined);
});

test('403 with a refusal code is denied; 403 forbidden is not', async (t) => {
  const refused = wire([
    { status: 200, body: TOKEN },
    { status: 403, ...stamped, body: { status: 403, detail: 'the monthly cap is spent', code: 'spend_cap_exceeded' } },
  ]);
  t.after(refused.restore);

  const a = await client().search.find('runbook');
  assert.equal(a.status, 'denied');
  assert.equal(a.code, 'spend_cap_exceeded');

  // "No validated principal" is cloud spelling 401 as 403. Nothing was decided,
  // so there is nothing in it for a caller to read.
  const anonymous = wire([
    { status: 200, body: TOKEN },
    {
      status: 403,
      ...stamped,
      body: { status: 403, title: 'Forbidden', detail: 'search: a validated principal is required', code: 'forbidden' },
    },
  ]);
  t.after(anonymous.restore);

  await assert.rejects(() => client().search.find('runbook'), (err) => {
    assert.ok(err instanceof hanzoai.answer.Fault);
    assert.equal(err.status, 403);
    assert.equal(err.code, 'forbidden');
    assert.equal(err.request, REQUEST);
    return true;
  });

  // Cloud writes neither `policy_denied` nor `entitlement_required` anywhere,
  // so a 403 read as denied on one of them would hand a caller a cure for a
  // refusal nobody made — and it is the same 403 an unauthenticated call gets.
  const invented = wire([
    { status: 200, body: TOKEN },
    { status: 403, ...stamped, body: { status: 403, detail: 'clause storage.write', code: 'policy_denied' } },
  ]);
  t.after(invented.restore);

  await assert.rejects(() => client().search.find('runbook'), (err) => {
    assert.ok(err instanceof hanzoai.answer.Fault);
    assert.equal(err.status, 403);
    return true;
  });
});

test('the body decides a hold, not the code', async (t) => {
  const fact = {
    entity: 'acme',
    relation: 'owner',
    value: 'ops',
    at: new Date('2026-09-10T00:00:00Z'),
    source: 'test',
  };

  const stopped = wire([
    { status: 200, body: TOKEN },
    {
      status: 202,
      ...stamped,
      body: { status: 'held', id: 'apr_88', clause: 'graph.write', reason: 'a person was asked' },
    },
  ]);
  t.after(stopped.restore);

  const a = await client().graph.assert([fact]);
  assert.equal(a.status, 'held');
  assert.equal(a.id, 'apr_88');
  assert.equal(a.clause, 'graph.write');
  assert.equal(a.request, REQUEST);

  // A 202 that means "accepted, working on it" is an ordinary answer.
  const accepted = wire([
    { status: 200, body: TOKEN },
    { status: 202, ...stamped, body: { recorded: 1, duplicate: 0, refused: 0, reasons: [] } },
  ]);
  t.after(accepted.restore);

  const b = await client().graph.assert([fact]);
  assert.equal(b.status, 'ok');
  assert.equal(b.value.recorded, 1);
});

test('5xx and an unreachable server are faults, not arms', async (t) => {
  const broken = wire([
    { status: 200, body: TOKEN },
    { status: 502, ...stamped, body: { status: 502, detail: 'search upstream unreachable' } },
  ]);
  t.after(broken.restore);

  await assert.rejects(() => client().search.find('runbook'), { status: 502 });

  const real = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = real;
  });
  let n = 0;
  globalThis.fetch = async () => {
    if (n++ === 0) return new Response(JSON.stringify(TOKEN), { status: 200 });
    throw new TypeError('fetch failed');
  };

  await assert.rejects(() => client().search.find('runbook'), (err) => {
    assert.ok(err instanceof hanzoai.answer.Fault);
    assert.equal(err.status, 0);
    assert.equal(err.code, 'unreachable');
    return true;
  });
});
