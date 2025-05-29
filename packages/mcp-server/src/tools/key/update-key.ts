// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'key',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/key/update',
  operationId: 'update_key_fn_key_update_post',
};

export const tool: Tool = {
  name: 'update_key',
  description:
    'Update an existing API key\'s parameters.\n\nParameters:\n- key: str - The key to update\n- key_alias: Optional[str] - User-friendly key alias\n- user_id: Optional[str] - User ID associated with key\n- team_id: Optional[str] - Team ID associated with key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call\n- tags: Optional[List[str]] - Tags for organizing keys (Enterprise only)\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n- spend: Optional[float] - Amount spent by key\n- max_budget: Optional[float] - Max budget for key\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- soft_budget: Optional[float] - [TODO] Soft budget limit (warning vs. hard stop). Will trigger a slack alert when this soft budget is reached.\n- max_parallel_requests: Optional[int] - Rate limit for parallel requests\n- metadata: Optional[dict] - Metadata for key. Example {"team": "core-infra", "app": "app2"}\n- tpm_limit: Optional[int] - Tokens per minute limit\n- rpm_limit: Optional[int] - Requests per minute limit\n- model_rpm_limit: Optional[dict] - Model-specific RPM limits {"gpt-4": 100, "claude-v1": 200}\n- model_tpm_limit: Optional[dict] - Model-specific TPM limits {"gpt-4": 100000, "claude-v1": 200000}\n- allowed_cache_controls: Optional[list] - List of allowed cache control values\n- duration: Optional[str] - Key validity duration ("30d", "1h", etc.)\n- permissions: Optional[dict] - Key-specific permissions\n- send_invite_email: Optional[bool] - Send invite email to user_id\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- blocked: Optional[bool] - Whether the key is blocked\n- aliases: Optional[dict] - Model aliases for the key - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n- config: Optional[dict] - [DEPRECATED PARAM] Key-specific config.\n- temp_budget_increase: Optional[float] - Temporary budget increase for the key (Enterprise only).\n- temp_budget_expiry: Optional[str] - Expiry time for the temporary budget increase (Enterprise only).\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "key": "sk-1234",\n    "key_alias": "my-key",\n    "user_id": "user-1234",\n    "team_id": "team-1234",\n    "max_budget": 100,\n    "metadata": {"any_key": "any-val"},\n}\'\n```',
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
      permissions: {
        type: 'object',
        title: 'Permissions',
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
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
      temp_budget_expiry: {
        type: 'string',
        title: 'Temp Budget Expiry',
        format: 'date-time',
      },
      temp_budget_increase: {
        type: 'number',
        title: 'Temp Budget Increase',
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
  const body = args as any;
  return client.key.update(body);
};

export default { metadata, tool, handler };
