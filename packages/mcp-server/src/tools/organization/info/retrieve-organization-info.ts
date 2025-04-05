// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization.info',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_organization_info',
  description: 'Get the org specific information',
  inputSchema: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.organization.info.retrieve(body);
};

export default { metadata, tool, handler };
