// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'assistants',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_assistants',
  description:
    'Delete assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant',
  inputSchema: {
    type: 'object',
    properties: {
      assistant_id: {
        type: 'string',
        title: 'Assistant Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { assistant_id } = args;
  return client.assistants.delete(assistant_id);
};

export default { metadata, tool, handler };
