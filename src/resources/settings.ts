// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Settings extends APIResource {
  /**
   * Returns a list of llm level settings
   *
   * This is useful for debugging and ensuring the proxy server is configured
   * correctly.
   *
   * Response schema:
   *
   * ```
   * {
   *     "alerting": _alerting,
   *     "llm.callbacks": llm_callbacks,
   *     "llm.input_callback": llm_input_callbacks,
   *     "llm.failure_callback": llm_failure_callbacks,
   *     "llm.success_callback": llm_success_callbacks,
   *     "llm._async_success_callback": llm_async_success_callbacks,
   *     "llm._async_failure_callback": llm_async_failure_callbacks,
   *     "llm._async_input_callback": llm_async_input_callbacks,
   *     "all_llm_callbacks": all_llm_callbacks,
   *     "num_callbacks": len(all_llm_callbacks),
   *     "num_alerting": _num_alerting,
   *     "llm.request_timeout": llm.request_timeout,
   * }
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/settings', options);
  }
}

export type SettingRetrieveResponse = unknown;

export declare namespace Settings {
  export { type SettingRetrieveResponse as SettingRetrieveResponse };
}
