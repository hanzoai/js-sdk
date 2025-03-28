// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'delete_cache',
  description:
    'Endpoint for deleting a key from the cache. All responses from llm proxy have `x-llm-cache-key` in the headers\n\nParameters:\n- **keys**: *Optional[List[str]]* - A list of keys to delete from the cache. Example {"keys": ["key1", "key2"]}\n\n```shell\ncurl -X POST "http://0.0.0.0:4000/cache/delete"     -H "Authorization: Bearer sk-1234"     -d \'{"keys": ["key1", "key2"]}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.cache.delete();
  },
});

registerApiMethod({
  name: 'flush_all_cache',
  description:
    'A function to flush all items from the cache. (All items will be deleted from the cache with this)\nRaises HTTPException if the cache is not initialized or if the cache type does not support flushing.\nReturns a dictionary with the status of the operation.\n\nUsage:\n```\ncurl -X POST http://0.0.0.0:4000/cache/flushall -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.cache.flushAll();
  },
});

registerApiMethod({
  name: 'ping_cache',
  description: 'Endpoint for checking if cache can be pinged',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.cache.ping();
  },
});
