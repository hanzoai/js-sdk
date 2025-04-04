// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'credentials',
  operation: 'write',
  tags: [],
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
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { credential_name } = args;
  return client.credentials.delete(credential_name);
};

export default { metadata, tool, handler };
