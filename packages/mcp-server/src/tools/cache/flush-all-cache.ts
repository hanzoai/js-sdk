// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'cache',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'flush_all_cache',
  description:
    'A function to flush all items from the cache. (All items will be deleted from the cache with this)\nRaises HTTPException if the cache is not initialized or if the cache type does not support flushing.\nReturns a dictionary with the status of the operation.\n\nUsage:\n```\ncurl -X POST http://0.0.0.0:4000/cache/flushall -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.cache.flushAll();
};

export default { metadata, tool, handler };
