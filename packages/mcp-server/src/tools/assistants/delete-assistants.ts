// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'assistants',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/assistants/{assistant_id}',
  operationId: 'delete_assistant_v1_assistants__assistant_id__delete',
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
    required: ['assistant_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { assistant_id, ...body } = args as any;
  return asTextContentResult((await client.assistants.delete(assistant_id)) as object);
};

export default { metadata, tool, handler };
