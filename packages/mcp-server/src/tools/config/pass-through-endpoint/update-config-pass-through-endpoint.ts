// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'config.pass_through_endpoint',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/config/pass_through_endpoint/{endpoint_id}',
  operationId: 'update_pass_through_endpoints_config_pass_through_endpoint__endpoint_id__post',
};

export const tool: Tool = {
  name: 'update_config_pass_through_endpoint',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate a pass-through endpoint\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      endpoint_id: {
        type: 'string',
        title: 'Endpoint Id',
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
  const { endpoint_id, ...body } = args as any;
  return asTextContentResult((await client.config.passThroughEndpoint.update(endpoint_id)) as object);
};

export default { metadata, tool, handler };
