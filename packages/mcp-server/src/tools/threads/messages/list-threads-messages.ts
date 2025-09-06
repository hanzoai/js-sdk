// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'threads.messages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/threads/{thread_id}/messages',
  operationId: 'get_messages_v1_threads__thread_id__messages_get',
};

export const tool: Tool = {
  name: 'list_threads_messages',
  description:
    'Returns a list of messages for a given thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/listMessages',
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
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { thread_id, ...body } = args as any;
  return asTextContentResult((await client.threads.messages.list(thread_id)) as object);
};

export default { metadata, tool, handler };
