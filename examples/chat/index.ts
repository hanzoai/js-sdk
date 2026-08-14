// chat — one completion.
//
// POST /v1/chat/completions (post_chat_completions), the OpenAI-compatible
// route. The document states the route and not its shape, so the body rides on
// axios's `data` and the reply is read through a local type. When the schemas
// land both become generated and this file loses its casts.
//
// A model id is a string, so the wrong one type-checks perfectly and fails on
// the wire. `zen5` is served today; GET /v1/models is the only authority on the
// rest, which is what the quickstart in the README prints.
import { ChatApi } from 'hanzoai';
import { config, fail } from '../client';

const model = process.env.HANZO_MODEL ?? 'zen5';

type Completion = {
  model?: string;
  choices?: Array<{ message?: { role?: string; content?: string } }>;
  usage?: { total_tokens?: number };
};

async function main() {
  const chat = new ChatApi(config());

  const { data } = await chat.postChatCompletions({
    data: {
      model,
      messages: [{ role: 'user', content: 'Say hello in exactly five words.' }],
    },
  });

  const reply = data as unknown as Completion;
  console.log(reply.choices?.[0]?.message?.content ?? '(no content)');
  console.log(`  ${reply.model ?? model} · ${reply.usage?.total_tokens ?? '?'} tokens`);
}

main().catch(fail);
