// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'credentials',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/credentials',
  operationId: 'create_credential_credentials_post',
};

export const tool: Tool = {
  name: 'create_credentials',
  description:
    '[BETA] endpoint. This might change unexpectedly.\nStores credential in DB.\nReloads credentials in memory.',
  inputSchema: {
    type: 'object',
    properties: {
      credential_info: {
        type: 'object',
        title: 'Credential Info',
        additionalProperties: true,
      },
      credential_name: {
        type: 'string',
        title: 'Credential Name',
      },
      credential_values: {
        type: 'object',
        title: 'Credential Values',
        additionalProperties: true,
      },
      model_id: {
        type: 'string',
        title: 'Model Id',
      },
    },
    required: ['credential_info', 'credential_name'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.credentials.create(body)) as object);
};

export default { metadata, tool, handler };
