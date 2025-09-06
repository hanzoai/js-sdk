// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/{team_id}/disable_logging',
  operationId: 'disable_team_logging_team__team_id__disable_logging_post',
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
    required: ['team_id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { team_id, ...body } = args as any;
  return asTextContentResult((await client.team.disableLogging(team_id)) as object);
};

export default { metadata, tool, handler };
