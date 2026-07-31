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

// `zen4` is the flagship the spec documents as its own example value.
const model = process.env.HANZO_MODEL ?? 'zen4';

async function main() {
  const ai = new OpenAICompatibleApi(config());
  const { data } = await ai.aiCreateChatCompletion({
    aiChatCompletionRequest: {
      model,
      messages: [{ role: AiChatMessageRoleEnum.User, content: 'Say hello in exactly five words.' }],
    },
  });

  const reply = data.choices?.[0]?.message?.content;
  console.log(reply ?? '(no choices returned)');

  if (data.usage) {
    console.log(`tokens: ${data.usage.prompt_tokens} in / ${data.usage.completion_tokens} out`);
  }
}

main().catch(fail);
