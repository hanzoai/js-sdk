// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

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
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { thread_id } = args;
  return client.threads.messages.create(thread_id);
};

export default { tool, handler };
