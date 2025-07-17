// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'team',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/team/member_delete',
  operationId: 'team_member_delete_team_member_delete_post',
};

export const tool: Tool = {
  name: 'remove_member_team',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n[BETA]\n\ndelete members (either via user_email or user_id) from a team\n\nIf user doesn't exist, an exception will be raised\n```\ncurl -X POST 'http://0.0.0.0:8000/team/member_delete' \n-H 'Authorization: Bearer sk-1234' \n-H 'Content-Type: application/json' \n-d '{\n    \"team_id\": \"45e3e396-ee08-4a61-a88e-16b3ce7e0849\",\n    \"user_id\": \"dev247652@hanzo.ai\"\n}'\n```\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      team_id: {
        type: 'string',
        title: 'Team Id',
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
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.team.removeMember(body)) as object);
};

export default { metadata, tool, handler };
