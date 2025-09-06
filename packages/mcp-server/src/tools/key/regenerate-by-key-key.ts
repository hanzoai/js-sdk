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
  httpPath: '/key/{key}/regenerate',
  operationId: 'regenerate_key_fn_key__key__regenerate_post',
};

export const tool: Tool = {
  name: 'regenerate_by_key_key',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRegenerate an existing API key while optionally updating its parameters.\n\nParameters:\n- key: str (path parameter) - The key to regenerate\n- data: Optional[RegenerateKeyRequest] - Request body containing optional parameters to update\n    - key_alias: Optional[str] - User-friendly key alias\n    - user_id: Optional[str] - User ID associated with key\n    - team_id: Optional[str] - Team ID associated with key\n    - models: Optional[list] - Model_name's a user is allowed to call\n    - tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n    - spend: Optional[float] - Amount spent by key\n    - max_budget: Optional[float] - Max budget for key\n    - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {\"gpt-4\": {\"budget_limit\": 0.0005, \"time_period\": \"30d\"}}\n    - budget_duration: Optional[str] - Budget reset period (\"30d\", \"1h\", etc.)\n    - soft_budget: Optional[float] - Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n    - max_parallel_requests: Optional[int] - Rate limit for parallel requests\n    - metadata: Optional[dict] - Metadata for key. Example {\"team\": \"core-infra\", \"app\": \"app2\"}\n    - tpm_limit: Optional[int] - Tokens per minute limit\n    - rpm_limit: Optional[int] - Requests per minute limit\n    - model_rpm_limit: Optional[dict] - Model-specific RPM limits {\"gpt-4\": 100, \"claude-v1\": 200}\n    - model_tpm_limit: Optional[dict] - Model-specific TPM limits {\"gpt-4\": 100000, \"claude-v1\": 200000}\n    - allowed_cache_controls: Optional[list] - List of allowed cache control values\n    - duration: Optional[str] - Key validity duration (\"30d\", \"1h\", etc.)\n    - permissions: Optional[dict] - Key-specific permissions\n    - guardrails: Optional[List[str]] - List of active guardrails for the key\n    - blocked: Optional[bool] - Whether the key is blocked\n\n\nReturns:\n- GenerateKeyResponse containing the new key and its updated parameters\n\nExample:\n```bash\ncurl --location --request POST 'http://localhost:4000/key/sk-1234/regenerate'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data-raw '{\n    \"max_budget\": 100,\n    \"metadata\": {\"team\": \"core-infra\"},\n    \"models\": [\"gpt-4\", \"gpt-3.5-turbo\"]\n}'\n```\n\nNote: This is an Enterprise feature. It requires a premium license to use.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/generate_key_response',\n  $defs: {\n    generate_key_response: {\n      type: 'object',\n      title: 'GenerateKeyResponse',\n      properties: {\n        expires: {\n          type: 'string',\n          title: 'Expires',\n          format: 'date-time'\n        },\n        key: {\n          type: 'string',\n          title: 'Key'\n        },\n        token: {\n          type: 'string',\n          title: 'Token'\n        },\n        aliases: {\n          type: 'object',\n          title: 'Aliases',\n          additionalProperties: true\n        },\n        allowed_cache_controls: {\n          type: 'array',\n          title: 'Allowed Cache Controls',\n          items: {\n            type: 'object',\n            additionalProperties: true\n          }\n        },\n        blocked: {\n          type: 'boolean',\n          title: 'Blocked'\n        },\n        budget_duration: {\n          type: 'string',\n          title: 'Budget Duration'\n        },\n        budget_id: {\n          type: 'string',\n          title: 'Budget Id'\n        },\n        config: {\n          type: 'object',\n          title: 'Config',\n          additionalProperties: true\n        },\n        created_by: {\n          type: 'string',\n          title: 'Created By'\n        },\n        duration: {\n          type: 'string',\n          title: 'Duration'\n        },\n        enforced_params: {\n          type: 'array',\n          title: 'Enforced Params',\n          items: {\n            type: 'string'\n          }\n        },\n        guardrails: {\n          type: 'array',\n          title: 'Guardrails',\n          items: {\n            type: 'string'\n          }\n        },\n        key_alias: {\n          type: 'string',\n          title: 'Key Alias'\n        },\n        key_name: {\n          type: 'string',\n          title: 'Key Name'\n        },\n        llm_budget_table: {\n          type: 'object',\n          title: 'Llm Budget Table',\n          additionalProperties: true\n        },\n        max_budget: {\n          type: 'number',\n          title: 'Max Budget'\n        },\n        max_parallel_requests: {\n          type: 'integer',\n          title: 'Max Parallel Requests'\n        },\n        metadata: {\n          type: 'object',\n          title: 'Metadata',\n          additionalProperties: true\n        },\n        model_max_budget: {\n          type: 'object',\n          title: 'Model Max Budget',\n          additionalProperties: true\n        },\n        model_rpm_limit: {\n          type: 'object',\n          title: 'Model Rpm Limit',\n          additionalProperties: true\n        },\n        model_tpm_limit: {\n          type: 'object',\n          title: 'Model Tpm Limit',\n          additionalProperties: true\n        },\n        models: {\n          type: 'array',\n          title: 'Models',\n          items: {\n            type: 'object',\n            additionalProperties: true\n          }\n        },\n        permissions: {\n          type: 'object',\n          title: 'Permissions',\n          additionalProperties: true\n        },\n        rpm_limit: {\n          type: 'integer',\n          title: 'Rpm Limit'\n        },\n        spend: {\n          type: 'number',\n          title: 'Spend'\n        },\n        tags: {\n          type: 'array',\n          title: 'Tags',\n          items: {\n            type: 'string'\n          }\n        },\n        team_id: {\n          type: 'string',\n          title: 'Team Id'\n        },\n        token_id: {\n          type: 'string',\n          title: 'Token Id'\n        },\n        tpm_limit: {\n          type: 'integer',\n          title: 'Tpm Limit'\n        },\n        updated_by: {\n          type: 'string',\n          title: 'Updated By'\n        },\n        user_id: {\n          type: 'string',\n          title: 'User Id'\n        }\n      },\n      required: [        'expires',\n        'key'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      path_key: {
        type: 'string',
        title: 'Key',
      },
      aliases: {
        type: 'object',
        title: 'Aliases',
        additionalProperties: true,
      },
      allowed_cache_controls: {
        type: 'array',
        title: 'Allowed Cache Controls',
        items: {
          type: 'object',
          additionalProperties: true,
        },
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      config: {
        type: 'object',
        title: 'Config',
        additionalProperties: true,
      },
      duration: {
        type: 'string',
        title: 'Duration',
      },
      enforced_params: {
        type: 'array',
        title: 'Enforced Params',
        items: {
          type: 'string',
        },
      },
      guardrails: {
        type: 'array',
        title: 'Guardrails',
        items: {
          type: 'string',
        },
      },
      body_key: {
        type: 'string',
        title: 'Key',
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
      },
      metadata: {
        type: 'object',
        title: 'Metadata',
        additionalProperties: true,
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
        additionalProperties: true,
      },
      model_rpm_limit: {
        type: 'object',
        title: 'Model Rpm Limit',
        additionalProperties: true,
      },
      model_tpm_limit: {
        type: 'object',
        title: 'Model Tpm Limit',
        additionalProperties: true,
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
          additionalProperties: true,
        },
      },
      new_master_key: {
        type: 'string',
        title: 'New Master Key',
      },
      permissions: {
        type: 'object',
        title: 'Permissions',
        additionalProperties: true,
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
      },
      send_invite_email: {
        type: 'boolean',
        title: 'Send Invite Email',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'string',
        },
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
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
    required: ['path_key'],
  },
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { key, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.key.regenerateByKey(key, body)));
};

export default { metadata, tool, handler };
