// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'config.pass_through_endpoint',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'update_config_pass_through_endpoint',
  description: 'Update a pass-through endpoint',
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { endpoint_id } = args;
  return client.config.passThroughEndpoint.update(endpoint_id);
};

export default { metadata, tool, handler };
