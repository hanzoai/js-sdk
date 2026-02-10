// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class InputItems extends APIResource {
  /**
   * Get input items for a response.
   *
   * Follows the OpenAI Responses API spec:
   * https://platform.openai.com/docs/api-reference/responses/input-items
   *
   * ```bash
   * curl -X GET http://localhost:4000/v1/responses/resp_abc123/input_items     -H "Authorization: Bearer sk-1234"
   * ```
   */
  list(responseID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/responses/${responseID}/input_items`, options);
  }
}

export type InputItemListResponse = unknown;

export declare namespace InputItems {
  export { type InputItemListResponse as InputItemListResponse };
}
