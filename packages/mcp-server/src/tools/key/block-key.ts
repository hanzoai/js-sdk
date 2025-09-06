// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'key',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/key/block',
  operationId: 'block_key_key_block_post',
};

export const tool: Tool = {
  name: 'block_key',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nBlock an Virtual key from making any requests.\n\nParameters:\n- key: str - The key to block. Can be either the unhashed key (sk-...) or the hashed key value\n\n Example:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can block keys.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'LLM_VerificationToken',\n  properties: {\n    token: {\n      type: 'string',\n      title: 'Token'\n    },\n    aliases: {\n      type: 'object',\n      title: 'Aliases',\n      additionalProperties: true\n    },\n    allowed_cache_controls: {\n      type: 'array',\n      title: 'Allowed Cache Controls',\n      items: {\n        type: 'object',\n        additionalProperties: true\n      }\n    },\n    blocked: {\n      type: 'boolean',\n      title: 'Blocked'\n    },\n    budget_duration: {\n      type: 'string',\n      title: 'Budget Duration'\n    },\n    budget_reset_at: {\n      type: 'string',\n      title: 'Budget Reset At',\n      format: 'date-time'\n    },\n    config: {\n      type: 'object',\n      title: 'Config',\n      additionalProperties: true\n    },\n    created_at: {\n      type: 'string',\n      title: 'Created At',\n      format: 'date-time'\n    },\n    created_by: {\n      type: 'string',\n      title: 'Created By'\n    },\n    expires: {\n      anyOf: [        {\n          type: 'string'\n        },\n        {\n          type: 'string',\n          format: 'date-time'\n        }\n      ],\n      title: 'Expires'\n    },\n    key_alias: {\n      type: 'string',\n      title: 'Key Alias'\n    },\n    key_name: {\n      type: 'string',\n      title: 'Key Name'\n    },\n    llm_budget_table: {\n      type: 'object',\n      title: 'Llm Budget Table',\n      additionalProperties: true\n    },\n    max_budget: {\n      type: 'number',\n      title: 'Max Budget'\n    },\n    max_parallel_requests: {\n      type: 'integer',\n      title: 'Max Parallel Requests'\n    },\n    metadata: {\n      type: 'object',\n      title: 'Metadata',\n      additionalProperties: true\n    },\n    model_max_budget: {\n      type: 'object',\n      title: 'Model Max Budget',\n      additionalProperties: true\n    },\n    model_spend: {\n      type: 'object',\n      title: 'Model Spend',\n      additionalProperties: true\n    },\n    models: {\n      type: 'array',\n      title: 'Models',\n      items: {\n        type: 'object',\n        additionalProperties: true\n      }\n    },\n    org_id: {\n      type: 'string',\n      title: 'Org Id'\n    },\n    permissions: {\n      type: 'object',\n      title: 'Permissions',\n      additionalProperties: true\n    },\n    rpm_limit: {\n      type: 'integer',\n      title: 'Rpm Limit'\n    },\n    soft_budget_cooldown: {\n      type: 'boolean',\n      title: 'Soft Budget Cooldown'\n    },\n    spend: {\n      type: 'number',\n      title: 'Spend'\n    },\n    team_id: {\n      type: 'string',\n      title: 'Team Id'\n    },\n    tpm_limit: {\n      type: 'integer',\n      title: 'Tpm Limit'\n    },\n    updated_at: {\n      type: 'string',\n      title: 'Updated At',\n      format: 'date-time'\n    },\n    updated_by: {\n      type: 'string',\n      title: 'Updated By'\n    },\n    user_id: {\n      type: 'string',\n      title: 'User Id'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['key'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.key.block(body)));
};

export default { metadata, tool, handler };
