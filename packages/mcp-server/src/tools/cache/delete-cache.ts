// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'cache',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/cache/delete',
  operationId: 'cache_delete_cache_delete_post',
};

export const tool: Tool = {
  name: 'delete_cache',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nEndpoint for deleting a key from the cache. All responses from llm proxy have `x-llm-cache-key` in the headers\n\nParameters:\n- **keys**: *Optional[List[str]]* - A list of keys to delete from the cache. Example {"keys": ["key1", "key2"]}\n\n```shell\ncurl -X POST "http://0.0.0.0:4000/cache/delete"     -H "Authorization: Bearer sk-1234"     -d \'{"keys": ["key1", "key2"]}\'\n```\n\n# Response Schema\n```json\n{\n  type: \'object\'\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.cache.delete()) as object);
};

export default { metadata, tool, handler };
