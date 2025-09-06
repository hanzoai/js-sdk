// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'threads.runs',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/threads/{thread_id}/runs',
  operationId: 'run_thread_v1_threads__thread_id__runs_post',
};

export const tool: Tool = {
  name: 'create_threads_runs',
  description:
    'Create a run.\n\nAPI Reference: https://platform.openai.com/docs/api-reference/runs/createRun',
  inputSchema: {
    type: 'object',
    properties: {
      thread_id: {
        type: 'string',
        title: 'Thread Id',
      },
    },
    required: ['thread_id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { thread_id, ...body } = args as any;
  return asTextContentResult((await client.threads.runs.create(thread_id)) as object);
};

export default { metadata, tool, handler };
