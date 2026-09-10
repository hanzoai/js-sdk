// graph — assertions with provenance and time.
//
// Nothing overwrites anything: a correction is another assertion, and a read
// shows the superseded claim beside the one that superseded it. What is in
// force at an instant is a question you ask `resolve`, not a state the store
// keeps.
//
// The substrate is HIP-0526's. This client talks to /v1/graph and embeds none
// of it.

import { Fault, arm, value, type Answer, type Call } from './answer';
import { bool, instant, list, num, obj, rfc3339, str, when } from './read';

/**
 * One assertion.
 *
 * `entity`, `relation`, `value`, `at` and `source` are what an asserter states.
 * `id`, `by` and `knowable` are the server's, present on a read and never sent:
 * `id` is the content address it minted, so two callers who assert the identical
 * thing land on one row.
 */
export interface Fact {
  /** The thing being described, in the org's own namespace. */
  entity: string;
  /** What is being asserted — `depends`, `owner`, `title`. The vocabulary is the org's. */
  relation: string;
  /** What the relation points at. */
  value: string;
  /** The value is another entity's key, so this assertion is an edge. A declaration, never a guess. */
  names?: boolean;
  /** When the thing was so. Refused more than five minutes ahead of the server's clock. */
  at: Date;
  /** When it became knowable. Defaults to `at` and may not precede it. */
  seen?: Date;
  /** Who asserted it. Required, because a claim nobody is named for cannot be weighed against one that is. */
  source: string;
  /** The record the claim came from. */
  evidence?: string;
  /** In [0,1]. A tie-breaker within the order, never a substitute for it. */
  confidence?: number;
  /** The content address the server minted. Read only. */
  id?: string;
  /** The identity that filed it, stamped from the validated principal. Read only. */
  by?: string;
  /** The first instant this plane could have answered with it. Read only. */
  knowable?: Date;
}

/** What a batch did. Each member is judged on its own. */
export interface Wrote {
  /** Members that became new rows. */
  recorded: number;
  /** Members this plane already held. A redelivery collides on its content address and is counted, not refused. */
  duplicate: number;
  /** Members turned away on arrival, before the store was touched. */
  refused: number;
  /** Why each refused member was refused, in the order sent. */
  reasons: string[];
}

/** What narrows a read by key. */
export interface Filter {
  entity?: string;
  relation?: string;
  value?: string;
  /** Read the store as it stood at an instant. */
  at?: Date;
  limit?: number;
}

/** What narrows a read by text. */
export interface Terms {
  relation?: string;
  at?: Date;
  limit?: number;
}

export type Direction = 'out' | 'in' | 'both';

/** How far and which way a walk goes. */
export interface Opts {
  /** One edge relation. Absent follows all. */
  relation?: string;
  /** `out` follows an edge from its entity to its value, `in` the other way, `both` is their union. Absent is `out`. */
  direction?: Direction;
  /** Hops. Absent is one. */
  depth?: number;
  at?: Date;
}

/** What is in force about one (entity, relation), and what disagreed. */
export interface Resolution {
  entity: string;
  relation: string;
  /** The instant this was taken at. */
  at?: Date;
  /** False is an answer, not an error: nothing has been asserted here. */
  known: boolean;
  winner?: Fact;
  /** Every other assertion knowable at `at`, strongest first. Not all of them disagree. */
  conflicts: Fact[];
  /** True only where a conflict claims a different value than the winner. */
  contested: boolean;
  truncated: boolean;
}

/** Everything a walk reached. */
export interface Walk {
  /** The seeds included, ordered by fewest hops and then by key. */
  entities: string[];
  /** The deepest hop count actually reached. */
  depth: number;
  /** The ceiling this walk was held to, the same for every caller. */
  bound: number;
  /** The bound stopped the walk — part of the answer rather than a silent short read. */
  truncated: boolean;
}

/** One relation a document states. */
export interface Triple {
  /** The nearest heading above the line, or the request's own subject. */
  subject: string;
  /** The relation, exactly as the line spells it. */
  predicate: string;
  object: string;
  /** The author wrote the object as `[[key]]`, so it is an entity and this is an edge. */
  names: boolean;
  /** Which section stated it, from zero. The second half of the resulting assertion's evidence. */
  section: number;
}

/** A document to read relations out of. */
export interface Source {
  /** Where the text came from — a URL, a document id, a page title. Stamped on every assertion. */
  source: string;
  /** The entity the text is about before any heading names one. */
  subject?: string;
  /** The document. A line written `relation:: value` states one; prose states none. */
  text: string;
  /** When what the source says was so. Part of every resulting assertion's content address. */
  at: Date;
}

/** What the org asserts, and the order that decides a conflict. */
export interface Vocabulary {
  /** What this org has actually asserted — the only vocabulary there is. */
  relations: string[];
  /**
   * The terms of the precedence order, in the order they apply. The wire member
   * is `rule`; this is plural because it is a list.
   */
  rules: string[];
  /** The ceiling on one walk. */
  bound: number;
}

function fact(row: unknown): Fact {
  const r = obj(row);
  return {
    entity: str(r['entity']),
    relation: str(r['relation']),
    value: str(r['value']),
    names: bool(r['names']),
    at: instant(r['at']),
    ...(when(r['seen']) ? { seen: when(r['seen']) } : {}),
    source: str(r['source']),
    evidence: str(r['evidence']),
    confidence: num(r['confidence']),
    id: str(r['id']),
    by: str(r['by']),
    ...(when(r['knowable']) ? { knowable: when(r['knowable']) } : {}),
  };
}

/** A fact as an asserter states it. The server's own three fields never ride back out. */
const asserted = (f: Fact): Record<string, unknown> => ({
  entity: f.entity,
  relation: f.relation,
  value: f.value,
  names: f.names,
  at: rfc3339(f.at),
  seen: rfc3339(f.seen),
  source: f.source,
  evidence: f.evidence,
  confidence: f.confidence,
});

function wrote(body: unknown): Wrote {
  const b = obj(body);
  return {
    recorded: num(b['recorded']),
    duplicate: num(b['duplicate']),
    refused: num(b['refused']),
    reasons: list(b['reasons']).map(str),
  };
}

const assertions = (body: unknown): Fact[] => list(obj(body)['assertions']).map(fact);

export class Graph {
  constructor(private readonly call: Call) {}

  /**
   * Assert what is true of some entities.
   *
   * One malformed member does not discard the batch: every member is judged on
   * its own and the counts say what happened to each. A batch whose counts do
   * not add up to what was sent is a transport fault, not an answer, so it
   * throws rather than returning an arm nobody can trust.
   */
  async assert(facts: Fact[]): Promise<Answer<Wrote>> {
    const reply = await this.call('POST', '/v1/graph', {
      body: { assertions: facts.map(asserted) },
    });
    const answer = arm(reply, wrote);
    if (answer.status === 'ok') {
      const { recorded, duplicate, refused } = answer.value;
      if (recorded + duplicate + refused !== facts.length) {
        throw new Fault(
          reply.status,
          'short_write',
          `asserted ${facts.length} facts and ${recorded + duplicate + refused} were accounted for`,
          reply.request,
        );
      }
    }
    return answer;
  }

  /**
   * Read assertions by key. Resolves nothing and withholds nothing: a
   * superseded claim and the one that superseded it both appear.
   */
  async read(filter: Filter = {}): Promise<Fact[]> {
    const reply = await this.call('GET', '/v1/graph', {
      query: {
        entity: filter.entity,
        relation: filter.relation,
        value: filter.value,
        as_of: rfc3339(filter.at),
        limit: filter.limit,
      },
    });
    return value(reply, assertions);
  }

  /**
   * Read assertions by text — the same act as `search.find` on a different
   * corpus. It resolves nothing either, which is the honest answer to "where is
   * this mentioned" and the reason a caller then asks `resolve` about what it
   * found.
   */
  async find(query: string, terms: Terms = {}): Promise<Fact[]> {
    const reply = await this.call('GET', '/v1/graph/search', {
      query: {
        q: query,
        relation: terms.relation,
        as_of: rfc3339(terms.at),
        limit: terms.limit,
      },
    });
    return value(reply, assertions);
  }

  /** What is in force about one (entity, relation) as of an instant. */
  async resolve(entity: string, relation: string, at?: Date): Promise<Resolution> {
    const reply = await this.call('POST', '/v1/graph/resolve', {
      body: { entity, relation, as_of: rfc3339(at) },
    });
    return value(reply, (body) => {
      const b = obj(body);
      return {
        entity: str(b['entity']) || entity,
        relation: str(b['relation']) || relation,
        ...(when(b['as_of']) ? { at: when(b['as_of']) } : {}),
        known: bool(b['known']),
        ...(b['winner'] ? { winner: fact(b['winner']) } : {}),
        conflicts: list(b['conflicts']).map(fact),
        contested: bool(b['contested']),
        truncated: bool(b['truncated']),
      };
    });
  }

  /** Walk the edges out of a seed set, bounded. Only edges are followed. */
  async walk(seeds: string[], opts: Opts = {}): Promise<Walk> {
    const reply = await this.call('POST', '/v1/graph/neighbors', {
      body: {
        seeds,
        relation: opts.relation,
        direction: opts.direction,
        depth: opts.depth,
        as_of: rfc3339(opts.at),
      },
    });
    return value(reply, (body) => {
      const b = obj(body);
      return {
        entities: list(b['entities']).map(str),
        depth: num(b['depth']),
        bound: num(b['bound']),
        truncated: bool(b['truncated']),
      };
    });
  }

  /** What a document states, recording nothing. */
  async extract(source: Source): Promise<Triple[]> {
    const reply = await this.call('POST', '/v1/graph/extract', { body: stated(source) });
    return value(reply, (body) =>
      list(obj(body)['triples']).map((row) => {
        const t = obj(row);
        return {
          subject: str(t['subject']),
          predicate: str(t['predicate']),
          object: str(t['object']),
          names: bool(t['names']),
          section: num(t['section']),
        };
      }),
    );
  }

  /**
   * Read a document and record what it states. Delivering the same source at
   * the same `at` twice records one set of rows and reports the rest as
   * duplicates.
   */
  async ingest(source: Source): Promise<Answer<Wrote>> {
    return arm(await this.call('POST', '/v1/graph/ingest', { body: stated(source) }), wrote);
  }

  /** The relations in use, and the rule that resolves a conflict. */
  async vocabulary(): Promise<Vocabulary> {
    return value(await this.call('GET', '/v1/graph/vocabulary'), (body) => {
      const b = obj(body);
      return {
        relations: list(b['relations']).map(str),
        rules: list(b['rule']).map(str),
        bound: num(b['bound']),
      };
    });
  }
}

const stated = (s: Source): Record<string, unknown> => ({
  source: s.source,
  subject: s.subject,
  text: s.text,
  at: rfc3339(s.at),
});
