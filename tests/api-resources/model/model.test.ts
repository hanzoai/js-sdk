// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource model', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.model.create({
      llm_params: { model: 'model' },
      model_info: { id: 'id' },
      model_name: 'model_name',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.model.create({
      llm_params: {
        model: 'model',
        api_base: 'api_base',
        api_key: 'api_key',
        api_version: 'api_version',
        aws_access_key_id: 'aws_access_key_id',
        aws_region_name: 'aws_region_name',
        aws_secret_access_key: 'aws_secret_access_key',
        budget_duration: 'budget_duration',
        configurable_clientside_auth_params: ['string'],
        custom_llm_provider: 'custom_llm_provider',
        input_cost_per_second: 0,
        input_cost_per_token: 0,
        llm_trace_id: 'llm_trace_id',
        max_budget: 0,
        max_file_size_mb: 0,
        max_retries: 0,
        merge_reasoning_content_in_choices: true,
        model_info: {},
        organization: 'organization',
        output_cost_per_second: 0,
        output_cost_per_token: 0,
        region_name: 'region_name',
        rpm: 0,
        stream_timeout: 0,
        timeout: 0,
        tpm: 0,
        use_in_pass_through: true,
        vertex_credentials: {},
        vertex_location: 'vertex_location',
        vertex_project: 'vertex_project',
        watsonx_region_name: 'watsonx_region_name',
      },
      model_info: {
        id: 'id',
        base_model: 'base_model',
        created_at: '2019-12-27T18:11:19.117Z',
        created_by: 'created_by',
        db_model: true,
        team_id: 'team_id',
        team_public_model_name: 'team_public_model_name',
        tier: 'free',
        updated_at: '2019-12-27T18:11:19.117Z',
        updated_by: 'updated_by',
      },
      model_name: 'model_name',
    });
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.model.delete({ id: 'id' });
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
    const response = await client.model.delete({ id: 'id' });
  });
});
