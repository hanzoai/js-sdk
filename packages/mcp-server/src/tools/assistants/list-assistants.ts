// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'assistants',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_assistants',
  description:
    'Returns a list of assistants.\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/listAssistants',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.assistants.list();
};

export default { metadata, tool, handler };
