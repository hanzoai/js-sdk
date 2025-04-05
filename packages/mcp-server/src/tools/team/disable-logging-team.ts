// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'disable_logging_team',
  description:
    "Disable all logging callbacks for a team\n\nParameters:\n- team_id (str, required): The unique identifier for the team\n\nExample curl:\n```\ncurl -X POST 'http://localhost:4000/team/dbe2f686-a686-4896-864a-4c3924458709/disable_logging'         -H 'Authorization: Bearer sk-1234'\n```",
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
  const { team_id } = args;
  return client.team.disableLogging(team_id);
};

export default { metadata, tool, handler };
