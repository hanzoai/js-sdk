// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Active extends APIResource {
  /**
   * Returns a list of litellm level settings
   *
   * This is useful for debugging and ensuring the proxy server is configured
   * correctly.
   *
   * Response schema:
   *
   * ```
   * {
   *     "alerting": _alerting,
   *     "litellm.callbacks": litellm_callbacks,
   *     "litellm.input_callback": litellm_input_callbacks,
   *     "litellm.failure_callback": litellm_failure_callbacks,
   *     "litellm.success_callback": litellm_success_callbacks,
   *     "litellm._async_success_callback": litellm_async_success_callbacks,
   *     "litellm._async_failure_callback": litellm_async_failure_callbacks,
   *     "litellm._async_input_callback": litellm_async_input_callbacks,
   *     "all_litellm_callbacks": all_litellm_callbacks,
   *     "num_callbacks": len(all_litellm_callbacks),
   *     "num_alerting": _num_alerting,
   *     "litellm.request_timeout": litellm.request_timeout,
   * }
   * ```
   */
  listCallbacks(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/active/callbacks', options);
  }
}

export type ActiveListCallbacksResponse = unknown;

export declare namespace Active {
  export { type ActiveListCallbacksResponse as ActiveListCallbacksResponse };
}
