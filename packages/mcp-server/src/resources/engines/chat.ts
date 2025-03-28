// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
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
  },
  handler: (client: Hanzo, args: any) => {
    const { model } = args;
    return client.engines.chat.complete(model);
  },
});
