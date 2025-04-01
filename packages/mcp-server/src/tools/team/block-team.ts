// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'block_team',
  description:
    "Blocks all calls from keys with this team id.\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to block.\n\nExample:\n```\ncurl --location 'http://0.0.0.0:4000/team/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"team_id\": \"team-1234\"\n}'\n```\n\nReturns:\n- The updated team record with blocked=True",
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

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.team.block(body);
};

export default { tool, handler };
