// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'list_models',
  description:
    'Use `/model/info` - to get detailed model information, example - pricing, mode, etc.\n\nThis is just for compatibility with openai projects like aider.',
  inputSchema: {
    type: 'object',
    properties: {
      return_wildcard_routes: {
        type: 'boolean',
        title: 'Return Wildcard Routes',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.models.list(body);
  },
});
