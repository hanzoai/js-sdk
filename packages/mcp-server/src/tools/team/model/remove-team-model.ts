// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team.model',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'remove_team_model',
  description:
    "Remove models from a team's allowed model list. Only proxy admin or team admin can remove models.\n\nParameters:\n- team_id: str - Required. The team to remove models from\n- models: List[str] - Required. List of models to remove from the team\n\nExample Request:\n```\ncurl --location 'http://0.0.0.0:4000/team/model/delete'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\",\n    \"models\": [\"gpt-4\"]\n}'\n```",
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
  return client.team.model.remove(body);
};

export default { metadata, tool, handler };
