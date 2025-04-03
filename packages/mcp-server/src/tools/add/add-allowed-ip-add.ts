// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'add',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'add_allowed_ip_add',
  description: 'Add Allowed Ip',
  inputSchema: {
    type: 'object',
    properties: {
      ip: {
        type: 'string',
        title: 'Ip',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.add.addAllowedIP(body);
};

export default { metadata, tool, handler };
