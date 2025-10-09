// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/member_update',
  operationId: 'team_member_update_team_member_update_post',
};

export const tool: Tool = {
  name: 'update_member_team',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n[BETA]\n\nUpdate team member budgets and team member role\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/team_update_member_response',\n  $defs: {\n    team_update_member_response: {\n      type: 'object',\n      title: 'TeamMemberUpdateResponse',\n      properties: {\n        team_id: {\n          type: 'string',\n          title: 'Team Id'\n        },\n        user_id: {\n          type: 'string',\n          title: 'User Id'\n        },\n        max_budget_in_team: {\n          type: 'number',\n          title: 'Max Budget In Team'\n        },\n        user_email: {\n          type: 'string',\n          title: 'User Email'\n        }\n      },\n      required: [        'team_id',\n        'user_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      max_budget_in_team: {
        type: 'number',
        title: 'Max Budget In Team',
      },
      role: {
        type: 'string',
        title: 'Role',
        enum: ['admin', 'user'],
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['team_id'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.team.updateMember(body)));
};

export default { metadata, tool, handler };
