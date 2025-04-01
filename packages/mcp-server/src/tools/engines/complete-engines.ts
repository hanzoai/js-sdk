// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'complete_engines',
  description:
    'Follows the exact same API spec as `OpenAI\'s Completions API https://platform.openai.com/docs/api-reference/completions`\n\n```bash\ncurl -X POST http://localhost:4000/v1/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-3.5-turbo-instruct",\n    "prompt": "Once upon a time",\n    "max_tokens": 50,\n    "temperature": 0.7\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { model } = args;
  return client.engines.complete(model);
};

export default { tool, handler };
