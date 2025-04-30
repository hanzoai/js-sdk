// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'openai.deployments',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'embed_openai_deployments',
  description:
    'Follows the exact same API spec as `OpenAI\'s Embeddings API https://platform.openai.com/docs/api-reference/embeddings`\n\n```bash\ncurl -X POST http://localhost:4000/v1/embeddings \n-H "Content-Type: application/json" \n-H "Authorization: Bearer sk-1234" \n-d \'{\n    "model": "text-embedding-ada-002",\n    "input": "The quick brown fox jumps over the lazy dog"\n}\'\n```',
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
  const { model, ...body } = args as any;
  return client.openai.deployments.embed(model);
};

export default { metadata, tool, handler };
