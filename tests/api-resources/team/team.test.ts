// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource team', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.team.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.team.update({ team_id: 'team_id' });
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
    const response = await client.team.update({
      team_id: 'team_id',
      blocked: true,
      budget_duration: 'budget_duration',
      guardrails: ['string'],
      max_budget: 0,
      metadata: {},
      model_aliases: {},
      models: [{}],
      organization_id: 'organization_id',
      rpm_limit: 0,
      tags: [{}],
      team_alias: 'team_alias',
      tpm_limit: 0,
      'llm-changed-by': 'llm-changed-by',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.team.list();
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
      client.team.list(
        { organization_id: 'organization_id', user_id: 'user_id' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.team.delete({ team_ids: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.team.delete({ team_ids: ['string'], 'llm-changed-by': 'llm-changed-by' });
  });

  // Prism tests are disabled
  test.skip('addMember: only required params', async () => {
    const responsePromise = client.team.addMember({ member: [{ role: 'admin' }], team_id: 'team_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('addMember: required and optional params', async () => {
    const response = await client.team.addMember({
      member: [
        {
          role: 'admin',
          user_email: 'user_email',
          user_id: 'user_id',
        },
      ],
      team_id: 'team_id',
      max_budget_in_team: 0,
    });
  });

  // Prism tests are disabled
  test.skip('block: only required params', async () => {
    const responsePromise = client.team.block({ team_id: 'team_id' });
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
    const response = await client.team.block({ team_id: 'team_id' });
  });

  // Prism tests are disabled
  test.skip('disableLogging', async () => {
    const responsePromise = client.team.disableLogging('team_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listAvailable', async () => {
    const responsePromise = client.team.listAvailable();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listAvailable: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.team.listAvailable({ response_model: {} }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('removeMember: only required params', async () => {
    const responsePromise = client.team.removeMember({ team_id: 'team_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('removeMember: required and optional params', async () => {
    const response = await client.team.removeMember({
      team_id: 'team_id',
      user_email: 'user_email',
      user_id: 'user_id',
    });
  });

  // Prism tests are disabled
  test.skip('retrieveInfo', async () => {
    const responsePromise = client.team.retrieveInfo();
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
      client.team.retrieveInfo({ team_id: 'team_id' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('unblock: only required params', async () => {
    const responsePromise = client.team.unblock({ team_id: 'team_id' });
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
    const response = await client.team.unblock({ team_id: 'team_id' });
  });

  // Prism tests are disabled
  test.skip('updateMember: only required params', async () => {
    const responsePromise = client.team.updateMember({ team_id: 'team_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('updateMember: required and optional params', async () => {
    const response = await client.team.updateMember({
      team_id: 'team_id',
      max_budget_in_team: 0,
      role: 'admin',
      user_email: 'user_email',
      user_id: 'user_id',
    });
  });
});
