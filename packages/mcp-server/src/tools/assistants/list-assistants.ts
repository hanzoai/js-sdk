// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'assistants',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/assistants',
  operationId: 'get_assistants_v1_assistants_get',
};

export const tool: Tool = {
  name: 'list_assistants',
  description:
    'Returns a list of assistants.\n\nAPI Reference docs - https://platform.openai.com/docs/api-reference/assistants/listAssistants',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.assistants.list()) as object);
};

export default { metadata, tool, handler };
