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
  name: 'delete_cache',
  description:
    'Endpoint for deleting a key from the cache. All responses from llm proxy have `x-llm-cache-key` in the headers\n\nParameters:\n- **keys**: *Optional[List[str]]* - A list of keys to delete from the cache. Example {"keys": ["key1", "key2"]}\n\n```shell\ncurl -X POST "http://0.0.0.0:4000/cache/delete"     -H "Authorization: Bearer sk-1234"     -d \'{"keys": ["key1", "key2"]}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.cache.delete();
};

export default { metadata, tool, handler };
