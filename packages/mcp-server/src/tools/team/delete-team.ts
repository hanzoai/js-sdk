// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/delete',
  operationId: 'delete_team_team_delete_post',
};

export const tool: Tool = {
  name: 'delete_team',
  description:
    'delete team and associated team keys\n\nParameters:\n- team_ids: List[str] - Required. List of team IDs to delete. Example: ["team-1234", "team-5678"]\n\n```\ncurl --location \'http://0.0.0.0:4000/team/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "team_ids": ["8d916b1c-510d-4894-a334-1c16a93344f5"]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      team_ids: {
        type: 'array',
        title: 'Team Ids',
        items: {
          type: 'string',
        },
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
    required: ['team_ids'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.team.delete(body)) as object);
};

export default { metadata, tool, handler };
