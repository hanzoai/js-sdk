// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'assistants',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/assistants',
  operationId: 'create_assistant_v1_assistants_post',
};

export const tool: Tool = {
  name: 'create_assistants',
  description:
    'Create assistant\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/createAssistant',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.assistants.create();
};

export default { metadata, tool, handler };
