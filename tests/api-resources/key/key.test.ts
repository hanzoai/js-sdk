// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource key', () => {
  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.key.update({ key: 'key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.key.update({
      key: 'key',
      aliases: {},
      allowed_cache_controls: [{}],
      blocked: true,
      budget_duration: 'budget_duration',
      budget_id: 'budget_id',
      config: {},
      duration: 'duration',
      enforced_params: ['string'],
      guardrails: ['string'],
      key_alias: 'key_alias',
      max_budget: 0,
      max_parallel_requests: 0,
      metadata: {},
      model_max_budget: {},
      model_rpm_limit: {},
      model_tpm_limit: {},
      models: [{}],
      permissions: {},
      rpm_limit: 0,
      spend: 0,
      tags: ['string'],
      team_id: 'team_id',
      temp_budget_expiry: '2019-12-27T18:11:19.117Z',
      temp_budget_increase: 0,
      tpm_limit: 0,
      user_id: 'user_id',
      'llm-changed-by': 'llm-changed-by',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.key.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.key.list(
        {
          include_team_keys: true,
          key_alias: 'key_alias',
          organization_id: 'organization_id',
          page: 1,
          return_full_object: true,
          size: 1,
          team_id: 'team_id',
          user_id: 'user_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.key.delete({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('block: only required params', async () => {
    const responsePromise = client.key.block({ key: 'key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('block: required and optional params', async () => {
    const response = await client.key.block({ key: 'key', 'llm-changed-by': 'llm-changed-by' });
  });

  // Prism tests are disabled
  test.skip('checkHealth', async () => {
    const responsePromise = client.key.checkHealth();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('generate', async () => {
    const responsePromise = client.key.generate({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('regenerateByKey', async () => {
    const responsePromise = client.key.regenerateByKey('key');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('regenerateByKey: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.key.regenerateByKey(
        'key',
        {
          aliases: {},
          allowed_cache_controls: [{}],
          blocked: true,
          budget_duration: 'budget_duration',
          budget_id: 'budget_id',
          config: {},
          duration: 'duration',
          enforced_params: ['string'],
          guardrails: ['string'],
          body_key: 'key',
          key_alias: 'key_alias',
          max_budget: 0,
          max_parallel_requests: 0,
          metadata: {},
          model_max_budget: {},
          model_rpm_limit: {},
          model_tpm_limit: {},
          models: [{}],
          new_master_key: 'new_master_key',
          permissions: {},
          rpm_limit: 0,
          send_invite_email: true,
          soft_budget: 0,
          spend: 0,
          tags: ['string'],
          team_id: 'team_id',
          tpm_limit: 0,
          user_id: 'user_id',
          'llm-changed-by': 'llm-changed-by',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('retrieveInfo', async () => {
    const responsePromise = client.key.retrieveInfo();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveInfo: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.key.retrieveInfo({ key: 'key' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('unblock: only required params', async () => {
    const responsePromise = client.key.unblock({ key: 'key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('unblock: required and optional params', async () => {
    const response = await client.key.unblock({ key: 'key', 'llm-changed-by': 'llm-changed-by' });
  });
});
