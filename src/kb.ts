// kb — the corpus you write, and the connectors that fill it.
//
// Searching it belongs to `search`. The writes are not under /v1/knowledge at
// all: they are generic doctype CRUD at /v1/framework/kb.page, kb.memory and
// kb.source, so these methods straddle two apps. One capability, one set of
// words, and the split stays here.

import { arm, page, value, type Answer, type Call, type Page } from './answer';
import { bool, list, num, obj, str, when } from './read';

/** The three kinds of document the corpus holds. */
export type Kind = 'page' | 'memory' | 'source';

export interface Doc {
  kind: Kind;
  /**
   * The document's id within its kind. A page IS its name: the doctype is
   * autonamed from the slug field, so writing a page names it. A memory and a
   * source are named by the store, and the name is what a later read or write
   * addresses them by.
   *
   * Everything but `kind` is optional on the way in — a caller writes what it
   * has — and populated on the way out.
   */
  name?: string;
  title?: string;
  /** The prose. */
  body?: string;
  project?: string;
  /** Where it came from. Only a source declares one. */
  url?: string;
}

/**
 * What narrows a listing. The route bounds by `limit` alone — it publishes no
 * count and takes no page number — so these three are the whole of it.
 */
export interface Filter {
  project?: string;
  /** `<field> [asc|desc]`. Empty is most-recently-updated first. */
  order?: string;
  limit?: number;
}

/** What an export landed. */
export interface Import {
  format: string;
  /** What was actually filed — a page a normalizer could not read is skipped and not counted. */
  imported: number;
  pages: string[];
}

/** What a rebuild of the org's retrieval did. */
export interface Reindex {
  /** Documents embedded into the org's collection, which was dropped and created again. */
  vectors: number;
  /** Rows the lexical index holds now; 0 in a deployment without it. */
  lexical: number;
  removed: number;
  /** Documents that could not be embedded; the rest of the rebuild went on without them. */
  failed: number;
}

export interface Connector {
  provider: string;
  /** `native` for a first-party connector, `piece` for a long-tail one. */
  kind: string;
  /** `connected`, `disconnected`, `syncing` or `error`. */
  status: string;
  /** This deployment holds OAuth credentials for the provider. */
  configured: boolean;
  /** The connected external account. Empty until the org connects. */
  account: string;
  /** Live count of this provider's documents in the org's store. */
  docs: number;
  /** When the last pull finished. */
  synced?: Date;
  /** The last sync failure. */
  error: string;
}

/** Somewhere to send a person. */
export interface Link {
  url: string;
}

/** What a pull landed. */
export interface Sync {
  provider: string;
  ingested: number;
}

export interface Node {
  /** `<kind>:<name>` — the click-to-open key. */
  id: string;
  name: string;
  title: string;
  /** `kb.page`, `kb.memory`, `kb.source`, `kb.connector` or `unresolved`. */
  kind: string;
  project: string;
}

export interface Edge {
  from: string;
  to: string;
  /** `parent`, `link` or `provenance`. */
  kind: string;
}

/**
 * The corpus's own parent, wikilink and provenance edges.
 *
 * This is not `graph`: it describes documents, not assertions, and the two
 * never share a type.
 */
export interface Links {
  nodes: Node[];
  edges: Edge[];
  /** The store was unreachable and this graph is honestly empty rather than wrong. */
  partial: boolean;
}

/**
 * The doctype a kind is stored under: `page` addresses `kb.page`. A caller who
 * already wrote the address keeps it, so this is safe to apply twice.
 *
 * It is exported because `search` filters and reports the same vocabulary, and
 * this is where the vocabulary lives: a knowledge kind is one word — page,
 * memory, source — everywhere a caller says one.
 */
export const doctype = (kind: string): string => (kind.includes('.') ? kind : `kb.${kind}`);

/**
 * The inverse: `kb.page` is `page`. A doctype from another corpus — a lexical
 * row carries its own — has no `kb.` prefix and passes through unchanged.
 */
export const kind = (doctype: string): string =>
  doctype.startsWith('kb.') ? doctype.slice(3) : doctype;

function doc(kind: Kind, row: unknown): Doc {
  const r = obj(row);
  return {
    kind,
    name: str(r['name']),
    title: str(r['title']),
    // kb.memory calls its prose `content`; page and source call it `body`.
    body: str(r['body']) || str(r['content']),
    project: str(r['project']),
    url: str(r['url']),
  };
}

/**
 * A document as its own doctype declares its fields, and nothing else: the body
 * of a framework write is field data, and a member no doctype declares is
 * dropped before the store sees it.
 *
 * kb.page requires a slug and IS it — the doctype is autonamed from that field
 * — so the name rides as `slug` and not as a name. kb.memory keeps its prose in
 * `content` where page and source keep it in `body`. Only kb.source declares a
 * `url`.
 *
 * A field the caller left empty is left out, so the doctype's own required
 * fields refuse the write and say which one is missing.
 */
function fields(d: Doc): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const set = (field: string, v: string | undefined): void => {
    if (v) out[field] = v;
  };
  set('title', d.title);
  set('project', d.project);
  set(d.kind === 'memory' ? 'content' : 'body', d.body);
  if (d.kind === 'page') set('slug', d.name);
  if (d.kind === 'source') set('url', d.url);
  return out;
}

export class Kb {
  constructor(private readonly call: Call) {}

  /**
   * Write a document.
   *
   * A name that already stands is replaced; a name that does not is created.
   * The store decides which: the replace goes out first and a 404 is the answer
   * that the document is not there yet, so the create follows. That is one
   * round trip on a revision — the common case for a corpus — and two on a
   * first write.
   *
   * It cannot be decided from the name alone. A page IS its slug, so a page
   * being created carries a name exactly as a page being revised does, and
   * reading a present name as "it exists" would leave no way to create one.
   */
  async put(d: Doc): Promise<Answer<Doc>> {
    const type = doctype(d.kind);
    const body = fields(d);
    if (d.name) {
      const replaced = await this.call('PUT', `/v1/framework/${type}/${encodeURIComponent(d.name)}`, { body });
      if (replaced.status !== 404) return arm(replaced, (row) => doc(d.kind, row));
    }
    return arm(await this.call('POST', `/v1/framework/${type}`, { body }), (row) => doc(d.kind, row));
  }

  /** One document by name. */
  async get(kind: Kind, name: string): Promise<Doc> {
    const reply = await this.call('GET', `/v1/framework/${doctype(kind)}/${encodeURIComponent(name)}`);
    return value(reply, (body) => doc(kind, body));
  }

  /** The org's documents of one kind. */
  async list(kind: Kind, filter: Filter = {}): Promise<Page<Doc>> {
    const reply = await this.call('GET', `/v1/framework/${doctype(kind)}`, {
      query: {
        filters: filter.project ? JSON.stringify({ project: filter.project }) : undefined,
        order_by: filter.order,
        limit: filter.limit,
      },
    });
    return value(reply, (body) => page(body, (row) => doc(kind, row)));
  }

  /** Remove one document. */
  async drop(kind: Kind, name: string): Promise<Answer<void>> {
    const reply = await this.call('DELETE', `/v1/framework/${doctype(kind)}/${encodeURIComponent(name)}`);
    return arm(reply, () => undefined);
  }

  /**
   * File an Obsidian, Notion, Roam or Evernote export as a tree of pages.
   *
   * `format` picks the normalizer and `data` is the export itself: a vault zip,
   * a Roam JSON, an Evernote .enex. `project` narrows every imported page to
   * one scope.
   */
  async import(format: string, data: string | Uint8Array, project?: string): Promise<Answer<Import>> {
    const reply = await this.call('POST', '/v1/knowledge/import', {
      query: { format, project },
      body: data,
      // The export rides as the raw request body, which is what this route reads
      // when there is no multipart part.
      type: 'application/octet-stream',
    });
    return arm(reply, (body) => {
      const b = obj(body);
      return {
        format: str(b['format']),
        imported: num(b['imported']),
        pages: list(b['pages']).map(str),
      };
    });
  }

  /** Rebuild the org's retrieval from its documents. */
  async reindex(): Promise<Answer<Reindex>> {
    return arm(await this.call('POST', '/v1/knowledge/reindex'), (body) => {
      const b = obj(body);
      return {
        vectors: num(b['vectors']),
        lexical: num(b['lexical']),
        removed: num(b['removed']),
        failed: num(b['failed']),
      };
    });
  }

  /** Every supported connector, with this org's connection state. */
  async connectors(): Promise<Connector[]> {
    return value(await this.call('GET', '/v1/knowledge/connectors'), (body) =>
      list(obj(body)['connectors']).map((row) => {
        const c = obj(row);
        const synced = when(c['lastSync']);
        return {
          provider: str(c['provider']),
          kind: str(c['kind']),
          status: str(c['status']),
          configured: bool(c['configured']),
          account: str(c['account']),
          docs: num(c['docCount']),
          ...(synced ? { synced } : {}),
          error: str(c['error']),
        };
      }),
    );
  }

  /**
   * Where to send a person to connect a provider.
   *
   * The URL is never followed here: an OAuth consent screen is not a client's
   * to complete.
   */
  async connect(provider: string): Promise<Link> {
    const reply = await this.call(
      'GET',
      `/v1/knowledge/connectors/${encodeURIComponent(provider)}/connect`,
    );
    return value(reply, (body) => ({ url: str(obj(body)['authorizeUrl']) }));
  }

  /** Pull a provider's documents into the corpus. */
  async sync(provider: string): Promise<Answer<Sync>> {
    const reply = await this.call(
      'POST',
      `/v1/knowledge/connectors/${encodeURIComponent(provider)}/sync`,
    );
    return arm(reply, (body) => {
      const b = obj(body);
      return { provider: str(b['provider']) || provider, ingested: num(b['ingested']) };
    });
  }

  /**
   * Drop a connection. The documents already ingested stay — they are the org's
   * own data — but stop being retrievable.
   */
  async revoke(provider: string): Promise<Answer<void>> {
    const reply = await this.call('DELETE', `/v1/knowledge/connectors/${encodeURIComponent(provider)}`);
    return arm(reply, () => undefined);
  }

  /**
   * The corpus's own edges, shaped for a renderer. No `project` reads the whole
   * org.
   */
  async links(project?: string): Promise<Links> {
    const reply = await this.call('GET', '/v1/knowledge/graph', { query: { project } });
    return value(reply, (body) => {
      const b = obj(body);
      return {
        nodes: list(b['nodes']).map((row) => {
          const n = obj(row);
          return {
            id: str(n['id']),
            name: str(n['name']),
            title: str(n['title']),
            // `kind` is this client's one word for what a thing is; the route
            // spells it `type`.
            kind: str(n['type']),
            project: str(n['project']),
          };
        }),
        edges: list(b['edges']).map((row) => {
          const e = obj(row);
          return { from: str(e['from']), to: str(e['to']), kind: str(e['kind']) };
        }),
        partial: bool(b['degraded']),
      };
    });
  }

  /**
   * Create the corpus's doctypes in the org. Once, before the first `put`.
   *
   * It is in the surface only because cloud requires it; it leaves the day the
   * first write to a module's doctype installs it.
   */
  async install(): Promise<Answer<void>> {
    return arm(await this.call('POST', '/v1/framework/modules/kb/install'), () => undefined);
  }
}
