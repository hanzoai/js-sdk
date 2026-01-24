// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource deployments', () => {
  // Prism tests are disabled
  test.skip('complete', async () => {
    const responsePromise = client.openai.deployments.complete('model');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('embed: only required params', async () => {
    const responsePromise = client.openai.deployments.embed('model', { body_model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('embed: required and optional params', async () => {
    const response = await client.openai.deployments.embed('model', {
      body_model: 'model',
      api_base: 'api_base',
      api_key: 'api_key',
      api_type: 'api_type',
      api_version: 'api_version',
      caching: true,
      custom_llm_provider: 'string',
      input: ['string'],
      litellm_call_id: 'litellm_call_id',
      litellm_logging_obj: { foo: 'bar' },
      logger_fn: 'logger_fn',
      timeout: 0,
      user: 'user',
    });
  });
});
