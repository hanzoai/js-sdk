// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'guardrails',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/guardrails/list',
  operationId: 'list_guardrails_guardrails_list_get',
};

export const tool: Tool = {
  name: 'list_guardrails',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList the guardrails that are available on the proxy server\n\n👉 [Guardrail docs](https://docs.hanzo.ai/docs/proxy/guardrails/quick_start)\n\nExample Request:\n```bash\ncurl -X GET \"http://localhost:4000/guardrails/list\" -H \"Authorization: Bearer <your_api_key>\"\n```\n\nExample Response:\n```json\n{\n    \"guardrails\": [\n        {\n        \"guardrail_name\": \"bedrock-pre-guard\",\n        \"guardrail_info\": {\n            \"params\": [\n            {\n                \"name\": \"toxicity_score\",\n                \"type\": \"float\",\n                \"description\": \"Score between 0-1 indicating content toxicity level\"\n            },\n            {\n                \"name\": \"pii_detection\",\n                \"type\": \"boolean\"\n            }\n            ]\n        }\n        }\n    ]\n}\n```\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'ListGuardrailsResponse',\n  properties: {\n    guardrails: {\n      type: 'array',\n      title: 'Guardrails',\n      items: {\n        type: 'object',\n        title: 'GuardrailInfoResponse',\n        properties: {\n          guardrail_info: {\n            type: 'object',\n            title: 'Guardrail Info',\n            additionalProperties: true\n          },\n          guardrail_name: {\n            type: 'string',\n            title: 'Guardrail Name'\n          },\n          llm_params: {\n            type: 'object',\n            title: 'GuardrailLLMParamsResponse',\n            description: 'The returned LLM Params object for /guardrails/list',\n            properties: {\n              guardrail: {\n                type: 'string',\n                title: 'Guardrail'\n              },\n              mode: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    type: 'array',\n                    items: {\n                      type: 'string'\n                    }\n                  }\n                ],\n                title: 'Mode'\n              },\n              default_on: {\n                type: 'boolean',\n                title: 'Default On'\n              }\n            },\n            required: [              'guardrail',\n              'mode'\n            ]\n          }\n        },\n        required: [          'guardrail_info',\n          'guardrail_name',\n          'llm_params'\n        ]\n      }\n    }\n  },\n  required: [    'guardrails'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.guardrails.list()));
};

export default { metadata, tool, handler };
