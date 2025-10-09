// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'hanzoai-mcp/filtering';
import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'key',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/key/health',
  operationId: 'key_health_key_health_post',
};

export const tool: Tool = {
  name: 'check_health_key',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nCheck the health of the key\n\nChecks:\n- If key based logging is configured correctly - sends a test log\n\nUsage \n\nPass the key in the request header\n\n```bash\ncurl -X POST "http://localhost:4000/key/health"      -H "Authorization: Bearer sk-1234"      -H "Content-Type: application/json"\n```\n\nResponse when logging callbacks are setup correctly:\n\n```json\n{\n  "key": "healthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "healthy",\n    "details": "No logger exceptions triggered, system is healthy. Manually check if logs were sent to [\'gcs_bucket\']"\n  }\n}\n```\n\n\nResponse when logging callbacks are not setup correctly:\n```json\n{\n  "key": "unhealthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "unhealthy",\n    "details": "Logger exceptions triggered, system is unhealthy: Failed to load vertex credentials. Check to see if credentials containing partial/invalid information."\n  }\n}\n```\n\n# Response Schema\n```json\n{\n  $ref: \'#/$defs/key_check_health_response\',\n  $defs: {\n    key_check_health_response: {\n      type: \'object\',\n      title: \'KeyHealthResponse\',\n      properties: {\n        key: {\n          type: \'string\',\n          title: \'Key\',\n          enum: [            \'healthy\',\n            \'unhealthy\'\n          ]\n        },\n        logging_callbacks: {\n          type: \'object\',\n          title: \'LoggingCallbackStatus\',\n          properties: {\n            callbacks: {\n              type: \'array\',\n              title: \'Callbacks\',\n              items: {\n                type: \'string\'\n              }\n            },\n            details: {\n              type: \'string\',\n              title: \'Details\'\n            },\n            status: {\n              type: \'string\',\n              title: \'Status\',\n              enum: [                \'healthy\',\n                \'unhealthy\'\n              ]\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```',
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
  annotations: {},
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.key.checkHealth()));
};

export default { metadata, tool, handler };
