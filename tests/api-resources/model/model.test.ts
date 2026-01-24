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
      litellm_params: { model: 'model' },
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
      litellm_params: {
        model: 'model',
        api_base: 'api_base',
        api_key: 'api_key',
        api_version: 'api_version',
        auto_router_config: 'auto_router_config',
        auto_router_config_path: 'auto_router_config_path',
        auto_router_default_model: 'auto_router_default_model',
        auto_router_embedding_model: 'auto_router_embedding_model',
        aws_access_key_id: 'aws_access_key_id',
        aws_bedrock_runtime_endpoint: 'aws_bedrock_runtime_endpoint',
        aws_region_name: 'aws_region_name',
        aws_secret_access_key: 'aws_secret_access_key',
        budget_duration: 'budget_duration',
        cache_creation_input_audio_token_cost: 0,
        cache_creation_input_token_cost: 0,
        cache_creation_input_token_cost_above_1hr: 0,
        cache_creation_input_token_cost_above_200k_tokens: 0,
        cache_read_input_audio_token_cost: 0,
        cache_read_input_token_cost: 0,
        cache_read_input_token_cost_above_200k_tokens: 0,
        cache_read_input_token_cost_flex: 0,
        cache_read_input_token_cost_priority: 0,
        citation_cost_per_token: 0,
        configurable_clientside_auth_params: ['string'],
        custom_llm_provider: 'custom_llm_provider',
        gcs_bucket_name: 'gcs_bucket_name',
        input_cost_per_audio_per_second: 0,
        input_cost_per_audio_per_second_above_128k_tokens: 0,
        input_cost_per_audio_token: 0,
        input_cost_per_character: 0,
        input_cost_per_character_above_128k_tokens: 0,
        input_cost_per_image: 0,
        input_cost_per_image_above_128k_tokens: 0,
        input_cost_per_pixel: 0,
        input_cost_per_query: 0,
        input_cost_per_second: 0,
        input_cost_per_token: 0,
        input_cost_per_token_above_128k_tokens: 0,
        input_cost_per_token_above_200k_tokens: 0,
        input_cost_per_token_batches: 0,
        input_cost_per_token_cache_hit: 0,
        input_cost_per_token_flex: 0,
        input_cost_per_token_priority: 0,
        input_cost_per_video_per_second: 0,
        input_cost_per_video_per_second_above_128k_tokens: 0,
        input_cost_per_video_per_second_above_15s_interval: 0,
        input_cost_per_video_per_second_above_8s_interval: 0,
        litellm_credential_name: 'litellm_credential_name',
        litellm_trace_id: 'litellm_trace_id',
        max_budget: 0,
        max_file_size_mb: 0,
        max_retries: 0,
        merge_reasoning_content_in_choices: true,
        milvus_text_field: 'milvus_text_field',
        mock_response: 'string',
        model_info: { foo: 'bar' },
        organization: 'organization',
        output_cost_per_audio_per_second: 0,
        output_cost_per_audio_token: 0,
        output_cost_per_character: 0,
        output_cost_per_character_above_128k_tokens: 0,
        output_cost_per_image: 0,
        output_cost_per_image_token: 0,
        output_cost_per_pixel: 0,
        output_cost_per_reasoning_token: 0,
        output_cost_per_second: 0,
        output_cost_per_token: 0,
        output_cost_per_token_above_128k_tokens: 0,
        output_cost_per_token_above_200k_tokens: 0,
        output_cost_per_token_batches: 0,
        output_cost_per_token_flex: 0,
        output_cost_per_token_priority: 0,
        output_cost_per_video_per_second: 0,
        region_name: 'region_name',
        rpm: 0,
        s3_bucket_name: 's3_bucket_name',
        s3_encryption_key_id: 's3_encryption_key_id',
        search_context_cost_per_query: { foo: 'bar' },
        stream_timeout: 0,
        tiered_pricing: [{ foo: 'bar' }],
        timeout: 0,
        tpm: 0,
        use_in_pass_through: true,
        use_litellm_proxy: true,
        vector_store_id: 'vector_store_id',
        vertex_credentials: 'string',
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
