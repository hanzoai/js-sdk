// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
      },
      credential_name: {
        type: 'string',
        title: 'Credential Name',
      },
      credential_values: {
        type: 'object',
        title: 'Credential Values',
      },
      model_id: {
        type: 'string',
        title: 'Model Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.credentials.create(body);
};

export default { metadata, tool, handler };
