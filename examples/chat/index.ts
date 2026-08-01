// chat — one completion.
//
// POST /v1/chat/completions (operationId ai_createChatCompletion). The route is
// OpenAI-compatible, so the request and response shapes are the ones you already
// know; only the base URL and the key change.
//
// `stream` is left false on purpose. Streaming is a different transport (SSE)
// that the generated axios client returns as an opaque body, so a streaming
// example here would teach the wrong thing.
import { OpenAICompatibleApi, AiChatMessageRoleEnum } from 'hanzoai';
import { config, fail } from '../client';

// `zen5` is the current flagship of the Zen family, and it is what the gateway
// actually serves: `zen4` answered 403 "zen4 is in limited preview" on
// /v1/chat/completions and 400 "not in this gateway's catalog" on /v1/agents,
// so every run of this example failed. An example's model default has to be a
// model the reader's key can call on the first try. `HANZO_MODEL` overrides it
// (zen5-mini, zen5-coder, enso, …).
const model = process.env.HANZO_MODEL ?? 'zen5';

async function main() {
  const ai = new OpenAICompatibleApi(config());
  const { data } = await ai.aiCreateChatCompletion({
    aiChatCompletionRequest: {
      model,
      messages: [{ role: AiChatMessageRoleEnum.User, content: 'Say hello in exactly five words.' }],
    },
  });

  // `choices[0].message.content` is reachable without a cast only because the
  // spec models a ChatChoice. It used to be `items: {type: object}`, which every
  // generator turns into its untyped bag — on the most-called route in the API.
  const reply = data.choices?.[0]?.message?.content;
  console.log(reply ?? '(no choices returned)');

  if (data.usage) {
    console.log(`tokens: ${data.usage.prompt_tokens} in / ${data.usage.completion_tokens} out`);
  }
}

main().catch(fail);
