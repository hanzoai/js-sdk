// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'cache.redis',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/cache/redis/info',
  operationId: 'cache_redis_info_cache_redis_info_get',
};

export const tool: Tool = {
  name: 'retrieve_info_cache_redis',
  description: 'Endpoint for getting /redis/info',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.cache.redis.retrieveInfo();
};

export default { metadata, tool, handler };
