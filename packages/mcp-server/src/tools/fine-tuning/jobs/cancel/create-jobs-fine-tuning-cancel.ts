// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'fine_tuning.jobs.cancel',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel',
  operationId: 'cancel_fine_tuning_job_v1_fine_tuning_jobs__fine_tuning_job_id__cancel_post',
};

export const tool: Tool = {
  name: 'create_jobs_fine_tuning_cancel',
  description:
    'Cancel a fine-tuning job.\n\nThis is the equivalent of POST https://api.openai.com/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel\n\nSupported Query Params:\n- `custom_llm_provider`: Name of the LLM provider\n- `fine_tuning_job_id`: The ID of the fine-tuning job to cancel.',
  inputSchema: {
    type: 'object',
    properties: {
      fine_tuning_job_id: {
        type: 'string',
        title: 'Fine Tuning Job Id',
      },
    },
    required: ['fine_tuning_job_id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { fine_tuning_job_id, ...body } = args as any;
  return asTextContentResult((await client.fineTuning.jobs.cancel.create(fine_tuning_job_id)) as object);
};

export default { metadata, tool, handler };
