// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_fine_tuning_jobs',
  description:
    'Creates a fine-tuning job which begins the process of creating a new model from a given dataset.\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs\n\nSupports Identical Params as: https://platform.openai.com/docs/api-reference/fine-tuning/create\n\nExample Curl:\n```\ncurl http://localhost:4000/v1/fine_tuning/jobs       -H "Content-Type: application/json"       -H "Authorization: Bearer sk-1234"       -d \'{\n    "model": "gpt-3.5-turbo",\n    "training_file": "file-abc123",\n    "hyperparameters": {\n      "n_epochs": 4\n    }\n  }\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      custom_llm_provider: {
        type: 'string',
        title: 'Custom Llm Provider',
        enum: ['openai', 'azure', 'vertex_ai'],
      },
      model: {
        type: 'string',
        title: 'Model',
      },
      training_file: {
        type: 'string',
        title: 'Training File',
      },
      hyperparameters: {
        type: 'object',
        title: 'Hyperparameters',
        properties: {
          batch_size: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'integer',
              },
            ],
            title: 'Batch Size',
          },
          learning_rate_multiplier: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'number',
              },
            ],
            title: 'Learning Rate Multiplier',
          },
          n_epochs: {
            anyOf: [
              {
                type: 'string',
              },
              {
                type: 'integer',
              },
            ],
            title: 'N Epochs',
          },
        },
        required: [],
      },
      integrations: {
        type: 'array',
        title: 'Integrations',
        items: {
          type: 'string',
        },
      },
      seed: {
        type: 'integer',
        title: 'Seed',
      },
      suffix: {
        type: 'string',
        title: 'Suffix',
      },
      validation_file: {
        type: 'string',
        title: 'Validation File',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.fineTuning.jobs.create(body);
  },
});

registerApiMethod({
  name: 'retrieve_fine_tuning_jobs',
  description:
    'Retrieves a fine-tuning job.\nThis is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to retrieve.',
  inputSchema: {
    type: 'object',
    properties: {
      fine_tuning_job_id: {
        type: 'string',
        title: 'Fine Tuning Job Id',
      },
      custom_llm_provider: {
        type: 'string',
        title: 'Custom Llm Provider',
        enum: ['openai', 'azure'],
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { fine_tuning_job_id, ...body } = args;
    return client.fineTuning.jobs.retrieve(fine_tuning_job_id, body);
  },
});

registerApiMethod({
  name: 'list_fine_tuning_jobs',
  description:
    'Lists fine-tuning jobs for the organization.\nThis is the equivalent of GET https://api.openai.com/v1/fine_tuning/jobs\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `after`: Identifier for the last job from the previous pagination request.\n- `limit`: Number of fine-tuning jobs to retrieve (default is 20).',
  inputSchema: {
    type: 'object',
    properties: {
      custom_llm_provider: {
        type: 'string',
        title: 'Custom Llm Provider',
        enum: ['openai', 'azure'],
      },
      after: {
        type: 'string',
        title: 'After',
      },
      limit: {
        type: 'integer',
        title: 'Limit',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.fineTuning.jobs.list(body);
  },
});
