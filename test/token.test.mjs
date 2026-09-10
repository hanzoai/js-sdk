// The credential: minted from IAM, held until it nearly expires, never accepted
// from the caller.

import assert from 'node:assert/strict';
import test from 'node:test';

import { TOKEN, client, hanzoai, terms, wire } from './wire.mjs';

const allowance = { status: 200, body: { plan: 'pro', limit: 20, used: 3, window: 'day' } };

test('mints with client credentials and carries the token', async (t) => {
  const sent = wire([{ status: 200, body: TOKEN }, allowance]);
  t.after(sent.restore);

  await client().budget.left();

  const [mint, call] = sent;
  assert.equal(mint.url, 'https://hanzo.id/v1/iam/oauth/token');
  assert.equal(mint.method, 'POST');
  // client_secret_basic, not the id and secret in the form.
  assert.equal(mint.headers.authorization, 'Basic ' + Buffer.from('cid:csec').toString('base64'));
  assert.equal(mint.headers['content-type'], 'application/x-www-form-urlencoded');
  assert.equal(
    mint.body,
    // RFC 8707: the token names what it may be spent at.
    'grant_type=client_credentials&resource=https%3A%2F%2Fapi.hanzo.ai',
  );

  assert.equal(call.url, 'https://api.hanzo.ai/v1/allowance');
  assert.equal(call.headers.authorization, 'Bearer tok-1');
});

test('holds the token rather than minting per call', async (t) => {
  const sent = wire([{ status: 200, body: TOKEN }, allowance, allowance]);
  t.after(sent.restore);

  const c = client();
  await c.budget.left();
  await c.budget.left();

  assert.equal(sent.length, 3);
  assert.equal(sent.filter((r) => r.url.includes('/oauth/token')).length, 1);
});

test('a 401 re-mints once and replays; a second 401 is the server saying no', async (t) => {
  const sent = wire([
    { status: 200, body: TOKEN },
    { status: 401, body: { title: 'Unauthorized', detail: 'invalid_token', code: 'unauthorized' } },
    { status: 200, body: { ...TOKEN, access_token: 'tok-2' } },
    allowance,
  ]);
  t.after(sent.restore);

  const left = await client().budget.left();
  assert.equal(left.plan, 'pro');
  assert.equal(sent.at(-1).headers.authorization, 'Bearer tok-2');

  const again = wire([
    { status: 200, body: TOKEN },
    { status: 401, body: { detail: 'invalid_token', code: 'unauthorized' } },
    { status: 200, body: TOKEN },
    { status: 401, body: { detail: 'invalid_token', code: 'unauthorized' } },
  ]);
  t.after(again.restore);

  await assert.rejects(() => client().budget.left(), (err) => {
    assert.ok(err instanceof hanzoai.answer.Fault);
    assert.equal(err.status, 401);
    return true;
  });
});

test('as() presents the subject token and leaves the operator credential behind', async (t) => {
  const sent = wire([
    { status: 200, body: TOKEN },
    { status: 200, body: { accessToken: 'tok-usr7', expiresIn: 900 } },
    allowance,
  ]);
  t.after(sent.restore);

  await client().as('usr_7').budget.left();

  const [, grant, call] = sent;
  assert.equal(grant.method, 'POST');
  assert.equal(new URL(grant.url).pathname, '/v1/iam/tokens/issue');
  assert.deepEqual(terms(grant), { id: 'usr_7' });
  // IAM reads the act grant off the operator's own token.
  assert.equal(grant.headers.authorization, 'Bearer tok-1');
  assert.equal(grant.body, undefined);

  assert.equal(call.headers.authorization, 'Bearer tok-usr7');
});

test('every option falls back to an environment variable', async (t) => {
  const names = [
    'HANZO_CLIENT_ID',
    'HANZO_CLIENT_SECRET',
    'HANZO_BASE_URL',
    'HANZO_ISSUER_URL',
    'HANZO_RESOURCE',
  ];
  const held = Object.fromEntries(names.map((n) => [n, process.env[n]]));
  t.after(() => {
    for (const [n, v] of Object.entries(held)) {
      if (v === undefined) delete process.env[n];
      else process.env[n] = v;
    }
  });
  for (const n of names) delete process.env[n];

  const bare = new hanzoai.Client();
  assert.equal(bare.base, 'https://api.hanzo.ai');
  assert.equal(bare.issuer, 'https://hanzo.id');
  // The audience defaults to the endpoint the token is spent at.
  assert.equal(bare.resource, 'https://api.hanzo.ai');

  process.env.HANZO_BASE_URL = 'https://cloud.example/';
  process.env.HANZO_ISSUER_URL = 'https://id.example';
  const moved = new hanzoai.Client();
  assert.equal(moved.base, 'https://cloud.example');
  assert.equal(moved.issuer, 'https://id.example');
  assert.equal(moved.resource, 'https://cloud.example');
});

test('no credential builds, and fails at the first call rather than at construction', async (t) => {
  const sent = wire([]);
  t.after(sent.restore);

  // Nothing goes to IAM, because there is nothing to exchange, and nothing goes
  // unsigned to the gateway — an unsigned call comes back a bare 403, which
  // reads as a refusal of the caller rather than the absence of one. The code
  // is empty because no answer named one.
  const c = new hanzoai.Client({ id: '', secret: '' });
  await assert.rejects(
    () => c.budget.left(),
    (err) => {
      assert.ok(err instanceof hanzoai.answer.Fault);
      assert.equal(err.status, 0);
      assert.equal(err.code, '');
      assert.match(err.message, /HANZO_CLIENT_ID/);
      return true;
    },
  );
  assert.equal(sent.length, 0);
});
