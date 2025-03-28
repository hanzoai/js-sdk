// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { registerApiMethod } from '../tools';
import Hanzo from 'hanzoai';

registerApiMethod({
  name: 'list_callbacks_active',
  description:
    'Returns a list of llm level settings\n\nThis is useful for debugging and ensuring the proxy server is configured correctly.\n\nResponse schema:\n```\n{\n    "alerting": _alerting,\n    "llm.callbacks": llm_callbacks,\n    "llm.input_callback": llm_input_callbacks,\n    "llm.failure_callback": llm_failure_callbacks,\n    "llm.success_callback": llm_success_callbacks,\n    "llm._async_success_callback": llm_async_success_callbacks,\n    "llm._async_failure_callback": llm_async_failure_callbacks,\n    "llm._async_input_callback": llm_async_input_callbacks,\n    "all_llm_callbacks": all_llm_callbacks,\n    "num_callbacks": len(all_llm_callbacks),\n    "num_alerting": _num_alerting,\n    "llm.request_timeout": llm.request_timeout,\n}\n```',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: (client: Hanzo, args: any) => {
    const {} = args;
    return client.active.listCallbacks();
  },
});
