// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/unblock',
  operationId: 'unblock_team_team_unblock_post',
};

export const tool: Tool = {
  name: 'unblock_team',
  description:
    "Blocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to unblock.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.team.unblock(body);
};

export default { metadata, tool, handler };
