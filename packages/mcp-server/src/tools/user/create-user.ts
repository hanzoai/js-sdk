// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'user',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_user',
  description:
    'Use this to create a new INTERNAL user with a budget.\nInternal Users can access LLM Admin UI to make keys, request access to models.\nThis creates a new user and generates a new api key for the new user. The new api key is returned.\n\nReturns user id, budget + new key.\n\nParameters:\n- user_id: Optional[str] - Specify a user id. If not set, a unique id will be generated.\n- user_alias: Optional[str] - A descriptive name for you to know who this user id refers to.\n- teams: Optional[list] - specify a list of team id\'s a user belongs to.\n- user_email: Optional[str] - Specify a user email.\n- send_invite_email: Optional[bool] - Specify if an invite email should be sent.\n- user_role: Optional[str] - Specify a user role - "proxy_admin", "proxy_admin_viewer", "internal_user", "internal_user_viewer", "team", "customer". Info about each role here: `https://github.com/hanzoai/llm/llm/proxy/_types.py#L20`\n- max_budget: Optional[float] - Specify max budget for a given user.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models). Set to [\'no-default-models\'] to block all model access. Restricting user to only team-based model access.\n- tpm_limit: Optional[int] - Specify tpm limit for a given user (Tokens per minute)\n- rpm_limit: Optional[int] - Specify rpm limit for a given user (Requests per minute)\n- auto_create_key: bool - Default=True. Flag used for returning a key as part of the /user/new response\n- aliases: Optional[dict] - Model aliases for the user - [Docs](https://llm.vercel.app/docs/proxy/virtual_keys#model-aliases)\n- config: Optional[dict] - [DEPRECATED PARAM] User-specific config.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request-\n- blocked: Optional[bool] - [Not Implemented Yet] Whether the user is blocked.\n- guardrails: Optional[List[str]] - [Not Implemented Yet] List of active guardrails for the user\n- permissions: Optional[dict] - [Not Implemented Yet] User-specific permissions, eg. turning off pii masking.\n- metadata: Optional[dict] - Metadata for user, store information for user. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- soft_budget: Optional[float] - Get alerts when user crosses given budget, doesn\'t block requests.\n- model_max_budget: Optional[dict] - Model-specific max budget for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-budgets-to-keys)\n- model_rpm_limit: Optional[float] - Model-specific rpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n- model_tpm_limit: Optional[float] - Model-specific tpm limit for user. [Docs](https://docs.hanzo.ai/docs/proxy/users#add-model-specific-limits-to-keys)\n- spend: Optional[float] - Amount spent by user. Default is 0. Will be updated by proxy whenever user is used. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d"), months ("1mo").\n- team_id: Optional[str] - [DEPRECATED PARAM] The team id of the user. Default is None. \n- duration: Optional[str] - Duration for the key auto-created on `/user/new`. Default is None.\n- key_alias: Optional[str] - Alias for the key auto-created on `/user/new`. Default is None.\n\nReturns:\n- key: (str) The generated api key for the user\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.\n- max_budget: (float|None) Max budget for given user.\n\nUsage Example \n\n```shell\n curl -X POST "http://localhost:4000/user/new"      -H "Content-Type: application/json"      -H "Authorization: Bearer sk-1234"      -d \'{\n     "username": "new_user",\n     "email": "new_user@example.com"\n }\'\n```',
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
      auto_create_key: {
        type: 'boolean',
        title: 'Auto Create Key',
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
      },
      config: {
        type: 'object',
        title: 'Config',
      },
      duration: {
        type: 'string',
        title: 'Duration',
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
      send_invite_email: {
        type: 'boolean',
        title: 'Send Invite Email',
      },
      spend: {
        type: 'number',
        title: 'Spend',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
      },
      teams: {
        type: 'array',
        title: 'Teams',
        items: {
          type: 'object',
        },
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
      },
      user_alias: {
        type: 'string',
        title: 'User Alias',
      },
      user_email: {
        type: 'string',
        title: 'User Email',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      user_role: {
        type: 'string',
        title: 'User Role',
        enum: ['proxy_admin', 'proxy_admin_viewer', 'internal_user', 'internal_user_viewer'],
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.user.create(body);
};

export default { metadata, tool, handler };
