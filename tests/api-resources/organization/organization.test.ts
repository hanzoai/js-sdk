// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'Hanzo-AI';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource organization', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.organization.create({ organization_alias: 'organization_alias' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('create: required and optional params', async () => {
    const response = await client.organization.create({
      organization_alias: 'organization_alias',
      budget_duration: 'budget_duration',
      budget_id: 'budget_id',
      max_budget: 0,
      max_parallel_requests: 0,
      metadata: {},
      model_max_budget: {},
      models: [{}],
      organization_id: 'organization_id',
      rpm_limit: 0,
      soft_budget: 0,
      tpm_limit: 0,
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('update', async () => {
    const responsePromise = client.organization.update({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.organization.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete: only required params', async () => {
    const responsePromise = client.organization.delete({ organization_ids: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete: required and optional params', async () => {
    const response = await client.organization.delete({ organization_ids: ['string'] });
  });

  // skipped: tests are disabled for the time being
  test.skip('addMember: only required params', async () => {
    const responsePromise = client.organization.addMember({
      member: [{ role: 'org_admin' }],
      organization_id: 'organization_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('addMember: required and optional params', async () => {
    const response = await client.organization.addMember({
      member: [{ role: 'org_admin', user_email: 'user_email', user_id: 'user_id' }],
      organization_id: 'organization_id',
      max_budget_in_organization: 0,
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteMember: only required params', async () => {
    const responsePromise = client.organization.deleteMember({ organization_id: 'organization_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteMember: required and optional params', async () => {
    const response = await client.organization.deleteMember({
      organization_id: 'organization_id',
      user_email: 'user_email',
      user_id: 'user_id',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('updateMember: only required params', async () => {
    const responsePromise = client.organization.updateMember({ organization_id: 'organization_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('updateMember: required and optional params', async () => {
    const response = await client.organization.updateMember({
      organization_id: 'organization_id',
      max_budget_in_organization: 0,
      role: 'proxy_admin',
      user_email: 'user_email',
      user_id: 'user_id',
    });
  });
});
