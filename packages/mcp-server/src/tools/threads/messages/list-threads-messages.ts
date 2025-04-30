// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'threads.messages',
  operation: 'read',
  tags: [],
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
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { thread_id, ...body } = args as any;
  return client.threads.messages.list(thread_id);
};

export default { metadata, tool, handler };
