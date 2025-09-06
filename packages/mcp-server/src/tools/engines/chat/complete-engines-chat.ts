// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'engines.chat',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/engines/{model}/chat/completions',
  operationId: 'chat_completion_engines__model__chat_completions_post',
};

export const tool: Tool = {
  name: 'complete_engines_chat',
  description:
    'Follows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
      },
    },
    required: ['model'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { model, ...body } = args as any;
  return asTextContentResult((await client.engines.chat.complete(model)) as object);
};

export default { metadata, tool, handler };
