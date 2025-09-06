// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'fine_tuning.jobs',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/fine_tuning/jobs',
  operationId: 'list_fine_tuning_jobs_v1_fine_tuning_jobs_get',
};

export const tool: Tool = {
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
    required: ['custom_llm_provider'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.fineTuning.jobs.list(body)) as object);
};

export default { metadata, tool, handler };
