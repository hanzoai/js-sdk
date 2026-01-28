// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class InputItems extends APIResource {
  /**
   * List input items for a response.
   */
  list(responseID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v1/responses/${responseID}/input_items`, options);
  }
}

export type InputItemListResponse = unknown;

export declare namespace InputItems {
  export { type InputItemListResponse as InputItemListResponse };
}
