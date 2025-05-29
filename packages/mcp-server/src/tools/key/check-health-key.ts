// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
    'Check the health of the key\n\nChecks:\n- If key based logging is configured correctly - sends a test log\n\nUsage \n\nPass the key in the request header\n\n```bash\ncurl -X POST "http://localhost:4000/key/health"      -H "Authorization: Bearer sk-1234"      -H "Content-Type: application/json"\n```\n\nResponse when logging callbacks are setup correctly:\n\n```json\n{\n  "key": "healthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "healthy",\n    "details": "No logger exceptions triggered, system is healthy. Manually check if logs were sent to [\'gcs_bucket\']"\n  }\n}\n```\n\n\nResponse when logging callbacks are not setup correctly:\n```json\n{\n  "key": "unhealthy",\n  "logging_callbacks": {\n    "callbacks": [\n      "gcs_bucket"\n    ],\n    "status": "unhealthy",\n    "details": "Logger exceptions triggered, system is unhealthy: Failed to load vertex credentials. Check to see if credentials containing partial/invalid information."\n  }\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return client.key.checkHealth();
};

export default { metadata, tool, handler };
