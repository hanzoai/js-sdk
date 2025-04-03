// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'delete_organization',
  description:
    'Delete an organization\n\n# Parameters:\n\n- organization_ids: List[str] - The organization ids to delete.',
  inputSchema: {
    type: 'object',
    properties: {
      organization_ids: {
        type: 'array',
        title: 'Organization Ids',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.organization.delete(body);
};

export default { metadata, tool, handler };
