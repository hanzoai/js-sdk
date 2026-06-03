// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customer', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.customer.create({ user_id: 'user_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.customer.create({
      user_id: 'user_id',
      alias: 'alias',
      allowed_model_region: 'eu',
      blocked: true,
      budget_duration: 'budget_duration',
      budget_id: 'budget_id',
      default_model: 'default_model',
      max_budget: 0,
      max_parallel_requests: 0,
      model_max_budget: {
        foo: {
          budget_duration: 'budget_duration',
          max_budget: 0,
          rpm_limit: 0,
          tpm_limit: 0,
        },
      },
      rpm_limit: 0,
      soft_budget: 0,
      tpm_limit: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.customer.update({ user_id: 'user_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.customer.update({
      user_id: 'user_id',
      alias: 'alias',
      allowed_model_region: 'eu',
      blocked: true,
      budget_id: 'budget_id',
      default_model: 'default_model',
      max_budget: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.customer.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.customer.delete({ user_ids: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.customer.delete({ user_ids: ['string'] });
  });

  // Mock server tests are disabled
  test.skip('block: only required params', async () => {
    const responsePromise = client.customer.block({ user_ids: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('block: required and optional params', async () => {
    const response = await client.customer.block({ user_ids: ['string'] });
  });

  // Mock server tests are disabled
  test.skip('retrieveInfo: only required params', async () => {
    const responsePromise = client.customer.retrieveInfo({ end_user_id: 'end_user_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveInfo: required and optional params', async () => {
    const response = await client.customer.retrieveInfo({ end_user_id: 'end_user_id' });
  });

  // Mock server tests are disabled
  test.skip('unblock: only required params', async () => {
    const responsePromise = client.customer.unblock({ user_ids: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('unblock: required and optional params', async () => {
    const response = await client.customer.unblock({ user_ids: ['string'] });
  });
});
