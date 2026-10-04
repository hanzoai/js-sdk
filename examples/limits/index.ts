// limits — where the plan stands, who paid for an answer, and what to do when it
// says no.
//
//   GET  /v1/ai/limits         aiLimits      shares and states, never a figure
//   GET  /v1/models            getModels     every row carries class and family
//   POST /v1/chat/completions  the X-Hanzo-* headers say who paid (readUsage)
//   POST /v1/decisions         postDecisions a refusal is a typed error
//   GET  /v1/sync              getSync       the repositories linked to this org
//
// All five are generated; what is hand-written is `readUsage` and the refusal
// classes, which every call made with the package's Configuration throws.
//
//   export HANZO_API_KEY=$(hanzo auth token)
//   npm run build && npx tsx examples/limits/index.ts
//
// It reads and asks; it changes nothing. "Continue with credits" is
// `aiSetLimits({ aiLimitsSet: { creditsAfterAllowance: true } })` and "sync now"
// is `postSyncByIdRun({ id })` — both a person's choice, so printed, not taken.
import {
  AiApi,
  SyncApi,
  FreePlanCapError,
  ModelCapError,
  UsageCapExceededError,
  UsageLimitError,
  readUsage,
} from 'hanzoai';
import { config, fail } from '../client';

/** A premium model: named, so the plan, credits or nothing pays for it. */
const premium = process.env.HANZO_MODEL ?? 'anthropic/claude-sonnet-4.5';

/** What a refusal offers, in the order to offer it. */
function offer(err: UsageLimitError): void {
  console.log(`  refused ${err.status} ${err.code} (${err.name}): ${err.message}`);
  if (err instanceof ModelCapError) console.log(`  ${err.fallback ?? 'another model'} answers instead`);
  if (err instanceof FreePlanCapError || err instanceof UsageCapExceededError) {
    console.log(`  lifts at ${err.resetsAt?.toISOString() ?? 'an unstated time'}`);
  }
  for (const a of err.actions) console.log(`  → ${a.label ?? a.kind}: ${a.url ?? a.model ?? ''}`);
}

async function main() {
  const ai = new AiApi(config());

  const { data: limits } = await ai.aiLimits();
  console.log(`plan ${limits.plan} · ${limits.state} · credits after allowance ${limits.credits_after_allowance}`);
  for (const [name, c] of Object.entries(limits.classes ?? {})) {
    console.log(`  ${name}: ${c.percent}% used, ${c.state}, paid by ${c.paying}`);
  }
  for (const a of limits.actions ?? []) console.log(`  → ${a.label}: ${a.url}`);

  const { data: catalog } = await ai.getModels();
  const rows = catalog.data ?? [];
  const of = (k: string) => rows.filter((m) => m.class === k);
  console.log(`models: ${of('premium').length} premium · ${of('ours').length} ours · ${of('free').length} free`);
  console.log(`  ours: ${of('ours').map((m) => `${m.id} (${m.family ?? '-'})`).join(', ')}`);
  console.log(`  priced by the answer: ${rows.filter((m) => m.pricing?.variable).map((m) => m.id).join(', ')}`);

  const chat = await ai.postChatCompletions({
    openaiChatCompletionRequest: {
      model: premium,
      max_tokens: 16,
      messages: [{ role: 'user', content: 'Say hello in exactly three words.' }],
    },
  });
  const u = readUsage(chat.headers);
  console.log(`${premium}: usage ${u.usage} · class ${u.usageClass} · paid by ${u.paidBy} · served ${u.served}`);

  try {
    const { data } = await ai.postDecisions({
      aiDecisionsRequest: {
        model: 'kai',
        state: 'A customer writes: the order arrived broken, I want my money back.',
        questions: {
          route: { type: 'choice', criteria: { refund: 'asks for money back', other: 'anything else' } },
        },
      },
    });
    console.log(`kai: route → ${data.answers['route']?.choice} (${data.usage.input_tokens} input tokens)`);
  } catch (err) {
    if (!(err instanceof UsageLimitError)) throw err;
    console.log('kai:');
    offer(err);
  }

  const { data: links } = await new SyncApi(config()).getSync();
  const repos = links.data ?? [];
  console.log(`${repos.length} repository links`);
  for (const s of repos.slice(0, 3)) {
    console.log(`  ${s.source?.locator} → ${s.native?.url ?? s.target?.locator} (${s.native?.status ?? s.direction})`);
  }
}

main().catch(fail);
