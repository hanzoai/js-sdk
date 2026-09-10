// What each capability puts on the wire, and what it makes of what comes back.

import assert from 'node:assert/strict';
import test from 'node:test';

import { TOKEN, client, hanzoai, json, terms, wire } from './wire.mjs';

/** Every test here starts from a minted token. */
const answering = (...script) => wire([{ status: 200, body: TOKEN }, ...script]);

test('budget.left reports what remains, and reports nothing where nothing bounds it', async (t) => {
  const bounded = answering({
    status: 200,
    body: { plan: 'pro', limit: 20, used: 3, spent: false, window: 'day', resets: 1_788_000_000 },
  });
  t.after(bounded.restore);

  const a = await client().budget.left();
  assert.equal(bounded[1].url, 'https://api.hanzo.ai/v1/allowance');
  assert.equal(a.left, 17);
  assert.equal(a.window, 'day');
  assert.deepEqual(a.resets, new Date(1_788_000_000_000));

  const unbounded = answering({ status: 200, body: { plan: 'scale', limit: 0, used: 412, window: '' } });
  t.after(unbounded.restore);

  const b = await client().budget.left();
  // Unbounded has no remainder and no period. Zero would read as spent.
  assert.equal(b.left, undefined);
  assert.equal(b.resets, undefined);
  assert.equal(b.limit, 0);
});

test('budget.balance is integer minor units', async (t) => {
  const sent = answering({
    status: 200,
    body: { balance: 2_046_200, holds: 1_200, available: 2_045_000, account: 'acme' },
  });
  t.after(sent.restore);

  const a = await client().budget.balance();
  assert.deepEqual(a.available, { cents: 2_045_000, currency: 'USD' });
  assert.deepEqual(a.held, { cents: 1_200, currency: 'USD' });
  assert.equal(a.account, 'acme');
});

test('budget.plan fails to locked, never to an error', async (t) => {
  const sent = answering({ status: 200, body: { tier: '', apps: { studio: true, admin: false } } });
  t.after(sent.restore);

  const a = await client().budget.plan();
  assert.equal(a.tier, '');
  assert.deepEqual(a.apps, { studio: true, admin: false });
});

test('budget.spent reads the charged ledger', async (t) => {
  const sent = answering({
    status: 200,
    body: {
      user: 'acme',
      count: 2,
      usage: [
        { transactionId: 'txn_1', amount: 41, metadata: { model: 'zen5' }, createdAt: '2026-09-09T18:00:00Z' },
        { transactionId: 'txn_2', amount: 7, metadata: { model: 'zen5-mini' }, createdAt: '2026-09-09T18:01:00Z' },
      ],
    },
  });
  t.after(sent.restore);

  const a = await client().budget.spent({ since: new Date('2026-09-09T00:00:00Z'), product: 'inference' });
  assert.deepEqual(terms(sent[1]), { start: '2026-09-09T00:00:00.000Z', product: 'inference' });
  assert.equal(a.total, 2);
  assert.deepEqual(a.items[0], {
    id: 'txn_1',
    at: new Date('2026-09-09T18:00:00Z'),
    model: 'zen5',
    amount: { cents: 41, currency: 'USD' },
  });
});

test('policy.check asks in the order a person says it', async (t) => {
  const sent = answering({
    status: 200,
    body: { allow: false, subject: 'usr_7', verb: 'write', path: 'acme/graph' },
  });
  t.after(sent.restore);

  const d = await client().policy.check('usr_7', 'write', 'acme/graph');
  assert.equal(sent[1].url, 'https://api.hanzo.ai/v1/authz/check');
  // The caller says (sub, act, obj); the route reads {subject, verb, path}.
  assert.deepEqual(json(sent[1]), { subject: 'usr_7', verb: 'write', path: 'acme/graph' });
  assert.equal(d.allow, false);
  assert.equal(d.sub, 'usr_7');
  assert.equal(d.act, 'write');
  assert.equal(d.obj, 'acme/graph');
});

const row = (n, request) => ({
  seq: n,
  sub: 'usr_7',
  email: 'z@hanzo.ai',
  org: 'acme',
  action: 'graph.assert',
  resource: 'graph',
  resourceId: 'acme',
  method: 'POST',
  path: '/v1/graph',
  result: 'success',
  status: 200,
  time: '2026-09-10T21:00:0' + (n % 10) + 'Z',
  requestId: request,
  sourceIp: '203.0.113.4',
  userAgent: 'hanzoai/8.5',
});

test('audit renames six wire fields and moves nothing else', async (t) => {
  const sent = answering({ status: 200, body: { data: [row(1, 'req-a')], total: 1 } });
  t.after(sent.restore);

  const p = await client().audit.list({ actor: 'usr_7', since: new Date('2026-09-10T00:00:00Z'), size: 50 });
  assert.deepEqual(terms(sent[1]), {
    sub: 'usr_7',
    since: '2026-09-10T00:00:00.000Z',
    pageSize: '50',
  });
  const [e] = p.items;
  assert.equal(e.actor, 'usr_7');
  assert.equal(e.id, 'acme');
  assert.equal(e.request, 'req-a');
  assert.equal(e.ip, '203.0.113.4');
  assert.equal(e.agent, 'hanzoai/8.5');
  assert.deepEqual(e.at, new Date('2026-09-10T21:00:01Z'));
});

test('audit.all walks to the total and stops', async (t) => {
  const sent = answering(
    { status: 200, body: { data: [row(1, 'req-a'), row(2, 'req-b')], total: 3 } },
    { status: 200, body: { data: [row(3, 'req-a')], total: 3 } },
  );
  t.after(sent.restore);

  const seen = [];
  for await (const e of client().audit.all({ size: 2 })) seen.push(e.seq);
  assert.deepEqual(seen, [1, 2, 3]);
  assert.deepEqual(terms(sent[1]), { pageSize: '2', p: '1' });
  assert.deepEqual(terms(sent[2]), { pageSize: '2', p: '2' });
});

test('audit narrows by request id client-side, because the route does not', async (t) => {
  const sent = answering(
    { status: 200, body: { data: [row(1, 'req-a'), row(2, 'req-b')], total: 3 } },
    { status: 200, body: { data: [row(3, 'req-a')], total: 3 } },
  );
  t.after(sent.restore);

  const seen = [];
  for await (const e of client().audit.all({ size: 2, request: 'req-a' })) seen.push(e.seq);
  assert.deepEqual(seen, [1, 3]);
  // The term never reaches the query — the route has no such filter.
  assert.equal('requestId' in terms(sent[1]), false);
  assert.equal('request' in terms(sent[1]), false);
});

test('search sends the kinds as this route spells them', async (t) => {
  const sent = answering({ status: 200, body: { status: 'ok', hits: [], backends: [] } });
  t.after(sent.restore);

  await client().search.find('runbook', { mode: 'semantic', kinds: ['kb.page'], limit: 5 });
  assert.deepEqual(json(sent[1]), {
    query: 'runbook',
    mode: 'semantic',
    doctypes: ['kb.page'],
    limit: 5,
  });
});

test('kb.put replaces a name that exists and creates one that does not', async (t) => {
  const doc = { kind: 'page', name: 'runbook', title: 'Runbook', body: '# on call', project: 'ops', url: '' };

  const replaced = answering({ status: 200, body: { name: 'runbook', title: 'Runbook', body: '# on call' } });
  t.after(replaced.restore);

  const a = await client().kb.put(doc);
  assert.equal(replaced[1].method, 'PUT');
  assert.equal(replaced[1].url, 'https://api.hanzo.ai/v1/framework/kb.page/runbook');
  assert.deepEqual(json(replaced[1]), {
    name: 'runbook',
    title: 'Runbook',
    project: 'ops',
    body: '# on call',
    slug: 'runbook',
  });
  assert.equal(a.status, 'ok');
  assert.equal(a.value.kind, 'page');

  const created = answering(
    { status: 404, body: { status: 404, detail: 'Not Found' } },
    { status: 201, body: { name: 'runbook', title: 'Runbook', body: '# on call' } },
  );
  t.after(created.restore);

  const b = await client().kb.put(doc);
  assert.equal(created[2].method, 'POST');
  assert.equal(created[2].url, 'https://api.hanzo.ai/v1/framework/kb.page');
  assert.equal(b.status, 'ok');
});

test('kb.put files a memory under the field its own doctype declares', async (t) => {
  const sent = answering({ status: 201, body: { name: 'm1', content: 'the incident was ours' } });
  t.after(sent.restore);

  const a = await client().kb.put({
    kind: 'memory',
    name: '',
    title: 'incident',
    body: 'the incident was ours',
    project: '',
    url: '',
  });
  assert.equal(sent[1].method, 'POST');
  assert.deepEqual(json(sent[1]), { name: '', title: 'incident', project: '', content: 'the incident was ours' });
  assert.equal(a.value.body, 'the incident was ours');
});

test('kb.import sends the export verbatim', async (t) => {
  const sent = answering({ status: 200, body: { format: 'obsidian', imported: 3, pages: ['a', 'b', 'c'] } });
  t.after(sent.restore);

  const a = await client().kb.import({ format: 'obsidian', body: 'PK', project: 'ops' });
  assert.deepEqual(terms(sent[1]), { format: 'obsidian', project: 'ops' });
  assert.equal(sent[1].headers['content-type'], 'application/octet-stream');
  assert.equal(sent[1].body, 'PK');
  assert.equal(a.value.imported, 3);
});

test('kb.links describes documents, and calls a type a kind', async (t) => {
  const sent = answering({
    status: 200,
    body: {
      nodes: [{ id: 'kb.page:home', name: 'home', title: 'Home', type: 'kb.page', project: 'ops' }],
      edges: [{ from: 'kb.page:runbook', to: 'kb.page:home', kind: 'parent' }],
      degraded: true,
    },
  });
  t.after(sent.restore);

  const l = await client().kb.links();
  assert.equal(l.nodes[0].kind, 'kb.page');
  assert.deepEqual(l.edges[0], { from: 'kb.page:runbook', to: 'kb.page:home', kind: 'parent' });
  assert.equal(l.partial, true);
});

const fact = {
  entity: 'acme',
  relation: 'owner',
  value: 'ops',
  names: true,
  at: new Date('2026-09-10T00:00:00Z'),
  source: 'runbook',
  evidence: 'runbook#2',
  confidence: 0.9,
};

test('graph.assert states only what an asserter states', async (t) => {
  const sent = answering({ status: 200, body: { recorded: 1, duplicate: 0, refused: 0, reasons: [] } });
  t.after(sent.restore);

  const a = await client().graph.assert([{ ...fact, id: 'never', by: 'never', knowable: new Date() }]);
  assert.deepEqual(json(sent[1]), {
    assertions: [
      {
        entity: 'acme',
        relation: 'owner',
        value: 'ops',
        names: true,
        at: '2026-09-10T00:00:00.000Z',
        source: 'runbook',
        evidence: 'runbook#2',
        confidence: 0.9,
      },
    ],
  });
  assert.equal(a.status, 'ok');
  assert.equal(a.value.recorded, 1);
});

test('a batch whose counts do not add up is a fault, not an answer', async (t) => {
  const sent = answering({ status: 200, body: { recorded: 1, duplicate: 0, refused: 0, reasons: [] } });
  t.after(sent.restore);

  await assert.rejects(() => client().graph.assert([fact, fact]), (err) => {
    assert.ok(err instanceof hanzoai.answer.Problem);
    assert.equal(err.code, 'short_write');
    return true;
  });
});

test('graph reads at an instant, and the route spells that as_of', async (t) => {
  const stored = {
    entity: 'acme',
    relation: 'owner',
    value: 'ops',
    names: true,
    at: '2026-09-10T00:00:00Z',
    seen: '2026-09-10T00:05:00Z',
    knowable: '2026-09-10T00:05:00Z',
    source: 'runbook',
    by: 'acme/usr_7',
    id: 'sha256:9f',
  };
  const sent = answering(
    { status: 200, body: { assertions: [stored] } },
    { status: 200, body: { assertions: [stored] } },
    {
      status: 200,
      body: { entity: 'acme', relation: 'owner', as_of: '2026-09-10T12:00:00Z', known: true, winner: stored, conflicts: [], contested: false },
    },
    { status: 200, body: { entities: ['acme', 'ops'], depth: 1, bound: 500, truncated: false } },
    { status: 200, body: { relations: ['owner'], rule: ['knowable', 'confidence'], bound: 500 } },
  );
  t.after(sent.restore);

  const c = client();
  const at = new Date('2026-09-10T12:00:00Z');

  const read = await c.graph.read({ entity: 'acme', at });
  assert.deepEqual(terms(sent[1]), { entity: 'acme', as_of: '2026-09-10T12:00:00.000Z' });
  assert.equal(read[0].id, 'sha256:9f');
  assert.equal(read[0].by, 'acme/usr_7');
  assert.deepEqual(read[0].knowable, new Date('2026-09-10T00:05:00Z'));

  await c.graph.find('runbook', { relation: 'owner', limit: 5 });
  assert.deepEqual(terms(sent[2]), { q: 'runbook', relation: 'owner', limit: '5' });

  const settled = await c.graph.resolve('acme', 'owner', at);
  assert.deepEqual(json(sent[3]), { entity: 'acme', relation: 'owner', as_of: '2026-09-10T12:00:00.000Z' });
  assert.equal(settled.known, true);
  assert.equal(settled.winner.value, 'ops');
  assert.equal(settled.contested, false);

  const walked = await c.graph.walk(['acme'], { direction: 'both', depth: 2 });
  assert.deepEqual(json(sent[4]), { seeds: ['acme'], direction: 'both', depth: 2 });
  assert.deepEqual(walked.entities, ['acme', 'ops']);

  const vocabulary = await c.graph.vocabulary();
  assert.deepEqual(vocabulary.rule, ['knowable', 'confidence']);
});

test('graph.extract records nothing', async (t) => {
  const sent = answering({
    status: 200,
    body: { triples: [{ subject: 'acme', predicate: 'owner', object: 'ops', names: true, section: 2 }] },
  });
  t.after(sent.restore);

  const triples = await client().graph.extract({
    source: 'runbook',
    subject: 'acme',
    text: 'owner:: [[ops]]',
    at: new Date('2026-09-10T00:00:00Z'),
  });
  assert.equal(sent[1].url, 'https://api.hanzo.ai/v1/graph/extract');
  assert.deepEqual(json(sent[1]), {
    source: 'runbook',
    subject: 'acme',
    text: 'owner:: [[ops]]',
    at: '2026-09-10T00:00:00.000Z',
  });
  assert.deepEqual(triples, [{ subject: 'acme', predicate: 'owner', object: 'ops', names: true, section: 2 }]);
});
