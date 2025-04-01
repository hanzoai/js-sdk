// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const tool: Tool = {
  name: 'full_model_update',
  description: 'Edit existing model params',
  inputSchema: {
    type: 'object',
    properties: {
      llm_params: {
        type: 'object',
        title: 'updateLLMParams',
        properties: {
          api_base: {
            type: 'string',
            title: 'Api Base',
          },
          api_key: {
            type: 'string',
            title: 'Api Key',
          },
          api_version: {
            type: 'string',
            title: 'Api Version',
          },
          aws_access_key_id: {
            type: 'string',
            title: 'Aws Access Key Id',
          },
          aws_region_name: {
            type: 'string',
            title: 'Aws Region Name',
          },
          aws_secret_access_key: {
            type: 'string',
            title: 'Aws Secret Access Key',
          },
          budget_duration: {
            type: 'string',
            title: 'Budget Duration',
          },
          configurable_clientside_auth_params: {
            type: 'array',
            title: 'Configurable Clientside Auth Params',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'object',
                  title: 'ConfigurableClientsideParamsCustomAuth',
                  properties: {
                    api_base: {
                      type: 'string',
                      title: 'Api Base',
                    },
                  },
                  required: ['api_base'],
                },
              ],
            },
          },
          custom_llm_provider: {
            type: 'string',
            title: 'Custom Llm Provider',
          },
          input_cost_per_second: {
            type: 'number',
            title: 'Input Cost Per Second',
          },
          input_cost_per_token: {
            type: 'number',
            title: 'Input Cost Per Token',
          },
          llm_trace_id: {
            type: 'string',
            title: 'Llm Trace Id',
          },
          max_budget: {
            type: 'number',
            title: 'Max Budget',
          },
          max_file_size_mb: {
            type: 'number',
            title: 'Max File Size Mb',
          },
          max_retries: {
            type: 'integer',
            title: 'Max Retries',
          },
          merge_reasoning_content_in_choices: {
            type: 'boolean',
            title: 'Merge Reasoning Content In Choices',
          },
          model: {
            type: 'string',
            title: 'Model',
          },
          model_info: {
            type: 'object',
            title: 'Model Info',
          },
          organization: {
            type: 'string',
            title: 'Organization',
          },
          output_cost_per_second: {
            type: 'number',
            title: 'Output Cost Per Second',
          },
          output_cost_per_token: {
            type: 'number',
            title: 'Output Cost Per Token',
          },
          region_name: {
            type: 'string',
            title: 'Region Name',
          },
          rpm: {
            type: 'integer',
            title: 'Rpm',
          },
          stream_timeout: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'string',
              },
            ],
            title: 'Stream Timeout',
          },
          timeout: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'string',
              },
            ],
            title: 'Timeout',
          },
          tpm: {
            type: 'integer',
            title: 'Tpm',
          },
          use_in_pass_through: {
            type: 'boolean',
            title: 'Use In Pass Through',
          },
          vertex_credentials: {
            anyOf: [
              {
                type: 'object',
              },
              {
                type: 'string',
              },
            ],
            title: 'Vertex Credentials',
          },
          vertex_location: {
            type: 'string',
            title: 'Vertex Location',
          },
          vertex_project: {
            type: 'string',
            title: 'Vertex Project',
          },
          watsonx_region_name: {
            type: 'string',
            title: 'Watsonx Region Name',
          },
        },
        required: [],
      },
      model_info: {
        type: 'object',
        title: 'ModelInfo',
        properties: {
          id: {
            type: 'string',
            title: 'Id',
          },
          base_model: {
            type: 'string',
            title: 'Base Model',
          },
          created_at: {
            type: 'string',
            title: 'Created At',
            format: 'date-time',
          },
          created_by: {
            type: 'string',
            title: 'Created By',
          },
          db_model: {
            type: 'boolean',
            title: 'Db Model',
          },
          team_id: {
            type: 'string',
            title: 'Team Id',
          },
          team_public_model_name: {
            type: 'string',
            title: 'Team Public Model Name',
          },
          tier: {
            type: 'string',
            title: 'Tier',
            enum: ['free', 'paid'],
          },
          updated_at: {
            type: 'string',
            title: 'Updated At',
            format: 'date-time',
          },
          updated_by: {
            type: 'string',
            title: 'Updated By',
          },
        },
        required: ['id'],
      },
      model_name: {
        type: 'string',
        title: 'Model Name',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.model.update.full(body);
};

export default { tool, handler };
