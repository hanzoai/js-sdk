// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'cache.redis',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_info_cache_redis',
  description: 'Endpoint for getting /redis/info',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.cache.redis.retrieveInfo();
};

export default { metadata, tool, handler };
