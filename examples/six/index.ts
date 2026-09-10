// six — budget, policy, audit, search, kb and graph in one pass.
//
// What a real caller does before and around a piece of work: see what it may
// spend, ask whether it may act, look in the corpus, write what it learned into
// the graph, and read back the trail of what it just did. One client, one
// credential, one answer type.
//
//   export HANZO_CLIENT_ID=...  HANZO_CLIENT_SECRET=...
//   npm run build && npx tsx examples/six/index.ts
//
// Unlike the other flows this one needs a credential for every call: all six
// capabilities are org-scoped, and there is no allowance, no policy set and no
// trail without someone to hold them.

import { Client, type answer } from 'hanzoai';

/** The entity this run writes about, so a second run resolves against the first. */
const ENTITY = 'example:six';

async function main() {
  const c = new Client(); // id and secret from the environment

  // budget — a count of free calls and a sum of prepaid credit, which never
  // stand in for each other.
  const left = await c.budget.left();
  const wallet = await c.budget.balance();
  console.log(
    `plan ${left.plan || '(none)'}: ${left.left ?? 'unbounded'} calls left this ${left.window || 'period'}`,
  );
  console.log(
    `wallet ${wallet.account}: ${wallet.available.minor} available, ${wallet.reserved.minor} reserved, ` +
      `in ${wallet.available.currency} minor units`,
  );

  // policy — asking whether you may is a question with an answer; being stopped
  // mid-call is what produces a denied arm. The wallet echoed the ledger key
  // this org bills from, and an org-rooted policy path is rooted at that name,
  // so a browser never has to guess its own org by decoding its own token.
  const may = await c.policy.check(wallet.account, 'write', `${wallet.account}/graph`);
  console.log(
    `policy: ${may.sub} may${may.allow ? '' : ' not'} ${may.act} ${may.obj}` +
      (may.reason ? ` — ${may.reason}` : ''),
  );

  // What the plan opens, which is a different authority from what policy allows.
  const me = await c.budget.plan();
  console.log(`tier ${me.tier || '(free)'}, apps ${Object.keys(me.apps).length}`);

  // search — one ranked set over the whole corpus. `partial` is the field that
  // says whether a leg was down; ignoring it reads a truncated corpus as a
  // complete one.
  const found = await c.search.find('incident runbook', { limit: 5 });
  const hits = read(found, 'search.find');
  if (hits) {
    console.log(`search ${found.request}: ${hits.items.length} hits in ${hits.took}ms${hits.partial ? ' (partial)' : ''}`);
    for (const hit of hits.items.slice(0, 3)) console.log(`  ${hit.score.toFixed(3)}  ${hit.kind}  ${hit.title}`);
    for (const leg of hits.backends) if (leg.status !== 'ok') console.log(`  ${leg.name}: ${leg.status} ${leg.error}`);
  }

  // kb — the corpus you write. `search` is how you read it.
  const pages = await c.kb.list('page', { limit: 3 });
  console.log(`kb: ${pages.total} pages`);

  // graph — assertions with provenance and time. Nothing overwrites anything.
  // The check above was a question; this write is where the authority is, so a
  // refusal here comes back as an arm however the check answered.
  const at = new Date();
  const wrote = await c.graph.assert([
    {
      entity: ENTITY,
      relation: 'ran',
      value: at.toISOString(),
      at,
      source: 'examples/six',
      evidence: 'js-sdk',
      confidence: 1,
    },
    {
      entity: ENTITY,
      relation: 'reads',
      value: hits?.items[0]?.id ?? 'nothing',
      names: true,
      at,
      source: 'examples/six',
      confidence: 0.5,
    },
  ]);
  const recorded = read(wrote, 'graph.assert');
  if (recorded) {
    console.log(`graph ${wrote.request}: ${recorded.recorded} recorded, ${recorded.duplicate} duplicate, ${recorded.refused} refused`);
    for (const why of recorded.reasons) console.log(`  refused: ${why}`);
  }

  const settled = await c.graph.resolve(ENTITY, 'ran');
  console.log(
    settled.known
      ? `graph: ${ENTITY} ran ${settled.winner?.value} (${settled.conflicts.length} other claims${settled.contested ? ', contested' : ''})`
      : `graph: nothing is asserted about ${ENTITY} yet`,
  );

  // audit — the trail of what just happened. `request` is the same word Answer
  // carries, and the join between a call and its row.
  let rows = 0;
  for await (const event of c.audit.all({ request: wrote.request, size: 100 })) {
    console.log(`audit: ${event.actor} ${event.action} ${event.result} ${event.status}`);
    if (++rows === 5) break;
  }
  if (rows === 0) console.log(`audit: no row yet for ${wrote.request}`);
}

/**
 * Read an answer, or say why there is nothing to read.
 *
 * Every arm is named. The `never` in the default branch is what makes a
 * forgotten arm a compile error rather than a silent fall-through: add a fourth
 * status to Answer and this stops building.
 */
function read<T>(a: answer.Answer<T>, what: string): T | undefined {
  switch (a.status) {
    case 'ok':
      return a.value;
    case 'denied':
      console.log(`${what} denied: ${a.code} — ${a.reason}`);
      for (const cure of a.cures) console.log(`  ${cure.kind}: ${cure.url}`);
      return undefined;
    case 'held':
      console.log(`${what} held on ${a.clause}: approval ${a.id}`);
      return undefined;
    default: {
      const unreached: never = a;
      return unreached;
    }
  }
}

main().catch((err: unknown) => {
  // A Fault says which call, which status and which request id; anything else
  // is this program's own bug.
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
