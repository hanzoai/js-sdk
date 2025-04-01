// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'list_responses_input_items',
  description:
    'Get input items for a response.\n\nFollows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses/input-items\n\n```bash\ncurl -X GET http://localhost:4000/v1/responses/resp_abc123/input_items     -H "Authorization: Bearer sk-1234"\n```',
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
  return client.responses.inputItems.list(response_id);
};

export default { tool, handler };
