// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'fine_tuning.jobs',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
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
};

export const handler = (client: Hanzo, args: any) => {
  const { fine_tuning_job_id, ...body } = args;
  return client.fineTuning.jobs.retrieve(fine_tuning_job_id, body);
};

export default { metadata, tool, handler };
