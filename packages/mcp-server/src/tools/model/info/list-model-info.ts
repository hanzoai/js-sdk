// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'model.info',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/model/info',
  operationId: 'model_info_v1_model_info_get',
};

export const tool: Tool = {
  name: 'list_model_info',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nProvides more info about each model in /models, including config.yaml descriptions (except api key and api base)\n\nParameters:\n    llm_model_id: Optional[str] = None (this is the value of `x-llm-model-id` returned in response headers)\n\n    - When llm_model_id is passed, it will return the info for that specific model\n    - When llm_model_id is not passed, it will return the info for all models\n\nReturns:\n    Returns a dictionary containing information about each model.\n\nExample Response:\n```json\n{\n    "data": [\n                {\n                    "model_name": "fake-openai-endpoint",\n                    "llm_params": {\n                        "api_base": "https://exampleopenaiendpoint-production.up.railway.app/",\n                        "model": "openai/fake"\n                    },\n                    "model_info": {\n                        "id": "112f74fab24a7a5245d2ced3536dd8f5f9192c57ee6e332af0f0512e08bed5af",\n                        "db_model": false\n                    }\n                }\n            ]\n}\n\n```\n\n# Response Schema\n```json\n{\n  type: \'object\'\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {
      llm_model_id: {
        type: 'string',
        title: 'Llm Model Id',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.model.info.list(body)) as object);
};

export default { metadata, tool, handler };
