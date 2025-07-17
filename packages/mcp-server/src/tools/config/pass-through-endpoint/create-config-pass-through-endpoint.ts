// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'config.pass_through_endpoint',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/config/pass_through_endpoint',
  operationId: 'create_pass_through_endpoints_config_pass_through_endpoint_post',
};

export const tool: Tool = {
  name: 'create_config_pass_through_endpoint',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate new pass-through endpoint\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      headers: {
        type: 'object',
        title: 'Headers',
        description:
          'Key-value pairs of headers to be forwarded with the request. You can set any key value pair here and it will be forwarded to your target endpoint',
      },
      path: {
        type: 'string',
        title: 'Path',
        description: 'The route to be added to the LLM Proxy Server.',
      },
      target: {
        type: 'string',
        title: 'Target',
        description: 'The URL to which requests for this path should be forwarded.',
      },
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
  const body = args as any;
  return asTextContentResult((await client.config.passThroughEndpoint.create(body)) as object);
};

export default { metadata, tool, handler };
