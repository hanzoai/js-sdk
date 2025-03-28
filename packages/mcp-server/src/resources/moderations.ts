// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_moderations',
  description:
    'The moderations endpoint is a tool you can use to check whether content complies with an LLM Providers policies.\n\nQuick Start\n```\ncurl --location \'http://0.0.0.0:4000/moderations\'     --header \'Content-Type: application/json\'     --header \'Authorization: Bearer sk-1234\'     --data \'{"input": "Sample text goes here", "model": "text-moderation-stable"}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.moderations.create();
  },
});
