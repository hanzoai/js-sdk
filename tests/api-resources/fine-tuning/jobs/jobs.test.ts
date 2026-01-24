// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Hanzo from 'hanzoai';

const client = new Hanzo({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource jobs', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.fineTuning.jobs.create({ model: 'model', training_file: 'training_file' });
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
    const response = await client.fineTuning.jobs.create({
      model: 'model',
      training_file: 'training_file',
      custom_llm_provider: 'openai',
      hyperparameters: {
        batch_size: 'string',
        learning_rate_multiplier: 'string',
        n_epochs: 'string',
      },
      integrations: ['string'],
      seed: 0,
      suffix: 'suffix',
      validation_file: 'validation_file',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.fineTuning.jobs.retrieve('fine_tuning_job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.fineTuning.jobs.retrieve(
        'fine_tuning_job_id',
        { custom_llm_provider: 'openai' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.fineTuning.jobs.list();
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
      client.fineTuning.jobs.list(
        {
          after: 'after',
          custom_llm_provider: 'openai',
          limit: 0,
          target_model_names: 'target_model_names',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Hanzo.NotFoundError);
  });
});
