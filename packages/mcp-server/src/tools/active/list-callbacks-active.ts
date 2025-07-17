// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'hanzoai-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Hanzo from 'hanzoai';

export const metadata: Metadata = {
  resource: 'active',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/active/callbacks',
  operationId: 'active_callbacks_active_callbacks_get',
};

export const tool: Tool = {
  name: 'list_callbacks_active',
  description:
    'When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you\'re sure you don\'t need the data.\n\nReturns a list of llm level settings\n\nThis is useful for debugging and ensuring the proxy server is configured correctly.\n\nResponse schema:\n```\n{\n    "alerting": _alerting,\n    "llm.callbacks": llm_callbacks,\n    "llm.input_callback": llm_input_callbacks,\n    "llm.failure_callback": llm_failure_callbacks,\n    "llm.success_callback": llm_success_callbacks,\n    "llm._async_success_callback": llm_async_success_callbacks,\n    "llm._async_failure_callback": llm_async_failure_callbacks,\n    "llm._async_input_callback": llm_async_input_callbacks,\n    "all_llm_callbacks": all_llm_callbacks,\n    "num_callbacks": len(all_llm_callbacks),\n    "num_alerting": _num_alerting,\n    "llm.request_timeout": llm.request_timeout,\n}\n```\n\n# Response Schema\n```json\n{\n  type: \'object\'\n}\n```',
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
  },
};

export const handler = async (client: Hanzo, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.active.listCallbacks()) as object);
};

export default { metadata, tool, handler };
