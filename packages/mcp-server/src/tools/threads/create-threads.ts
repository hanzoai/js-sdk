// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'threads',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_threads',
  description:
    'Create a thread.\n\nAPI Reference - https://platform.openai.com/docs/api-reference/threads/createThread',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.threads.create();
};

export default { metadata, tool, handler };
