// search — one ranked result set over everything the org has stored.
//
// Degradation is stated, never silent. A leg that is down produces the
// surviving legs' results plus a backend entry carrying the failure; a caller
// that ignores `partial` reads a truncated corpus as a complete one.

import { arm, type Answer, type Call } from './answer';
import { list, num, obj, str } from './read';

/** How to search. The modes name retrieval kinds, never backends. */
export type Mode = 'auto' | 'text' | 'semantic' | 'hybrid';

export interface Opts {
  /** Default `auto`. */
  mode?: Mode;
  /** One project scope within the org. */
  project?: string;
  /** Restrict the semantic leg to these knowledge kinds — `kb.page`, `kb.memory`, `kb.source`. */
  kinds?: string[];
  /** The lexical index to query. Defaults to `kb`. */
  index?: string;
  /** Bounds the fused set. Default 10, maximum 50. */
  limit?: number;
  offset?: number;
}

/** Which leg contributed a hit, and where in that leg's own ranking it sat. */
export interface Match {
  /** `index`, `vector`, `code` or `rerank` — the name the leg reports itself under. */
  backend: string;
  /** 1-based position in that leg's own list, before fusion. The only input to the fused score. */
  rank: number;
  /** The leg's native score, on the leg's own scale. Reported for explanation, never used in ranking. */
  score: number;
}

export interface Hit {
  id: string;
  /** Which store it lives in: `kb`, `code`. Provenance, not something to branch on. */
  corpus: string;
  /** The knowledge kind — `kb.page`, `kb.memory`, `kb.source`, or the lexical row's own. */
  kind: string;
  title: string;
  url: string;
  project: string;
  /**
   * A reciprocal-rank fusion sum, comparable only within one response — never
   * across queries and never against a backend's own score, which stays in
   * `matched`.
   */
  score: number;
  matched: Match[];
}

/** One leg's operational report. Always populated, for every leg. */
export interface Backend {
  name: string;
  /**
   * `ok` it ran and answered · `degraded` it is configured and failed, and only
   * this one is a fault · `disabled` this deployment never provisioned it ·
   * `skipped` the request's mode excluded it.
   */
  status: 'ok' | 'degraded' | 'disabled' | 'skipped';
  /** How many results this leg returned before fusion. */
  hits: number;
  /** Milliseconds, timed around this leg's own call. */
  took: number;
  /** The failure text from a degraded leg. */
  error: string;
}

export interface Hits {
  status: 'ok' | 'partial' | 'unavailable';
  /** `status !== "ok"` — the one field a caller must read. */
  partial: boolean;
  /** The mode that ran, after `auto` resolved. */
  mode: string;
  items: Hit[];
  backends: Backend[];
  /** Milliseconds for the whole search. */
  took: number;
}

function hits(body: unknown): Hits {
  const b = obj(body);
  const status = (str(b['status']) || 'ok') as Hits['status'];
  return {
    status,
    partial: status !== 'ok',
    mode: str(b['mode']),
    items: list(b['hits']).map((row) => {
      const h = obj(row);
      return {
        id: str(h['id']),
        corpus: str(h['corpus']),
        kind: str(h['doctype']),
        title: str(h['title']),
        url: str(h['url']),
        project: str(h['project']),
        score: num(h['score']),
        matched: list(h['matched']).map((m) => {
          const p = obj(m);
          return { backend: str(p['backend']), rank: num(p['rank']), score: num(p['score']) };
        }),
      };
    }),
    backends: list(b['backends']).map((row) => {
      const l = obj(row);
      return {
        name: str(l['name']),
        status: (str(l['status']) || 'ok') as Backend['status'],
        hits: num(l['hits']),
        took: num(l['took_ms']),
        error: str(l['error']),
      };
    }),
    took: num(b['took_ms']),
  };
}

export class Search {
  constructor(private readonly call: Call) {}

  /**
   * Search the org's corpora.
   *
   * The rerank leg runs through the AI gateway, which is metered, so this can
   * be refused on money — as an arm carrying the way out, never as an
   * exception.
   */
  async find(query: string, opts: Opts = {}): Promise<Answer<Hits>> {
    const reply = await this.call('POST', '/v1/search', {
      body: {
        query,
        mode: opts.mode,
        project: opts.project,
        // `kind` is the word this client uses for a knowledge type; `doctypes`
        // is this route's spelling of it.
        doctypes: opts.kinds,
        index: opts.index,
        limit: opts.limit,
        offset: opts.offset,
      },
    });
    return arm(reply, hits);
  }
}
