// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nEndpoint for checking if cache can be pinged\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'CachePingResponse',\n  properties: {\n    cache_type: {\n      type: 'string',\n      title: 'Cache Type'\n    },\n    status: {\n      type: 'string',\n      title: 'Status'\n    },\n    health_check_cache_params: {\n      type: 'object',\n      title: 'Health Check Cache Params'\n    },\n    llm_cache_params: {\n      type: 'string',\n      title: 'Llm Cache Params'\n    },\n    ping_response: {\n      type: 'boolean',\n      title: 'Ping Response'\n    },\n    set_cache_response: {\n      type: 'string',\n      title: 'Set Cache Response'\n    }\n  },\n  required: [    'cache_type',\n    'status'\n  ]\n}\n```",
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
  return asTextContentResult(await maybeFilter(args, await client.cache.ping()));
};

export default { metadata, tool, handler };
