// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.key.update(body);
  },
});

registerApiMethod({
  name: 'list_key',
  description:
    'List all keys for a given user / team / organization.\n\nReturns:\n    {\n        "keys": List[str] or List[UserAPIKeyAuth],\n        "total_count": int,\n        "current_page": int,\n        "total_pages": int,\n    }',
  inputSchema: {
    type: 'object',
    properties: {
      include_team_keys: {
        type: 'boolean',
        title: 'Include Team Keys',
        description: 'Include all keys for teams that user is an admin of.',
      },
      key_alias: {
        type: 'string',
        title: 'Key Alias',
        description: 'Filter keys by key alias',
      },
      organization_id: {
        type: 'string',
        title: 'Organization Id',
        description: 'Filter keys by organization ID',
      },
      page: {
        type: 'integer',
        title: 'Page',
        description: 'Page number',
      },
      return_full_object: {
        type: 'boolean',
        title: 'Return Full Object',
        description: 'Return full key object',
      },
      size: {
        type: 'integer',
        title: 'Size',
        description: 'Page size',
      },
      team_id: {
        type: 'string',
        title: 'Team Id',
        description: 'Filter keys by team ID',
      },
      user_id: {
        type: 'string',
        title: 'User Id',
        description: 'Filter keys by user ID',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.key.list(body);
  },
});

registerApiMethod({
  name: 'delete_key',
  description:
    'Delete a key from the key management system.\n\nParameters::\n- keys (List[str]): A list of keys or hashed keys to delete. Example {"keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n- key_aliases (List[str]): A list of key aliases to delete. Can be passed instead of `keys`.Example {"key_aliases": ["alias1", "alias2"]}\n\nReturns:\n- deleted_keys (List[str]): A list of deleted keys. Example {"deleted_keys": ["sk-QWrxEynunsNpV1zT48HIrw", "837e17519f44683334df5291321d97b8bf1098cd490e49e215f6fea935aa28be"]}\n\nExample:\n```bash\ncurl --location \'http://0.0.0.0:4000/key/delete\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "keys": ["sk-QWrxEynunsNpV1zT48HIrw"]\n}\'\n```\n\nRaises:\n    HTTPException: If an error occurs during key deletion.',
  inputSchema: {
    type: 'object',
    properties: {
      key_aliases: {
        type: 'array',
        title: 'Key Aliases',
        items: {
          type: 'string',
        },
      },
      keys: {
        type: 'array',
        title: 'Keys',
        items: {
          type: 'string',
        },
      },
      'llm-changed-by': {
        type: 'string',
        title: 'Llm-Changed-By',
        description:
          'The llm-changed-by header enables tracking of actions performed by authorized users on behalf of other users, providing an audit trail for accountability',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.key.delete(body);
  },
});

registerApiMethod({
  name: 'block_key',
  description:
    "Block an Virtual key from making any requests.\n\nParameters:\n- key: str - The key to block. Can be either the unhashed key (sk-...) or the hashed key value\n\n Example:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/block'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can block keys.",
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
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.key.block(body);
  },
});

registerApiMethod({
  name: 'check_health_key',
  description:
    'Check the health of the key\n\nChecks:\n- If key based logging is configured correctly - sends a test log\n\nUsage \n\nPass the key in the request header\n\n```bash\ncurl -X POST "http://localhost:4000/key/health"      -H "Authorization: Bearer sk-1234"      -H "Content-Type: application/json"\n```\n\nResponse when logging callbacks are setup correctly:\n\n```json\n{\n  "key": "healthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "healthy",\n    "details": "No logger exceptions triggered, system is healthy. Manually check if logs were sent to [\'gcs_bucket\']"\n  }\n}\n```\n\n\nResponse when logging callbacks are not setup correctly:\n```json\n{\n  "key": "unhealthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "unhealthy",\n    "details": "Logger exceptions triggered, system is unhealthy: Failed to load vertex credentials. Check to see if credentials containing partial/invalid information."\n  }\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.key.checkHealth();
  },
});

registerApiMethod({
  name: 'generate_key',
  description:
    'Generate an API key based on the provided data.\n\nDocs: https://docs.hanzo.ai/docs/proxy/virtual_keys\n\nParameters:\n- duration: Optional[str] - Specify the length of time the token is valid for. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- key_alias: Optional[str] - User defined key alias\n- key: Optional[str] - User defined key value. If not set, a 16-digit unique sk-key is created for you.\n- team_id: Optional[str] - The team id of the key\n- user_id: Optional[str] - The user id of the key\n- budget_id: Optional[str] - The budget id associated with the key. Created by calling `/budget/new`.\n- models: Optional[list] - Model_name\'s a user is allowed to call. (if empty, key is allowed to call all models)\n- aliases: Optional[dict] - Any alias mappings, on top of anything in the config.yaml model list. - https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---upgradedowngrade-models\n- config: Optional[dict] - any key-specific configs, overrides config in config.yaml\n- spend: Optional[int] - Amount spent by key. Default is 0. Will be updated by proxy whenever key is used. https://docs.hanzo.ai/docs/proxy/virtual_keys#managing-auth---tracking-spend\n- send_invite_email: Optional[bool] - Whether to send an invite email to the user_id, with the generate key\n- max_budget: Optional[float] - Specify max budget for a given key.\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- max_parallel_requests: Optional[int] - Rate limit a user based on the number of parallel requests. Raises 429 error, if user\'s parallel requests > x.\n- metadata: Optional[dict] - Metadata for key, store information for key. Example metadata = {"team": "core-infra", "app": "app2", "email": "z@hanzo.ai" }\n- guardrails: Optional[List[str]] - List of active guardrails for the key\n- permissions: Optional[dict] - key-specific permissions. Currently just used for turning off pii masking (if connected). Example - {"pii": false}\n- model_max_budget: Optional[Dict[str, BudgetConfig]] - Model-specific budgets {"gpt-4": {"budget_limit": 0.0005, "time_period": "30d"}}}. IF null or {} then no model specific budget.\n- model_rpm_limit: Optional[dict] - key-specific model rpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific rpm limit.\n- model_tpm_limit: Optional[dict] - key-specific model tpm limit. Example - {"text-davinci-002": 1000, "gpt-3.5-turbo": 1000}. IF null or {} then no model specific tpm limit.\n- allowed_cache_controls: Optional[list] - List of allowed cache control values. Example - ["no-cache", "no-store"]. See all values - https://docs.hanzo.ai/docs/proxy/caching#turn-on--off-caching-per-request\n- blocked: Optional[bool] - Whether the key is blocked.\n- rpm_limit: Optional[int] - Specify rpm limit for a given key (Requests per minute)\n- tpm_limit: Optional[int] - Specify tpm limit for a given key (Tokens per minute)\n- soft_budget: Optional[float] - Specify soft budget for a given key. Will trigger a slack alert when this soft budget is reached.\n- tags: Optional[List[str]] - Tags for [tracking spend](https://llm.vercel.app/docs/proxy/enterprise#tracking-spend-for-custom-tags) and/or doing [tag-based routing](https://llm.vercel.app/docs/proxy/tag_routing).\n- enforced_params: Optional[List[str]] - List of enforced params for the key (Enterprise only). [Docs](https://docs.hanzo.ai/docs/proxy/enterprise#enforce-required-params-for-llm-requests)\n\nExamples:\n\n1. Allow users to turn on/off pii masking\n\n```bash\ncurl --location \'http://0.0.0.0:4000/key/generate\'         --header \'Authorization: Bearer sk-1234\'         --header \'Content-Type: application/json\'         --data \'{\n        "permissions": {"allow_pii_controls": true}\n}\'\n```\n\nReturns:\n- key: (str) The generated api key\n- expires: (datetime) Datetime object for when key expires.\n- user_id: (str) Unique user id - used for tracking spend across multiple keys for same user id.',
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
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.key.generate(body);
  },
});

registerApiMethod({
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
  handler: (client: Hanzo, args: any) => {
    const { key, ...body } = args;
    return client.key.regenerateByKey(key, body);
  },
});

registerApiMethod({
  name: 'retrieve_info_key',
  description:
    'Retrieve information about a key.\nParameters:\n    key: Optional[str] = Query parameter representing the key in the request\n    user_api_key_dict: UserAPIKeyAuth = Dependency representing the user\'s API key\nReturns:\n    Dict containing the key and its associated information\n\nExample Curl:\n```\ncurl -X GET "http://0.0.0.0:4000/key/info?key=sk-02Wr4IAlN3NvPXvL5JVvDA" -H "Authorization: Bearer sk-1234"\n```\n\nExample Curl - if no key is passed, it will use the Key Passed in Authorization Header\n```\ncurl -X GET "http://0.0.0.0:4000/key/info" -H "Authorization: Bearer sk-02Wr4IAlN3NvPXvL5JVvDA"\n```',
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        title: 'Key',
        description: 'Key in the request parameters',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.key.retrieveInfo(body);
  },
});

registerApiMethod({
  name: 'unblock_key',
  description:
    "Unblock a Virtual key to allow it to make requests again.\n\nParameters:\n- key: str - The key to unblock. Can be either the unhashed key (sk-...) or the hashed key value\n\nExample:\n```bash\ncurl --location 'http://0.0.0.0:4000/key/unblock'     --header 'Authorization: Bearer sk-1234'     --header 'Content-Type: application/json'     --data '{\n    \"key\": \"sk-Fn8Ej39NxjAXrvpUGKghGw\"\n}'\n```\n\nNote: This is an admin-only endpoint. Only proxy admins can unblock keys.",
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
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.key.unblock(body);
  },
});
