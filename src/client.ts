// The client: one credential, one endpoint, six capabilities.
//
// Everything under src/api and src/models is generated from cloud's own
// openapi.yaml. This file is not, and neither are budget, policy, audit,
// search, kb and graph beside it. They are hand-written over that client
// because the six routes they need are the ones the document describes as an
// address without a shape — /v1/authz/check declares neither a body nor a
// response, /v1/billing/balance and /usage declare no response, and no
// generator can project a method out of nothing.
//
// The client owns the credential, so `new Configuration(...)` and the generated
// *Api classes stay reachable for the other 2400 operations: read
// `client.configuration` and construct one with the same identity.

import { Fault, type Call, type Query, type Reply } from './answer';
import { Configuration } from './configuration';
import { Audit } from './audit';
import { Budget } from './budget';
import { Graph } from './graph';
import { Kb } from './kb';
import { Policy } from './policy';
import { Search } from './search';

/**
 * How the client is addressed and who it is.
 *
 * Every option falls back to an environment variable, so the zero-argument
 * constructor is the normal case.
 */
export interface Options {
  /** IAM client id. `HANZO_CLIENT_ID`. */
  id?: string;
  /** IAM client secret. `HANZO_CLIENT_SECRET`. */
  secret?: string;
  /** The one endpoint. `HANZO_BASE_URL`, default `https://api.hanzo.ai`. */
  base?: string;
  /** Where IAM answers. `HANZO_ISSUER_URL`, default `https://hanzo.id`. */
  issuer?: string;
  /** RFC 8707 audience the minted token names. `HANZO_RESOURCE`, default `base`. */
  resource?: string;
}

const BASE = 'https://api.hanzo.ai';
const ISSUER = 'https://hanzo.id';

/** IAM's client-credentials exchange. */
const TOKEN = '/v1/iam/oauth/token';

/** IAM's act grant: the operator credential, acting as one named subject. */
const ISSUE = '/v1/iam/tokens/issue';

/** A held token is replaced this long before it expires, so none dies in flight. */
const EARLY = 60_000;

/** The lifetime assumed when IAM states none. */
const LIFE = 300_000;

const env = (name: string): string | undefined =>
  typeof process === 'undefined' ? undefined : process.env[name] || undefined;

/** A token and how long it lives. */
type Minted = { token: string; ttl: number };

/** One request as the six describe it. */
type Sent = { query?: Query; body?: unknown; type?: string };

export class Client {
  readonly base: string;
  readonly issuer: string;
  readonly resource: string;

  readonly budget: Budget;
  readonly policy: Policy;
  readonly audit: Audit;
  readonly search: Search;
  readonly kb: Kb;
  readonly graph: Graph;

  private readonly id: string;
  private readonly secret: string;
  /** Set on a scoped client: whose credential mints, and for whom. */
  private scope: { of: Client; subject: string } | undefined;
  private held = '';
  private until = 0;
  private minting: Promise<string> | undefined;

  constructor(options: Options = {}) {
    this.id = options.id ?? env('HANZO_CLIENT_ID') ?? '';
    this.secret = options.secret ?? env('HANZO_CLIENT_SECRET') ?? '';
    this.base = (options.base ?? env('HANZO_BASE_URL') ?? BASE).replace(/\/+$/, '');
    this.issuer = (options.issuer ?? env('HANZO_ISSUER_URL') ?? ISSUER).replace(/\/+$/, '');
    this.resource = options.resource ?? env('HANZO_RESOURCE') ?? this.base;

    const call: Call = (method, path, opts) => this.send(method, path, opts);
    this.budget = new Budget(call);
    this.policy = new Policy(call);
    this.audit = new Audit(call);
    this.search = new Search(call);
    this.kb = new Kb(call);
    this.graph = new Graph(call);
  }

  /**
   * A client that acts as one of the tenant's subjects.
   *
   * The operator credential leaves with the scope: the returned client presents
   * a subject-bound token IAM minted from the act grant on the operator's own
   * token, and nothing else. Two credentials on one request would be two
   * answers to who is calling.
   *
   * `subject` is a subject id, or the externalId the operator filed the member
   * under. No method then takes a user id, so there is none to pass wrongly.
   */
  as(subject: string): Client {
    const scoped = new Client({ base: this.base, issuer: this.issuer, resource: this.resource });
    scoped.scope = { of: this, subject };
    return scoped;
  }

  /**
   * A Configuration carrying this client's identity, for the generated *Api
   * classes. The `accessToken` reader is a function, so every generated call
   * mints or re-uses through the same cache the six use.
   */
  get configuration(): Configuration {
    return new Configuration({ basePath: this.base, accessToken: () => this.token() });
  }

  /** A live access token, minting one when what is held is gone or nearly so. */
  async token(): Promise<string> {
    if (this.held && Date.now() < this.until - EARLY) return this.held;
    // One mint in flight at a time: concurrent calls on a cold client would
    // otherwise each open their own exchange and the last one home would win.
    this.minting ??= this.mint()
      .then(({ token, ttl }) => {
        this.held = token;
        this.until = Date.now() + ttl;
        return token;
      })
      .finally(() => {
        this.minting = undefined;
      });
    return this.minting;
  }

  /** Where this client's token comes from: its own credentials, or an act grant. */
  private mint(): Promise<Minted> {
    const scope = this.scope;
    return scope ? scope.of.act(scope.subject) : this.credentials();
  }

  /**
   * HIP-0111: client credentials for an access token, scoped by RFC 8707
   * `resource` so the token names what it may be spent at and is useless
   * anywhere else.
   */
  private async credentials(): Promise<Minted> {
    // A client with no credential says so at the first call rather than at
    // construction. There is nothing to exchange, so nothing goes to IAM and
    // nothing goes unsigned to the gateway — an unsigned call comes back a bare
    // 403, which reads as a refusal of the caller rather than the absence of
    // one. The code is empty because no answer named one.
    if (!this.id || !this.secret) {
      throw new Fault(
        0,
        '',
        'no IAM client credentials: pass {id, secret} or set HANZO_CLIENT_ID and HANZO_CLIENT_SECRET',
        '',
      );
    }
    const form = new URLSearchParams({ grant_type: 'client_credentials' });
    if (this.resource) form.set('resource', this.resource);
    const res = await globalThis.fetch(this.issuer + TOKEN, {
      method: 'POST',
      headers: {
        // client_secret_basic
        authorization: 'Basic ' + base64(`${this.id}:${this.secret}`),
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: form.toString(),
    });
    const body = await json(res);
    const out = body as { access_token?: string; expires_in?: number; error_description?: string; error?: string };
    if (!res.ok || !out.access_token) {
      // Say which identity was refused. A 401 reads identically whether the id
      // is wrong, the secret is stale, or the app may not use this grant, and
      // the reader is holding none of those.
      throw new Fault(
        res.status,
        out.error ?? 'invalid_client',
        `${this.issuer} refused client ${this.id}: ${out.error_description ?? 'no access token'}`,
        res.headers.get('x-request-id') ?? '',
      );
    }
    return { token: out.access_token, ttl: (out.expires_in ?? 0) * 1000 || LIFE };
  }

  /**
   * IAM's act grant. The subject rides as the `id` query and there is no body:
   * IAM reads the grant off the credential the request already carries. The
   * reply is camelCase, unlike the OAuth exchange above.
   */
  private async act(subject: string): Promise<Minted> {
    const operator = await this.token();
    const url = `${this.issuer}${ISSUE}?${new URLSearchParams({ id: subject })}`;
    const res = await globalThis.fetch(url, {
      method: 'POST',
      headers: { authorization: `Bearer ${operator}`, accept: 'application/json' },
    });
    const out = (await json(res)) as { accessToken?: string; expiresIn?: number; msg?: string };
    if (!res.ok || !out.accessToken) {
      throw new Fault(
        res.status,
        'grant_denied',
        `${this.issuer} refused an act grant for ${subject}: ${out.msg ?? 'no access token'}`,
        res.headers.get('x-request-id') ?? '',
      );
    }
    return { token: out.accessToken, ttl: (out.expiresIn ?? 0) * 1000 || LIFE };
  }

  /**
   * One authenticated round trip, replayed once on a 401.
   *
   * A 401 is the token, not the caller: re-mint and send it again. A second 401
   * is the server saying no, and it surfaces as a [Fault] — the arm rule in
   * answer.ts has nothing to read in it.
   */
  private async send(
    method: string,
    path: string,
    opts: Sent = {},
  ): Promise<Reply> {
    const reply = await this.once(method, path, opts, await this.token());
    if (reply.status !== 401) return reply;
    this.held = '';
    this.until = 0;
    return this.once(method, path, opts, await this.token());
  }

  private async once(method: string, path: string, opts: Sent, token: string): Promise<Reply> {
    const url = this.base + path + terms(opts.query);
    const headers: Record<string, string> = {
      authorization: `Bearer ${token}`,
      accept: 'application/json',
    };
    if (opts.body !== undefined) headers['content-type'] = opts.type ?? 'application/json';
    // A body with its own content type is sent verbatim — an export upload is
    // bytes, not a JSON document about bytes.
    const body =
      opts.body === undefined
        ? undefined
        : opts.type
          ? (opts.body as string | Uint8Array)
          : JSON.stringify(opts.body);
    let res: Response;
    try {
      res = await globalThis.fetch(url, { method, headers, ...(body === undefined ? {} : { body }) });
    } catch (cause) {
      // Nothing answered, so nothing was decided.
      throw new Fault(0, 'unreachable', `${method} ${url}: ${(cause as Error).message}`, '');
    }
    return {
      status: res.status,
      body: await json(res),
      request: res.headers.get('x-request-id') ?? '',
    };
  }
}

/** `?a=1&b=2`, dropping the terms the caller did not set. Empty where none are. */
function terms(query: Query | undefined): string {
  if (!query) return '';
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) if (v !== undefined && v !== '') q.set(k, String(v));
  const s = q.toString();
  return s ? '?' + s : '';
}

/** The body, or undefined where there is none to read (204, or a body that is not JSON). */
async function json(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

const base64 = (s: string): string =>
  typeof Buffer !== 'undefined'
    ? Buffer.from(s, 'utf8').toString('base64')
    : btoa(String.fromCharCode(...new TextEncoder().encode(s)));
