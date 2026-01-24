// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource chat', () => {
  // Prism tests are disabled
  test.skip('complete: only required params', async () => {
    const responsePromise = client.engines.chat.complete('model', {
      messages: [{ content: 'Hello, how are you?', role: 'user' }],
      body_model: 'model',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('complete: required and optional params', async () => {
    const response = await client.engines.chat.complete('model', {
      messages: [
        {
          content: 'Hello, how are you?',
          role: 'user',
          cache_control: { type: 'ephemeral' },
        },
      ],
      body_model: 'model',
      caching: true,
      context_window_fallback_dict: { foo: 'string' },
      fallbacks: ['string'],
      frequency_penalty: 0,
      function_call: 'string',
      functions: [{ foo: 'bar' }],
      guardrails: ['string'],
      logit_bias: { foo: 0 },
      logprobs: true,
      max_tokens: 0,
      metadata: { foo: 'bar' },
      n: 0,
      num_retries: 0,
      parallel_tool_calls: true,
      presence_penalty: 0,
      response_format: { foo: 'bar' },
      seed: 0,
      service_tier: 'service_tier',
      stop: 'string',
      stream: true,
      stream_options: { foo: 'bar' },
      temperature: 0,
      tool_choice: 'string',
      tools: [{ foo: 'bar' }],
      top_logprobs: 0,
      top_p: 0,
      user: 'user',
    });
  });
});
