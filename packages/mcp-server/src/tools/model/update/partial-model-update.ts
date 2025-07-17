// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'model.update',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/model/{model_id}/update',
  operationId: 'patch_model_model__model_id__update_patch',
};

export const tool: Tool = {
  name: 'partial_model_update',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPATCH Endpoint for partial model updates.\n\nOnly updates the fields specified in the request while preserving other existing values.\nFollows proper PATCH semantics by only modifying provided fields.\n\nArgs:\n    model_id: The ID of the model to update\n    patch_data: The fields to update and their new values\n    user_api_key_dict: User authentication information\n\nReturns:\n    Updated model information\n\nRaises:\n    ProxyException: For various error conditions including authentication and database errors\n\n# Response Schema\n```json\n{\n  type: 'object'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      model_id: {
        type: 'string',
        title: 'Model Id',
      },
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
                  $ref: '#/$defs/configurable_clientside_params_custom_auth',
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
        $ref: '#/$defs/model_info',
      },
      model_name: {
        type: 'string',
        title: 'Model Name',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    $defs: {
      configurable_clientside_params_custom_auth: {
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
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { model_id, ...body } = args as any;
  return asTextContentResult((await client.model.update.partial(model_id, body)) as object);
};

export default { metadata, tool, handler };
