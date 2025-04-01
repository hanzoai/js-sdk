// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'add_team_model',
  description:
    'Add models to a team\'s allowed model list. Only proxy admin or team admin can add models.\n\nParameters:\n- team_id: str - Required. The team to add models to\n- models: List[str] - Required. List of models to add to the team\n\nExample Request:\n```\ncurl --location \'http://0.0.0.0:4000/team/model/add\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "team_id": "team-1234",\n    "models": ["gpt-4", "claude-2"]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'string',
        },
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.team.model.add(body);
};

export default { tool, handler };
