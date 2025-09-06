// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'responses',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/responses/{response_id}',
  operationId: 'delete_response_v1_responses__response_id__delete',
};

export const tool: Tool = {
  name: 'delete_responses',
  description:
    'Delete a response by ID.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/delete\n\n```bash\ncurl -X DELETE http://localhost:4000/v1/responses/resp_abc123     -H "Authorization: Bearer sk-1234"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      response_id: {
        type: 'string',
        title: 'Response Id',
      },
    },
    required: ['response_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { response_id, ...body } = args as any;
  return asTextContentResult((await client.responses.delete(response_id)) as object);
};

export default { metadata, tool, handler };
