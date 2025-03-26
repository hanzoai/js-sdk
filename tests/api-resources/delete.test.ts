// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'Hanzo-AI';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource delete', () => {
  // skipped: tests are disabled for the time being
  test.skip('createAllowedIP: only required params', async () => {
    const responsePromise = client.delete.createAllowedIP({ ip: 'ip' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('createAllowedIP: required and optional params', async () => {
    const response = await client.delete.createAllowedIP({ ip: 'ip' });
  });
});
