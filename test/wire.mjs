// A fetch that answers from a script and records what it was asked.
//
// The six are hand-written HTTP, so what has to be proved about them is what
// goes out and what is made of what comes back. Nothing here mocks the SDK: the
// client under test is the one the build publishes, reached the way a consumer
// reaches it, and only the network is replaced.

import { createRequire } from 'node:module';

export const hanzoai = createRequire(import.meta.url)('hanzoai');

/** A minted token, so a test that is not about auth does not have to script one. */
export const TOKEN = { access_token: 'tok-1', expires_in: 3600 };

/**
 * Install a fetch that answers each call with the next entry of `script`.
 *
 * An entry is `{status, body, headers}`; `body` is serialized as JSON unless it
 * is already a string. Returns the array every request is recorded into, and a
 * `restore` to put the real fetch back.
 */
export function wire(script) {
  const sent = [];
  const real = globalThis.fetch;
  let n = 0;
  globalThis.fetch = async (url, init = {}) => {
    const step = script[n++];
    if (!step) throw new Error(`wire: no answer scripted for ${init.method ?? 'GET'} ${url}`);
    sent.push({
      url: String(url),
      method: init.method ?? 'GET',
      headers: init.headers ?? {},
      body: init.body,
    });
    const body = typeof step.body === 'string' || step.body === undefined
      ? step.body ?? ''
      : JSON.stringify(step.body);
    return new Response(body, {
      status: step.status ?? 200,
      headers: { 'content-type': 'application/json', ...(step.headers ?? {}) },
    });
  };
  sent.restore = () => {
    globalThis.fetch = real;
  };
  return sent;
}

/** A client whose whole configuration is the test's, never the environment's. */
export const client = (options = {}) =>
  new hanzoai.Client({
    id: 'cid',
    secret: 'csec',
    base: 'https://api.hanzo.ai',
    issuer: 'https://hanzo.id',
    resource: 'https://api.hanzo.ai',
    ...options,
  });

/** The JSON a recorded request carried. */
export const json = (request) => JSON.parse(request.body);

/** The query terms a recorded request carried. */
export const terms = (request) => Object.fromEntries(new URL(request.url).searchParams);
