// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'assemblyai',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_assemblyai',
  description: 'Assemblyai Proxy Route',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint: {
        type: 'string',
        title: 'Endpoint',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { endpoint } = args;
  return client.assemblyai.retrieve(endpoint);
};

export default { metadata, tool, handler };
