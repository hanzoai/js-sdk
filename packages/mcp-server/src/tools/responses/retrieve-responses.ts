// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'responses',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/responses/{response_id}',
  operationId: 'get_response_v1_responses__response_id__get',
};

export const tool: Tool = {
  name: 'retrieve_responses',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/get\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123     -H \"Authorization: Bearer sk-1234\"\n```\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      response_id: {
        type: 'string',
        title: 'Response Id',
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
  const { response_id, ...body } = args as any;
  return asTextContentResult((await client.responses.retrieve(response_id)) as object);
};

export default { metadata, tool, handler };
