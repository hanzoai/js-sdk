// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'threads',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_threads',
  description:
    'Retrieves a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/getThread',
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
  return client.threads.retrieve(thread_id);
};

export default { metadata, tool, handler };
