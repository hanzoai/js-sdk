// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_info_team',
  description:
    "get info on team + related keys\n\nParameters:\n- team_id: str - Required. The unique identifier of the team to get info on.\n\n```\ncurl --location 'http://localhost:4000/team/info?team_id=your_team_id_here'     --header 'Authorization: Bearer your_api_key_here'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
        description: 'Team ID in the request parameters',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.team.retrieveInfo(body);
};

export default { metadata, tool, handler };
