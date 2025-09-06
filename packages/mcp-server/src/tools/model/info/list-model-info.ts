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
    'Provides more info about each model in /models, including config.yaml descriptions (except api key and api base)\n\nParameters:\n    llm_model_id: Optional[str] = None (this is the value of `x-llm-model-id` returned in response headers)\n\n    - When llm_model_id is passed, it will return the info for that specific model\n    - When llm_model_id is not passed, it will return the info for all models\n\nReturns:\n    Returns a dictionary containing information about each model.\n\nExample Response:\n```json\n{\n    "data": [\n                {\n                    "model_name": "fake-openai-endpoint",\n                    "llm_params": {\n                        "api_base": "https://exampleopenaiendpoint-production.up.railway.app/",\n                        "model": "openai/fake"\n                    },\n                    "model_info": {\n                        "id": "112f74fab24a7a5245d2ced3536dd8f5f9192c57ee6e332af0f0512e08bed5af",\n                        "db_model": false\n                    }\n                }\n            ]\n}\n\n```',
  inputSchema: {
    type: 'object',
    properties: {
      llm_model_id: {
        type: 'string',
        title: 'Llm Model Id',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult((await client.model.info.list(body)) as object);
};

export default { metadata, tool, handler };
