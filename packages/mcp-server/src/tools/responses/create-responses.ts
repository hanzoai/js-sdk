// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'create_responses',
  description:
    'Follows the OpenAI Responses API spec: https://platform.openai.com/docs/api-reference/responses\n\n```bash\ncurl -X POST http://localhost:4000/v1/responses     -H "Content-Type: application/json"     -H "Authorization: Bearer sk-1234"     -d \'{\n    "model": "gpt-4o",\n    "input": "Tell me about AI"\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: any) => {
  const {} = args;
  return client.responses.create();
};

export default { tool, handler };
