// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'create_budget',
  description:
    'Create a new budget object. Can apply this to teams, orgs, end-users, keys.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}',
  inputSchema: {
    type: 'object',
    properties: {
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
        description: "Max duration budget should be set for (e.g. '1hr', '1d', '28d')",
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
        description: 'The unique budget id.',
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
    return client.budget.create(body);
  },
});

registerApiMethod({
  name: 'update_budget',
  description:
    'Update an existing budget object.\n\nParameters:\n- budget_duration: Optional[str] - Budget reset period ("30d", "1h", etc.)\n- budget_id: Optional[str] - The id of the budget. If not provided, a new id will be generated.\n- max_budget: Optional[float] - The max budget for the budget.\n- soft_budget: Optional[float] - The soft budget for the budget.\n- max_parallel_requests: Optional[int] - The max number of parallel requests for the budget.\n- tpm_limit: Optional[int] - The tokens per minute limit for the budget.\n- rpm_limit: Optional[int] - The requests per minute limit for the budget.\n- model_max_budget: Optional[dict] - Specify max budget for a given model. Example: {"openai/gpt-4o-mini": {"max_budget": 100.0, "budget_duration": "1d", "tpm_limit": 100000, "rpm_limit": 100000}}',
  inputSchema: {
    type: 'object',
    properties: {
      budget_duration: {
        type: 'string',
        title: 'Budget Duration',
        description: "Max duration budget should be set for (e.g. '1hr', '1d', '28d')",
      },
      budget_id: {
        type: 'string',
        title: 'Budget Id',
        description: 'The unique budget id.',
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
    return client.budget.update(body);
  },
});

registerApiMethod({
  name: 'list_budget',
  description: 'List all the created budgets in proxy db. Used on Admin UI.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.budget.list();
  },
});

registerApiMethod({
  name: 'delete_budget',
  description: 'Delete budget\n\nParameters:\n- id: str - The budget id to delete',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.budget.delete(body);
  },
});

registerApiMethod({
  name: 'info_budget',
  description:
    'Get the budget id specific information\n\nParameters:\n- budgets: List[str] - The list of budget ids to get information for',
  inputSchema: {
    type: 'object',
    properties: {
      budgets: {
        type: 'array',
        title: 'Budgets',
        items: {
          type: 'string',
        },
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.budget.info(body);
  },
});

registerApiMethod({
  name: 'settings_budget',
  description:
    'Get list of configurable params + current value for a budget item + description of each field\n\nUsed on Admin UI.\n\nQuery Parameters:\n- budget_id: str - The budget id to get information for',
  inputSchema: {
    type: 'object',
    properties: {
      budget_id: {
        type: 'string',
        title: 'Budget Id',
      },
    },
  },
  handler: (client: Hanzo, args: any) => {
    const { ...body } = args;
    return client.budget.settings(body);
  },
});
