// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'config.pass_through_endpoint',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/config/pass_through_endpoint',
  operationId: 'get_pass_through_endpoints_config_pass_through_endpoint_get',
};

export const tool: Tool = {
  name: 'list_config_pass_through_endpoint',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET configured pass through endpoint.\n\nIf no endpoint_id given, return all configured endpoints.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/pass_through_endpoint_response',\n  $defs: {\n    pass_through_endpoint_response: {\n      type: 'object',\n      title: 'PassThroughEndpointResponse',\n      properties: {\n        endpoints: {\n          type: 'array',\n          title: 'Endpoints',\n          items: {\n            $ref: '#/$defs/pass_through_generic_endpoint'\n          }\n        }\n      },\n      required: [        'endpoints'\n      ]\n    },\n    pass_through_generic_endpoint: {\n      type: 'object',\n      title: 'PassThroughGenericEndpoint',\n      properties: {\n        headers: {\n          type: 'object',\n          title: 'Headers',\n          description: 'Key-value pairs of headers to be forwarded with the request. You can set any key value pair here and it will be forwarded to your target endpoint',\n          additionalProperties: true\n        },\n        path: {\n          type: 'string',\n          title: 'Path',\n          description: 'The route to be added to the LLM Proxy Server.'\n        },\n        target: {\n          type: 'string',\n          title: 'Target',\n          description: 'The URL to which requests for this path should be forwarded.'\n        }\n      },\n      required: [        'headers',\n        'path',\n        'target'\n      ]\n    }\n  }\n}\n```",
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
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.config.passThroughEndpoint.list(body)),
  );
};

export default { metadata, tool, handler };
