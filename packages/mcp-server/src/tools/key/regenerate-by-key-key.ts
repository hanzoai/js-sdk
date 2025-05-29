// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
    'Regenerate an existing API key while optionally updating its parameters.\n\nParameters:\n- key: str (path parameter) - The key to regenerate\n- data: Optional[RegenerateKeyRequest] - Request body containing optional parameters to update\n    - key_alias: Optional[str] - User-friendly key alias\n    - user_id: Optional[str] - User ID associated with key\n    - team_id: Optional[str] - Team ID associated with key\n    - models: Optional[list] - Model_name\'s a user is allowed to call\n    - tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n    - spend: Optional[float] - Amount spent by key\n    - max_budget: Optional[float] - Max budget for key\n    - model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}\n    - budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n    - soft_budget: Optional[float] - Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n    - max_parallel_requests: Optional[int] - Rate limit for parallel requests\n    - metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}\n    - tpm_limit: Optional[int] - Tokens per minute limit\n    - rpm_limit: Optional[int] - Requests per minute limit\n    - model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}\n    - model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}\n    - allowed_cache_controls: Optional[list] - List of allowed cache control values\n    - duration: Optional[str] - Key validity duration ("30d", "1h", etc.)\n    - permissions: Optional[dict] - Key-specific permissions\n    - guardrails: Optional[List[str]] - List of active guardrails for the key\n    - blocked: Optional[bool] - Whether the key is blocked\n\n\nReturns:\n- GenerateKeyResponse containing the new key and its updated parameters\n\nExample:\n```bash\ncurl --location --request POST \'http://localhost:4000/key/sk-1234/regenerate\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data-raw \'{\n    "max_budget": 100,\n    "metadata": {"team": "core-infra"},\n    "models": ["gpt-4", "gpt-3.5-turbo"]\n}\'\n```\n\nNote: This is an Enterprise feature. It requires a premium license to use.',
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
      },
      aliases: {
        type: 'object',
        title: 'Aliases',
      },
      allowed_cache_controls: {
        type: 'array',
        title: 'Allowed Cache Controls',
        items: {
          type: 'object',
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
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
      },
      model_rpm_limit: {
        type: 'object',
        title: 'Model Rpm Limit',
      },
      model_tpm_limit: {
        type: 'object',
        title: 'Model Tpm Limit',
      },
      models: {
        type: 'array',
        title: 'Models',
        items: {
          type: 'object',
        },
      },
      new_master_key: {
        type: 'string',
        title: 'New Master Key',
      },
      permissions: {
        type: 'object',
        title: 'Permissions',
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
    },
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { key, ...body } = args as any;
  return client.key.regenerateByKey(key, body);
};

export default { metadata, tool, handler };
