// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'threads.runs',
  operation: 'write',
  tags: [],
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
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { thread_id, ...body } = args as any;
  return client.threads.runs.create(thread_id);
};

export default { metadata, tool, handler };
