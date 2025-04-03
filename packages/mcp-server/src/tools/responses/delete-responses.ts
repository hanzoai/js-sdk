// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'responses',
  operation: 'write',
  tags: [],
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
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { response_id } = args;
  return client.responses.delete(response_id);
};

export default { metadata, tool, handler };
