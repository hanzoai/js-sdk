// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'organization',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/organization/list',
  operationId: 'list_organization_organization_list_get',
};

export const tool: Tool = {
  name: 'list_organization',
  description:
    "```\ncurl --location --request GET 'http://0.0.0.0:4000/organization/list'         --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await client.organization.list());
};

export default { metadata, tool, handler };
