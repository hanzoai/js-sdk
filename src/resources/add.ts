// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Add extends APIResource {
  /**
   * Add Allowed Ip
   */
  addAllowedIP(body: AddAddAllowedIPParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/add/allowed_ip', { body, ...options });
  }
}

export interface IPAddress {
  ip: string;
}

export type AddAddAllowedIPResponse = unknown;

export interface AddAddAllowedIPParams {
  ip: string;
}

export declare namespace Add {
  export {
    type IPAddress as IPAddress,
    type AddAddAllowedIPResponse as AddAddAllowedIPResponse,
    type AddAddAllowedIPParams as AddAddAllowedIPParams,
  };
}
