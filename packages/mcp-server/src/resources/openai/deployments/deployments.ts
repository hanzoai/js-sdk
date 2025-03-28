// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'complete_openai_deployments',
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
  handler: (client: Hanzo, args: any) => {
    const { model } = args;
    return client.openai.deployments.complete(model);
  },
});

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { model } = args;
    return client.openai.deployments.embed(model);
  },
});
