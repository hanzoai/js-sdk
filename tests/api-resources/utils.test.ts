// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzo.ai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource utils', () => {
  // skipped: tests are disabled for the time being
  test.skip('getSupportedOpenAIParams: only required params', async () => {
    const responsePromise = client.utils.getSupportedOpenAIParams({ model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('getSupportedOpenAIParams: required and optional params', async () => {
    const response = await client.utils.getSupportedOpenAIParams({ model: 'model' });
  });

  // skipped: tests are disabled for the time being
  test.skip('tokenCounter: only required params', async () => {
    const responsePromise = client.utils.tokenCounter({ model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('tokenCounter: required and optional params', async () => {
    const response = await client.utils.tokenCounter({ model: 'model', messages: [{}], prompt: 'prompt' });
  });

  // skipped: tests are disabled for the time being
  test.skip('transformRequest: only required params', async () => {
    const responsePromise = client.utils.transformRequest({ call_type: 'embedding', request_body: {} });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('transformRequest: required and optional params', async () => {
    const response = await client.utils.transformRequest({ call_type: 'embedding', request_body: {} });
  });
});
