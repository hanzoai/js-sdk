// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource spend', () => {
  // Prism tests are disabled
  test.skip('calculateSpend', async () => {
    const responsePromise = client.spend.calculateSpend({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listLogs', async () => {
    const responsePromise = client.spend.listLogs();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listLogs: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.spend.listLogs(
        {
          api_key: 'api_key',
          end_date: 'end_date',
          request_id: 'request_id',
          start_date: 'start_date',
          user_id: 'user_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('listTags', async () => {
    const responsePromise = client.spend.listTags();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listTags: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.spend.listTags(
        { end_date: 'end_date', start_date: 'start_date' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });
});
