// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team.model',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/model/add',
  operationId: 'team_model_add_team_model_add_post',
};

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
    required: ['models', 'team_id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.team.model.add(body)) as object);
};

export default { metadata, tool, handler };
