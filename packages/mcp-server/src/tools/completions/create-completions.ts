// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'completions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/completions',
  operationId: 'completion_completions_post',
};

export const tool: Tool = {
  name: 'create_completions',
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

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.completions.create(body);
};

export default { metadata, tool, handler };
