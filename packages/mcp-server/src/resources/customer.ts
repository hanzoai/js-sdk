// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_customer',
  description:
    'Allow creating a new Customer \n\n\nParameters:\n- user_id: str - The unique identifier for the user.\n- alias: Optional[str] - A human-friendly alias for the user.\n- blocked: bool - Flag to allow or disallow requests for this end-user. Default is False.\n- max_budget: Optional[float] - The maximum budget allocated to the user. Either \'max_budget\' or \'budget_id\' should be provided, not both.\n- budget_id: Optional[str] - The identifier for an existing budget allocated to the user. Either \'max_budget\' or \'budget_id\' should be provided, not both.\n- allowed_model_region: Optional[Union[Literal["eu"], Literal["us"]]] - Require all user requests to use models in this specific region.\n- default_model: Optional[str] - If no equivalent model in the allowed region, default all requests to this model.\n- metadata: Optional[dict] = Metadata for customer, store information for customer. Example metadata = {"data_training_opt_out": True}\n- budget_duration: Optional[str] - Budget is reset at the end of specified duration. If not set, budget is never reset. You can set duration as seconds ("30s"), minutes ("30m"), hours ("30h"), days ("30d").\n- tpm_limit: Optional[int] - [Not Implemented Yet] Specify tpm limit for a given customer (Tokens per minute)\n- rpm_limit: Optional[int] - [Not Implemented Yet] Specify rpm limit for a given customer (Requests per minute)\n- model_max_budget: Optional[dict] - [Not Implemented Yet] Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d"}}\n- max_parallel_requests: Optional[int] - [Not Implemented Yet] Specify max parallel requests for a given customer.\n- soft_budget: Optional[float] - [Not Implemented Yet] Get alerts when customer crosses given budget, doesn\'t block requests.\n\n\n- Allow specifying allowed regions \n- Allow specifying default model\n\nExample curl:\n```\ncurl --location \'http://0.0.0.0:4000/customer/new\'         --header \'Authorization: Bearer sk-1234\'         --header \'Content-Type: application/json\'         --data \'{\n        "user_id" : "z-jaff-3",\n        "allowed_region": "eu",\n        "budget_id": "free_tier",\n        "default_model": "azure/gpt-3.5-turbo-eu" <- all calls from this user, use this model? \n    }\'\n\n    # return end-user object\n```\n\nNOTE: This used to be called `/end_user/new`, we will still be maintaining compatibility for /end_user/XXX for these endpoints',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      alias: {
        type: 'string',
        title: 'Alias',
      },
      allowed_model_region: {
        type: 'string',
        title: 'Allowed Model Region',
        enum: ['eu', 'us'],
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
        description: "Max duration budget should be set for (e.g. '1hr', '1d', '28d')",
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      default_model: {
        type: 'string',
        title: 'Default Model',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
        description: 'Requests will fail if this budget (in USD) is exceeded.',
      },
      max_parallel_requests: {
        type: 'integer',
        title: 'Max Parallel Requests',
        description: 'Max concurrent requests allowed for this budget id.',
      },
      model_max_budget: {
        type: 'object',
        title: 'Model Max Budget',
        description:
          "Max budget for each model (e.g. {'gpt-4o': {'max_budget': '0.0000001', 'budget_duration': '1d', 'tpm_limit': 1000, 'rpm_limit': 1000}})",
      },
      rpm_limit: {
        type: 'integer',
        title: 'Rpm Limit',
        description: 'Max requests per minute, allowed for this budget id.',
      },
      soft_budget: {
        type: 'number',
        title: 'Soft Budget',
        description: 'Requests will NOT fail if this is exceeded. Will fire alerting though.',
      },
      tpm_limit: {
        type: 'integer',
        title: 'Tpm Limit',
        description: 'Max tokens per minute, allowed for this budget id.',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.customer.create(body);
  },
});

registerApiMethod({
  name: 'update_customer',
  description:
    'Example curl \n\nParameters:\n- user_id: str\n- alias: Optional[str] = None  # human-friendly alias\n- blocked: bool = False  # allow/disallow requests for this end-user\n- max_budget: Optional[float] = None\n- budget_id: Optional[str] = None  # give either a budget_id or max_budget\n- allowed_model_region: Optional[AllowedModelRegion] = (\n    None  # require all user requests to use models in this specific region\n)\n- default_model: Optional[str] = (\n    None  # if no equivalent model in allowed region - default all requests to this model\n)\n\nExample curl:\n```\ncurl --location \'http://0.0.0.0:4000/customer/update\'     --header \'Authorization: Bearer sk-1234\'     --header \'Content-Type: application/json\'     --data \'{\n    "user_id": "test-llm-user-4",\n    "budget_id": "paid_tier"\n}\'\n\nSee below for all params \n```',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        title: 'User Id',
      },
      alias: {
        type: 'string',
        title: 'Alias',
      },
      allowed_model_region: {
        type: 'string',
        title: 'Allowed Model Region',
        enum: ['eu', 'us'],
      },
      blocked: {
        type: 'boolean',
        title: 'Blocked',
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
      default_model: {
        type: 'string',
        title: 'Default Model',
      },
      max_budget: {
        type: 'number',
        title: 'Max Budget',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.customer.update(body);
  },
});

registerApiMethod({
  name: 'list_customer',
  description:
    "[Admin-only] List all available customers\n\nExample curl:\n```\ncurl --location --request GET 'http://0.0.0.0:4000/customer/list'         --header 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.customer.list();
  },
});

registerApiMethod({
  name: 'delete_customer',
  description:
    "Delete multiple end-users.\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to delete\n\nExample curl:\n```\ncurl --location 'http://0.0.0.0:4000/customer/delete'         --header 'Authorization: Bearer sk-1234'         --header 'Content-Type: application/json'         --data '{\n        \"user_ids\" :[\"z-jaff-5\"]\n}'\n\nSee below for all params \n```",
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.customer.delete(body);
  },
});

registerApiMethod({
  name: 'block_customer',
  description:
    '[BETA] Reject calls with this end-user id\n\nParameters:\n- user_ids (List[str], required): The unique `user_id`s for the users to block\n\n    (any /chat/completion call with this user={end-user-id} param, will be rejected.)\n\n    ```\n    curl -X POST "http://0.0.0.0:8000/user/block"\n    -H "Authorization: Bearer sk-1234"\n    -d \'{\n    "user_ids": [<user_id>, ...]\n    }\'\n    ```',
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.customer.block(body);
  },
});

registerApiMethod({
  name: 'retrieve_info_customer',
  description:
    "Get information about an end-user. An `end_user` is a customer (external user) of the proxy.\n\nParameters:\n- end_user_id (str, required): The unique identifier for the end-user\n\nExample curl:\n```\ncurl -X GET 'http://localhost:4000/customer/info?end_user_id=test-llm-user-4'         -H 'Authorization: Bearer sk-1234'\n```",
  inputSchema: {
    type: 'object',
    properties: {
      end_user_id: {
        type: 'string',
        title: 'End User Id',
        description: 'End User ID in the request parameters',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.customer.retrieveInfo(body);
  },
});

registerApiMethod({
  name: 'unblock_customer',
  description:
    '[BETA] Unblock calls with this user id\n\nExample\n```\ncurl -X POST "http://0.0.0.0:8000/user/unblock"\n-H "Authorization: Bearer sk-1234"\n-d \'{\n"user_ids": [<user_id>, ...]\n}\'\n```',
  inputSchema: {
    type: 'object',
    properties: {
      user_ids: {
        type: 'array',
        title: 'User Ids',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.customer.unblock(body);
  },
});
