// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Delete extends APIResource {
  /**
   * Delete Allowed Ip
   */
  createAllowedIP(body: DeleteCreateAllowedIPParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/delete/allowed_ip', { body, ...options });
  }
}

export type DeleteCreateAllowedIPResponse = unknown;

export interface DeleteCreateAllowedIPParams {
  ip: string;
}

export declare namespace Delete {
  export {
    type DeleteCreateAllowedIPResponse as DeleteCreateAllowedIPResponse,
    type DeleteCreateAllowedIPParams as DeleteCreateAllowedIPParams,
  };
}
