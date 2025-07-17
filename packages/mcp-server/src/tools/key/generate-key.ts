// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'key',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/key/generate',
  operationId: 'generate_key_fn_key_generate_post',
};

export const tool: Tool = {
  name: 'generate_key',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nGenerate an API key based on the provided data.\n\nDocs: https://docs.hanzo.ai/docs/proxy/virtual_keys\n\nParameters:\n- duration: Optional[str] - Specify the length of time the token is valid for. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- key_alias: Optional[str] - User defined key alias\n- key: Optional[str] - User defined key value. If not set, a 16-digit unique sk-key is created for you.\n- team_id: Optional[str] - The team id of the key\n- user_id: Optional[str] - The user id of the key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models)\n- aliases: Optional[dict] - Any alias mappings, on top of anything in the config.yaml model list. - https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---upgradedowngrade-models\n- config: Optional[dict] - any key-specific configs, overrides config in config.yaml\n- spend: Optional[int] - Amount spent by key. Default is 0. Will be updated by proxy whenever key is used. https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---tracking-spend\n- send_invite_email: Optional[bool] - Whether to send an invite email to the user_id, with the generate key\n- max_budget: Optional[float] - Specify max budget for a given key.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- metadata: Optional[dict] - Metadata for key, store information for key. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- permissions: Optional[dict] - key-specific permissions. Currently just used for turning off pii masking (if connected). Example - {"pii": false}\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}}. IF null or {} then no model specific budget.\n- model_rpm_limit: Optional[dict] - key-specific model rpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific rpm limit.\n- model_tpm_limit: Optional[dict] - key-specific model tpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific tpm limit.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request\n- blocked: Optional[bool] - Whether the key is blocked.\n- rpm_limit: Optional[int] - Specify rpm limit for a given key (Requests per minute)\n- tpm_limit: Optional[int] - Specify tpm limit for a given key (Tokens per minute)\n- soft_budget: Optional[float] - Specify soft budget for a given key. Will trigger a slack alert when this soft budget is reached.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n\nExamples:\n\n1. Allow users to turn on/off pii masking\n\n```bash\ncurl --location \'http://0.0.0.0:4000/key/generate\'         --header \'Authorization: Bearer sk-1234\'         --header \'Content-Type: application/json\'         --data \'{\n        "permissions": {"allow_pii_controls": true}\n}\'\n```\n\nReturns:\n- key: (str) The generated api key\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.',
  inputSchema: {
    type: 'object',
    properties: {
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
      key: {
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

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.key.generate(body));
};

export default { metadata, tool, handler };
