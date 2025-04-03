// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'model_group',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'retrieve_info_model_group',
  description:
    'Get information about all the deployments on llm proxy, including config.yaml descriptions (except api key and api base)\n\n- /model_group/info returns all model groups. End users of proxy should use /model_group/info since those models will be used for /chat/completions, /embeddings, etc.\n- /model_group/info?model_group=rerank-english-v3.0 returns all model groups for a specific model group (`model_name` in config.yaml)\n\n\n\nExample Request (All Models):\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info\'     -H \'accept: application/json\'     -H \'x-api-key: sk-1234\'\n```\n\nExample Request (Specific Model Group):\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info?model_group=rerank-english-v3.0\'     -H \'accept: application/json\'     -H \'Authorization: Bearer sk-1234\'\n```\n\nExample Request (Specific Wildcard Model Group): (e.g. `model_name: openai/*` on config.yaml)\n```shell\ncurl -X \'GET\'     \'http://localhost:4000/model_group/info?model_group=openai/tts-1\'\n-H \'accept: application/json\'     -H \'Authorization: Bearersk-1234\'\n```\n\nLearn how to use and set wildcard models [here](https://docs.hanzo.ai/docs/wildcard_routing)\n\nExample Response:\n```json\n    {\n        "data": [\n            {\n            "model_group": "rerank-english-v3.0",\n            "providers": [\n                "cohere"\n            ],\n            "max_input_tokens": null,\n            "max_output_tokens": null,\n            "input_cost_per_token": 0.0,\n            "output_cost_per_token": 0.0,\n            "mode": null,\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": false,\n            "supports_function_calling": false,\n            "supported_openai_params": [\n                "stream",\n                "temperature",\n                "max_tokens",\n                "logit_bias",\n                "top_p",\n                "frequency_penalty",\n                "presence_penalty",\n                "stop",\n                "n",\n                "extra_headers"\n            ]\n            },\n            {\n            "model_group": "gpt-3.5-turbo",\n            "providers": [\n                "openai"\n            ],\n            "max_input_tokens": 16385.0,\n            "max_output_tokens": 4096.0,\n            "input_cost_per_token": 1.5e-06,\n            "output_cost_per_token": 2e-06,\n            "mode": "chat",\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": false,\n            "supports_function_calling": true,\n            "supported_openai_params": [\n                "frequency_penalty",\n                "logit_bias",\n                "logprobs",\n                "top_logprobs",\n                "max_tokens",\n                "max_completion_tokens",\n                "n",\n                "presence_penalty",\n                "seed",\n                "stop",\n                "stream",\n                "stream_options",\n                "temperature",\n                "top_p",\n                "tools",\n                "tool_choice",\n                "function_call",\n                "functions",\n                "max_retries",\n                "extra_headers",\n                "parallel_tool_calls",\n                "response_format"\n            ]\n            },\n            {\n            "model_group": "llava-hf",\n            "providers": [\n                "openai"\n            ],\n            "max_input_tokens": null,\n            "max_output_tokens": null,\n            "input_cost_per_token": 0.0,\n            "output_cost_per_token": 0.0,\n            "mode": null,\n            "tpm": null,\n            "rpm": null,\n            "supports_parallel_function_calling": false,\n            "supports_vision": true,\n            "supports_function_calling": false,\n            "supported_openai_params": [\n                "frequency_penalty",\n                "logit_bias",\n                "logprobs",\n                "top_logprobs",\n                "max_tokens",\n                "max_completion_tokens",\n                "n",\n                "presence_penalty",\n                "seed",\n                "stop",\n                "stream",\n                "stream_options",\n                "temperature",\n                "top_p",\n                "tools",\n                "tool_choice",\n                "function_call",\n                "functions",\n                "max_retries",\n                "extra_headers",\n                "parallel_tool_calls",\n                "response_format"\n            ]\n            }\n        ]\n        }\n```',
  inputSchema: {
    type: 'object',
    properties: {
      model_group: {
        type: 'string',
        title: 'Model Group',
      },
    },
  },
};

export const handler = (client: Hanzo, args: any) => {
  const { ...body } = args;
  return client.modelGroup.retrieveInfo(body);
};

export default { metadata, tool, handler };
