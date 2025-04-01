// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

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

export const handler = (client: Hanzo, args: any) => {
  const { thread_id } = args;
  return client.threads.messages.list(thread_id);
};

export default { tool, handler };
