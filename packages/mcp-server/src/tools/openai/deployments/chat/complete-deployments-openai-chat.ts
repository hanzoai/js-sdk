// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'openai.deployments.chat',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/openai/deployments/{model}/chat/completions',
  operationId: 'chat_completion_openai_deployments__model__chat_completions_post',
};

export const tool: Tool = {
  name: 'complete_deployments_openai_chat',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nFollows the exact same API spec as `OpenAI\'s Chat API https://platform.openai.com/docs/api-reference/chat`\n\n```bash\ncurl -X POST http://localhost:4000/v1/chat/completions \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "gpt-4o",\n    "messages": [\n        {\n            "role": "user",\n            "content": "Hello!"\n        }\n    ]\n}\'\n```\n\n# Response Schema\n```json\n{\n  type: \'object\'\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model: {
        type: 'string',
        title: 'Model',
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
  const { model, ...body } = args as any;
  return asTextContentResult((await client.openai.deployments.chat.complete(model)) as object);
};

export default { metadata, tool, handler };
