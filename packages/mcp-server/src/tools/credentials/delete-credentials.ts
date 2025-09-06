// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'credentials',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/credentials/{credential_name}',
  operationId: 'delete_credential_credentials__credential_name__delete',
};

export const tool: Tool = {
  name: 'delete_credentials',
  description: '[BETA] endpoint. This might change unexpectedly.',
  inputSchema: {
    type: 'object',
    properties: {
      credential_name: {
        type: 'string',
        title: 'Credential Name',
      },
    },
    required: ['credential_name'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { credential_name, ...body } = args as any;
  return asTextContentResult((await client.credentials.delete(credential_name)) as object);
};

export default { metadata, tool, handler };
