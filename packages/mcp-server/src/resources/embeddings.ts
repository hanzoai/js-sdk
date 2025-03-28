// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_embeddings',
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
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.embeddings.create(body);
  },
});
