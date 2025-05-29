// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'cache',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/cache/ping',
  operationId: 'cache_ping_cache_ping_get',
};

export const tool: Tool = {
  name: 'ping_cache',
  description: 'Endpoint for checking if cache can be pinged',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.cache.ping();
};

export default { metadata, tool, handler };
