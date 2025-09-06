// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'threads.messages',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/threads/{thread_id}/messages',
  operationId: 'add_messages_v1_threads__thread_id__messages_post',
};

export const tool: Tool = {
  name: 'create_threads_messages',
  description:
    'Create a message.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/messages/createMessage',
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
  return asTextContentResult((await client.threads.messages.create(thread_id)) as object);
};

export default { metadata, tool, handler };
