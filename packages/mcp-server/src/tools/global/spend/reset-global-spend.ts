// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'global.spend',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/global/spend/reset',
  operationId: 'global_spend_reset_global_spend_reset_post',
};

export const tool: Tool = {
  name: 'reset_global_spend',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nADMIN ONLY / MASTER KEY Only Endpoint\n\nGlobally reset spend for All API Keys and Teams, maintain LLM_SpendLogs\n\n1. LLM_SpendLogs will maintain the logs on spend, no data gets deleted from there\n2. LLM_VerificationTokens spend will be set = 0\n3. LLM_TeamTable spend will be set = 0\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
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
  return asTextContentResult((await client.global.spend.reset()) as object);
};

export default { metadata, tool, handler };
