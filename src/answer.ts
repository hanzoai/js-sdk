// The answer every gated call gives back, and the one rule that produces it.
//
// A refused budget and a refused policy are ANSWERS. The caller reads which arm
// it got; it never catches one. `Answer<T>` is a union discriminated on the
// literal `status`, so `a.value` does not typecheck until the union is narrowed
// and a `switch` that forgets an arm fails to compile.
//
// [Fault] stays for outcomes with no decision in them: no credential, a
// transport failure, a server fault. There is nothing in those for a caller to
// read, so there is no arm for them.

import { list, num, obj, str } from './read';

/** One way out of a refusal, in the order to offer them. */
export interface Cure {
  /** The leg it satisfies — "subscribe", "credit". */
  kind: string;
  /** Where to do it. */
  url: string;
}

/** It ran. */
export interface Ok<T> {
  status: 'ok';
  value: T;
  /** `x-request-id` — the handle that finds this call in the audit trail. */
  request: string;
}

/** Authenticated, and refused on a decision the caller can act on. */
export interface Denied {
  status: 'denied';
  /**
   * The machine-readable reason, open by construction: cloud decides the set in
   * one place and a code added tomorrow arrives here as data. Today's money
   * codes are `insufficient_balance` (the wallet is empty) and
   * `spend_cap_exceeded` (the wallet has money and a cap says no) — different
   * facts with different cures, never collapsed.
   */
  code: string;
  /** The sentence the server gave. */
  reason: string;
  /** The gated product, where the gate is product-scoped. */
  product?: string;
  cures: Cure[];
  request: string;
}

/** Stopped for a person to decide. */
export interface Held {
  status: 'held';
  /** The approval handle. */
  id: string;
  /** The policy clause that stopped the call — the same clause `policy.check` refuses on. */
  clause: string;
  reason: string;
  request: string;
}

export type Answer<T> = Ok<T> | Denied | Held;

/** One page of a listing, and what the filter matched across all of them. */
export interface Page<T> {
  items: T[];
  total: number;
}

/**
 * An outcome with no decision in it.
 *
 * A 401, a bare 403, any other 4xx, every 5xx, a transport failure, an absent
 * credential. Nothing in it is for a caller to act on except `request`, which
 * is what support finds the call by. It is not an arm: a refusal a caller can
 * act on is [Denied] and a call a person was asked about is [Held], and reading
 * a network partition as either would let a caller cache a policy answer nobody
 * gave.
 *
 * It is not named `Problem` because RFC 9457's problem detail is the body a 402
 * carries and this client reads as a [Denied]; one word for two things is what
 * the naming rule prevents. It is not named `Error` because that name is
 * already taken, here and in every other language.
 */
export class Fault extends Error {
  /** The HTTP status, or 0 when nothing answered. */
  readonly status: number;
  /**
   * The RFC 9457 `code`, empty where the answer carried none — including every
   * fault raised before a request goes out.
   */
  readonly code: string;
  readonly detail: string;
  readonly request: string;

  constructor(status: number, code: string, detail: string, request: string) {
    super(`hanzoai: ${status}${code ? ' ' + code : ''}: ${detail}${request ? ` (request ${request})` : ''}`);
    this.name = 'Fault';
    this.status = status;
    this.code = code;
    this.detail = detail;
    this.request = request;
  }
}

/** Query terms; an undefined value is a term the caller did not set. */
export type Query = Record<string, string | number | boolean | undefined>;

/** One exchange with api.hanzo.ai, as the six read it. */
export interface Reply {
  status: number;
  body: unknown;
  /** `x-request-id`, present on every answer the gateway sends. */
  request: string;
}

/** An authenticated round trip. Every capability is handed exactly one. */
export type Call = (
  method: string,
  path: string,
  opts?: {
    query?: Query;
    /** JSON, unless `type` says otherwise. */
    body?: unknown;
    /** A content type for a body that is not JSON — an upload sent verbatim. */
    type?: string;
  },
) => Promise<Reply>;

/**
 * The 403 codes that mean "authenticated and refused" rather than "no principal".
 *
 * It is here because cloud spells "no validated principal" as 403 forbidden. The
 * day it answers 401 for that, this set goes and the rule below collapses to
 * `402 or 403 ⇒ denied`.
 *
 * These are the two codes cloud emits on a 403 it means as a refusal. There is
 * no third: a policy refusal has no code of its own yet, and a code invented
 * here would be one no server sends — and would hand an unauthenticated caller
 * a cure for a refusal nobody made.
 */
const refusals = new Set(['spend_cap_exceeded', 'insufficient_balance']);

/** What a refusal body says, whichever of cloud's two 402 bodies it is. */
function refusal(body: unknown): { code: string; reason: string; product?: string; cures: Cure[] } {
  const b = obj(body);
  // RFC 9457 spells the code `code` and the sentence `detail`; the spend gate's
  // own body spells them `error` and `message` and adds `product` and `cure[]`.
  // Its own `reason` — "unpaid", "unresolved" — names the admit leg that failed
  // rather than explaining anything to a person, so it is not read. One reader,
  // named fallbacks — not two paths — so it keeps working unchanged when cloud
  // settles on the envelope alone.
  const product = str(b['product']);
  return {
    code: str(b['code']) || str(b['error']),
    reason: str(b['detail']) || str(b['message']),
    ...(product ? { product } : {}),
    cures: list(b['cure']).map((c) => {
      const cure = obj(c);
      return { kind: str(cure['kind']), url: str(cure['url']) };
    }),
  };
}

/**
 * The one mapping from an HTTP answer to an arm. Every gated method in all six
 * capabilities goes through it, so none of them can grow a rule of its own.
 *
 *   2xx, body is not a hold        ok
 *   2xx, body says "held"          held    — the BODY decides, never the code:
 *                                            a dozen routes answer 202 for
 *                                            "accepted, working on it"
 *   402, any code                  denied  — money refused
 *   403 with a refusal code        denied  — authenticated and refused
 *   anything else                  throw   — no decision was made
 */
export function arm<T>(r: Reply, read: (body: unknown) => T): Answer<T> {
  if (r.status >= 200 && r.status < 300) {
    const b = obj(r.body);
    // A hold is 202 AND a body that says so. The code alone would turn every
    // "accepted, working on it" into an approval nobody is waiting on; the body
    // alone would turn a search whose own `status` field reads `held` into one.
    if (r.status === 202 && b['status'] === 'held') {
      return {
        status: 'held',
        id: str(b['id']),
        clause: str(b['clause']),
        reason: str(b['reason']),
        request: r.request,
      };
    }
    return { status: 'ok', value: read(r.body), request: r.request };
  }
  const said = refusal(r.body);
  if (r.status === 402 || (r.status === 403 && refusals.has(said.code))) {
    return { status: 'denied', ...said, request: r.request };
  }
  throw new Fault(r.status, said.code, said.reason || `HTTP ${r.status}`, r.request);
}

/** A read no gate refuses: the value, or a [Fault] because nothing was decided. */
export function value<T>(r: Reply, read: (body: unknown) => T): T {
  if (r.status >= 200 && r.status < 300) return read(r.body);
  const said = refusal(r.body);
  throw new Fault(r.status, said.code, said.reason || `HTTP ${r.status}`, r.request);
}

/** `{data, total}` — the page shape every listing on this wire answers with. */
export function page<T>(body: unknown, read: (row: unknown) => T): Page<T> {
  const b = obj(body);
  const items = list(b['data']).map(read);
  return { items, total: 'total' in b ? num(b['total']) : items.length };
}
