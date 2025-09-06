// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'threads',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/threads',
  operationId: 'create_threads_v1_threads_post',
};

export const tool: Tool = {
  name: 'create_threads',
  description:
    'Create a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/createThread',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.threads.create()) as object);
};

export default { metadata, tool, handler };
