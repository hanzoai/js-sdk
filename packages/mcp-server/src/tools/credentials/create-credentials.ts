// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'credentials',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/credentials',
  operationId: 'create_credential_credentials_post',
};

export const tool: Tool = {
  name: 'create_credentials',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n[BETA] endpoint. This might change unexpectedly.\nStores credential in DB.\nReloads credentials in memory.\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      credential_info: {
        type: 'object',
        title: 'Credential Info',
      },
      credential_name: {
        type: 'string',
        title: 'Credential Name',
      },
      credential_values: {
        type: 'object',
        title: 'Credential Values',
      },
      model_id: {
        type: 'string',
        title: 'Model Id',
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
  return asTextContentResult((await client.credentials.create(body)) as object);
};

export default { metadata, tool, handler };
