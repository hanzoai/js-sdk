// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'add_member_organization',
  description:
    '[BETA]\n\nAdd new members (either via user_email or user_id) to an organization\n\nIf user doesn\'t exist, new user row will also be added to User Table\n\nOnly proxy_admin or org_admin of organization, allowed to access this endpoint.\n\n# Parameters:\n\n- organization_id: str (required)\n- member: Union[List[Member], Member] (required)\n    - role: Literal[LLMUserRoles] (required)\n    - user_id: Optional[str]\n    - user_email: Optional[str]\n\nNote: Either user_id or user_email must be provided for each member.\n\nExample:\n```\ncurl -X POST \'http://0.0.0.0:4000/organization/member_add\'     -H \'Authorization: Bearer sk-1234\'     -H \'Content-Type: application/json\'     -d \'{\n    "organization_id": "45e3e396-ee08-4a61-a88e-16b3ce7e0849",\n    "member": {\n        "role": "internal_user",\n        "user_id": "dev247652@hanzo.ai"\n    },\n    "max_budget_in_organization": 100.0\n}\'\n```\n\nThe following is executed in this function:\n\n1. Check if organization exists\n2. Creates a new Internal User if the user_id or user_email is not found in LLM_UserTable\n3. Add Internal User to the `LLM_OrganizationMembership` table',
  inputSchema: {
    type: 'object',
    properties: {
      member: {
        anyOf: [
          {
            type: 'array',
            items: {
              type: 'object',
              title: 'OrgMember',
              properties: {
                role: {
                  type: 'string',
                  title: 'Role',
                  enum: ['org_admin', 'internal_user', 'internal_user_viewer'],
                },
                user_email: {
                  type: 'string',
                  title: 'User Email',
                },
                user_id: {
                  type: 'string',
                  title: 'User Id',
                },
              },
              required: ['role'],
            },
          },
          {
            $ref: '#/properties/member/anyOf/0/items',
          },
        ],
        title: 'Member',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
      },
      max_budget_in_organization: {
        type: 'number',
        title: 'Max Budget In Organization',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.organization.addMember(body);
};

export default { tool, handler };
