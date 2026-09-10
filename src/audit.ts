// audit — the org's own trail, newest first.
//
// Read-only by construction. The server writes the trail; a client that could
// write to it would let a caller forge their own evidence.

import { page, value, type Call, type Page, type Query } from './answer';
import { num, obj, rfc3339, str, when } from './read';

/** One row of the trail. */
export interface Event {
  /** Position in the chain. */
  seq: number;
  /** Who did it. */
  actor: string;
  /** The actor's validated address, empty where the credential carried none. */
  email: string;
  /** The tenant it was done in. */
  org: string;
  /**
   * Present only on a cross-org action: the org the actor came from. A row
   * carrying it is an impersonation and should be rendered as one.
   */
  home: string;
  /** The verb — the event's name, not the HTTP method. */
  action: string;
  resource: string;
  /** The resource's id. */
  id: string;
  method: string;
  path: string;
  /** `success`, `deny` or `error`. */
  result: string;
  /** The HTTP status, where a request produced the row. */
  status: number;
  reason: string;
  /** When it happened. */
  at?: Date;
  /** `x-request-id` — the same word as `Answer.request`, and the join between them. */
  request: string;
  ip: string;
  agent: string;
}

/** Every term is optional, and every term narrows within the caller's own org. */
export interface Filter {
  actor?: string;
  action?: string;
  resource?: string;
  id?: string;
  result?: string;
  since?: Date;
  until?: Date;
  size?: number;
  /** 1-based. */
  page?: number;
  /**
   * One call's rows, by the `request` an [Answer] carried back.
   *
   * The route does not accept it, so it is applied to what the page returned
   * rather than to the query — correct and slow. `list` then reports `total` as
   * the matches on that page; `all` walks the trail and is complete. Both stop
   * doing that the day `GET /v1/audit` takes `requestId` as a filter.
   */
  request?: string;
}

/** The default page size, and what `all` walks at. */
const SIZE = 100;

function terms(filter: Filter): Query {
  return {
    sub: filter.actor,
    action: filter.action,
    resource: filter.resource,
    resourceId: filter.id,
    result: filter.result,
    since: rfc3339(filter.since),
    until: rfc3339(filter.until),
    // Declared as strings on this route; they are numbers everywhere else.
    pageSize: filter.size,
    p: filter.page,
  };
}

function event(row: unknown): Event {
  const r = obj(row);
  return {
    seq: num(r['seq']),
    // Six wire fields are renamed and nothing else moves: `sub` is token jargon
    // where the reader wants who did it; `time` is one word for an instant,
    // shared with graph.Fact.at; `resourceId` sits beside `resource` and the
    // compound says nothing more; `requestId` is the word Answer uses, which is
    // what makes the join to a call readable; `sourceIp` and `userAgent` have
    // no others to be distinguished from.
    actor: str(r['sub']),
    email: str(r['email']),
    org: str(r['org']),
    home: str(r['home']),
    action: str(r['action']),
    resource: str(r['resource']),
    id: str(r['resourceId']),
    method: str(r['method']),
    path: str(r['path']),
    result: str(r['result']),
    status: num(r['status']),
    reason: str(r['reason']),
    at: when(r['time']),
    request: str(r['requestId']),
    ip: str(r['sourceIp']),
    agent: str(r['userAgent']),
  };
}

export class Audit {
  constructor(private readonly call: Call) {}

  /** One page of the trail, newest first, with the total the filter matched. */
  async list(filter: Filter = {}): Promise<Page<Event>> {
    const got = value(await this.call('GET', '/v1/audit', { query: terms(filter) }), (body) =>
      page(body, event),
    );
    if (!filter.request) return got;
    const items = got.items.filter((e) => e.request === filter.request);
    return { items, total: items.length };
  }

  /**
   * Every page of the trail. Requests page 1 at the caller's size and stops
   * when a page comes back empty or the running count reaches the total.
   */
  async *all(filter: Filter = {}): AsyncIterableIterator<Event> {
    const size = filter.size ?? SIZE;
    let seen = 0;
    for (let p = filter.page ?? 1; ; p++) {
      const got = await this.list({ ...filter, size, page: p, request: undefined });
      if (got.items.length === 0) return;
      for (const e of got.items) if (!filter.request || e.request === filter.request) yield e;
      seen += got.items.length;
      // The total is what the filter matched across every page, so it is what
      // says when there is no next one.
      if (seen >= got.total) return;
    }
  }
}
