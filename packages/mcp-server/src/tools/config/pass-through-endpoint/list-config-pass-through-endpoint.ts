// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'config.pass_through_endpoint',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/config/pass_through_endpoint',
  operationId: 'get_pass_through_endpoints_config_pass_through_endpoint_get',
};

export const tool: Tool = {
  name: 'list_config_pass_through_endpoint',
  description:
    'GET configured pass through endpoint.\n\nIf no endpoint_id given, return all configured endpoints.',
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

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.config.passThroughEndpoint.list(body);
};

export default { metadata, tool, handler };
